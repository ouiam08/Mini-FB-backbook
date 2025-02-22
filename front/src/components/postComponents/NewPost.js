import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faPalette, faSmile} from '@fortawesome/free-solid-svg-icons';
import Button from '../Common/Button';

function NewPost(props) {
    return (
        <>
            <div className='bg-white w-auto rounded-lg p-6 mt-6 mb-6 m-40 shadow-md'>
                <div className='inline-flex w-full'>
                    <img src={props.photo} alt='mark' className='w-16 h-16 rounded-full p-2 cursor-pointer'/>
                    <div className={`rounded-lg m-4 w-full p-4 ${props.bgColor}`}>
            <textarea
                className="w-full h-20 p-2 bg-transparent outline-none border-none overflow-hidden resize-none"
                placeholder="What's on your mind?"
                value={props.text}
                onChange={props.handleChange}
            ></textarea>
                        {props.selectedImage && (
                            <img
                                src={`data:image/png;base64,${props.selectedImage}`}
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
                                className="w-6 h-6 mr-6 text-green-800 cursor-pointer hover:text-green-600"
                            />
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            style={{display: 'none'}}
                            onChange={props.handleImageUpload}
                        />
                        <FontAwesomeIcon icon={faSmile}
                                         className="w-6 h-6 mr-6 text-yellow-500 cursor-pointer hover:text-yellow-400"/>
                        <FontAwesomeIcon icon={faPalette}
                                         className="w-6 h-6 mr-6 text-blue-600 cursor-pointer hover:text-blue-500"
                                         onClick={props.handleBgColorChange}/>
                    </div>
                    <Button text="Share" iconn={true}
                            className="flex-end bg-green-500 hover:bg-green-900 text-white rounded-lg p-2 "
                            click={props.handleShareClick}/>
                </div>
            </div>
        </>
    )
}

export default NewPost;
