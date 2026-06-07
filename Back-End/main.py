from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from auth import verify_password, create_access_token, get_current_user, get_password_hash
from models import Token, UserData, EmprestimoCreate, EmprestimoResponse
from datetime import date, timedelta
from typing import List

app = FastAPI(title="API Biblioteca")

# Libera o CORS para quando você for conectar o React depois
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Na hora de colocar no ar, troque "*" pelo endereço do seu front-end
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulando um banco de dados com as senhas já criptografadas (senha real: "123456")
senha_padrao_hasheada = get_password_hash("123456")

fake_db = {
    "admin1": {
        "username": "admin1",
        "hashed_password": senha_padrao_hasheada,
        "role": "bibliotecario"
    },
    "leitor1": {
        "username": "leitor1",
        "hashed_password": senha_padrao_hasheada,
        "role": "usuario"
    }
}

# Banco de dados simulado de livros
fake_books_db = {
    1: {"id": 1, "titulo": "O Senhor dos Anéis", "disponivel": True},
    2: {"id": 2, "titulo": "Cálculo I", "disponivel": True},
    3: {"id": 3, "titulo": "Python Fluente", "disponivel": True}
}

# Lista que guardará os históricos de empréstimos
fake_emprestimos_db = []
emprestimo_id_counter = 1

# ---------------------------------------------------------
# ENDPOINT 1: O Login (Gera o Token)
# ---------------------------------------------------------
@app.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_db.get(form_data.username)
    
    # Valida se o usuário existe e se a senha bate
    if not user_dict or not verify_password(form_data.password, user_dict["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos",
        )
    
    # Se passou, cria o token colocando o username e a role lá dentro
    access_token = create_access_token(
        data={"sub": user_dict["username"], "role": user_dict["role"]}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# ---------------------------------------------------------
# ENDPOINT 2: Rota Exclusiva do Bibliotecário
# ---------------------------------------------------------
@app.post("/livros/cadastrar")
async def cadastrar_livro(current_user: UserData = Depends(get_current_user)):
    # Trava de segurança da role
    if current_user.role != "bibliotecario":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Ação permitida apenas para bibliotecários."
        )
        
    return {"mensagem": f"Acesso liberado. {current_user.username} pode cadastrar livros."}

# ---------------------------------------------------------
# ENDPOINT 3: Rota para Qualquer Usuário Logado
# ---------------------------------------------------------
@app.get("/perfil")
async def ver_perfil(current_user: UserData = Depends(get_current_user)):
    # Se o token for válido, a função Depends já injeta os dados do usuário aqui
    return {
        "mensagem": "Perfil acessado com sucesso",
        "usuario": current_user.username,
        "tipo_conta": current_user.role
    }

# ---------------------------------------------------------
# ROTA DO BIBLIOTECÁRIO: Registrar Empréstimo
# ---------------------------------------------------------
@app.post("/emprestimos/registrar", response_model=EmprestimoResponse)
async def registrar_emprestimo(dados: EmprestimoCreate, current_user: UserData = Depends(get_current_user)):
    global emprestimo_id_counter
    
    # 1. Regra de Negócio: Apenas bibliotecários podem executar essa ação
    if current_user.role != "bibliotecario":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Acesso negado. Apenas bibliotecários podem realizar empréstimos."
        )
    
    # 2. Validação: O usuário leitor existe no sistema?
    if dados.username_leitor not in fake_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Usuário leitor não encontrado."
        )
        
    # 3. Validação: O livro existe e está disponível?
    livro = fake_books_db.get(dados.id_livro)
    if not livro:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Livro não encontrado."
        )
    if not livro["disponivel"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Este livro já está emprestado no momento."
        )
        
    # 4. Processamento: Criação do registro de empréstimo (Prazo de 14 dias)
    novo_emprestimo = {
        "id": emprestimo_id_counter,
        "username_leitor": dados.username_leitor,
        "id_livro": dados.id_livro,
        "titulo_livro": livro["titulo"],
        "data_emprestimo": date.today(),
        "data_devolucao": date.today() + timedelta(days=14),
        "status": "ativo"
    }
    
    # Atualiza o estado do livro para indisponível
    livro["disponivel"] = False
    
    # Salva no banco simulado
    fake_emprestimos_db.append(novo_emprestimo)
    emprestimo_id_counter += 1
    
    return novo_emprestimo

# ---------------------------------------------------------
# ROTA DO USUÁRIO COMUM: Visualizar Meus Empréstimos
# ---------------------------------------------------------
@app.get("/emprestimos/meus", response_model=List[EmprestimoResponse])
async def listar_meus_emprestimos(current_user: UserData = Depends(get_current_user)):
    # Qualquer usuário logado pode acessar essa rota, mas ele SÓ vê os registros dele.
    # Filtramos a lista comparando o username_leitor com o 'sub' extraído do token (current_user.username)
    meus_emprestimos = [
        emp for emp in fake_emprestimos_db if emp["username_leitor"] == current_user.username
    ]
    
    return meus_emprestimos
