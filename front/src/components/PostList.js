import React from 'react';
import PostCardContainer from '../containers/PostCardContainer';

function PostList({
                      postList,
                      handleDeleteClick,
                      handleReactList,
                      reactListShow,
                      user,
                      postSelected,
                      reactionColor,
                      setReactionColor,
                      reactionIcon,
                      setReactionIcon,
                      reactionText,
                      setReactionText,
                      setPostSelected,
                      setSelectedPost,
                      selectedPost,

                  }) {

    return (
        <>
            <div>
                {postList.map((post) => (
                    <>
                   
                    <PostCardContainer 
                        post={post}
                        setPostSelected={setPostSelected}
                        user={user}
                      postSelected={postSelected}
                      reactionColor={reactionColor}
                      setReactionColor={setReactionColor}
                      reactionIcon={reactionIcon}
                      setReactionIcon={setReactionIcon}
                      reactionText={reactionText}
                      setReactionText={setReactionText}
                      setSelectedPost={setSelectedPost}
                      selectedPost={selectedPost}
                      handleReactList={handleReactList}
                      reactListShow={reactListShow}
                      handleDeleteClick={handleDeleteClick}
                    />
                    </>
                ))}

            </div>
        </>
    );
}

export default PostList;
