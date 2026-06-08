
import MoveButton from '../Button';

function InitialPage() {

    return (
        <>
        <div className="flex flex-col items-center justify-center h-screen gap-1.5">
            <h1>Bem-vindo à Biblioteca de teste de estrutura de dados!</h1>

            <MoveButton text="see books" to="/app/see-books" onClick={() => {}} isSecondary={true} />
        </div>
        
        </>
    );

}

export default InitialPage;