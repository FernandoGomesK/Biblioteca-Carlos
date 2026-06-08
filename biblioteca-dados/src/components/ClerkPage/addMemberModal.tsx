import type { FormEvent } from "react";


interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    usernameInput: string;
    setUsernameInput: (value: string) => void;
    roleInput: string;
    setRoleInput: (value: string) => void;
    adicionarMembro: (e: FormEvent) => Promise<void>;
}


export default function AddMemberModal({
    isOpen,
    onClose,
    usernameInput,
    setUsernameInput,
    roleInput,
    setRoleInput,
    adicionarMembro
}: AddMemberModalProps) {

    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-2xl border border-gray-600 w-96 relative">
                
                
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-4 text-gray-400 hover:text-white font-bold"
                >
                    ✕
                </button>

                <h3 className="text-xl font-bold mb-4 text-white">Cadastrar Novo Membro</h3>

                
                <form onSubmit={adicionarMembro} className="flex flex-col space-y-4">
                    
                    {/* Campo Username */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">Username (Identificador)</label>
                        <input 
                            type="text"
                            placeholder="Ex: joao_silva"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            className="bg-[#1e1e1e] border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">Tipo de Conta</label>
                        <select
                            value={roleInput}
                            onChange={(e) => setRoleInput(e.target.value)}
                            className="bg-[#1e1e1e] border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="usuario">Leitor / Usuário Comum</option>
                            <option value="bibliotecario">Bibliotecário / Admin</option>
                        </select>
                    </div>

                    <p className="text-xs text-gray-500 italic">
                        * Por padrão, novos membros são registrados com a senha inicial "123456".
                    </p>

                    
                    <div className="flex justify-end space-x-3 pt-2">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Cadastrar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}