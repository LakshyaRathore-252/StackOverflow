import React, { useState } from 'react'
import Chatbot from '../Components/Chatbot/Chatbot';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/icon.png'
import '../App.css'
import LeftSidebar from '../Components/LeftSIdebar/LeftSidebar';
import toast from 'react-hot-toast';


const Verify = ({ slideIn, handleSlideIn }) => {
    const navigate = useNavigate();
    const [valid, setValid] = useState(false);

    const [email, setEmail] = useState();
    const [otp, setOtp] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`https://stackoverflow-ynmc.onrender.com/user/otp-verify`, { email, otp })
            .then((res) => {
                console.log("response from client side")
                if (res.data.message === "OTP Verified") {
                    toast.success("OTP Verified");
                    navigate('/chat')

                }

            })
            .catch((err) => {
                console.log(err)
                toast.error("Invalid Otp")
            });
    }
    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className=' flex justify-center items-center '>

                <form onSubmit={handleSubmit} className='flex flex-col shadow space-y-6 py-6 px-16 chat'>
                    <img src={logo} className='ml-12' width={40} alt='logo' />
                    <label className='chat-color'>
                        Enter Your Mail :
                    </label>
                    <input
                        rows={10}
                        cols={30}
                        className='input-outline'
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <label className='chat-color'>
                        Enter Your Otp :
                    </label>
                    <input
                        rows={10}
                        cols={30}
                        className='input-outline'
                        onChange={(e) => setOtp(e.target.value)}

                    />
                    <div className='text-center'>
                        <button className='bg-[#009DFF] rounded p-2 text-white font-semibold text-lg w-24' type='submit'>Done</button>
                    </div>

                </form>



            </div>

        </div>
    )
}

export default Verify