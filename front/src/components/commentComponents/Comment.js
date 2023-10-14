import React from 'react';
import CommentEdit from "./CommentEdit";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";

const Comment = ({
                     comment,
                     editModeCommentId,
                     handleEditComment,
                     handleSaveComment,
                     handleTextChange,
                     selectedComment,
                     setSelectedComment,
                     user,
                     paramsListDisplay,
                     handleParamsList,
                     handleDeleteComment
                 }) => {
    return (
        <div key={comment.id} className='inline-flex w-full'>
            <a href={"profile/" + comment.user.id}>
                <img src={`data:image/png;base64,${comment.user.photo}`} alt=''
                     className='w-6 h-6 rounded-full m-4'/></a>
            <div className='bg-gray-50 rounded-lg w-full m-2 flex'>
                <div className='w-80'>
                    <a href={"profile/" + comment.user.id}>
                        <h3 className='m-2 font-bold'>{comment.user.name}</h3></a>

                    {comment.id === editModeCommentId ?
                        <>
                            <CommentEdit
                                selectedComment={selectedComment}
                                handleTextChange={handleTextChange}
                                handleSaveComment={handleSaveComment}

                            />
                        </>
                        : <p className='m-2 break-normal flex flex-wrap'>{comment.body}</p>}
                </div>

                {user.id === comment.user.id &&

                    <div className='ml-auto mt-2'>
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            className='mr-6 text-gray-500 rounded-full p-1 text-lg cursor-pointer'
                            onClick={() => {

                                handleParamsList()
                            }}
                        />
                        {paramsListDisplay &&
                            <ul className='bg-transparent p-2 right-4 z-30 relative'>
                                <li className='font-semibold cursor-pointer text-xs bg-gray-300 rounded-lg p-1 m-1'
                                    onClick={() => {
                                        handleEditComment(comment.id);
                                        setSelectedComment(comment.body);

                                    }}>Edit
                                </li>

                                <li className='font-semibold cursor-pointer text-xs bg-gray-300 rounded-lg p-1 m-1'

                                    onClick={() => handleDeleteComment(comment.id)}>Delete

                                </li>
                            </ul>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Comment