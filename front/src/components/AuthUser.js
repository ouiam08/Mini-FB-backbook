import React from "react";
import Header from './Layouts/Header'
import Footer from './Layouts/Footer'
import Earth from './../Assets/images/earth.jpg'

const AuthUser = ({formData, handleInputChange, handleSubmit, response}) => {
    return (
        <div className="bg-gray-200 h-screen">
            <Header />
            <div className="flex items-center justify-center h-full w-full">
            <div className="inline-flex align-center bg-white shadow-md rounded-lg m-4 p-6 text-center">
                <div className="">
                    <img src={Earth} alt=""/>
                </div>
                <div className="">
                    <h1 className="text-center m-4 text-2xl font-bold">Enjoy your time !!!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-200 rounded-lg m-6 p-1"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="bg-gray-200 rounded-lg m-6 p-1"
                    />
                </div>
                <button type="submit" className="bg-green-600 text-white rounded-lg p-2 m-2">Sign In</button>
                <h3>{response}</h3>
            </form>
                </div>
                
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthUser;
