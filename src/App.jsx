import React, { useState } from 'react';
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
import Layout from './Components/Layout';
import Footer from './Components/Footer';
import BookingForm from './Components/BookingForm';



const Fullpage = () => {
  return (
 
      <div className="app-container">
        <Navbar />
        <Home />
        <Buses />
        <Footer />
        <ToastContainer />
      </div>
  
  );
};

function App() {
  
  const [selectedSeats , setselectedSeats] = useState([]); 

  return (
    <ToastProvider>
    
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path= "/Layout/:id" element= {<Layout  selectedSeats={selectedSeats} setselectedSeats={setselectedSeats}/>} />
          <Route path='/Layout/Booking/:Id' element= {<BookingForm selectedSeats={selectedSeats}/>} />
          <Route path='/register' element={<SignUp />} />
          <Route path='*' element={<Fullpage />} />
        </Routes>
      </BrowserRouter>
      
    </ToastProvider>
  );
}

export default App;
