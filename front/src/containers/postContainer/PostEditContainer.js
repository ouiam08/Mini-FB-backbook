import React, {useState} from 'react';
import PostEdit from "../../components/postComponents/PostEdit";
import useGetUserByID from "../../hooks/users/useGetUserByID";
import Cookies from "js-cookie";
import useUpdatePost from "../../hooks/posts/useUpdatePost";

const PostEditContainer = ({setSelectedPostForEdit, selectedPostForEdit}) => {
    const [updatedText, setUpdatedText] = useState(selectedPostForEdit.body);
    const [updatedPhoto, setUpdatedPhoto] = useState(selectedPostForEdit.photo)
    const userId = Cookies.get('userID');
    const {user} = useGetUserByID(userId);
    const {updatePostMutation} = useUpdatePost();
    const handleUpdatePost = async () => {
        try {
            const updatedPost = {
                id: selectedPostForEdit.id,
                photo: updatedPhoto,
                body: updatedText,
                user: user
            };

            await updatePostMutation.mutateAsync(updatedPost);
            setSelectedPostForEdit(null)
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleClosePostEdit = () => {
        setSelectedPostForEdit(null)
    }
    const handleTextChange = (e) => {
        setUpdatedText(e.target.value);
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const base64Image = e.target.result.split(",")[1];
                setUpdatedPhoto(base64Image)
            };

            reader.readAsDataURL(file);
        }
    };
    return (
        <PostEdit
            onClose={handleClosePostEdit}
            userName={user.name}
            updatedText={updatedText}
            handleTextChange={handleTextChange}
            handleUpdateClick={handleUpdatePost}
            handleImageUpload={handleImageUpload}
            updatedPhoto={updatedPhoto}
            photo={`data:image/png;base64,${user.photo}`}
        />
    );
};

export default PostEditContainer;