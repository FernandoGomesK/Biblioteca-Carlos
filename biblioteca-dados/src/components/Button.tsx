import { Link } from 'react-router-dom';

interface MoveButtonProps {
    text: string;
    to: string;
    isSecondary?: boolean;
    onClick: () => void;
}

function MoveButton({ text, to, isSecondary }: MoveButtonProps) {
    return (
        
        <Link 
            to={to} 
            className={isSecondary 
                ? "" 
                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block text-center"
            }
        >
            {text}
        </Link>
    );
}

export default MoveButton;