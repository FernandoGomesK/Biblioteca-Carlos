import { useState, useEffect } from 'react';
import MenuItem from '../MenuItem';
import AddMemberModal from './addMemberModal';
import { useMembers } from '../../hooks/useMembers'; // Importa o novo hook

interface Membro {
    username: string;
    role: string;
}

function MemberClerk() {
    const [membros, setMembros] = useState<Membro[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const carregarMembros = async () => {
        try {
            const token = localStorage.getItem('token');
            const resposta = await fetch('http://127.0.0.1:8000/usuarios/leitores', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (resposta.ok) {
                const dados = await resposta.json();
                setMembros(dados);
            }
        } catch (erro) {
            console.error("Erro ao carregar membros:", erro);
        } finally {
            setLoading(false);
        }
    };

    // Injeta a lógica do hook passando o que ele deve fazer ao gravar com sucesso
    const {
        usernameInput,
        setUsernameInput,
        roleInput,
        setRoleInput,
        adicionarMembro
    } = useMembers(carregarMembros, () => setIsAddMemberModalOpen(false));

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        carregarMembros();
    }, []);

    return (
        <div className='flex flex-1 h-full'>
            {/* Menu Lateral */}
            <div className='flex flex-col space-y-4 border-r border-gray-600 pr-8 w-25 shrink-0 pl-4 mr-10'>
                <MenuItem direction="/seebooks" label="Todos os Livros" />
                <MenuItem direction='/members' label='Membros' />
                <MenuItem direction="/app/settings" label="Configurações" />
                <MenuItem direction="/login" label="Logout" /> 
            </div>

            {/* Conteúdo Central */}
            <div className='flex flex-1 flex-col p-6'>
                <div className="flex flex-row justify-between items-center w-full mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Gerenciamento de Membros</h2>
                        <p className="text-gray-400 text-sm">Lista de leitores ativos cadastrados no sistema.</p>
                    </div>
                    <div>
                        <button 
                            onClick={() => setIsAddMemberModalOpen(true)}
                            className="px-4 py-2 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            + Adicionar Membro
                        </button>
                    </div>
                </div>

                {/* Tabela de Dados */}
                <div className="bg-[#252525] border border-gray-700 rounded-lg p-4">
                    {loading ? (
                        <p className="text-gray-400">A carregar membros...</p>
                    ) : membros.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-600 text-gray-400 text-sm">
                                    <th className="pb-2">Username / Identificador</th>
                                    <th className="pb-2 text-right">Nível de Acesso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {membros.map((membro) => (
                                    <tr key={membro.username} className="border-b border-gray-700/50 text-white hover:bg-gray-800/30 transition-colors">
                                        <td className="py-3 font-medium">{membro.username}</td>
                                        <td className="py-3 text-right">
                                            <span className="bg-blue-900/40 text-blue-400 border border-blue-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                                                {membro.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">Nenhum membro leitor encontrado no sistema.</p>
                    )}
                </div>
            </div>

            {/* 🚨 CONECTADO: Agora o Modal recebe as propriedades dinâmicas e o estado do Hook! */}
            <AddMemberModal 
                isOpen={isAddMemberModalOpen} 
                onClose={() => setIsAddMemberModalOpen(false)} 
                usernameInput={usernameInput} 
                setUsernameInput={setUsernameInput} 
                roleInput={roleInput} 
                setRoleInput={setRoleInput} 
                adicionarMembro={adicionarMembro} 
            />
        </div>
    );
}

export default MemberClerk;