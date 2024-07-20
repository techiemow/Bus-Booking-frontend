
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Components/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../Accounts/Signup';
import Login from '../Accounts/Login';





const Fullpage = () =>{

  const notify = () => toast("Wow so easy!");
  return (
    <div>
      <Navbar />
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    </div>
  )
}
function App() {

  

  return (
    <>
    <BrowserRouter>
<Routes>
<Route path='/register' element={<SignUp />}></Route>
<Route path='/login' element={<Login />}></Route>
<Route path='*' element={<Fullpage />}></Route>
</Routes>
</BrowserRouter>
   
    
    
      </>
   
  
  )
}




export default App
