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
    const {user} = useGetUserByID(userId);
    const profileHref = '/profile/' + userId;
    const isProfile = false;
    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Header handleDeconnexion={handleDeconnexion} name={user ? user.name : 'Loading...'}
                    photo={`data:image/png;base64,${user.photo}`}
                    hrefProfile={profileHref} isProfile={isProfile}/>
            <NewPostContainer/>
            <PostListContainer/>
            <div className="flex-grow"></div>
            <Footer/>
        </div>
    )
}


export default Home