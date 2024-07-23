import React, { useState } from 'react';
import { AppBar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [openType, setOpenType] = useState("");
    const username = localStorage.getItem("login") || "";
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("login", "");
        window.location.reload();
    };

    return (
        <AppBar className='p-1'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
                <div className="container-fluid navbar-header">
                    <a className="navbar-brand" href="#">Busvoyage</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex" role="search" style={{marginLeft:"65rem" }}>
                            {!username ? (
                              <div>                         
                                         <Button
                                        className="Item m-2"
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
                                        className="Item m-2 mx-2"
                                        variant="outlined"
                                        size="medium"
                                        onClick={() => {
                                            setOpenType("Register");
                                            navigate("/register");
                                        }}
                                    >
                                        Register
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Button
                                        className='Item m-2'
                                        variant="outlined"
                                        size="medium"
                                    >
                                        MyBookings
                                    </Button>

                                    <Button
                                        className='Item m-2'
                                        variant="outlined"
                                        size="medium"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </AppBar>
    );
};

export default Navbar;
