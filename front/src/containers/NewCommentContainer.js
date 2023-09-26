import React, { useState } from 'react';
import { useInsertComment } from '../hooks/comments/useInsertComment';
import NewComment from '../components/NewComment';

function NewCommentContainer(params) {

  const { insertCommentMutation } = useInsertComment();
  const [newCommentData, setNewCommentData] = useState({ text: '', postId: '' , userId: ''});



  const handleAddComment = async (comment) => {
    try {
      const defaultComment = {
        comment_body: comment.text,
        post_id: comment.postId,
        user_id:  comment.userId
      };
console.log("default: ", defaultComment);
      await insertCommentMutation.mutateAsync(defaultComment);

      setNewCommentData({ text: '', postId: '' , userId: ''});
    } catch (error) {
      console.error('Error inserting comment:', error);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCommentData({ ...newCommentData, [name]: value });
  };
    const [comment, setComment] = useState('');
    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (postId) => {
        if (comment.trim() === '') {
            return;
        }
        console.log(postId);
        const newComment = {
            postId: postId,
            userId: 1,
            text: comment
        };
        console.log("comment",newComment);
        handleAddComment(newComment);
        setComment('');
    };

  return (
    <div>
      <NewComment
        handleAddComment={handleAddComment}
        newCommentData={newCommentData}
        handleInputChange={handleInputChange}
        postId = {params.postId}
        handleChange={handleChange}
        handleCommentSubmit={handleCommentSubmit}
        comment={comment}
      />
    </div>
  );
}

export default NewCommentContainer;
