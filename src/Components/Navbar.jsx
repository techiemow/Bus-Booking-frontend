import React, { useState } from 'react'
import {
    AppBar,
    Button,

  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const [openType, setOpenType] = useState("");

    const username = localStorage.getItem("login") || "";

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("login", "");
        window.location.reload();
      };

  return (
    <AppBar >
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Busvoyage</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
   
      <form class="d-flex" role="search">
      { ! username ? (
               <>
                    <Button
                  className="Item m-2 mx-5"
                  variant="outlined"
                  size="medium"
                  onClick={() => {
                    setOpenType("Login");
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
     
                <Button
                  className="Item m-2 mx-5"
                  variant="outlined"
                  size="medium"
                  onClick={() => {
                    setOpenType("Register");
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </>

            ) : (
              <>
              <Button  className='Item m-2 mx-5' variant="contained" color="primary"
              >
              MyBookings
              </Button>

                    <Button  className='Item m-2 mx-5' variant="contained" color="primary"
                    onClick={()=>{
                      handleLogout();
                    }}>
                    Logout
                    </Button>

                    </>

            )}

      </form>
    </div>
  </div>
</nav>
</AppBar>
  )
}

export default Navbar