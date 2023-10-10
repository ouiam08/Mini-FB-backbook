import React from 'react'
import ReactLove from '../components/ReactLove'
import useAddReact from '../hooks/react/useAddReact'
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import useGetPostUserReactions from '../hooks/react/useGetPostUserReactions';
import useDeleteReaction from '../hooks/react/useDeleteReaction';

function ReactLoveContainer({
    postt,
    userr,
    setReactionColor,
    setReactionIcon,
    setReactionText
}) {
    const {insertReactionMutation} = useAddReact();
    const {deleteReactionMutation} = useDeleteReaction();
    const {reactionList} = useGetPostUserReactions(postt.id, userr.id);

    
    const handleReaction = async (postId, type) => {
        try {
            const defaultReaction = {
                type: type,
                post: postt,
                user: userr
            };
            
            if(reactionList.length === 0){
                await insertReactionMutation.mutateAsync(defaultReaction);
                setReactionColor((prevColors) => ({
                    ...prevColors,
                    [postId]: "text-red-500",
                  }));
                  setReactionIcon((prevIcons) => ({
                    ...prevIcons,
                    [postId]: faHeart,
                }));
                setReactionText((prevTexts)=> ({
                    ...prevTexts ,
                    [postId] : type,
                }));
            }
        } catch (error) {
            console.error('Error inserting reaction:', error);
        }
        try{
            if(reactionList.length === 1 && reactionList[0].type === "Love "){
                await deleteReactionMutation.mutateAsync(reactionList[0].id);
                setReactionColor((prevColors) => ({
                    ...prevColors,
                    [postId]: "text-gray-500",
                  }));
                setReactionIcon((prevIcons) => ({
                    ...prevIcons,
                    [postId]: faThumbsUp,
                }));
                setReactionText((prevTexts)=> ({
                    ...prevTexts ,
                    [postId] : "React",
                }));
            }
        }catch(error){
            console.error('error when deleting reaction');
        }
    };
  
  return (
    <ReactLove
        handleReaction={handleReaction}
        post={postt}
    />
  )
}

export default ReactLoveContainer
