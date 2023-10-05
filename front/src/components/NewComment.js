import Mark from './../Assets/images/mark.jpg';
import Button from '../../../front/src/components/Common/Button';

function NewComment({
    handleAddComment,
    newCommentData,
    handleInputChange,
    handleChange,
    handleCommentSubmit,
    comment,
    postId,
}) {


    return (
        <>
            <div className='inline-flex w-full m-2'>
                <img src={Mark} alt='user' className='rounded-full w-10 h-10 mr-4 cursor-pointer'/>
                <div className='bg-gray-200 text-gray-600 rounded-full p-2 w-screen mr-4 cursor-pointer'>
                <textarea
                    className="w-full h-2 pb-6 bg-transparent outline-none border-none overflow-hidden resize-none"
                    placeholder="Write a comment"
                    value={comment}
                    onChange={handleChange}
                >
                </textarea>
                </div>
                <Button text="Comment" icon={false} className='' click={() => handleCommentSubmit(postId)}/>
            </div>
        </>
    )
}

export default NewComment