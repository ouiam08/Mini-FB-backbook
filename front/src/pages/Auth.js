import React from 'react'
import AuthContainer from "../containers/AuthContainer";
import Footer from "../components/Layouts/Footer";
import Header from "../components/Layouts/Header";

function Auth() {
    return (<div className="bg-gray-200 min-h-screen flex flex-col">
            <Header/>
            <div className="flex-grow">
                <AuthContainer/>
            </div>
            <Footer className="bg-white text-gray-700 text-center shadow-md p-2">
                Copy rights 2023
            </Footer>
        </div>
    )
}

export default Auth