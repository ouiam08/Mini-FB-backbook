import React, {useState} from 'react';
import PostList from "../../components/postComponents/PostList";
import useGetPostsByUserId from "../../hooks/posts/useGetPostsByUserId";
import useDeletePost from "../../hooks/posts/useDeletePost";
import useGetUserByID from "../../hooks/users/useGetUserByID";
import {useParams} from "react-router";

const PostsUserContainer = () => {
    const {id} = useParams();
    const {user} = useGetUserByID(id);
    const {postList} = useGetPostsByUserId(id);
    const {deletePostMutation} = useDeletePost();
    const [isPostSelected, setIsPostSelected] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null)
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
