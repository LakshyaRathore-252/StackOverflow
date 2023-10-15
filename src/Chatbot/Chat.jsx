import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png'
import Chatbot from '../Components/Chatbot/Chatbot';

import '../App.css'

const Chat = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [response, setResponse] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`https://stackoverflow-e06h.onrender.com/user/Otp`, { email })
            .then((res) => {
                console.log("response from client side");
                setResponse(res.data.message);
                if (res.data.message === "OTP Sent Successfully") {
                    navigate('/otp-verify');
                }
                else {
                    alert("User is not registered");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className=' h-[100vh] flex justify-center items-center'>
            <div className='flex justify-center items-center'>
                <form className='space-x-5 space-y-4 shadow p-8 mx-auto chat' onSubmit={handleSubmit}>
                    <img className='ml-32' src={logo} />
                    <label className='chat-color' >
                        Enter Your Mail :
                    </label>
                    <input
                        rows={10}
                        cols={30}
                        className='outline-slate-950 border-2 border-black'
                        onChange={(e) => setEmail(e.target.value)}

                    />

                    <p>{response?.data?.message}</p>

                    <div className='text-center mt-3'>
                        <button className='bg-[#009DFF] rounded p-2 text-white font-semibold text-lg w-24' type='submit'>Done</button>
                    </div>

                </form>




            </div>

        </div>
    )
}

export default Chat