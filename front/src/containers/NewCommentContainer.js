import React, {useState} from 'react';
import {useInsertComment} from '../hooks/comments/useInsertComment';
import NewComment from '../components/NewComment';
import Cookies from "js-cookie";

function NewCommentContainer(params) {
    const userId = Cookies.get('userID');
    const {insertCommentMutation} = useInsertComment();
    const [newCommentData, setNewCommentData] = useState({text: '', postId: '', userId: 0});


    const handleAddComment = async (comment) => {
        try {
            const defaultComment = {
                comment_body: comment.text,
                post_id: comment.postId,
                user_id: comment.userId
            };
            await insertCommentMutation.mutateAsync(defaultComment);

            setNewCommentData({text: '', postId: '', userId: 0});
        } catch (error) {
            console.error('Error inserting comment:', error);
        }
    };


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewCommentData({...newCommentData, [name]: value});
    };
    const [comment, setComment] = useState('');
    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (postId) => {
        if (comment.trim() === '') {
            return;
        }
        const newComment = {
            postId: postId,
            userId: userId,
            text: comment
        };
        handleAddComment(newComment);
        setComment('');
    };

    return (
        <div>
            <NewComment
                handleAddComment={handleAddComment}
                newCommentData={newCommentData}
                handleInputChange={handleInputChange}
                handleChange={handleChange}
                handleCommentSubmit={handleCommentSubmit}
                comment={comment}
                postId = {params.postId}
            />
        </div>
    );
}

export default NewCommentContainer;
