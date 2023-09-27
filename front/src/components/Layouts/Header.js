import React from 'react';
import BICON from './../../Assets/images/BIcon.jpg';
import Mark from './../../Assets/images/mark.jpg';

function Header() {
    const userName = "BBUserName";
    const userImage = Mark;
    return (
        <>
            <header className="bg-white text-black-900 p-4 text-center shadow-md p-4 flex items-center justify-between">
                <a href='/'><img src={BICON} alt='img' className='w-12 h-12 ml-3 cursor-pointer'/></a>
                <a href='/profile'>
                    <div className="inline-flex items-center cursor-pointer">
                        <img src={userImage} alt='user' className='w-10 h-10 rounded-full p-2'/>
                        <span>{userName}</span>
                    </div>
                </a>

            </header>

        </>
    )
}

export default Header;