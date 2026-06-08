import { useBooks } from '../../hooks/useBooks';
import MenuItem from '../MenuItem';
import SearchBook from './searchbook';
import { useState } from 'react';
import AddBookModal from './addBookModal';

function MainClerk() {
    // Injeta a lógica inteira de controlo de livros numa linha
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const {
        livros,
        idInput,
        setIdInput,
        tituloInput,
        setTituloInput,
        recarregarListaManual,
        adicionarLivro
    } = useBooks();

    const handleAddBookSubmit = async (e: React.FormEvent) => {
        await adicionarLivro(e);
        
    };

    
    return (
        <div className='flex flex-1 h-full'>
            {/* Menu Lateral */}
            <div className='flex flex-col space-y-4 border-r border-gray-600 pr-6 w-25 shrink-0'>
                <MenuItem direction="/app/see-books" label="All Books" />
                <MenuItem direction="/app/settings" label="Settings" />
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
        <AddBookModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} 
                idInput={idInput}
                setIdInput={setIdInput}
                tituloInput={tituloInput}
                setTituloInput={setTituloInput}
                adicionarLivro={handleAddBookSubmit} 
            />
        </div>
    );
}

export default MainClerk;