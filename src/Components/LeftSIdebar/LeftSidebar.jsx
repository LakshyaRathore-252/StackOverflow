import React from 'react'
import { NavLink } from 'react-router-dom'
import './LeftSidebar.css'
import '../../App.css'
import Globe from '../../assets/Globe.svg'
const LeftSidebar = ({ slideIn, handleSlideIn }) => {

  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };
  return (
    <div className='left-sidebar h-[100vh]' style={slideIn ? slideInStyle : slideOutStyle}>
      <nav className='side-nav'>
        <button onClick={() => handleSlideIn()} className="nav-btn">
          <NavLink to="/" className="side-nav-links text-xl" style={{ paddingLeft: "40px" }} activeclassName="active">
            <p>Home</p>
          </NavLink>
        </button>

        <div className='side-nav-div space-y-4' >

          <div>
            <p className='public'>
              PUBLIC
            </p>
          </div>

          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeclassname="active"
            >
              <img className='globe' src={Globe} alt="Globe" />
              <p style={{ paddingLeft: "10px" }}> Questions </p>
            </NavLink>
          </button>

          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Tags</p>
            </NavLink>
          </button>

          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Users</p>

            </NavLink>
          </button>
          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/authentication"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Chatbot</p>

            </NavLink>
          </button>
          <button onClick={() => handleSlideIn()} className="nav-btn">
            <NavLink
              to="/video-player"
              className="side-nav-links"
              activeclassname="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>VideoPlayer</p>

            </NavLink>
          </button>
        </div>
      </nav >

    </div >
  )
}

export default LeftSidebar