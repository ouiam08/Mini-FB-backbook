import React from 'react'
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import ProfileContainer from "../containers/ProfileContainer";
import NewPostContainer from "../containers/NewPostContainer";
import Cookies from "js-cookie";
import PostsUserContainer from "../containers/PostsUserContainer";

function Profile() {
    const handleDeconnexion = () => {
        Cookies.set('userID', 0)
        window.location.href = '/signin'
    }
    const userId = Cookies.get('userID');
    const profileHref = '/profile/' + userId;
    const isProfile = true;
    return (
        <div className="bg-gray-200 min-h-screen flex flex-col">
            <Header handleDeconnexion={handleDeconnexion}
                    hrefProfile={profileHref} isProfile={isProfile}/>
            <ProfileContainer/>
            <NewPostContainer/>
            <PostsUserContainer/>
            <Footer/>
        </div>
    )
}

export default Profile

