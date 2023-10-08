import React, {useState} from 'react';
import {useInsertComment} from '../hooks/comments/useInsertComment';
import {useGetUserByID} from '../hooks/users/useGetUserByID';
import NewComment from '../components/NewComment';
import Cookies from "js-cookie";

function NewCommentContainer(params) {
    const {insertCommentMutation} = useInsertComment();
    const [newCommentData, setNewCommentData] = useState({body: '', user: {}, post: {}});
    const userId = Cookies.get('userID');
    const {user} = useGetUserByID(userId);

    const handleAddComment = async (comment) => {
        try {
            const defaultComment = {
                body: comment.text,
                post: params.post,
                user: user
            };
            await insertCommentMutation.mutateAsync(defaultComment);

            setNewCommentData({body: '', user: {}, post: {}});
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
            userId: user.id,
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
                postId={params.postId}
                photo={`data:image/png;base64,${user.photo}`}
            />
        </div>
    );
}

export default NewCommentContainer;
