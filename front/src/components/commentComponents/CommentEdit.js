import React from 'react'

function CommentEdit(props
) {
    return (
        <div>
        <textarea
            className='bg-gray-50 rounded-lg ml-4 outline-none border-none overflow-hidden resize-none text-black w-full h-10'
            value={props.selectedComment}
            onChange={props.handleTextChange}
        />
            <button className='bg-green-800 rounded-lg text-white ml-6 m-1 p-1 text-sm '
                    onClick={props.handleSaveComment}>Update
            </button>
        </div>
    )
}

export default CommentEdit