// ================================================ Import Dependenices =========================================
import React from "react";
import { Routes, Route } from "react-router-dom";


// ================================================= Import Components ===================================================
import src from '../src/s.mp4'
import Home from "./Pages/Home/Home.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import Questions from "./Pages/Questions/Questions.jsx";
import AskQuestion from "./Pages/AskQuestion/AksQuestion.jsx";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion.jsx";
import Tags from "./Pages/Tags/Tags.jsx";
import Users from "./Pages/User/Users.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";
import ForgotPassword from "./Components/Forgot-password/ForgotPassword.jsx";
import Chatbot from "./Components/Chatbot/Chatbot.jsx";
import RestPassword from './Components/Forgot-password/RestPassword.jsx'
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer.jsx";
import Chat from "./Chatbot/Chat.jsx";
import Verify from "./Chatbot/Verify.jsx";

const AllRoutes = ({ slideIn, handleSlideIn }) => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/Auth"
                element={<Auth slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/Questions"
                element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/AskQuestion"
                element={<AskQuestion slideIn={slideIn} handleSlideIn={handleSlideIn}  />}
            />
            <Route
                path="/Questions/:id"
                element={<DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/Tags"
                element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/Users"
                element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/Users/:id"
                element={<UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/forgot-password"
                element={<ForgotPassword slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/rest-password/:token"
                element={<RestPassword slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/authentication"
                element={<Chat slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/video-player"
                element={<VideoPlayer src={src} slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/otp-verify"
                element={<Verify slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />
            <Route
                path="/chat"
                element={<Chatbot slideIn={slideIn} handleSlideIn={handleSlideIn} />}
            />

        </Routes>
    );
};

export default AllRoutes;
