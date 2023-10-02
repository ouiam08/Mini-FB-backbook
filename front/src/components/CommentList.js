import React from 'react'
import Person from '../Assets/images/person.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsis} from '@fortawesome/free-solid-svg-icons'
import CommentEdit from './CommentEdit';

function CommentList(
    props
) {
    return (
        <>
            <div className='overflow-auto w-full max-h-44 '>
                {props.commentList.map((comment) => (
                    <div key={comment.id} className='inline-flex w-full'>
                        <img src={Person} alt='' className='w-6 h-6 rounded-full m-4'/>
                        <div className='bg-gray-50 rounded-lg w-full m-2 flex'>
                            <div className='w-80'>
                                <h3 className='m-2 font-bold'>{comment.user.name}</h3>
                                {comment.id === props.editModeCommentId ?
                                    <>
                                        <CommentEdit
                                            selectedComment={props.selectedComment}
                                            handleTextChange={props.handleTextChange}
                                            handleSaveComment={props.handleSaveComment}
                                        />
                                    </>
                                    : <p className='m-2 break-normal flex flex-wrap'>{comment.body}</p>}
                            </div>
                            {props.user.id === comment.user.id &&
                                <div className='ml-auto mt-2'>
                                    <FontAwesomeIcon
                                        icon={faEllipsis}
                                        className='mr-6 text-gray-500 rounded-full p-1 text-lg cursor-pointer'
                                        onClick={() => {
                                            props.handleParamsList()
                                        }}
                                    />
                                    {props.paramsListDisplay &&
                                        <ul className='bg-transparent p-2 right-4 z-30 relative'>
                                            <li className='font-semibold cursor-pointer text-xs bg-gray-300 rounded-lg p-1 m-1'
                                                onClick={() => {
                                                    props.handleEditComment(comment.id);
                                                    props.setSelectedComment(comment.body);
                                                }}>Edit
                                            </li>

                                            <li className='font-semibold cursor-pointer text-xs bg-gray-300 rounded-lg p-1 m-1'
                                                onClick={() => props.handleDeleteComment(comment.id)}>Delete
                                            </li>
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