import axios from 'axios';
import React, { useState } from 'react'
import '../../App.css'
const Chatbot = () => {

    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("https://stackoverflow-ynmc.onrender.com/chat", { prompt })
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <div className='flex justify-center items-center '>
                <form onSubmit={handleSubmit} className='flex flex-col shadow w-full justify-center items-center   space-y-6 md:px-5 md:py-2 lg:py-6 lg:px-16 chat'>
                    <div className=' flex justify-center items-center'>

                        <h2 className='text-2xl text-center chat-color'>Welcome to <span className='text-xl md:text-2xl  font-medium '>StackOverflow bot</span></h2>
                    </div>
                    <label className='chat-color'>
                        Ask Me Anything :
                    </label>
                    <textarea

                        rows={10}
                        cols={30}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className='outline-black border-2 border-black w-[50vh]'

                    />

                    <p className='w-80 chat-color'>
                        {response}
                    </p>

                    <div className='text-center'>
                        <button className='bg-[#009DFF] rounded p-2 text-white font-semibold text-lg w-24' type='submit'>Done</button>
                    </div>


                </form>


            </div>
        </div>
    )
}

export default Chatbot