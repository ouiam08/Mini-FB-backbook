import React, {useEffect, useState} from 'react'
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import ProfileContainer from "../containers/userContainer/ProfileContainer";
import NewPostContainer from "../containers/postContainer/NewPostContainer";
import Cookies from "js-cookie";
import PostsUserContainer from "../containers/postContainer/PostsUserContainer";
import {useParams} from "react-router";
import useGetUserByID from "../hooks/users/useGetUserByID";
import ChatBotButton from "../components/chatBot/ChatBotButton";

function Profile() {
    const {id} = useParams();
    const handleDeconnexion = () => {
        Cookies.set('userID', 0)
        window.location.href = '/signin'
    }
    const userId = Cookies.get('userID');
    const {user} = useGetUserByID(userId);
    const profileHref = '/profile/' + userId;
    const [isProfile, setIsProfile] = useState(true);
    useEffect(() => {
        if (userId === id) {
            setIsProfile(true)
        } else {
            setIsProfile(false)
        }
    }, [id]);
    return (
        <div className="bg-gray-200 min-h-screen flex flex-col">
            <Header handleDeconnexion={handleDeconnexion} name={user ? user.name : 'Loading...'}
                    photo={`data:image/png;base64,${user.photo}`}
                    hrefProfile={profileHref} isProfile={isProfile}/>
            <ProfileContainer/>
            {userId === id && <NewPostContainer/>}
            <PostsUserContainer/>
            <ChatBotButton />
            <Footer/>
        </div>
    )
}

export default Profile

