import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import logo from '../../assets/icon.png'
import toast from 'react-hot-toast';
const ForgotPassword = () => {

    const [email, setEmail] = useState()
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            await axios.post(`https://stackoverflow-ynmc.onrender.com/user/forgot-password`, { email })
                .then(res => {
                    console.log(res)
                    if (res.data.message === "Email Sent Successfully, Please Check Your Email to Continue Further") {
                        toast.success(` Please Check Your Email to Continue Further`);
                        navigate('/')

                    }
                    else {
                        alert("User is not resgistered with us");

                    }
                }).catch((err => { console.log(err); toast.error("User not registered") }))
        } catch (error) {
            console.log(error)
            toast.error("Inavlid email")
        }
    }
    return (

        <div className="flex h-[100vh] justify-center items-center ">
            <div className=" p-3 rounded w-25">
                <form onSubmit={handleSubmit} className='shadow flex flex-col chat  space-y-6 py-6 px-16'>
                    <img src={logo} className='ml-16' width={40} alt='logo' />
                    <label htmlFor="email">
                        <strong className='chat-color'>Email</strong>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className='outline-black border-2 border-black py-2 px-4'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className='text-center'>
                        <button className='bg-[#009DFF] rounded p-2 text-white font-semibold text-lg w-24' type='submit'>Done</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ForgotPassword