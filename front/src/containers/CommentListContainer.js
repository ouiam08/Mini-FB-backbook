import React, { useState } from 'react';
import useGetPostComments from '../hooks/comments/useGetPostComments';
import CommentList from '../components/CommentList';
import Cookies from "js-cookie";
import useDeleteComment from '../hooks/comments/useDeleteComment';
// import useUpdateComment from '../hooks/comments/useUpdateComment';
import useGetUserByID from "../hooks/users/useGetUserByID";

function CommentListContainer(props) {
    const {commentList} = useGetPostComments(props.postId);
    // const {updateCommentMutation} = useUpdateComment();
    const {deleteCommentMutation} = useDeleteComment();
    const [deleteCalled, setDeleteCalled] = useState(false);
    const user = useGetUserByID(Cookies.get('userID')).data;
    const [paramsListDisplay , setParamsListDisplay] = useState(false);

    const handleParamsList = () =>{
        setParamsListDisplay(!paramsListDisplay);
    }
    // const handleUpdateComment = async () => {
    //     try {
    //         const updatedComment = {
                
    //         };

    //         await updateCommentMutation.mutateAsync(updatedComment);
            
    //     } catch (error) {
    //         console.error('Error updating post:', error);
    //     }
    // };
    const handleDeleteComment = async (commentId) => {
        if (!deleteCalled) {
            try {
                await deleteCommentMutation.mutateAsync(commentId);
                setDeleteCalled(true);
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };
    return (
        <div>
            <CommentList
                commentList={commentList}
                user={user}
                paramsListDisplay={paramsListDisplay}
                handleParamsList={handleParamsList}
                handleDeleteComment={handleDeleteComment}
            />

        </div>
    );
}

export default CommentListContainer;
