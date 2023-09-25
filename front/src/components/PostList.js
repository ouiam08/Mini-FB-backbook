import React, { useState } from 'react';
import Mark from './../Assets/images/mark.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare, faThumbsUp, faClose, faBook } from '@fortawesome/free-solid-svg-icons';
import NewCommentContainer from '../containers/NewCommentContainer';
import CommentListContainer from '../containers/CommentListContainer';
import PostEdit from './PostEdit';

function PostList({
  postList,
  handleDeletePost,
  handleEditClick,
  handleUpdatePost,
  editPost,
  updatedPostData,
  setUpdatedPostData
}) {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleDeleteClick = (postId) => {
    handleDeletePost(postId);
    console.log("post deleted successfully", postId);
  }

  const handleEditPostClick = (postId) => {
    setSelectedPostId(postId);
  }
  const handleClosePostEdit = () =>{
    setSelectedPostId(null);
  }

  return (
    <div>
      {postList.map((post) => (
        <div key={post.id} className='bg-white w-auto rounded-lg p-6 mt-6 mb-6 m-20 shadow-md'>
          <div className='inline-flex ml-6 w-full'>
            <img src={Mark} alt='postownerimage' className='w-16 h-16 rounded-full p-2 cursor-pointer m-2' />
            <div className='mt-4'>
              <div className='text-green-800 font-beezee font-semibold'>postOwnerName</div>
              <div className='text-gray-400 font-beezee'>Il y a 1 heure</div>
            </div>
            <div className='ml-auto'>
              <FontAwesomeIcon icon={faBook} className='ml-8 text-gray-600 cursor-pointer' onClick={() => handleEditPostClick(post.id)} />
              <FontAwesomeIcon icon={faClose} className='ml-8 mr-8 text-gray-600 cursor-pointer' onClick={() => handleDeleteClick(post.id)} />
            </div>
          </div>
          <div className='ml-2 mr-2'>{post.body}</div>
          <div className='ml-4 mt-2 cursor-pointer'>
            <span>33</span>
            <FontAwesomeIcon icon={faThumbsUp} className='text-green-800 ml-2' />
          </div>
          <div className='mt-2'>
            <hr />
            <div className='flex justify-between m-2 ml-20 mr-20'>
              <div className='cursor-pointer'><FontAwesomeIcon icon={faThumbsUp} className='text-gray-500 text-xl mr-2' />React</div>
              <div className='cursor-pointer'><FontAwesomeIcon icon={faComment} className='text-gray-500 text-xl mr-2' />Comment</div>
              <div className='cursor-pointer'><FontAwesomeIcon icon={faShare} className='text-gray-500 text-xl mr-2' />Post</div>
            </div>
            <hr />
            <CommentListContainer postId={post.id} />
          </div>
          <NewCommentContainer postId={post.id} />
          {selectedPostId === post.id && <PostEdit 
                                  postId={post.id} 
                                  postBody={post.body} 
                                  handleEditClick={handleEditClick}
                                  editPost={editPost}
                                  onClose={handleClosePostEdit} 
                                  onUpdate={handleUpdatePost}/>}
        </div>
      ))}
    </div>
  );
}

export default PostList;
