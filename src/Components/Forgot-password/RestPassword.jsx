import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './restpassword.css'
import toast from 'react-hot-toast';

const RestPassword = () => {

  const { token } = useParams()

  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      await axios.post(`https://stackoverflow-ynmc.onrender.com/user/rest-password/${token}`, { email, password })
        .then(res => {
          if (res.data.message === "Password Reset Successful") {
            console.log("Password Set")
            toast.success("Password Changed Successfully");
            navigate('/Auth')

          }
        }).catch(err => {console.log(err); toast.error("Error while changing password")})

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='password flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col shadow space-y-6 py-2 px-5 lg:py-6 lg:px-16'>
          <label>
            Enter Email :
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            className='outline-black border-2 border-black rounded p-2'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            New Password :
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            className='outline-black border-2 border-black rounded p-2'
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='text-center'>
            <button className='bg-[#009DFF] rounded p-2 text-white font-semibold text-lg w-24' type='submit'>Done</button>
          </div>





        </form>
      </div>
    </div>
  )
}

export default RestPassword