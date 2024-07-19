
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../Accounts/Signup';
import Login from '../Accounts/Login';

function App() {
  const notify = () => toast("Wow so easy!");

  return (
    <BrowserRouter>
<Routes>
<Route path='/register' element={<SignUp />}></Route>
<Route path='/login' element={<Login />}></Route>
</Routes>
   
    <Navbar />
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
     
   
    </BrowserRouter>
  )
}

export default App
