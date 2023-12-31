import React from 'react'
import LeftSidebar from '../../Components/LeftSIdebar/LeftSidebar'
import TagsList from './TagsList.jsx'
import { tagsList } from './tagsList'

const Tags = ({ slideIn, handleSlideIn }) => {
    return (
        <div className='home-container-1'>
            <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
            <div className="home-container-2">
                <h1 className='tags-h1 text-3xl'>
                    Tags
                </h1>
                <p className='tags-p'>   A tag is a keyword or label that categorizes your question with other,
                    similar questions.
                </p>
                <p className="tags-p">
                    Using the right tags makes it easier for others to find and answer
                    your question.
                </p>

                <div className="tags-list-container">
                    {tagsList.map((tag, index) => (
                        <TagsList tag={tag} key={index} />
                    ))}
                </div>
            </div>



        </div>
    )
}

export default Tags