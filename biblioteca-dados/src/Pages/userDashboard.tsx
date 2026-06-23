import { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';

interface Emprestimo {
    id: int;
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
            // Chamada para a rota @app.get("/emprestimos/meus")
            // const resposta = await api.get('/emprestimos/meus');
            // setMeusEmprestimos(resposta.data);
            
            // Dados mocados para simular o retorno da Lista Encadeada do Python:
            setMeusEmprestimos([
                { id: 1, id_livro: 2, titulo_livro: "Cálculo I", data_emprestimo: "2026-06-01", data_devolucao: "2026-06-15", status: "ativo" },
                { id: 2, id_livro: 3, titulo_livro: "Python Fluente", data_emprestimo: "2026-05-10", data_devolucao: "2026-05-24", status: "devolvido" }
            ]);
        } catch (erro) {
            console.error("Erro ao buscar histórico do usuário:", erro);
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