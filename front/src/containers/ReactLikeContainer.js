import React from 'react'
import ReactLike from '../components/ReactLike'
import useAddReact from '../hooks/react/useAddReact'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function ReactLikeContainer({
    postt,
    userr,
    setReactionColor,
    setReactionIcon,
    setReactionText
}) {
    const {insertReactionMutation} = useAddReact();

    
    const handleAddReaction = async (type) => {
        try {
            const defaultReaction = {
                type: type,
                post: postt,
                user: userr
            };
            await insertReactionMutation.mutateAsync(defaultReaction);
            setReactionColor("text-blue-500");
            setReactionIcon(faThumbsUp);
            setReactionText("Like");
        } catch (error) {
            console.error('Error inserting reaction:', error);
        }
    };
  
  return (
    <ReactLike
        handleAddReaction={handleAddReaction}
    />
  )
}

export default ReactLikeContainer
