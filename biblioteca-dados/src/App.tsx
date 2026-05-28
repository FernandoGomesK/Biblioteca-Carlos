
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'
import SeeBooks from './Pages/SeeBooks'


import './App.css'
import ClerkBase from './Pages/Clerk';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />

        
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