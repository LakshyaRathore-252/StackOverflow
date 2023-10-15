import React from 'react'
import LeftSidebar from '../../Components/LeftSIdebar/LeftSidebar'
import UsersList from './UserList'
import '../../App.css'

const Users = ({ slideIn, handleSlideIn }) => {
    return (
        <div className='home-container-1'>
            <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />

            <div className="home-container-2" style={{ marginTop: "30px" }}>
                <h1 className='text-3xl tags-h1' style={{ fontWeight: "400" }}>Users</h1>
                <UsersList />
            </div>
        </div>
    )
}

export default Users