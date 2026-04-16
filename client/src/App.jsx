import React from 'react';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import NandF from './Layouts/NandF'
import Dashboard from './Pages/Dashboard';
import Product from './Components/Product';
import StockIn from './Components/StockIn';
import StockOut from "./Components/StockOut";
import Reports from "./Components/Reports";
import Settings from "./Components/Settings";
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Toaster } from 'react-hot-toast';



const App = () => {
  return (
    <div>
      <Toaster
         position="top-left"
        toastOptions={{
          style: {
            background: "#1f2937", // Tailwind slate-800
            color: "#f9fafb",      // Tailwind gray-50
          },
          duration: 4000,
        }}
      />
      
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<NandF />}>
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<Product />} />
            <Route path="/stockin" element={<StockIn />} />
            <Route path="/stockout" element={<StockOut />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/setting" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
