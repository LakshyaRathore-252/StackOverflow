import React from 'react'
import LeftSidebar from '../../Components/LeftSIdebar/LeftSidebar'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import HomeMainbar from '../../Components/HomeMainbar/HomeMainbar'
const Home = ({ slideIn, handleSlideIn }) => {
  return (
    <div className='home-container-1 '>
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className='home-container-2'>
        <HomeMainbar />
        <RightSidebar />

      </div>
    </div>
  )
}

export default Home