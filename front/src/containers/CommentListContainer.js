import React, { useState } from 'react';
import useGetPostComments from '../hooks/comments/useGetPostComments';
import CommentList from '../components/CommentList';
import Cookies from "js-cookie";
import useDeleteComment from '../hooks/comments/useDeleteComment';
import useUpdateComment from '../hooks/comments/useUpdateComment';
import useGetUserByID from "../hooks/users/useGetUserByID";

function CommentListContainer(props) {
    const {commentList} = useGetPostComments(props.postId);
    const {updateCommentMutation} = useUpdateComment();
    const {deleteCommentMutation} = useDeleteComment();
    const [deleteCalled, setDeleteCalled] = useState(false);
    const user = useGetUserByID(Cookies.get('userID')).data;
    const [paramsListDisplay , setParamsListDisplay] = useState(false);
    const [defaultCommentText, setDefaultCommentText] = useState('')
    const [editedCommentText, setEditedCommentText] = useState(defaultCommentText);
    const [editModeCommentId, setEditModeCommentId] = useState(null);

    const handleEditComment = (commentId) => {
        setEditModeCommentId(commentId);
    };
    const handleTextChange = (e)=>{
        setEditedCommentText(e.target.value);
    }
    const handleSaveComment = async () => {
        try {
            const updatedComment = {
                comment_id: editModeCommentId,
                post_id: props.postId,
                user_id: user.id,
                comment_body: editedCommentText
            }
            console.log(updatedComment);
            await updateCommentMutation.mutateAsync(updatedComment);
          setEditModeCommentId(null);
        } catch (error) {
          console.error("Error updating comment:", error);
        }
      };
      
    const handleParamsList = () =>{
        setParamsListDisplay(!paramsListDisplay);
    }
    const handleDeleteComment = async (commentId) => {
        if (!deleteCalled) {
            try {
                await deleteCommentMutation.mutateAsync(commentId);
                setDeleteCalled(true);
                alert("Comment deleted successfully")
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };
    return (
        <div>
            <CommentList
                editModeCommentId={editModeCommentId}
                handleEditComment={handleEditComment}
                editedCommentText={editedCommentText}
                handleSaveComment={handleSaveComment}
                handleTextChange={handleTextChange}
                setDefaultCommentText={setDefaultCommentText}
                setEditedCommentText={setEditedCommentText}
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
