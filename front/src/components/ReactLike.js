import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function ReactLike(
    props
) {
  return (
    <>
    <FontAwesomeIcon 
        icon={faThumbsUp} 
        className='bg-blue-500 text-white p-1 rounded-full mr-4 ml-2 cursor-pointer'
        onClick={()=>props.handleAddReaction("Like ")}
    />
    </>
  )
}

export default ReactLike