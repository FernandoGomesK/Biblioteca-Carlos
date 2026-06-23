import { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';

// Atualizado para refletir o schema EmprestimoResponse do backend
interface Emprestimo {
    id: number; // Corrigido de 'int' (inválido no TS) para 'number'
    username_leitor: string;
    id_livro: number;
    titulo_livro: string;
    data_emprestimo: string;
    data_devolucao: string;
    status: string;
}

export default function UserDashboard() {
    const [meusEmprestimos, setMeusEmprestimos] = useState<Emprestimo[]>([]);

    const carregarHistoricoLeitor = async () => {
        try {
            // Supondo que você salve o token no localStorage durante o login
            const token = localStorage.getItem('access_token'); 

            // Chamada real para a API FastAPI
            const resposta = await fetch('http://localhost:8000/emprestimos/meus', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Necessário para passar na validação do get_current_user
                }
            });

            if (resposta.ok) {
                const dados = await resposta.json();
                setMeusEmprestimos(dados); // Atualiza o estado com a lista vinda do banco (ou fake_db)
            } else {
                console.error("Erro ao buscar histórico do usuário. Status:", resposta.status);
            }
        } catch (erro) {
            console.error("Erro na requisição ao buscar histórico do usuário:", erro);
        }
    };

    useEffect(() => {
        carregarHistoricoLeitor();
    }, []);

    return (
        <div>
            <h1>Usuário</h1>
            <p>Área exclusiva do membro da biblioteca.</p>
            
            <section>
                <h3>Meu Histórico de Empréstimos</h3>
                {meusEmprestimos.length > 0 ? (
                    <ul>
                        {meusEmprestimos.map((emp) => (
                            <li key={emp.id}>
                                <strong>{emp.titulo_livro}</strong> (ID Empréstimo: {emp.id}) <br />
                                Retirada: {emp.data_emprestimo} | Devolução: {emp.data_devolucao} <br />
                                Status: <span>{emp.status}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Você não possui nenhum empréstimo no seu histórico.</p>
                )}
            </section>
            <br />
            <MenuItem direction="/" label="Sair / Voltar para Home" />
        </div>
    );
}