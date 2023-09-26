import React, { useState } from 'react';
import { useInsertPost } from '../hooks/posts/useInsertPost';
import NewPost from '../components/NewPost';
import Cookies from "js-cookie";
import useGetUserByID from "../hooks/users/useGetUserByID";
import Mark from "../Assets/images/mark.jpg";

function NewPostContainer() {
  const { insertPostMutation } = useInsertPost();
  const [newPostData, setNewPostData] = useState({ photo: null, body: '' , userId: ''});
    const user = useGetUserByID(Cookies.get('userID')).data;


  const handleAddPost = async (post) => {
    try {
      const defaultPost = {
        photo: null,
        body: post.postBody,
        user: user
      };
console.log("default: ", defaultPost);
      await insertPostMutation.mutateAsync(defaultPost);

      setNewPostData({ photo: null, body: '' , userId: ''});
    } catch (error) {
      console.error('Error inserting post:', error);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPostData({ ...newPostData, [name]: value });
  };

    const [text, setText] = useState('');
    const userId = Cookies.get('userID');
    const [bgColor, setBgColor] = useState('bg-gray-200');
    const [bgColorIndex, setBgColorIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleShareClick = () => {
        const post = {
            photo: Mark,
            postBody: text,
            userId: userId,
            postColor: bgColor
        };
        handleAddPost(post);
        setText('');
    };

    const handleBgColorChange = () => {
        const tb = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-red-200', 'bg-gray-200'];
        setBgColorIndex((prevIndex) => (prevIndex + 1) % tb.length);
        setBgColor(()=>tb[bgColorIndex]);
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

  return (
    <div>
      <NewPost
        handleAddPost={handleAddPost}
        newPostData={newPostData}
        handleInputChange={handleInputChange}
        handleImageUpload={handleImageUpload}
        handleBgColorChange={handleBgColorChange}
        handleShareClick={handleShareClick}
        handleChange={handleChange}
        selectedImage={selectedImage}
        text={text}
        bgColor={bgColor}
      />
    </div>
  );
}

export default NewPostContainer;
