import React, {useState} from 'react';
import useUpdateComment from "../../hooks/comments/useUpdateComment";
import useDeleteComment from "../../hooks/comments/useDeleteComment";
import Cookies from "js-cookie";
import useGetUserByID from "../../hooks/users/useGetUserByID";
import Comment from "../../components/commentComponents/Comment";

const CommentContainer = ({comment}) => {
    const {updateCommentMutation} = useUpdateComment();
    const {deleteCommentMutation} = useDeleteComment();
    const [deleteCalled, setDeleteCalled] = useState(false);
    const [selectedComment, setSelectedComment] = useState('');
    const userId = Cookies.get('userID');
    const {user} = useGetUserByID(userId);
    const [paramsListDisplay, setParamsListDisplay] = useState(false);
    const [editModeCommentId, setEditModeCommentId] = useState(null);

    const handleEditComment = (commentId) => {
        setEditModeCommentId(commentId);
        setParamsListDisplay(!paramsListDisplay);
    };
    const handleTextChange = (e) => {
        setSelectedComment(e.target.value);
    }
    const handleSaveComment = async () => {
        try {
            const updatedComment = {
                id: editModeCommentId,
                post: comment.post,
                user: user,
                body: selectedComment
            }
            await updateCommentMutation.mutateAsync(updatedComment);
            setEditModeCommentId(null);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleParamsList = () => {
        setParamsListDisplay(!paramsListDisplay);
    }
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
        <Comment
            comment={comment}
            user={user}
            paramsListDisplay={paramsListDisplay}
            handleParamsList={handleParamsList}
            handleDeleteComment={handleDeleteComment}
            editModeCommentId={editModeCommentId}
            handleEditComment={handleEditComment}
            handleSaveComment={handleSaveComment}
            handleTextChange={handleTextChange}
            selectedComment={selectedComment}
            setSelectedComment={setSelectedComment}/>
    );
};

export default CommentContainer;