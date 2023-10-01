import React, {useState} from 'react';
import useGetPosts from '../hooks/posts/useGetPosts';
import useDeletePost from '../hooks/posts/useDeletePost';
import PostList from '../components/PostList';
import Cookies from "js-cookie";
import useGetUserByID from "../hooks/users/useGetUserByID";

function PostListContainer() {
    const {postList} = useGetPosts();
    const {deletePostMutation} = useDeletePost();
    const [displayCommentList, setDisplayCommentList] = useState(false);
    const user = useGetUserByID(Cookies.get('userID')).data;
    const [isPostSelected, setIsPostSelected] = useState(null)


    const handleDeletePost = async (postId) => {
        try {
            await deletePostMutation.mutateAsync(postId);
        } catch (error) {
            console.error('Error deleting post:', error);
        }

    };


    const handleCommentListDisplay = () => {
        setDisplayCommentList(!displayCommentList);
    };


    const handleDeleteClick = (postId) => {
        handleDeletePost(postId);
    }


    return (
        <div>
            <PostList
                postList={postList}
                handleDeletePost={handleDeletePost}
                displayCommentList={displayCommentList}
                handleCommentListDisplay={handleCommentListDisplay}
                handleDeleteClick={handleDeleteClick}
                user={user}
                setPostSelected={setIsPostSelected}
                postSelected={isPostSelected}

            />
        </div>
    );
}

export default PostListContainer;
