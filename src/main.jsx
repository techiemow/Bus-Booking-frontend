import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BusProvider } from './Context/BusContext.jsx'
import Footer from './Components/Footer.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.createRoot(document.getElementById('root')).render(
 <BusProvider>
    <ToastContainer />
    <App />
</BusProvider>
  
)
