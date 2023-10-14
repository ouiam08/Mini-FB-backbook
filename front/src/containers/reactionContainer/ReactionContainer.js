import React from 'react'
import useAddReact from '../../hooks/react/useAddReact'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import useGetPostUserReactions from '../../hooks/react/useGetPostUserReactions';
import useDeleteReaction from '../../hooks/react/useDeleteReaction';
import useUpdateReaction from '../../hooks/react/useUpdateReaction';
import Reaction from "../../components/reactionComponents/Reaction";

function ReactionContainer({
                               post,
                               user,
                               setReactionColor,
                               setReactionIcon,
                               setReactionText
                           }) {
    const {insertReactionMutation} = useAddReact();
    const {deleteReactionMutation} = useDeleteReaction();
    const {updateReactionMutation} = useUpdateReaction();
    const {reactionList} = useGetPostUserReactions(post.id, user.id);
    const handleReaction = async (postId, type) => {
        try {
            if (reactionList.length === 0) {
                const defaultReaction = {
                    type: type,
                    post: post,
                    user: user
                };
                await insertReactionMutation.mutateAsync(defaultReaction);
                setReactionColor("text-blue-500");
                setReactionIcon(faThumbsUp);
                setReactionText(type);
            } else {
                const existingReaction = reactionList[0];
                if (existingReaction.type === type) {
                    await deleteReactionMutation.mutateAsync(existingReaction.id);
                    setReactionColor("text-gray-500");
                    setReactionIcon(faThumbsUp);
                    setReactionText("React");
                } else {
                    const updatedReaction = {
                        id: existingReaction.id,
                        type: type,
                        post: existingReaction.post,
                        user: existingReaction.user,
                    };
                    await updateReactionMutation.mutateAsync(updatedReaction);
                    setReactionColor("text-blue-500");
                    setReactionIcon(faThumbsUp);
                    setReactionText(type);
                }
            }
        } catch (error) {
            console.error('Error handling reaction:', error);
        }
    };


    return (
        <Reaction
            handleReaction={handleReaction}
            post={post}
        />
    )
}

export default ReactionContainer
