import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faThumbsUp} from '@fortawesome/free-solid-svg-icons'

function Reaction({
                      handleReaction,
                      post
                  }) {
    return (
        <>
            <FontAwesomeIcon
                icon={faThumbsUp}
                className='bg-blue-500 text-white p-1 rounded-full mr-2 cursor-pointer'
                onClick={() => handleReaction(post.id, "Like ")}
            />
            <FontAwesomeIcon
                icon={faHeart}
                className='bg-red-600 text-white p-1 rounded-full mr-2 cursor-pointer'
                onClick={() => handleReaction(post.id, "Love ")}
            />
        </>
    )
}

export default Reaction