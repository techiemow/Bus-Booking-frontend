import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BusProvider } from './Context/BusContext.jsx'
import Footer from './Components/Footer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <BusProvider>
    <App />
    </BusProvider>
  
)
