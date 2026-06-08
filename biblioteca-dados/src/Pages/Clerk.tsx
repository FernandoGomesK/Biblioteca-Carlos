import { Outlet } from 'react-router-dom';
import MenuItem from '../components/MenuItem';

function ClerkBase() {
    return (
        <div className="min-h-screen bg-[#1e1e1e] text-white p-8 flex flex-col">

            {/* Navbar */}
            <div className='flex justify-between items-center w-full mb-8 border-b border-gray-600 pb-4'>
                <div>
                    <h1 className='text-blue-800 font-bold'>Simple Book/PDF Manager</h1>
                </div>
                <div>
                    Foto de Perfil
                </div>
            </div>

            <div className='flex flex-1 gap-8'>
                {/* Menu Lateral - CORRIGIDO: Adicionado o prefixo "/app/" */}
                <div className='flex flex-col space-y-4 border-r border-gray-600 pr-6 w-25 shrink-0'>
                    <MenuItem direction="/app/see-books" label="All Books" />
                    <MenuItem direction="/app/my-books" label="My Books" />
                    <MenuItem direction="/app/upload-pdf" label="Upload PDF" />
                    <MenuItem direction="/app/settings" label="Settings" />
                    <MenuItem direction="/login" label="Logout" /> {/* Manda de volta ao login público */}
                </div>

                {/* Área de conteúdo dinâmico onde as páginas filhas aparecem */}
                <main className='flex-1'>
                    <Outlet />
                </main>
            </div>

        </div>
    );
}

export default ClerkBase;