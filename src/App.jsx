import React from 'react';
import Navbar from './Components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../Accounts/Signup';
import Login from '../Accounts/Login';
import { ToastProvider } from '../Notification/ToastContext';
import Home from './Components/Home';
import { ToastContainer } from 'react-toastify';
import './App.css'; // Add this line for global styles
import Buses from './Components/Buses';
import { BusProvider } from './Context/BusContext';



const Fullpage = () => {
  return (
    <BusProvider>
      <div className="app-container">
        <Navbar />
        <Home />
        <Buses />
        <ToastContainer />
      </div>
    </BusProvider>
  );
};

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='*' element={<Fullpage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
