import React from 'react'
import useGetPostReactions from '../hooks/react/useGetPostReactions';
import Reactions from '../components/Reactions';

function ReactionContainer({postId}) {
    const {reactList} = useGetPostReactions(postId);
    const reactNbr = reactList.length;
  return (
    <Reactions
        reactNbr={reactNbr}
    />
  )
}

export default ReactionContainer