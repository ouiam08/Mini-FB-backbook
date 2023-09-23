import React from 'react';
import Mark from './../Assets/images/mark.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import Button from './Common/Button';


function Post() {
  return (
    <>
        <div className='bg-white w-auto rounded-lg p-6 mt-6 mb-6 m-20 shadow-md'>
            <div className='inline-flex w-full'>
                <img src={Mark} alt='mark' className='w-16 h-16 rounded-full p-2 cursor-pointer'/>
                <div className='bg-gray-200 rounded-lg m-4 w-full h-20 p-4'>
                    What's on your mind?
                </div>    
            </div>
            <div className='flex items-center justify-between px-9 w-full'>
                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faImage} className="w-6 h-6 mr-6 text-green-800 cursor-pointer" />
                    <FontAwesomeIcon icon={faSmile} className="w-6 h-6 mr-6 text-yellow-500 cursor-pointer" />            
                    <FontAwesomeIcon icon={faPalette} className="w-6 h-6 mr-6 text-blue-600 cursor-pointer" />
                </div>
            
            <Button text="Share" icon={true} className="flex-end"/>
            </div>
        </div>
    </>
  )
}

export default Post