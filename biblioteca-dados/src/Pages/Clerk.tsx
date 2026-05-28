import { useState } from 'react';
import { apiMock } from '../services/Api';
import { Outlet } from 'react-router-dom';
import MenuItem from '../components/MenuItem';


function ClerkBase() {
    
    const [livros, setLivros] = useState<{ titulo: string; autor: string }[]>([]);
    const [tituloInput, setTituloInput] = useState('');
    const [autorInput, setAutorInput] = useState('');

    

    // const mostrarLivros = async () => {
    //     try {
            
    //         const resposta: { data: { titulo: string; autor: string }[] } = await apiMock.getLivros();
    //         setLivros(resposta.data); 
    //     } catch (erro) {
    //         console.error("Erro ao buscar livros:", erro);
    //     }
    // };

    // const adicionarLivro = async () => {
    //     if (!tituloInput || !autorInput) {
    //         alert("Por favor, preencha o nome e o autor do livro.");
    //         return;
    //     }

    //     const novoLivro = { titulo: tituloInput, autor: autorInput };

    //     try {
            
    //         await apiMock.postLivro(novoLivro);
    //         alert("Livro adicionado com sucesso!");
            
    //         setTituloInput('');
    //         setAutorInput('');
            
            
    //     } catch (erro) {
    //         console.error("Erro ao adicionar livro:", erro);
    //     }
    // };

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-white p-8 flex flex-col">

            {/*  Navbar */}
            <div className='flex justify-between items-center w-full mb-8 border-b border-gray-600 pb-4'>
                <div>
                    <h1 className='text-blue-800 font-bold'>Simple Book/PDF Manager</h1>
                </div>
                <div>
                    Foto de Perfil
                </div>
                
            </div>

            <div className=' flex flex-1 gap-8'>

            {/* Menu Lateral */}

            <div className='flex flex-col space-y-4 border-r border-gray-600 pr-6 w-25 shrink-0'>
                <MenuItem direction="/see-books" label="All Books" />
                <MenuItem direction="/my-books" label="My Books" />
                <MenuItem direction="/upload-pdf" label="Upload PDF" />
                <MenuItem direction="/settings" label="Settings" />
                <MenuItem direction="/logout" label="Logout" />
            </div>

            <main className='flex-1'><Outlet /></main>
            </div>

        </div>
    );
}

export default ClerkBase;