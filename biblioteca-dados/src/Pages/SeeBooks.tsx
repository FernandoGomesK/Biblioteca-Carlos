
import { useState } from 'react';
import { apiMock } from '../services/Api';


export default function SeeBooks() {
    const [livros, setLivros] = useState<{ titulo: string; autor: string; genero: string; ano: number }[]>([]);
    const [tituloInput, setTituloInput] = useState('');
    const [autorInput, setAutorInput] = useState('');
    const [generoInput, setGeneroInput] = useState('');
    const [anoInput, setAnoInput] = useState('');

    const mostrarLivros = async () => {
        try {
            const resposta: { data: { titulo: string; autor: string; genero: string; ano: number }[] } = await apiMock.getLivros();
            setLivros(resposta.data);
        } catch (erro) {
            console.error("Erro ao buscar livros:", erro);
        }
    };

    const adicionarLivro = async () => {
        if (!tituloInput || !autorInput || !generoInput || !anoInput) {
            alert("Por favor, preencha todos os campos do livro.");
            return;
        } 

        const novoLivro = { titulo: tituloInput, autor: autorInput, genero: generoInput, ano: parseInt(anoInput) }; 

        try {
            await apiMock.postLivro(novoLivro);
            alert("Livro adicionado com sucesso!");

            setTituloInput('');
            setAutorInput('');
            setGeneroInput('');
            setAnoInput('');

        } catch (erro) {
            console.error("Erro ao adicionar livro:", erro);
        }
    };

    return (
        <div className="p-4">
            
            <p>This is the See Books page.</p>

            <div className="flex gap-4 mb-8">
                

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