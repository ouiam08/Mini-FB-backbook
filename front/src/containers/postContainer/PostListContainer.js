import React from 'react';
import useGetPosts from '../../hooks/posts/useGetPosts';
import PostList from '../../components/postComponents/PostList';

function PostListContainer() {

    const {postList} = useGetPosts();

    return (
        <div>
            <PostList
                postList={postList}
            />
        </div>
    );
}

export default PostListContainer;
