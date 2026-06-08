import { useState, useEffect } from 'react';

interface Livro {
    id: number;
    titulo: string;
    disponivel: boolean;
}

export default function SeeBooks() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [idInput, setIdInput] = useState('');
    const [tituloInput, setTituloInput] = useState('');

    // Função que busca livros para o useEffect inicial
    useEffect(() => {
        const carregarLivrosIniciais = async () => {
            try {
                // Tenta buscar o token salvo no localStorage no momento do login
                const token = localStorage.getItem('token'); 
                
                const resposta = await fetch('http://127.0.0.1:8000/livros', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!resposta.ok) {
                    throw new Error('Erro ao buscar a lista de livros.');
                }

                const dados = await resposta.json();
                setLivros(dados);
            } catch (erro) {
                console.error("Erro ao buscar livros da API, carregando locais:", erro);
                
                // Fallback garantido se o backend estiver desconectado
                setLivros([
                    { id: 1, titulo: "O Senhor dos Anéis", disponivel: true },
                    { id: 2, titulo: "Cálculo I", disponivel: true },
                    { id: 3, titulo: "Python Fluente", disponivel: true }
                ]);
            }
        };

        carregarLivrosIniciais();
    }, []);

    // Função para atualizar manualmente via botão ou após cadastrar
    const recarregarListaManual = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const resposta = await fetch('http://127.0.0.1:8000/livros', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (resposta.ok) {
                const dados = await resposta.json();
                setLivros(dados);
            }
        } catch (erro) {
            console.error("Erro ao recarregar:", erro);
        }
    };

    const adicionarLivro = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!idInput || !tituloInput) {
            alert("Por favor, preencha o ID e o título do livro.");
            return;
        } 

        try {
            const token = localStorage.getItem('token'); 
            
            const novoLivroCorpo = {
                id: parseInt(idInput),
                titulo: tituloInput
            };

            const resposta = await fetch('http://127.0.0.1:8000/livros/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(novoLivroCorpo)
            });

            if (resposta.status === 403) {
                alert("Ação negada! Apenas bibliotecários podem cadastrar livros.");
                return;
            }

            if (!resposta.ok) {
                throw new Error('Falha ao registrar livro no servidor.');
            }

            alert("Livro adicionado com sucesso!");
            setIdInput('');
            setTituloInput('');
            
            // Recarrega a lista chamando a função de atualização manual
            recarregarListaManual();

        } catch (erro) {
            console.error("Erro ao adicionar livro:", erro);
            alert("Erro ao enviar. Certifique-se de que o backend está rodando no terminal.");
        }
    };

    return (
        <div>
            <h2>Todos os Livros</h2>
            <p>Página de gerenciamento do acervo da biblioteca.</p>

            <section>
                <h3>Cadastrar Novo Livro (Apenas Bibliotecário)</h3>
                <form onSubmit={adicionarLivro}>
                    <input 
                        type="number" 
                        placeholder="ID numérico do livro"
                        value={idInput}
                        onChange={(e) => setIdInput(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Nome do livro"
                        value={tituloInput}
                        onChange={(e) => setTituloInput(e.target.value)}
                    />
                    <button type="submit">Cadastrar Livro</button>
                </form>
            </section>

            <br /><hr /><br />

            <section>
                <button onClick={recarregarListaManual}>
                    Atualizar / Mostrar Lista de Livros
                </button>

                <div>
                    {livros.length > 0 ? (
                        <ul>
                            {livros.map((livro) => (
                                <li key={livro.id}>
                                    <strong>ID: {livro.id}</strong> - {livro.titulo}  
                                    {" | "} 
                                    <span>
                                        {livro.disponivel ? "Disponível" : "Emprestado"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum livro carregado ainda.</p>
                    )}
                </div>
            </section>
        </div>
    );
}