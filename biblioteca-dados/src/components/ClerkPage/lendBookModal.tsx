import { useState, useEffect, type FormEvent } from 'react';

// 1. Definimos as Props que o modal precisa receber do MainClerk
interface LendBookProps {
    isOpen: boolean;
    onClose: () => void;
    bookId: number | null; // O ID do livro que foi clicado na listagem
    onSuccess: () => void; // Função para recarregar a lista de livros após emprestar
}

// Interface interna para tipar os leitores recebidos da API
interface Membro {
    username: string;
    role: string;
}

export default function LendBookModal({
    isOpen,
    onClose,
    bookId,
    onSuccess
}: LendBookProps) {
    const [membros, setMembros] = useState<Membro[]>([]);
    const [selectedMembro, setSelectedMembro] = useState<string>('');
    const [carregando, setCarregando] = useState<boolean>(false);

    // 2. Sempre que o modal abrir, busca a lista atualizada de membros leitores do backend
    useEffect(() => {
        if (!isOpen) return;

        const carregarMembros = async () => {
            try {
                setCarregando(true);
                const token = localStorage.getItem('token');
                const resposta = await fetch('http://127.0.0.1:8000/usuarios/leitores', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (resposta.ok) {
                    const dados = await resposta.json();
                    setMembros(dados);
                    // Pré-seleciona o primeiro membro da lista se existir
                    if (dados.length > 0) {
                        setSelectedMembro(dados[0].username);
                    }
                }
            } catch (erro) {
                console.error("Erro ao buscar membros:", erro);
            } finally {
                setCarregando(false);
            }
        };

        carregarMembros();
    }, [isOpen]);

    // 3. Função para enviar o empréstimo para a rota do FastAPI
    const handleRegistrarEmprestimo = async (e: FormEvent) => {
        e.preventDefault();

        if (!bookId || !selectedMembro) {
            alert("Erro: Informações de livro ou membro inválidas.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            
            // Corpo exato que o seu EmprestimoCreate do backend espera
            const corpoEmprestimo = {
                username_leitor: selectedMembro,
                id_livro: bookId
            };

            const resposta = await fetch('http://127.0.0.1:8000/emprestimos/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(corpoEmprestimo)
            });

            if (!resposta.ok) {
                const erroDados = await resposta.json();
                throw new Error(erroDados.detail || 'Erro ao registrar empréstimo.');
            }

            alert("Empréstimo registrado com sucesso!");
            onSuccess(); 
            onClose();   
        } catch (erro: unknown) {
            console.error(erro);
            const mensagemErro = erro instanceof Error ? erro.message : String(erro);
            alert(mensagemErro || "Falha ao registrar empréstimo.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-2xl border border-gray-600 w-96 relative">
                
                <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-white font-bold">✕</button>

                <h3 className="text-xl font-bold mb-2 text-white">Registrar Empréstimo</h3>
                <p className="text-sm text-gray-400 mb-4">Selecione o leitor que irá pegar o Livro (ID: {bookId})</p>

                {carregando ? (
                    <p className="text-gray-400 text-center py-4">Carregando leitores...</p>
                ) : (
                    <form onSubmit={handleRegistrarEmprestimo} className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-1">
                            <label className="text-sm text-gray-400">Leitor Disponível</label>
                            
                            {membros.length > 0 ? (
                                <select 
                                    value={selectedMembro} 
                                    onChange={(e) => setSelectedMembro(e.target.value)}
                                    className="bg-[#1e1e1e] border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                                >
                                    {membros.map((membro) => (
                                        <option key={membro.username} value={membro.username}>
                                            {membro.username}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-red-400 text-sm">Nenhum leitor encontrado no sistema.</p>
                            )}
                        </div>

                        {/* Botões de Gravar e Cancelar */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                disabled={membros.length === 0}
                                className={`px-4 py-2 rounded text-white transition ${membros.length > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
                            >
                                Confirmar Empréstimo
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}