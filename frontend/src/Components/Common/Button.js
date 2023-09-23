import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Button(props) {
    
  return (
    <>
        <div className='inline-block bg-green-custom rounded-lg p-2 cursor-pointer text-white'>
            {props.icon && <FontAwesomeIcon icon={faShare} className='mr-2 '/>}
            {props.text}
        </div>
    </>
  )
}

export default Button