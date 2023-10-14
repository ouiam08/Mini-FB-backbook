import React from 'react';
import PostCardContainer from '../../containers/postContainer/PostCardContainer';

function PostList({
                      postList
                  }) {

    return (
        <>
            <div>
                {postList.map((post) => (
                    <PostCardContainer
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </>
    );
}

export default PostList;
