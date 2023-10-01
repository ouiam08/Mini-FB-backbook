import React from 'react'
import Person from '../Assets/images/person.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen, faClose} from '@fortawesome/free-solid-svg-icons'

function CommentList(
    props
) {
    return (
        <>
            <div>
                {props.commentList.map((comment) => (
                    <div key={comment.id} className='inline-flex w-full'>
                        
                        <img src={Person} alt='' className='w-6 h-6 rounded-full m-4'/>
                        <div className='bg-gray-50 rounded-lg w-full m-2 flex'>
                             <div className='w-80'>
                                <h3 className='m-2 font-bold'>{comment.user.name}</h3>
                            <p className='m-2 break-normal flex flex-wrap'>{comment.body}</p>
                            </div>
                            {props.user.id === comment.user.id && 
                                <div className='ml-auto mt-2'>
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        className='ml-8 bg-gray-500 text-white rounded-full p-1 text-sm cursor-pointer'
                                        onClick={() => console.log("update comment")}
                                    />
                                    <FontAwesomeIcon 
                                        icon={faClose} 
                                        className='ml-8 mr-8 bg-gray-500 text-white rounded-full p-1 text-sm cursor-pointer'
                                        onClick={() => console.log("delete comment")}
                                    />
                                </div>
                            }
                           
                            
                        </div>

                    </div>
                ))}
            </div>

        </>
    )
}

export default CommentList