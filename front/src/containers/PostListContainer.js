import React, {useState} from 'react';
import useGetPosts from '../hooks/posts/useGetPosts';
import useDeletePost from '../hooks/posts/useDeletePost';
import useUpdatePost from '../hooks/posts/useUpdatePost';
import PostList from '../components/PostList';
import Cookies from "js-cookie";
import useGetUserByID from "../hooks/users/useGetUserByID";
import useGetPostComments from "../hooks/comments/useGetPostComments";

function PostListContainer() {
    const {postList} = useGetPosts();
    const {deletePostMutation} = useDeletePost();
    const {updatePostMutation} = useUpdatePost();
    const [deleteCalled, setDeleteCalled] = useState(false);
    const [editPost, setEditPost] = useState(null);
    const [updatedPostData, setUpdatedPostData] = useState({photo: [], body: ''});
    const [selectedPostId, setSelectedPostId] = useState(null);
    const userId = Cookies.get('userID');
    const user = useGetUserByID(userId).data;



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


    const handleEditClick = (post) => {
        setEditPost(post);
        setUpdatedPostData({photo: post.photo, body: post.body});
    };

    const handleUpdatePost = async () => {
        try {
            const updatedPost = {
                id: editPost.id,
                photo: updatedPostData.photo,
                body: updatedPostData.body,
                user: user
            };

            await updatePostMutation.mutateAsync(updatedPost);
            setEditPost(null);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };


    const handleDeleteClick = (postId) => {
        handleDeletePost(postId);
        console.log("post deleted successfully", postId);
    }

    const handleEditPostClick = (postId) => {
        setSelectedPostId(postId);
    }
    const handleClosePostEdit = () => {
        setSelectedPostId(null);
    }

    const handleDeconnexion = () => {
        Cookies.set('userID', 0)
        window.location.href = '/signin'
    }
     function NbreComment   (postId){
        const {commentList} = useGetPostComments(postId);
        return commentList.length;
    }



    return (
        <div>
            <PostList
                postList={postList}
                handleDeletePost={handleDeletePost}
                handleEditClick={handleEditClick}
                handleUpdatePost={handleUpdatePost}
                editPost={editPost}
                updatedPostData={updatedPostData}
                setUpdatedPostData={setUpdatedPostData}
                handleDeconnexion={handleDeconnexion}
                handleClosePostEdit={handleClosePostEdit}
                handleEditPostClick={handleEditPostClick}
                handleDeleteClick={handleDeleteClick}
                selectedPostId={selectedPostId}
                userId={userId}
                nbreComment={NbreComment}
            />
        </div>
    );
}

export default PostListContainer;
