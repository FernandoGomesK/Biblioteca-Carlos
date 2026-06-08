import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './Pages/InitialPage';
import LoginPage from './Pages/Login';
import SeeBooks from './Pages/SeeBooks';

import PageLayout from './components/PageLayout';

// Importando as novas páginas criadas

import UserDashboard from './Pages/userDashboard';
// Caso queira usar a Home simplificada em alguma rota, importe-a também:
// import Home from './Pages/Home';

import './App.css';
import ClerkBase from './Pages/Clerk';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Rotas Públicas com o layout da Landing Page (Header/Footer) */}
        <Route element={<PageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/seebooks" element={<SeeBooks />} /> 
        </Route>

        {/* Rota exclusiva e avulsa para a Área do Usuário Comum/Leitor */}
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Rotas do Sistema Administrativo (Compartilham a Navbar e o Menu Lateral) */}
        <Route path="/app" element={<ClerkBase />}>
          {/* Rota padrão ao acessar "/app" */}
          
          
          {/* Sub-rotas do painel */}
          <Route path="see-books" element={<SeeBooks />} />
          
          {/* Nova rota adicionada para o gerenciamento de empréstimos e devoluções */}
          {/* <Route path="gerenciar" element={<GerenciarEmprestimos />} /> */}
          
          {/* <Route path="my-books" element={<MyBooks />} />
          <Route path="upload-pdf" element={<UploadPdf />} /> 
          */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;