import React from 'react';
import BICON from './../../Assets/images/BIcon.jpg';
import Mark from './../../Assets/images/mark.jpg';

function Header() {
  const userName = "BBUserName";
  const userImage = Mark;
  return (
    <>
    <header className="bg-white text-black-900 p-4 text-center shadow-md p-4 flex items-center justify-between">
  <img src={BICON} alt='img' className='w-12 h-12 ml-3 cursor-pointer'/>
  <ul className="list-none inline-flex mr-4">
    <li className="mr-4">
      <a href="/" className="text-black font-semibold text-lg no-underline p-6">Home</a>
    </li>
    <li className="mr-4">
      <a href="/about" className="text-black font-semibold text-lg no-underline p-6">New Post</a>
    </li>
    <li>
      <a href="/contact" className="text-black font-semibold text-lg no-underline p-6">ChatBot</a>
    </li>
  </ul>
  <div className="inline-flex items-center cursor-pointer">
    <img src={userImage} alt='user' className='w-10 h-10 rounded-full p-2'/>
    <span>{userName}</span>
  </div>
</header>

    </>
  )
}

export default Header;