import React, {useState} from 'react';
import useGetPostComments from '../hooks/comments/useGetPostComments';
import CommentList from '../components/CommentList';
import Cookies from "js-cookie";
import useDeleteComment from '../hooks/comments/useDeleteComment';
import useUpdateComment from '../hooks/comments/useUpdateComment';
import useGetUserByID from "../hooks/users/useGetUserByID";

function CommentListContainer(props) {
    const {commentList} = useGetPostComments(props.post.id);
    const {updateCommentMutation} = useUpdateComment();
    const {deleteCommentMutation} = useDeleteComment();
    const [deleteCalled, setDeleteCalled] = useState(false);
    const [selectedComment, setSelectedComment] = useState('');
    const user = useGetUserByID(Cookies.get('userID')).data;
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
                post: props.post,
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
        <div>
            <CommentList
                editModeCommentId={editModeCommentId}
                handleEditComment={handleEditComment}
                handleSaveComment={handleSaveComment}
                handleTextChange={handleTextChange}
                selectedComment={selectedComment}
                setSelectedComment={setSelectedComment}
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
