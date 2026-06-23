import { useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import MenuItem from '../MenuItem';
import SearchBook from './searchBook';
import AddBookModal from './addBookModal';
import LendBookModal from './lendBookModal';

function MainClerk() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoanModalOpen, setIsLoanModalOpen] = useState<boolean>(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    
    
    const [ordem, setOrdem] = useState<string>('asc'); 
    
    
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
    } = useBooks(ordem); 

    const handleAddBookSubmit = async (e: React.FormEvent) => {
        await adicionarLivro(e);
    };

    const handleOpenLoanModal = (bookId: number) => {
        setSelectedBookId(bookId); 
        setIsLoanModalOpen(true);  
    };

    return (
        <div className='flex flex-1 h-full'>
            {/* Menu Lateral */}
            <div className='flex flex-col space-y-4 border-r border-gray-600 pr-8 w-25 shrink-0 pl-4 mr-10'>
                <MenuItem direction="/seebooks" label="Todos os Livros" />
                <MenuItem direction='/members' label='Membros' />
                <MenuItem direction="/app/settings" label="Configurações" />
                <MenuItem direction="/login" label="Logout" /> 
            </div>

            
            <div className='flex flex-1 flex-col p-6'>
                <h2>Todos os Livros</h2>
                <p className="text-gray-400 mb-4">Página de gerenciamento do acervo da biblioteca.</p>

                <SearchBook onOpenModal={() => setIsModalOpen(true)} />

                <br /><hr className="border-gray-600" /><br />

                
                <section>
                    <div className="flex items-center gap-4 mb-4">
                        <button 
                            onClick={() => recarregarListaManual()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        >
                            Atualizar Lista
                        </button>

                        
                        <div className="flex items-center">
                            <label className="mr-2 text-gray-300 font-medium">Ordenar por Título:</label>
                            <select 
                                value={ordem} 
                                onChange={(e) => setOrdem(e.target.value)}
                                className="p-2 bg-[#252525] text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                            >
                                <option value="asc">A - Z</option>
                                <option value="desc">Z - A</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        {livros.length > 0 ? (
                            <ul className="space-y-3">
                                {livros.map((livro) => (
                                    <li key={livro.id} className="p-3 border border-gray-700 bg-[#252525] rounded-lg flex justify-between items-center">
                                        <div>
                                            <span className="text-blue-400 font-bold mr-2">ID: {livro.id}</span>
                                            <strong className="text-white text-lg">{livro.titulo}</strong>
                                            <p className="text-sm text-gray-400">
                                                Autor: <span className="text-gray-300">{livro.autor}</span> | 
                                                Ano: <span className="text-gray-300"> {livro.ano}</span> | 
                                                Gênero: <span className="text-gray-300"> {livro.categoria}</span>
                                            </p>
                                        </div>
                                        
                                        <div className='flex flex-row gap-2'>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center ${livro.disponivel ? "bg-green-900/50 text-green-400 border border-green-700" : "bg-red-900/50 text-red-400 border border-red-700"}`}>
                                                {livro.disponivel ? "Disponível" : "Emprestado"}
                                            </span>
                                            <button 
                                                disabled={!livro.disponivel}
                                                onClick={() => handleOpenLoanModal(livro.id)}
                                                className={`px-3 py-1 rounded text-sm font-medium transition ${
                                                    livro.disponivel 
                                                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                                                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                                                }`}
                                            >
                                                Registrar Empréstimo
                                            </button>
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
            
            {/* Modais */}
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

            <LendBookModal 
                isOpen={isLoanModalOpen} 
                onClose={() => setIsLoanModalOpen(false)} 
                bookId={selectedBookId}
                onSuccess={() => recarregarListaManual()}
            />
        </div>
    );
}

export default MainClerk;