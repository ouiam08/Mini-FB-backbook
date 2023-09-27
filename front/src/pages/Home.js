import React from 'react'
import PostListContainer from '../containers/PostListContainer'
import Header from '../components/Layouts/Header'
import NewPostContainer from '../containers/NewPostContainer'
import Footer from '../components/Layouts/Footer'
import Cookies from "js-cookie";



function Home() {
    const handleDeconnexion = () => {
        Cookies.set('userID', 0)
        window.location.href = '/signin'
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');

    return (
        <div className='bg-gray-200'>
            <Header handleDeconnexion={handleDeconnexion} username={username}/>
            <NewPostContainer/>
            <PostListContainer/>
            <Footer/>
        </div>
    )
}

export default Home