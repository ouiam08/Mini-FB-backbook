import React from 'react';
import useGetPostComments from '../../hooks/comments/useGetPostComments';
import CommentList from '../../components/commentComponents/CommentList';


function CommentListContainer(props) {
    const {commentList} = useGetPostComments(props.post.id);

    return (
        <CommentList
            commentList={commentList}
        />

    );
}

export default CommentListContainer;
