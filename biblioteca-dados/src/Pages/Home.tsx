import { useState } from 'react';
import { apiMock } from '../services/Api';


function Home() {
    
    const [livros, setLivros] = useState<{ titulo: string; autor: string }[]>([]);
    const [tituloInput, setTituloInput] = useState('');
    const [autorInput, setAutorInput] = useState('');

    

    const mostrarLivros = async () => {
        try {
            
            const resposta: { data: { titulo: string; autor: string }[] } = await apiMock.getLivros();
            setLivros(resposta.data); 
        } catch (erro) {
            console.error("Erro ao buscar livros:", erro);
        }
    };

    const adicionarLivro = async () => {
        if (!tituloInput || !autorInput) {
            alert("Por favor, preencha o nome e o autor do livro.");
            return;
        }

        const novoLivro = { titulo: tituloInput, autor: autorInput };

        try {
            // Substitui o axios por apiMock.postLivro()
            await apiMock.postLivro(novoLivro);
            alert("Livro adicionado com sucesso!");
            
            setTituloInput('');
            setAutorInput('');
            
            mostrarLivros(); 
        } catch (erro) {
            console.error("Erro ao adicionar livro:", erro);
        }
    };

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-white p-8">
            <h1 className="text-2xl font-bold mb-6">Home</h1>

            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input 
                    value={tituloInput}
                    onChange={(e) => setTituloInput(e.target.value)}
                    placeholder='Nome do livro' 
                    className="p-2 bg-[#2b2b2b] border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400"
                />
                <input 
                    value={autorInput}
                    onChange={(e) => setAutorInput(e.target.value)}
                    placeholder='Autor do livro' 
                    className="p-2 bg-[#2b2b2b] border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400"
                />
            </div>

            <div className="flex gap-4 mb-8">
                <button 
                    onClick={adicionarLivro}
                    className="flex justify-center px-4 py-2 bg-[#2b2b2b] hover:bg-[#2d2e2d] border-2 rounded-lg border-gray-500 transition-colors"
                >
                    Adicionar livro
                </button>

                <button 
                    onClick={mostrarLivros}
                    className="flex justify-center px-4 py-2 bg-[#2b2b2b] hover:bg-[#2d2e2d] border-2 rounded-lg border-gray-500 transition-colors"
                >
                    Mostrar livros
                </button>
            </div>
            
            <div className="space-y-3">
                {livros.length > 0 ? (
                    livros.map((livro, index) => (
                        <div key={index} className="p-4 bg-[#2b2b2b] rounded-lg border border-gray-600">
                            
                            <p className="font-semibold">{livro.titulo}</p>
                            <p className="text-sm text-gray-400">{livro.autor}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Nenhum livro carregado ainda.</p>
                )}
            </div>
        </div>
    );
}

export default Home;