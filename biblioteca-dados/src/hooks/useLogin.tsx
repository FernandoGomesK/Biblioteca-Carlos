import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authServices'; // Certifique-se de que o caminho de pastas está correto até o arquivo 1

export function useLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("Clerk");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dados = await authService.login(username, password);
            localStorage.setItem('token', dados.access_token);
            
            if (accountType === "Clerk") {
                navigate('/seebooks');
            } else {
                navigate('/user-dashboard');
            }
        } catch (erro) {
            console.error(erro);
            alert("Erro ao logar. Verifique as credenciais ou o servidor.");
        }
    };

    return { username, setUsername, password, setPassword, accountType, setAccountType, handleLogin };
}