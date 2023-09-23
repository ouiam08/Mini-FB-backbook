import {  faComment, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

function Article(params) {
    const postTime = "Il y a 1 heure";
  return (
    <>
        <div className='bg-white w-auto rounded-lg p-6 mt-6 mb-6 m-20 shadow-md'>
            <div className='inline-flex ml-6'>
                <img src={params.postOwnerImage} alt='postownerimage' className='w-16 h-16 rounded-full p-2 cursor-pointer m-2'/>
                <div className='mt-4'>
                    <div className='text-green-800 font-beezee font-semibold'>{params.postOwnerName}</div>
                    <div className='text-gray-400 font-beezee'>{postTime}</div>
                </div>
            </div>
            <div className='ml-2 mr-2'>{params.postBody}</div>
            <div className='ml-4 mt-2'>
                <span>{params.reactionNombre}</span>
                <FontAwesomeIcon icon={faThumbsUp} className='text-green-800 ml-2'/>
            </div>
            <div className='mt-2'>
                <hr />
                <div className='flex justify-between m-2 ml-12 mr-12'>
                    <div><FontAwesomeIcon icon={faThumbsUp} className='text-gray-500 text-xl mr-2'/>React</div>
                    <div><FontAwesomeIcon icon={faComment} className='text-gray-500 text-xl mr-2'/>Comment</div>
                    <div><FontAwesomeIcon icon={faShare} className='text-gray-500 text-xl mr-2'/>Post</div>
                </div>
                <hr />
            </div>
            <div>
                
            </div>
        </div>
    </>
  )
}

export default Article