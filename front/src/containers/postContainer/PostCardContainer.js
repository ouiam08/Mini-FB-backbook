import React, {useEffect, useState} from 'react'
import PostCard from '../../components/postComponents/PostCard'
import useDeletePost from '../../hooks/posts/useDeletePost';
import Cookies from "js-cookie";
import useGetUserByID from "../../hooks/users/useGetUserByID";
import useGetPostUserReactions from "../../hooks/react/useGetPostUserReactions";
import {faHeart, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import useInsertPost from "../../hooks/posts/useInsertPost";

function PostCardContainer({
                               post
                           }) {
    const [showComments, setShowComments] = useState(false);
    const [selectedPostForEdit, setSelectedPostForEdit] = useState(null);
    const [reactListShow, setReactListShow] = useState(false);
    const {deletePostMutation} = useDeletePost();
    const [reactionColor, setReactionColor] = useState(null);
    const [reactionIcon, setReactionIcon] = useState(null)
    const [reactionText, setReactionText] = useState(null);
    const userId = Cookies.get('userID');
    const {user} = useGetUserByID(userId);
    const {reactionList} = useGetPostUserReactions(post.id, userId);
    const {insertPostMutation} = useInsertPost();


    useEffect(() => {
        if (reactionList.length === 0) {
            setReactionText("React");
            setReactionIcon(faThumbsUp);
            setReactionColor("text-gray-500");
        } else {
            const loveReaction = reactionList.find(reaction => reaction.type === "Love ");
            if (loveReaction) {
                setReactionText("Love ");
                setReactionIcon(faHeart);
                setReactionColor("text-red-600");
            } else {
                setReactionText("Like ");
                setReactionIcon(faThumbsUp);
                setReactionColor("text-blue-500");
            }
        }
    }, [reactionList]);
    const handeRepostPost = async (postSected) => {
        console.log(postSected)
        try {
            const defaultPost = {
                photo: postSected.photo,
                body: postSected.body,
                user: user
            };
            await insertPostMutation.mutateAsync(defaultPost);

        } catch (error) {
            console.error('Error inserting post:', error);
        }
    }

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
            handeRepostPost={handeRepostPost}
        />

    );
}

export default PostCardContainer