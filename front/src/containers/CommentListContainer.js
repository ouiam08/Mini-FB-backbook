import React from 'react';
import useGetPostComments from '../hooks/comments/useGetPostComments';
import CommentList from '../components/CommentList';
import PostList from "../components/PostList";

function CommentListContainer(props) {
    const {commentList} = useGetPostComments(props.postId);
    return (
        <div>
            <CommentList
                commentList={commentList}
            />

        </div>
    );
}

export default CommentListContainer;
