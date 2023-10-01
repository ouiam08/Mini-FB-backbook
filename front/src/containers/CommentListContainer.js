import React from 'react';
import useGetPostComments from '../hooks/comments/useGetPostComments';
import CommentList from '../components/CommentList';
import Cookies from "js-cookie";
import useGetUserByID from "../hooks/users/useGetUserByID";

function CommentListContainer(props) {
    const {commentList} = useGetPostComments(props.postId);
    const user = useGetUserByID(Cookies.get('userID')).data;
    return (
        <div>
            <CommentList
                commentList={commentList}
                user={user}
            />

        </div>
    );
}

export default CommentListContainer;
