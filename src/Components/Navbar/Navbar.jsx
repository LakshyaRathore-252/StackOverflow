// ================================================ Import Dependenices =========================================
import { Link, Navigate, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { BsSearch } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../actions/currentUser';
import decode from 'jwt-decode'

// ================================================= Import Assests ===============================================
import logo from "../../assets/logo.png";
import Avatar from '../Avatar/Avatar'
import bars from "../../assets/bars-solid.svg";

// ================================================= Import CSS ===================================================
import "../../App.css"
import "./Navbar.css";
const Navbar = ({ handleSlideIn }) => {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    // const [theme, setTheme] = useState();
    var User = useSelector((state) => (state.currentUserReducer))

    useEffect(() => {
        const token = User?.token;

        if (token) {
            const decodeToken = decode(token)
            if (decodeToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));

    }, [dispatch])




    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        Navigate('/');
        dispatch(setCurrentUser(null));
    }

    return (
        <div >
            <nav className="main-nav" >
                <div className="navbar">
                    <button className="slide-in-icon" onClick={() => handleSlideIn()}>
                        <img className='logo' src={bars} alt="bars" width="15" />
                    </button>
                    <div className="navbar-1 ">
                        <Link to="/" className="nav-item nav-btn nav-logo ">
                            <img className='logo' src={logo} alt="logo" />
                        </Link>
                        <Link to="/authentication" className="nav-item nav-btn res-nav">
                            ChatBot
                        </Link>
                        <Link to="/video-player" className="nav-item nav-btn res-nav">
                            VideoPlayer
                        </Link>
                        <Link to="/" className="nav-item nav-btn res-nav">
                            For Teams
                        </Link>
                        <form>
                            <input type="text" placeholder="Search..." />
                            < BsSearch className="search-icon" />
                        </form>
                    </div>
                    <div className="navbar-2 ">
                        {User === null ? (
                            <Link to="/Auth" className="nav-item nav-links">
                                Log in
                            </Link>
                        ) : (
                            <>
                                <Avatar
                                    backgroundColor="#009dff"
                                    px="10px"
                                    py="7px"
                                    borderRadius="50%"
                                    color="white"
                                >
                                    <Link
                                        to={`/Users/${User?.result?._id}`}
                                        style={{ color: "white", textDecoration: "none" }}
                                    >
                                        {User.result.name.charAt(0).toUpperCase()}
                                    </Link>
                                </Avatar>
                                <button className="nav-item log-btn nav-links" onClick={handleLogout} >
                                    Log out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav >
        </div>
    );
};

export default Navbar;
