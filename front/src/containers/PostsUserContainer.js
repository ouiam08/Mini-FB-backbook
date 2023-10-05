import React, {useState} from 'react';
import PostList from "../components/PostList";
import useGetPostsByUserId from "../hooks/posts/useGetPostsByUserId";
import useDeletePost from "../hooks/posts/useDeletePost";
import useGetUserByID from "../hooks/users/useGetUserByID";
import Cookies from "js-cookie";

const PostsUserContainer = () => {
    const userId =Cookies.get('userID');
    const {postList} = useGetPostsByUserId(userId);
    const {deletePostMutation} = useDeletePost();
    const user = useGetUserByID(userId).data;
    const [isPostSelected, setIsPostSelected] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null)
    console.log(postList)
    const handleDeletePost = async (postId) => {
        try {
            await deletePostMutation.mutateAsync(postId);
        } catch (error) {
            console.error('Error deleting post:', error);
        }

    };


    const handleDeleteClick = (postId) => {
        handleDeletePost(postId);
    }

    return (
        <PostList postList={postList}
                  handleDeletePost={handleDeletePost}
                  handleDeleteClick={handleDeleteClick}
                  user={user}
                  setPostSelected={setIsPostSelected}
                  postSelected={isPostSelected}
                  setSelectedPost={setSelectedPost}
                  selectedPost={selectedPost}/>
    );
};

export default PostsUserContainer;
