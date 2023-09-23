import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Button(props) {
    
  return (
    <>
        <div className='inline-block bg-green-custom rounded-lg p-1 cursor-pointer '>
            {props.icon && <FontAwesomeIcon icon={faShare}/>}
            {props.text}
        </div>
    </>
  )
}

export default Button