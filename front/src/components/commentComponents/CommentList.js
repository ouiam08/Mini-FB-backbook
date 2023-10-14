import React from 'react'
import CommentContainer from "../../containers/commentContainer/CommentContainer";

function CommentList({
                         commentList,
                     }) {
    return (
        <>
            <div className='overflow-auto w-full max-h-44 '>
                {commentList.map((comment) => (
                    <CommentContainer key={comment.id} comment={comment}/>
                ))}
            </div>
        </>
    )
}

export default CommentList