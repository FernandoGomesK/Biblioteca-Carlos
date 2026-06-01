
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'
import SeeBooks from './Pages/SeeBooks'
import HomePage from './Pages/InitialPage'
import LoginPage from './Pages/Login';


import './App.css'
import ClerkBase from './Pages/Clerk';
import PageLayout from './components/PageLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
       <Route element={<PageLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>

        
        <Route path="/app" element={<ClerkBase />}>
        
          
          <Route index element={<SeeBooks />} /> 
          <Route path="see-books" element={<SeeBooks />} />
          
          {/* 
          <Route path="my-books" element={<MyBooks />} />
          <Route path="upload-pdf" element={<UploadPdf />} /> 
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;