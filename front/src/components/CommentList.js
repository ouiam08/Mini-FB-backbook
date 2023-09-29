import React from 'react'
import Person from '../Assets/images/person.jpg';

function CommentList(
    props
) {
    return (
        <>
            <div>
                {props.commentList.map((comment) => (
                    <div key={comment.id} className='inline-flex w-full'>
                        <img src={Person} alt='' className='w-6 h-6 rounded-full m-4'/>
                        <div className='bg-gray-50 rounded-lg w-full m-2'>
                           <h3 className='m-2 font-bold'>{comment.user.name}</h3>
                            <p className='m-2 '>{comment.body}</p> 
                        </div>
                        
                    </div>
                ))}
            </div>

        </>
    )
}

export default CommentList