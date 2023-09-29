import React from 'react';
import useGetPostComments from '../hooks/comments/useGetPostComments';
import CommentList from '../components/CommentList';

function CommentListContainer(props) {
    console.log("hna nchofo id li taywsl l commentListContainer: ", props.postId)
    const {status, commentList, error} = useGetPostComments(props.postId);
    console.log('hna nchofo commentlist li tay3ti', commentList )
    console.log("status et error: ", status , error);
    return (
        <div>
            <CommentList
                commentList={commentList}
            />
        </div>
    );
}

export default CommentListContainer;
