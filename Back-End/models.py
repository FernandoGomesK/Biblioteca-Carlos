from pydantic import BaseModel

# O que a API devolve quando o login dá certo
class Token(BaseModel):
    access_token: str
    token_type: str

# Estrutura do usuário que trafega internamente no código
class UserData(BaseModel):
    username: str
    role: str

# O que o bibliotecário envia no corpo (JSON) da requisição
class EmprestimoCreate(BaseModel):
    username_leitor: str
    id_livro: int

# O formato que a API vai devolver para o front-end
class EmprestimoResponse(BaseModel):
    id: int
    username_leitor: str
    id_livro: int
    titulo_livro: str
    data_emprestimo: date
    data_devolucao: date
    status: str # "ativo" ou "devolvido"
