// import { useState } from 'react';
// import { apiMock } from '../services/Api'; // Substitua pelas chamadas reais do axios para a sua API FastAPI quando integrar

// export default function GerenciarEmprestimos() {
//     // Estados para Registrar Empréstimo
//     const [usernameLeitor, setUsernameLeitor] = useState('');
//     const [idLivroEmprestimo, setIdLivroEmprestimo] = useState('');

//     // Estado para Registrar Devolução
//     const [idEmprestimoDevolucao, setIdEmprestimoDevolucao] = useState('');

//     const handleRegistrarEmprestimo = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!usernameLeitor || !idLivroEmprestimo) {
//             alert("Preencha todos os campos para o empréstimo.");
//             return;
//         }

//         try {
//             // Chamada correspondente ao @app.post("/emprestimos/registrar")
//             // await api.post('/emprestimos/registrar', { username_leitor: usernameLeitor, id_livro: parseInt(idLivroEmprestimo) });
//             alert(`Empréstimo do livro ${idLivroEmprestimo} registrado para ${usernameLeitor}!`);
//             setUsernameLeitor('');
//             setIdLivroEmprestimo('');
//         } catch (erro) {
//             console.error("Erro ao registrar empréstimo:", erro);
//         }
//     };

//     const handleRegistrarDevolucao = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!idEmprestimoDevolucao) {
//             alert("Informe o ID do empréstimo.");
//             return;
//         }

//         try {
//             // Chamada correspondente ao @app.put("/emprestimos/devolver/{emprestimo_id}")
//             // await api.put(`/emprestimos/devolver/${idEmprestimoDevolucao}`);
//             alert(`Devolução do empréstimo ID ${idEmprestimoDevolucao} registrada com sucesso!`);
//             setIdEmprestimoDevolucao('');
//         } catch (erro) {
//             console.error("Erro ao registrar devolução:", erro);
//         }
//     };

//     return (
//         <div>
//             <h2>Gerenciamento de Empréstimos e Devoluções</h2>

//             {/* SEÇÃO 1: REGISTRAR EMPRÉSTIMO */}
//             <section>
//                 <h3>Registrar Novo Empréstimo</h3>
//                 <form onSubmit={handleRegistrarEmprestimo}>
//                     <input 
//                         type="text" 
//                         placeholder="Username do Leitor" 
//                         value={usernameLeitor}
//                         onChange={(e) => setUsernameLeitor(e.target.value)}
//                     />
//                     <input 
//                         type="number" 
//                         placeholder="ID do Livro" 
//                         value={idLivroEmprestimo}
//                         onChange={(e) => setIdLivroEmprestimo(e.target.value)}
//                     />
//                     <button type="submit">Confirmar Empréstimo</button>
//                 </form>
//             </section>

//             <br /><hr /><br />

//             {/* SEÇÃO 2: REGISTRAR DEVOLUÇÃO */}
//             <section>
//                 <h3>Registrar Devolução</h3>
//                 <form onSubmit={handleRegistrarDevolucao}>
//                     <input 
//                         type="number" 
//                         placeholder="ID do Empréstimo" 
//                         value={idEmprestimoDevolucao}
//                         onChange={(e) => setIdEmprestimoDevolucao(e.target.value)}
//                     />
//                     <button type="submit">Confirmar Devolução</button>
//                 </form>
//             </section>
//         </div>
//     );
// }