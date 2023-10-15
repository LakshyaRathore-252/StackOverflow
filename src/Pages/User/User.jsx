import React from "react";
import { Link } from "react-router-dom";

// import "./user.css";
import '../../App.css'

const User = ({ user }) => {
  return (
    <Link to={`/Users/${user._id}`} className="user-profile-link">
      <h3>{user.name.charAt(0).toUpperCase()}</h3>
      <h5 className="chat-color">{user.name}</h5>
    </Link>
  );
};

export default User;