import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function ReactLove({
  handleReaction,
  post
}) {
  return (
    <>
    <FontAwesomeIcon 
        icon={faHeart} 
        className='bg-red-600 text-white p-1 rounded-full mr-2 cursor-pointer'
        onClick={()=>handleReaction(post.id, "Love ")}
    />
    </>
  )
}

export default ReactLove