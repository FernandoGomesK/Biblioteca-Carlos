import { useBooks } from '../../hooks/useBooks';
import MenuItem from '../MenuItem';
import SearchBook from './searchBook';
import { useState } from 'react';
import AddBookModal from './addBookModal';

function MemberClerk() {


    
    return (
        <div className='flex flex-1 h-full'>
            {/* Menu Lateral */}
            <div className='flex flex-col space-y-4 border-r border-gray-600 pr-8 w-25 shrink-0 pl-4 mr-10'>
                <MenuItem direction="/seebooks" label="Todos os Livros" />
                <MenuItem direction='/members' label='membros' />
                <MenuItem direction="/app/settings" label="Configurações" />
                <MenuItem direction="/login" label="Logout" /> 
            </div>

            {/* Conteúdo Central do Painel */}
            <div className='flex flex-1 flex-col p-6'>
               AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </div>
        
        </div>
    );
}

export default MemberClerk;