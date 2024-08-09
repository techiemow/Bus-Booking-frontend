import React, { useState } from 'react';
import Navbar from './Components/Navbar';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../Accounts/Signup';
import Login from '../Accounts/Login';
import { ToastProvider } from '../Notification/ToastContext';
import Home from './Components/Home';

import './App.css'; // Add this line for global styles
import Buses from './Components/Buses';
import Layout from './Components/Layout';
import Footer from './Components/Footer';
import BookingForm from './Components/BookingForm';
import PrivateRoute from './Components/PrivateRoute';
import MyAccount from '../Accounts/MyAccount';
import MyBookings from '../Accounts/MyBookings';


const Fullpage = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Home />
      <Buses />
      <Footer />
    
    </div>
  );
};

function App() {
  const [selectedSeats, setselectedSeats] = useState([]);
  

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='*' element={<Fullpage />} />
          <Route path='/MyAccount' element={<MyAccount />} />
          <Route path='/MyBookings' element={<MyBookings />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/Layout/:id"
              element={<Layout selectedSeats={selectedSeats} setselectedSeats={setselectedSeats} />}
            />
            <Route
              path='/Layout/Booking/:id'
              element={<BookingForm selectedSeats={selectedSeats} setSelectedSeats={setselectedSeats} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
