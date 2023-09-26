import React from 'react';
import useGetPostComments from '../hooks/comments/useGetPostComments';
import CommentList from '../components/CommentList';

function CommentListContainer() {
    const {commentList} = useGetPostComments(49);
    console.log(commentList)
    return (
        <div>
            <CommentList
                commentList={commentList}
            />
        </div>
    );
}

export default CommentListContainer;
