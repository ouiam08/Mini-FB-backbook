import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faTimes} from '@fortawesome/free-solid-svg-icons';

function PostEdit({
                      onClose,
                      userName,
                      updatedText,
                      handleTextChange,
                      handleUpdateClick,
                      updatedPhoto,
                      photo,
                      handleImageUpload
                  }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div className="bg-white bg-opacity-100 rounded-lg shadow-lg p-4 w-96">
                <div className="flex justify-between">
                    <p></p>
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="relative right-0 bg-green-custom rounded-full p-1 text-white cursor-pointer fa-solid"
                        onClick={onClose}
                    />
                </div>
                <div className="text-center">
                    <img
                        src={photo}
                        alt="userImage"
                        className="w-16 h-16 rounded-full mx-auto mb-2"
                    />
                    <p className="font-semibold text-green-800">{userName}</p>
                </div>
                <div className="mt-4">
                    <div className="bg-gray-100 rounded-lg p-2 text-black">
            <textarea
                className="outline-none bg-gray-100 border-none  w-full h-16 my-2"
                value={updatedText}
                onChange={handleTextChange}
            /> {updatedPhoto !== null && (
                        <div className="bg-gray-100 rounded-lg text-black">
                            <img
                                src={`data:image/png;base64,${updatedPhoto}`}
                                alt="updated Photo"
                                className="w-64 h-32 mx-auto"
                            />
                        </div>
                    )}
                    </div>
                    <label htmlFor="image-updated">
                        <FontAwesomeIcon
                            icon={faImage}
                            className="w-6 h-6 mr-6 text-green-800 cursor-pointer hover:text-green-600"
                        />
                    </label>
                    <input
                        id="image-updated"
                        type="file"
                        accept="image/*"
                        style={{display: 'none'}}
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-green-custom text-white rounded mr-4"
                        onClick={handleUpdateClick}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}


export default PostEdit