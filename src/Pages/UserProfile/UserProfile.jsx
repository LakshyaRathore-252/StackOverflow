// =============================================== Import Dependenices =========================================
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HiCake } from 'react-icons/hi'
import { BsFillPencilFill } from 'react-icons/bs'
import moment from 'moment'
import { updatePoints } from "../../actions/users";

// =============================================== Import Components =========================================

import LeftSidebar from '../../Components/LeftSIdebar/LeftSidebar'
import Avatar from '../../Components/Avatar/Avatar'
import ProfileBio from './ProfileBio';
import EditProfileForm from './EditProfileForm';


// ================================================ Import CSS ===========================================
import "./UsersProfile.css";
import '../../App.css'

const UserProfile = ({slideIn , handleSlideIn}) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const users = useSelector((state) => state.usersReducer);
    console.log(users)
    const currentProfile = users.filter((user) => user._id === id)[0];
    const currentUser = useSelector((state) => state.currentUserReducer);
    console.log(currentProfile)
    console.log(currentUser)



    const [Switch, setSwitch] = useState(false);

    return (
        <div className='home-container-1'>
            <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />

            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar
                                backgroundColor="purple"
                                color="white"
                                fontSize="50px"
                                px="40px"
                                py="30px"
                            >
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1 className='chat-color'>{currentProfile?.name}</h1>
                                <p className='chat-color'>
                                    <HiCake /> Joined{" "}
                                    {moment(currentProfile?.joinedOn).fromNow()}
                                </p>
                            </div>

                        </div>
                        {currentUser?.result._id === id && (
                            <button
                                type="button"
                                onClick={() => setSwitch(true)}
                                className="edit-profile-btn"
                            >
                                <BsFillPencilFill /> Edit Profile
                            </button>
                        )}
                    </div>

                    <>
                        {Switch ? (
                            <EditProfileForm
                                currentUser={currentUser}
                                setSwitch={setSwitch}
                            />
                        ) : (
                            <ProfileBio currentProfile={currentProfile} currentUser={currentUser} />
                        )}
                    </>
                </section>
            </div>
        </div>

    )
}

export default UserProfile