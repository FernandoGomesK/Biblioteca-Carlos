import type { FormEvent } from 'react';

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    idInput: string;
    setIdInput: (value: string) => void;
    tituloInput: string;
    setTituloInput: (value: string) => void;
    adicionarLivro: (e: FormEvent) => Promise<void>;
}

export default function AddBookModal({
    isOpen,
    onClose,
    idInput,
    setIdInput,
    tituloInput,
    setTituloInput,
    adicionarLivro
}: AddBookModalProps) {
    
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

                <h3 className="text-xl font-bold mb-4 text-white">Cadastrar Novo Livro</h3>
                
                <form onSubmit={adicionarLivro} className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">ID do Livro</label>
                        <input 
                            type="number" 
                            placeholder="Ex: 4"
                            value={idInput}
                            onChange={(e) => setIdInput(e.target.value)}
                            className="bg-[#1e1e1e] border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-sm text-gray-400">Título</label>
                        <input 
                            type="text" 
                            placeholder="Nome do livro"
                            value={tituloInput}
                            onChange={(e) => setTituloInput(e.target.value)}
                            className="bg-[#1e1e1e] border border-gray-600 rounded p-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

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
                            Gravar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}