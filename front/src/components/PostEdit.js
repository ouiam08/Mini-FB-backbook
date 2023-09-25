import React from 'react'

function PostEdit(params) {
    const handleUpdateClick = () => {
       console.log("En update", params.postId)
       const post ={
        id: params.postId,
        photo: null,
        body: "hiiiiiiiiiiii",
       }
       params.handleEditClick(post);
       console.log(params.editPost)
       params.onUpdate(params.editPost);
      };
    
      return (
        
        <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 key={params.postId} className="text-2xl font-semibold mb-4">Edit Post</h2>
        <textarea>{params.postBody}</textarea>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
            onClick={handleUpdateClick}
          >
            Update
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
            onClick={params.onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
      );
}

export default PostEdit