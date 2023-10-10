import React from 'react'
import Person from './../Assets/images/person.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faClose, faComment, faHeart, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import NewCommentContainer from '../containers/NewCommentContainer';
import CommentListContainer from '../containers/CommentListContainer';
import PostEditContainer from "../containers/PostEditContainer";
import ReactionContainer from '../containers/ReactionContainer';
import ReactLikeContainer from '../containers/ReactLikeContainer';
import ReactLoveContainer from '../containers/ReactLoveContainer';

function PostCard({
    post,
    handleDeleteClick,
                      handleReactList,
                      reactListShow,
                      user,
                      postSelected,
                      reactionColor,
                      setReactionColor,
                      reactionIcon,
                      setReactionIcon,
                      reactionText,
                      setReactionText,
                      setPostSelected,
                      setSelectedPost,
                      selectedPost,
                      showComments,
                      setShowComments
}) {
  return (
    <>
    <div key={post.id} className='bg-white w-auto rounded-lg p-6 mt-6 mb-6 m-40 shadow-md'>
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
                                        className='ml-8 bg-green-800 text-white rounded-full p-2 cursor-pointer'
                                        onClick={() => setPostSelected(post)}
                                    />
                                    <FontAwesomeIcon icon={faClose}
                                                     className='ml-8 mr-8 bg-green-800 text-white rounded-full p-2 cursor-pointer'
                                                     onClick={() => handleDeleteClick(post.id)}/>

                                    {postSelected !== null && <PostEditContainer setPostSelected={setPostSelected}
                                                                        postSelected={postSelected}/>}
                                </div>
                            }
                        </div>
                        <div className='ml-2 mr-2'>{post.body}</div>
                        <div className='ml-4 mt-2 cursor-pointer'>

                            <ReactionContainer postId={post.id}/>
                            <FontAwesomeIcon icon={faThumbsUp} className='text-blue-500 rounded-full  ml-2 mb-0'/>
                            <FontAwesomeIcon icon={faHeart} className='text-red-600 rounded-full  mr-4'/>
                            <span>{post.nbreComment}</span>
                            <FontAwesomeIcon icon={faComment} className='text-green-800 ml-2'/>
                        </div>

                        <div className='mt-2'>
                            <hr/>
                            {reactListShow && <span className='bg-gray-100 p-2 rounded-lg relative left-20 bottom-2'>
                                    <ReactLikeContainer postt={post} userr={user} setReactionColor={setReactionColor} setReactionIcon={setReactionIcon} setReactionText={setReactionText}/>
                                    <ReactLoveContainer postt={post} userr={user} setReactionColor={setReactionColor} setReactionIcon={setReactionIcon} setReactionText={setReactionText}/>
                                    </span>

                            }
                            <div className='flex justify-between m-2 ml-20 mr-20'>
                            <div className={`${reactionColor[post.id] ? reactionColor[post.id] : "text-gray-500"} cursor-pointer`} onClick={()=>handleReactList()}>
                                    <FontAwesomeIcon icon={reactionIcon[post.id] ? reactionIcon[post.id] : faThumbsUp}
                                                    className={`${reactionColor[post.id] ? reactionColor[post.id] : "text-gray-500"} text-xl mr-2 `}
                                    />
                                    {reactionText[post.id] ? reactionText[post.id] : "React"} 
                                </div>

                                <div className='cursor-pointer'
                                     onClick={() => setShowComments(!showComments)}>
                                    <FontAwesomeIcon icon={faComment} className='text-gray-500 text-xl mr-2'/>
                                    Comment
                                </div>
                                <div className='cursor-pointer'><FontAwesomeIcon icon={faShare}
                                                                                 className='text-gray-500 text-xl mr-2'/>Post
                                </div>
                            </div>
                            <hr/>
                            {showComments && <CommentListContainer post={post}/>}
                        </div>
                        <NewCommentContainer post={post}/>

                    </div>
    </>
  )
}

export default PostCard