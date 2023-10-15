// ================================================ Import Dependenices =========================================
import React from 'react'
import LeftSidebar from '../../Components/LeftSIdebar/LeftSidebar'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'

// ================================================= Import Components ----> PAGE ===============================================
import QuestionsDetails from './QuestionsDetails'


// ================================================= Import CSS ===================================================
import '../Questions/Questions.css'

const DisplayQuestion = ({ slideIn, handleSlideIn }) => {
    return (
        <div className="home-container-1">
            <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />

            <div className="home-container-2">
                <QuestionsDetails />
                <RightSidebar />
            </div>
        </div>
    )
}

export default DisplayQuestion