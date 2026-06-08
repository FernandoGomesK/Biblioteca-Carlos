import { useBooks } from '../../hooks/useBooks';
import MenuItem from '../MenuItem';
import SearchBook from './searchBook';
import { useState } from 'react';
import AddBookModal from './addBookModal';

function MemberClerk() {
    // Injeta a lógica inteira de controlo de livros numa linha
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {
        livros,
        idInput,
        setIdInput,
        tituloInput,
        setTituloInput,
        autorInput,
        setAutorInput,
        anoInput,
        setAnoInput,
        categoriaInput,
        setCategoriaInput,
        recarregarListaManual,
        adicionarLivro
    } = useBooks();

    const handleAddBookSubmit = async (e: React.FormEvent) => {
        await adicionarLivro(e);
        
    };

    
    return (
        <div className='flex flex-1 h-full'>
            {/* Menu Lateral */}
            <div className='flex flex-col space-y-4 border-r border-gray-600 pr-8 w-25 shrink-0 pl-4 mr-10'>
                <MenuItem direction="/app/see-books" label="Todos os Livros" />
                <MenuItem direction='/members' label='membros' />
                <MenuItem direction="/app/settings" label="Configurações" />
                <MenuItem direction="/login" label="Logout" /> 
            </div>

            {/* Conteúdo Central do Painel */}
            <div className='flex flex-1 flex-col p-6'>
                <h2>Todos os Livros</h2>
                <p className="text-gray-400 mb-4">Página de gerenciamento do acervo da biblioteca.</p>

                
                <SearchBook onOpenModal={() => setIsModalOpen(true)} />

                <br /><hr className="border-gray-600" /><br />

            {/* Secção de Listagem */}
            <section>
                <button onClick={recarregarListaManual}>
                    Atualizar / Mostrar Lista de Livros
                </button>

                <div>
                        {livros.length > 0 ? (
                            <ul className="space-y-3">
                                {livros.map((livro) => (
                                    <li key={livro.id} className="p-3 border border-gray-700 bg-[#252525] rounded-lg flex justify-between items-center">
                                        <div>
                                            {/* CORRIGIDO E ATUALIZADO: Mostra todas as novas informações na linha do livro */}
                                            <span className="text-blue-400 font-bold mr-2">ID: {livro.id}</span>
                                            <strong className="text-white text-lg">{livro.titulo}</strong>
                                            <p className="text-sm text-gray-400">
                                                Autor: <span className="text-gray-300">{livro.autor}</span> | 
                                                Ano: <span className="text-gray-300"> {livro.ano}</span> | 
                                                Gênero: <span className="text-gray-300"> {livro.categoria}</span>
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${livro.disponivel ? "bg-green-900/50 text-green-400 border border-green-700" : "bg-red-900/50 text-red-400 border border-red-700"}`}>
                                                {livro.disponivel ? "Disponível" : "Emprestado"}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Nenhum livro carregado ainda.</p>
                        )}
                    </div>
            </section>
        </div>
        <AddBookModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} 
                idInput={idInput}
                setIdInput={setIdInput}
                tituloInput={tituloInput}
                setTituloInput={setTituloInput}
                autorInput={autorInput}
                setAutorInput={setAutorInput}
                anoInput={anoInput}
                setAnoInput={setAnoInput}
                categoriaInput={categoriaInput}
                setCategoriaInput={setCategoriaInput}
                adicionarLivro={handleAddBookSubmit} 
            />
        </div>
    );
}

export default MemberClerk;