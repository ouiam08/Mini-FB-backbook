import {faShare} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'

function Button(props) {

    return (
        <>
            <button className='inline-block bg-green-custom rounded-lg p-2 text-white' onClick={props.click}>
                {props.iconn && <FontAwesomeIcon icon={faShare} className='mr-2'/>}
                {props.text}
            </button>
        </>
    )
}

export default Button