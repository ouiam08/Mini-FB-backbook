import React from 'react'
import ReactLike from '../components/ReactLike'
import useAddReact from '../hooks/react/useAddReact'
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import useGetPostUserReactions from '../hooks/react/useGetPostUserReactions';
import useDeleteReaction from '../hooks/react/useDeleteReaction';
import useUpdateReaction from '../hooks/react/useUpdateReaction';

function ReactLikeContainer({
    postt,
    userr,
    setReactionColor,
    setReactionIcon,
    setReactionText
}) {
    const {insertReactionMutation} = useAddReact();
    const {deleteReactionMutation} = useDeleteReaction();
    const {updateReactionMutation} = useUpdateReaction();
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
                    [postId]: "text-blue-500",
                  }));
                setReactionIcon((prevIcons) => ({
                    ...prevIcons,
                    [postId]: faThumbsUp,
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
            if(reactionList.length === 1 && reactionList[0].type === "Like "){
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
            }else return;
        }catch(error){
            console.error('error when deleting reaction');
        }
        try {
            if(reactionList.length === 1 && reactionList[0].type === "Love "){
            const updatedReaction = {
                id: reactionList[0].id,
                type: "Like ",
                post: reactionList[0].post,
                user: reactionList[0].user,
                isReacted: reactionList[0].isReacted
            }
                await updateReactionMutation.mutateAsync(updatedReaction);
                setReactionColor((prevColors) => ({
                    ...prevColors,
                    [postId]: "text-blue-500",
                  }));
                setReactionIcon((prevIcons) => ({
                    ...prevIcons,
                    [postId]: faThumbsUp,
                }));
                setReactionText((prevTexts)=> ({
                    ...prevTexts ,
                    [postId] : "Like",
                }));
            }

        } catch (error) {
            console.error("Error updating reaction:", error);
        }
    };
  
  return (
    <ReactLike
        handleReaction={handleReaction}
        post={postt}
    />
  )
}

export default ReactLikeContainer
