import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook, faClose, faComment, faHeart, faShare, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import NewCommentContainer from '../../containers/commentContainer/NewCommentContainer';
import CommentListContainer from '../../containers/commentContainer/CommentListContainer';
import PostEditContainer from "../../containers/postContainer/PostEditContainer";
import ReactionContainer from '../../containers/reactionContainer/ReactionContainer';

function PostCard({
                      post,
                      handleDeleteClick,
                      handleReactList,
                      reactListShow,
                      user,
                      selectedPostForEdit,
                      reactionColor,
                      setReactionColor,
                      reactionIcon,
                      setReactionIcon,
                      reactionText,
                      setReactionText,
                      setSelectedPostForEdit,
                      showComments,
                      setShowComments,
                      handeRepostPost
                  }) {
    return (
        <>
            <div key={post.id} className='bg-white w-auto rounded-lg p-6 mt-6 mb-6 m-40 shadow-md'>
                <div className='inline-flex ml-6 w-full'>
                    <a href={"profile/" + post.user.id}>
                        <img src={`data:image/png;base64,${post.user.photo}`} alt='postownerimage'
                             className='w-16 h-16 rounded-full p-2 cursor-pointer m-2'/> </a>
                    <div className='mt-4'>
                        <a href={"profile/" + post.user.id}>
                            <div className='text-green-800 font-beezee font-semibold'>{post.user.name}</div>
                        </a>
                        <div className='text-gray-400 font-beezee'>{post.time}</div>
                    </div>
                    {user.id === post.user.id &&
                        <div className='ml-auto'>
                            <FontAwesomeIcon
                                icon={faBook}
                                className='ml-8 bg-green-800 text-white rounded-full p-2 cursor-pointer'
                                onClick={() => setSelectedPostForEdit(post)}
                            />
                            <FontAwesomeIcon icon={faClose}
                                             className='ml-8 mr-8 bg-green-800 text-white rounded-full p-2 cursor-pointer'
                                             onClick={() => handleDeleteClick(post.id)}/>

                            {selectedPostForEdit !== null &&
                                <PostEditContainer setSelectedPostForEdit={setSelectedPostForEdit}
                                                   selectedPostForEdit={selectedPostForEdit}/>}
                        </div>
                    }
                </div>
                <div className='ml-2 mr-2'>
                    <div>{post.body}</div>
                    {post.photo !== null && (
                        <div className="flex items-center justify-center">
                            <img
                                src={`data:image/png;base64,${post.photo}`}
                                alt="Post Image"
                                className="w-64 h-64 object-cover"
                            />
                        </div>
                    )}

                </div>
                <div className='ml-4 mt-2 cursor-pointer'>

                    <span>{post.nbreReaction}</span>
                    <FontAwesomeIcon icon={faThumbsUp} className='text-blue-500 rounded-full  ml-2 mb-0'/>
                    <FontAwesomeIcon icon={faHeart} className='text-red-600 rounded-full  mr-4'/>
                    <span>{post.nbreComment}</span>
                    <FontAwesomeIcon icon={faComment} className='text-green-800 ml-2'/>
                </div>

                <div className='mt-2'>
                    <hr/>
                    {reactListShow && (
                        <span className='bg-gray-100 p-2 rounded-lg relative left-20 bottom-2 z-20' style={{zIndex: 1}}>
                <ReactionContainer post={post} user={user} setReactionColor={setReactionColor}
                                   setReactionIcon={setReactionIcon} setReactionText={setReactionText}/>
            </span>
                    )}

                    <div className='flex justify-between m-2 ml-20 mr-20'>
                        <div className={`${reactionColor} cursor-pointer`} onMouseEnter={() => handleReactList()}>
                            <FontAwesomeIcon icon={reactionIcon} className={`${reactionColor} text-xl mr-2`}/>
                            {reactionText}
                        </div>

                        <div className='cursor-pointer'
                             onClick={() => setShowComments(!showComments)}>
                            <FontAwesomeIcon icon={faComment} className='text-gray-500 text-xl mr-2'/>
                            Comment
                        </div>
                        <div className='cursor-pointer'
                             onClick={() => handeRepostPost(post)}><FontAwesomeIcon icon={faShare}
                                                                                    className='text-gray-500 text-xl mr-2'/>Repost
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