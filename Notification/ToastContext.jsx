import React, { createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showToast = (msg) => {
    toast.success(msg);
    console.log(msg);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export default ToastContext;
