import React from 'react'
import Person from '../Assets/images/person.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function PostEdit(params) {

console.log(params)
    return (

        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className='flex justify-between'>
                    <p> </p>
                    <FontAwesomeIcon icon={faTimes} className='relative right-0 bg-green-custom rounded-full p-1 text-white cursor-pointer fa-solid' onClick={params.onClose}/>
                </div>
                
                {/* <h2 key={params.postId} className="text-2xl font-semibold mb-4">Edit Post</h2> */}
                <div className='inline-flex'>
                    <img src={Person} alt='userImage' className='w-8 h-8 rounded-full m-1'/>
                    <p className='m-1 font-semibold text-green-800'>PostOwnerName</p>
                </div>
                <div><textarea 
                    className='bg-transparent outline-none border-none overflow-hidden resize-none text-black h-30 w-80'
                    value={params.updatedText}
                    defaultValue={params.postBody} 
                    onChange={params.handleTextChange}
                /></div>
                

                <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-green-custom text-white rounded mr-4"
                        onClick={params.handleUpdateClick}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostEdit