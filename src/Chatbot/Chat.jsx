import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icon.png'
import Chatbot from '../Components/Chatbot/Chatbot';
import LeftSideBar from '../Components/LeftSIdebar/LeftSidebar'

import '../App.css'
import toast from 'react-hot-toast';

const Chat = ({ slideIn, handleSlideIn }) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`https://stackoverflow-ynmc.onrender.com/user/Otp`, { email })
            .then((res) => {
                console.log("response from client side");
                if (res.data.message === "OTP Sent Successfully") {
                    toast.success(`OTP SEND on ${email}`)
                    navigate('/otp-verify');
                }
                else {
                    alert("User is not registered");
                    toast.error("Error while sending OTP")
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Invalid Email");
            });
    }

    return (
        <div className='flex  '>

            <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
            <div className='flex justify-center items-center w-full h-[100vh]'>
                <div className=' flex justify-center w-full'>
                    <form className='space-x-5  space-y-4 shadow p-8 mx-auto chat' onSubmit={handleSubmit}>
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


                        <div className='text-center mt-3'>
                            <button className='bg-[#009DFF] rounded p-2 text-white font-semibold text-lg w-24' type='submit'>Done</button>
                        </div>

                    </form>




                </div>
            </div>
        </div>
    )
}

export default Chat