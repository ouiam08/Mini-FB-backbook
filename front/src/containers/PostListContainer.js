import React, {useState} from 'react';
import useGetPosts from '../hooks/posts/useGetPosts';
import useDeletePost from '../hooks/posts/useDeletePost';
import useUpdatePost from '../hooks/posts/useUpdatePost';
import PostList from '../components/PostList';

function PostListContainer() {
  const { postList } = useGetPosts();
  const { deletePostMutation } = useDeletePost();
  const { updatePostMutation } = useUpdatePost(); 
  const [deleteCalled, setDeleteCalled] = useState(false);
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

  return (
    <div>
      <PostList
        postList={postList}
        handleDeletePost={handleDeletePost}
        handleEditClick={handleEditClick}
        handleUpdatePost={handleUpdatePost}
        editPost={editPost}
        updatedPostData={updatedPostData}
        setUpdatedPostData={setUpdatedPostData}
      />
    </div>
  );
}

export default PostListContainer;
