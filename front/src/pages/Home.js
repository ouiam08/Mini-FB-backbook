import React from 'react'
import PostListContainer from '../containers/PostListContainer'
import Header from '../components/Layouts/Header'
import NewPostContainer from '../containers/NewPostContainer'
import Footer from '../components/Layouts/Footer'
import Cookies from "js-cookie";
import useGetUserByID from "../hooks/users/useGetUserByID";


function Home() {
    const handleDeconnexion = () => {
        Cookies.set('userID', 0)
        window.location.href = '/signin'
    }
    const userId = Cookies.get('userID');
    const {status, data} = useGetUserByID(userId);

    return (
        <div className='bg-gray-200'>
            <Header handleDeconnexion={handleDeconnexion} name={data ? data.name : "Loading..."}/>
            <NewPostContainer/>
            <PostListContainer/>
            <Footer/>
        </div>
    )
}


export default Home