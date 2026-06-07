from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from auth import verify_password, create_access_token, get_current_user, get_password_hash
from models import Token, UserData

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
