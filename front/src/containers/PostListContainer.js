import React, {useState} from 'react';
import useGetPosts from '../hooks/posts/useGetPosts';
import useDeletePost from '../hooks/posts/useDeletePost';
import PostList from '../components/PostList';
import Cookies from "js-cookie";
import useGetUserByID from "../hooks/users/useGetUserByID";
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function PostListContainer() {

    const {postList} = useGetPosts();
    const [reactionColor, setReactionColor] = useState({});
    const [reactionIcon, setReactionIcon] = useState({})
    const [reactionText, setReactionText] = useState({});
    const {deletePostMutation} = useDeletePost();
    const userId = Cookies.get('userID');
    const {user} = useGetUserByID(userId);
    const [isPostSelected, setIsPostSelected] = useState(null);
    const [reactListShow, setReactListShow] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null)

    const handleDeletePost = async (postId) => {
        try {
            await deletePostMutation.mutateAsync(postId);
        } catch (error) {
            console.error('Error deleting post:', error);
        }

    };

    const handleReactList = () => {
        setReactListShow(!reactListShow);
    }


    const handleDeleteClick = (postId) => {
        handleDeletePost(postId);
    }


    return (
        <div>
            <PostList
                postList={postList}
                handleDeletePost={handleDeletePost}
                handleDeleteClick={handleDeleteClick}
                handleReactList={handleReactList}
                reactListShow={reactListShow}
                user={user}
                setPostSelected={setIsPostSelected}
                setReactionColor={setReactionColor}
                setReactionIcon={setReactionIcon}
                setReactionText={setReactionText}
                reactionText={reactionText}
                reactionIcon={reactionIcon}
                reactionColor={reactionColor}
                postSelected={isPostSelected}
                setSelectedPost={setSelectedPost}
                selectedPost={selectedPost}
            />
        </div>
    );
}

export default PostListContainer;
