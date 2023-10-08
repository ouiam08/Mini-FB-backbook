import React from 'react'
import ReactLove from '../components/ReactLove'
import useAddReact from '../hooks/react/useAddReact'
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function ReactLoveContainer({
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
            setReactionColor("text-red-500");
            setReactionIcon(faHeart);
            setReactionText("Love");
        } catch (error) {
            console.error('Error inserting reaction:', error);
        }
    };
  
  return (
    <ReactLove
        handleAddReaction={handleAddReaction}
    />
  )
}

export default ReactLoveContainer
