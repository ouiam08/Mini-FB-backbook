import React, {useState} from 'react';
import useGetPosts from '../hooks/posts/useGetPosts';
import useDeletePost from '../hooks/posts/useDeletePost';
import PostList from '../components/PostList';
import Cookies from "js-cookie";
import useGetUserByID from "../hooks/users/useGetUserByID";
import useGetPostComments from "../hooks/comments/useGetPostComments";

function PostListContainer() {
    const {postList} = useGetPosts();
    const {deletePostMutation} = useDeletePost();
    const [deleteCalled, setDeleteCalled] = useState(false);
    const [displayCommentList, setDisplayCommentList] = useState(false);
    const user = useGetUserByID(Cookies.get('userID')).data;
    const [isPostSelected, setIsPostSelected] = useState(null)


    const handleDeletePost = async (postId) => {
        if (!deleteCalled) {
            try {
                await deletePostMutation.mutateAsync(postId);
                setDeleteCalled(true);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };


    const handleCommentListDisplay = () => {
        setDisplayCommentList(!displayCommentList);
    };


    const handleDeleteClick = (postId) => {
        handleDeletePost(postId);
        console.log("post deleted successfully", postId);
    }


    function NbreComment(postId) {
        const {commentList} = useGetPostComments(postId);
        return commentList.length;
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
                nbreComment={NbreComment}
                setPostSelected={setIsPostSelected}
                postSelected={isPostSelected}

            />
        </div>
    );
}

export default PostListContainer;
