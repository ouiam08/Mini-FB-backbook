import React from 'react';
import { useState } from 'react';
import Mark from './../Assets/images/mark.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import Button from './Common/Button';


function NewPost(props) {
    const [text, setText] = useState('');
    const userId = 1;
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
    console.log("post",post);
    props.handleAddPost(post);
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
    <>
        <div className='bg-white w-auto rounded-lg p-6 mt-6 mb-6 m-20 shadow-md'>
            <div className='inline-flex w-full'>
                <img src={Mark} alt='mark' className='w-16 h-16 rounded-full p-2 cursor-pointer'/>
                <div className={`rounded-lg m-4 w-full p-4 ${bgColor}`}>
                    <textarea
                        className="w-full h-20 p-2 bg-transparent outline-none border-none overflow-hidden resize-none"
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={handleChange}
                    ></textarea>     
                    {selectedImage && (
                        <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-64 h-32 p-2"
                        />
                    )} 
                </div>  
            </div>
            <div className='flex items-center justify-between px-9 w-full'>
                <div className='flex items-center'>
                    <label htmlFor="image-upload">
                        <FontAwesomeIcon
                        icon={faImage}
                        className="w-6 h-6 mr-6 text-green-800 cursor-pointer"
                        />
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    <FontAwesomeIcon icon={faSmile} className="w-6 h-6 mr-6 text-yellow-500 cursor-pointer" />            
                    <FontAwesomeIcon icon={faPalette} className="w-6 h-6 mr-6 text-blue-600 cursor-pointer" onClick={handleBgColorChange}/>
                </div>
            <Button text="Share" iconn={true} className="flex-end" click={handleShareClick}/>
            </div>
        </div>
    </>
  )
}

export default NewPost