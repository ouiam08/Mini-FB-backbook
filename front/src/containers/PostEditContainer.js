import React, {useState} from 'react';
import PostEdit from "../components/PostEdit";

const PostEditContainer = (params) => {
    const [updatedText, setUpdatedText] = useState(params.postBody);
    const handleUpdateClick = () => {
        console.log("En update", params.postId)
        const post = {
            id: params.postId,
            photo: null,
            body: updatedText,
        }
        params.handleEditClick(post);
        console.log(params.editPost)
        params.onUpdate(params.editPost);
    };
    const handleTextChange = (e) => {
        setUpdatedText(e.target.value);
    };

    return (
        <PostEdit
            handleTextChange={handleTextChange}
            handleUpdateClick={handleUpdateClick()}
        />
    );
};

export default PostEditContainer;