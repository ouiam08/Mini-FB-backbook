import React, { useState } from 'react';
import { useInsertPost } from '../hooks/posts/useInsertPost';
import NewPost from '../components/NewPost';

function NewPostContainer() {
  const { insertPostMutation } = useInsertPost();
  const [newPostData, setNewPostData] = useState({ photo: null, body: '' , userId: ''});



  const handleAddPost = async (post) => {
    try {
      const defaultPost = {
        photo: null,
        body: post.postBody,
        user: {
            id: post.userId,
            name: 'amina',
            password: '123'
        }
      };
console.log("default: ", defaultPost);
      await insertPostMutation.mutateAsync(defaultPost);

      setNewPostData({ photo: null, body: '' , userId: ''});
    } catch (error) {
      console.error('Error inserting post:', error);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPostData({ ...newPostData, [name]: value });
  };

  return (
    <div>
      <NewPost
        handleAddPost={handleAddPost}
        newPostData={newPostData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default NewPostContainer;
