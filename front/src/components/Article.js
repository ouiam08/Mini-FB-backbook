import {faComment, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react'
import Button from '../../../front/src/components/Common/Button';
import Mark from './../Assets/images/mark.jpg';

function Article(params) {


    return (
        <>
            <div className='bg-white w-auto rounded-lg p-6 mt-6 mb-6 m-20 shadow-md'>
                <div className='inline-flex ml-6'>
                    <img src={params.postOwnerImage} alt='postownerimage'
                         className='w-16 h-16 rounded-full p-2 cursor-pointer m-2'/>
                    <div className='mt-4'>
                        <div className='text-green-800 font-beezee font-semibold'>{params.postOwnerName}</div>
                        <div className='text-gray-400 font-beezee'>{params.postTime}</div>
                    </div>
                </div>
                <div className='ml-2 mr-2'>{params.postBody}</div>
                <div className='ml-4 mt-2 cursor-pointer'>
                    <span>{params.reactionNombre}</span>
                    <FontAwesomeIcon icon={faThumbsUp} className='text-green-800 ml-2'/>
                </div>
                <div className='mt-2'>
                    <hr/>
                    <div className='flex justify-between m-2 ml-20 mr-20'>
                        <div className='cursor-pointer'><FontAwesomeIcon icon={faThumbsUp}
                                                                         className='text-gray-500 text-xl mr-2'/>React
                        </div>
                        <div className='cursor-pointer'><FontAwesomeIcon icon={faComment}
                                                                         className='text-gray-500 text-xl mr-2'/>Comment
                        </div>
                        <div className='cursor-pointer'><FontAwesomeIcon icon={faShare}
                                                                         className='text-gray-500 text-xl mr-2'/>Post
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className='inline-flex w-full m-2'>
                    <img src={Mark} alt='user' className='rounded-full w-10 h-10 mr-4 cursor-pointer'/>
                    <div className='bg-gray-200 text-gray-600 rounded-full p-2 w-screen mr-4 cursor-pointer'>
                <textarea
                    className="w-full h-2 p-2 bg-transparent outline-none border-none overflow-hidden resize-none"
                    placeholder="Write a comment?"
                    value={params.comment}
                    onChange={params.handleChange}
                >
                </textarea>
                    </div>
                    <Button text="Comment" icon={false} className=''/>
                </div>
            </div>
        </>
    )
}

export default Article