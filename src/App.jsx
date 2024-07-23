

import Navbar from './Components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../Accounts/Signup';
import Login from '../Accounts/Login';
import { ToastProvider } from '../Notification/ToastContext';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import { ToastContainer } from 'react-toastify';







const Fullpage = () =>{


  return (
    <div>
   
      <Navbar />
      <Home/>
      <ToastContainer />
 
    </div>
  )
}
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
  )
}




export default App
