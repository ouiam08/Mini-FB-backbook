import React from 'react';
import Person from './../Assets/images/person.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faClose, faComment, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import NewCommentContainer from '../containers/NewCommentContainer';
import CommentListContainer from '../containers/CommentListContainer';
import PostEditContainer from "../containers/PostEditContainer";

function PostList({
                      postList,
                      handleDeleteClick,
                      user,
                      postSelected,
                      setPostSelected

                  }) {


    return (
        <>


            <div>
                {postList.map((post) => (
                    <div key={post.id} className='bg-white w-auto rounded-lg p-6 mt-6 mb-6 m-20 shadow-md'>
                        <div className='inline-flex ml-6 w-full'>
                            <img src={Person} alt='postownerimage'
                                 className='w-16 h-16 rounded-full p-2 cursor-pointer m-2'/>
                            <div className='mt-4'>
                                <div className='text-green-800 font-beezee font-semibold'>{post.user.name}</div>
                                <div className='text-gray-400 font-beezee'>{post.time}</div>
                            </div>
                            {user.id === post.user.id &&
                                <div className='ml-auto'>
                                    <FontAwesomeIcon
                                        icon={faBook}
                                        className='ml-8 text-gray-600 cursor-pointer'
                                        onClick={() => setPostSelected(post)}
                                    />
                                    <FontAwesomeIcon icon={faClose} className='ml-8 mr-8 text-gray-600 cursor-pointer'
                                                     onClick={() => handleDeleteClick(post.id)}/>

                                    {postSelected !== null && <PostEditContainer setPostSelected={setPostSelected}
                                                                                 postSelected={postSelected}/>}
                                </div>

                            }

                        </div>
                        <div className='ml-2 mr-2'>{post.body}</div>
                        <div className='ml-4 mt-2 cursor-pointer'>
                            <span>33</span>
                            <FontAwesomeIcon icon={faThumbsUp} className='text-green-800 ml-2 mr-3'/>
                            <span>{post.nbreComment}</span>
                            <FontAwesomeIcon icon={faComment} className='text-green-800 ml-2'/>
                        </div>

                        <div className='mt-2'>
                            <hr/>
                            <div className='flex justify-between m-2 ml-20 mr-20'>
                                <div className='cursor-pointer'><FontAwesomeIcon icon={faThumbsUp}
                                                                                 className='text-gray-500 text-xl mr-2'/>React
                                </div>
                                <div className='cursor-pointer'>
                                    <FontAwesomeIcon icon={faComment} className='text-gray-500 text-xl mr-2'/>
                                    Comment
                                </div>
                                <div className='cursor-pointer'><FontAwesomeIcon icon={faShare}
                                                                                 className='text-gray-500 text-xl mr-2'/>Post
                                </div>
                            </div>
                            <hr/>
                            {<CommentListContainer postId={post.id}/>}
                        </div>
                        <NewCommentContainer post={post}/>

                    </div>
                ))}

            </div>
        </>
    );
}

export default PostList;
