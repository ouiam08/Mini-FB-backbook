import React, { useState } from 'react';
import { useDeletePost } from '../hooks/posts/useDeletePost';
import { useInsertPost } from '../hooks/posts/useInsertPost';
import { useUpdatePost } from '../hooks/posts/useUpdatePost'; 
import NewPost from '../components/NewPost';

function NewPostContainer() {
  const { deletePostMutation } = useDeletePost();
  const { insertPostMutation } = useInsertPost();
  const { updatePostMutation } = useUpdatePost(); 
  const [deleteCalled, setDeleteCalled] = useState(false);
  const [newPostData, setNewPostData] = useState({ photo: null, body: '' });
  const [editPost, setEditPost] = useState(null); 
  const [updatedPostData, setUpdatedPostData] = useState({ photo: null, body: '' });

  const handleDeletePost = async (postId) => {
    if (!deleteCalled) {
      try {
        await deletePostMutation.mutateAsync(postId);
        setDeleteCalled(true);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleAddPost = async () => {
    try {
      const defaultPost = {
        photo: null,
        body: newPostData.body,
        user: {
          id: 2,
          name: 'haitam',
          password: '123',
        },
      };

      await insertPostMutation.mutateAsync(defaultPost);

      setNewPostData({ photo: null, body: '' });
    } catch (error) {
      console.error('Error inserting post:', error);
    }
  };

  const handleEditClick = (post) => {
    setEditPost(post);
    setUpdatedPostData({ photo: post.photo, body: post.body });
  };

  const handleUpdatePost = async () => {
    try {
      const updatedPost = {
        id: editPost.id,
        photo: updatedPostData.photo,
        body: updatedPostData.body,
        user: {
          id: 2,
          name: 'haitam',
          password: '123',
        }
      };

      await updatePostMutation.mutateAsync(updatedPost);
      setEditPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPostData({ ...newPostData, [name]: value });
  };

  return (
    <div>
      <NewPost
        handleDeletePost={handleDeletePost}
        handleAddPost={handleAddPost}
        newPostData={newPostData}
        handleInputChange={handleInputChange}
        handleEditClick={handleEditClick}
        handleUpdatePost={handleUpdatePost}
        editPost={editPost}
        updatedPostData={updatedPostData}
        setUpdatedPostData={setUpdatedPostData}
      />
    </div>
  );
}

export default NewPostContainer;
