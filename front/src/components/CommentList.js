import React from 'react'

function CommentList(
    props
) {
    return (
        <>
            <div>
                {props.commentList.map((comment) => (
                    <div key={comment.id}>
                        <h3>{comment.user.name}</h3>
                        <p>{comment.body}</p>
                    </div>
                ))}
            </div>

        </>
    )
}

export default CommentList