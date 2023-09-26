import React from 'react'
import PostListContainer from '../containers/PostListContainer'
import Header from '../components/Layouts/Header'
import NewPostContainer from '../containers/NewPostContainer'
import Footer from '../components/Layouts/Footer'



function Home() {
    return (
        <div className='bg-gray-200'>
            <Header/>
            <NewPostContainer/>
            <PostListContainer/>
            <Footer/>
        </div>
    )
}

export default Home