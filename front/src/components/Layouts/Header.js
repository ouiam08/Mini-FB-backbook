import React from 'react';
import BICON from './../../Assets/images/BIcon.jpg';
import Mark from './../../Assets/images/mark.jpg';
import Cookies from "js-cookie";

function Header({name, handleDeconnexion}) {
    const userImage = Mark;

    return (
        <>
            <header className="bg-white text-black-900 p-4 text-center shadow-md p-4 flex items-center justify-between">
                <a href='/'><img src={BICON} alt='img' className='w-12 h-12 ml-3 cursor-pointer'/></a>
                {Cookies.get('userID') !== '0' && <div className='inline-flex'>
                    <a href='/profile'>
                        <div className="inline-flex items-center cursor-pointer">
                            <img src={userImage} alt='user' className='w-10 h-10 rounded-full p-2'/>
                            <span>{name}</span>
                        </div>
                    </a>
                    <div className='ml-6'>
                        <button
                            className='bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
                            onClick={handleDeconnexion}>Deconnexion
                        </button>
                    </div>
                </div>}
            </header>
        </>
    );
}

export default Header;
