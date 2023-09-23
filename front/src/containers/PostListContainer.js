import React from "react";
import useGetAllPosts from "../hooks/posts/useGetPosts";
import PostList from "../components/PostList";
function PostListContainer() {
  const {  postList } = useGetAllPosts();
  return (
    <div>
      <PostList postList={postList} />
    </div>
  );
}

export default PostListContainer;
