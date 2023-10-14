import React from 'react'
import UserRegistrationContainer from '../containers/authContainer/UserRegistrationContainer'
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";

function Register() {
    return (

        <div className="bg-gray-200 min-h-screen flex flex-col">
            <Header/>
            <div className="flex-grow">
                <UserRegistrationContainer/>
            </div>
            <Footer className="bg-white text-gray-700 text-center shadow-md p-2">
                Copy rights 2023
            </Footer>
        </div>
    )
}

export default Register