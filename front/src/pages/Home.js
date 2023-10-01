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
    const { data} = useGetUserByID(userId);

    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <Header handleDeconnexion={handleDeconnexion} name={data ? data.name : 'Loading...'} />
            <NewPostContainer />
            <PostListContainer />
            <div className="flex-grow"></div> {/* Add this div to push footer to the bottom */}
            <Footer />
        </div>
    )
}


export default Home