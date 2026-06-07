from pydantic import BaseModel

# O que a API devolve quando o login dá certo
class Token(BaseModel):
    access_token: str
    token_type: str

# Estrutura do usuário que trafega internamente no código
class UserData(BaseModel):
    username: str
    role: str
