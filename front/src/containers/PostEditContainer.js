import React, {useState} from 'react';
import PostEdit from "../components/PostEdit";
import useGetUserByID from "../hooks/users/useGetUserByID";
import Cookies from "js-cookie";
import useUpdatePost from "../hooks/posts/useUpdatePost";

const PostEditContainer = (props) => {
    console.log(props.post)
    const [updatedText, setUpdatedText] = useState(props.postSelected.body);
    const user = useGetUserByID(Cookies.get('userID')).data;
    const {updatePostMutation} = useUpdatePost();
    const handleUpdatePost = async () => {
        try {
            const updatedPost = {
                id: props.postSelected.id,
                photo: props.postSelected.photo,
                body: updatedText,
                user: user
            };

            await updatePostMutation.mutateAsync(updatedPost);
            props.setPostSelected(null)
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleClosePostEdit = () => {
        props.setPostSelected(null)
    }
    const handleTextChange = (e) => {
        setUpdatedText(e.target.value);
    };

    return (
        <PostEdit
            onClose={handleClosePostEdit}
            userName={user.name}
            updatedText={updatedText}
            handleTextChange={handleTextChange}
            handleUpdateClick={handleUpdatePost}
        />
    );
};

export default PostEditContainer;