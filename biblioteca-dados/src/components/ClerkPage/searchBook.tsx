interface SearchBookProps {
    onOpenModal: () => void;
}

export default function SearchBook({ onOpenModal }: SearchBookProps) {
    return (
        <div className="flex flex-row justify-around mb-4 border-gray-600 p-4 items-center">
            <input 
                placeholder="search by title or author" 
                className="border p-2 rounded text-black flex-1 max-w-md bg-white mr-4" 
            />
            <button 
                onClick={onOpenModal}
                className="bg-green-600 text-white p-2 rounded w-44 font-semibold hover:bg-green-700 transition shrink-0"
            >
                + Adicionar Livro
            </button>
        </div>
    );
}