import React, {useState} from 'react'
import PostCard from '../components/PostCard'
import useDeletePost from '../hooks/posts/useDeletePost';
import Cookies from "js-cookie";
import useGetUserByID from "../hooks/users/useGetUserByID";

function PostCardContainer({
    post
}) {
    const [showComments, setShowComments] = useState(false);
    const [selectedPostForEdit, setSelectedPostForEdit] = useState(null);
    const [reactListShow, setReactListShow] = useState(false);
    const {deletePostMutation} = useDeletePost();
    const [reactionColor, setReactionColor] = useState({});
    const [reactionIcon, setReactionIcon] = useState({})
    const [reactionText, setReactionText] = useState({});
    const userId = Cookies.get('userID');
    const {user} = useGetUserByID(userId);

    

    

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
    <>
    <PostCard
    post={post}
    handleDeleteClick={handleDeleteClick}
    handleReactList={handleReactList}
    reactListShow={reactListShow}
    user={user}
    selectedPostForEdit={selectedPostForEdit}
    reactionColor={reactionColor}
    setReactionColor={setReactionColor}
    reactionIcon={reactionIcon}
    setReactionIcon={setReactionIcon}
    reactionText={reactionText}
    setReactionText={setReactionText}
    setSelectedPostForEdit={setSelectedPostForEdit}
    setShowComments={setShowComments}
    showComments={showComments}
    />
    </>
  );
}

export default PostCardContainer