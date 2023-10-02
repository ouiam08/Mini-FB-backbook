import React from 'react'
import Person from '../Assets/images/person.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

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
                                {comment.id === props.editModeCommentId ? 
                                
                                        <>
                                        
                                        <textarea 
                                            className='bg-gray-50 rounded-lg ml-4 outline-none border-none overflow-hidden resize-none text-black w-full'
                                            value={props.editedCommentText}
                                            onChange={props.handleTextChange}
                                        />
                                        <button className='bg-green-800' onClick={props.handleSaveComment}>Update</button>
                                        </>
                                        
                                        :<p className='m-2 break-normal flex flex-wrap'>{comment.body}</p>}
                            </div>
                            {props.user.id === comment.user.id && 
                                <div className='ml-auto mt-2'>
                                    <FontAwesomeIcon
                                        icon={faEllipsis}
                                        className='mr-6 text-gray-500 rounded-full p-1 text-lg cursor-pointer'
                                        onClick={() => props.handleParamsList()}
                                    />
                                    {props.paramsListDisplay && <ul className='bg-white rounded p-2 right-40 z-30 absolute'>
                                        <li className='font-semibold cursor-pointer' onClick={()=>props.handleEditComment(comment.id)}>modifier</li>
                                        
                                        <li className='font-semibold cursor-pointer' onClick={() => props.handleDeleteComment(comment.id)}>supprimer</li>
                                    </ul>
                                    }
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