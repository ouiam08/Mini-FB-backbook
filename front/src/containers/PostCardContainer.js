import React, {useState} from 'react'
import PostCard from '../components/PostCard'
import useDeletePost from '../hooks/posts/useDeletePost';

function PostCardContainer({
    post,
    user,
    reactionColor,
    setReactionColor,
    reactionIcon,
    setReactionIcon,
    reactionText,
    setReactionText,
    setSelectedPost,
    selectedPost,
}) {
    const [showComments, setShowComments] = useState(false);
    const [postSelected, setPostSelected] = useState(null);
    const [reactListShow, setReactListShow] = useState(false);
    const {deletePostMutation} = useDeletePost();

    const handleDeletePost = async (postId) => {
        try {
            await deletePostMutation.mutateAsync(postId).then(setSelectedPost());
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
    postSelected={postSelected}
    reactionColor={reactionColor}
    setReactionColor={setReactionColor}
    reactionIcon={reactionIcon}
    setReactionIcon={setReactionIcon}
    reactionText={reactionText}
    setReactionText={setReactionText}
    setPostSelected={setPostSelected}
    setSelectedPost={setSelectedPost}
    selectedPost={selectedPost}
    setShowComments={setShowComments}
    showComments={showComments}
    />
    </>
  );
}

export default PostCardContainer