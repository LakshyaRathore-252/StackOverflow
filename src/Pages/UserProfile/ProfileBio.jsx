import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
const ProfileBio = ({ currentProfile, currentUser }) => {

    const [response, setResponse] = useState(0);
    const [badge, setbadge] = useState([]);
    const { id } = useParams();


    axios
        .get(`https://stackoverflow-ynmc.onrender.com/user/update-points/${id}`)
        .then((res) => {
            // console.log("response from client side");
            console.log(res.data);
            setResponse(res.data.points);
            setbadge(res.data.badges);
        })
        .catch((err) => {
            console.log(err);
        });




    return (
        <div className='space-y-8'>
            <div>
                {currentProfile?.tags.length !== 0 ? (
                    <>
                        <h4 className='chat-color'>Tags watched</h4>
                        {currentProfile?.tags.map((tag) => (
                            <p className='chat-color' key={tag}>{tag}</p>
                        ))}
                    </>
                ) : (
                    <p className='chat-color'>0 tags watched</p>
                )}
            </div>
            <div className='border-2 border-[chat-color] flex justify-center flex-col items-center  '>
                {currentProfile?.about ? (
                    <>
                        <h4 className='chat-color'>About</h4>
                        <p className='chat-color'>{currentProfile?.about}</p>
                    </>
                ) : (
                    <p className='chat-color'>No bio found</p>
                )}
            </div>
            <div className='border-2 border-[chat-color] flex justify-center flex-col items-center  '>
                {currentUser?.result?.points ? (
                    <>
                        <h4 className='chat-color'>Points</h4>
                        <p className='chat-color'>{response}</p>
                    </>
                ) : (
                    <p className='chat-color'>0 Points</p>
                )}
            </div>

            <div className='border-2 border-[chat-color] flex justify-center flex-col items-center space-y-3 '>
                {badge.length !== 0 ? (
                    <>
                        <h4 className='chat-color'>Badges earned</h4>
                        {badge.map((badge) => (
                            <p className='chat-color' key={badge} > {badge}</p>
                        ))}
                    </>
                ) : (
                    <p className='chat-color'>You have no badge</p>
                )}
            </div>



        </div >
    )
}

export default ProfileBio