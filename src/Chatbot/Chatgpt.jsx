import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'

const Chatgpt = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`https://stackoverflow-e06h.onrender.com/chat`, { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className='chat'>
      <form className='shadow ' onSubmit={handleSubmit}>
        <label>
          ask me anything??

        </label>
        <div>
          <input
            type='text'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}

          />
        </div>
        <div>
          <button type='submit'>
            Submit
          </button>
        </div>
      </form>

      <div>
        <p>{response}</p>
      </div>
    </div>
  )
}

export default Chatgpt