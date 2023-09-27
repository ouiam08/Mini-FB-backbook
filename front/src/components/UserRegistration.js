import React from 'react';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import Earth from './../Assets/images/earth.jpg';

function UserRegistration({
                              handleInputChange,
                              handleConfirmChange,
                              handleRegister,
                              userData,
                              response
                          }) {
    return (
        <div>
            <div className="bg-gray-200 h-screen">
            <Header />
            <div className="flex items-center justify-center h-full w-full">
            <div className="inline-flex align-center bg-white shadow-md rounded-lg m-4 p-6 text-center">
                <div className="">
                    <img src={Earth} alt=""/>
                </div>
                <div className="">
                    <h1 className="text-center m-4 text-2xl font-bold">Register Now !!! </h1>
            
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="bg-gray-200 rounded-lg m-6 p-1"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className="bg-gray-200 rounded-lg m-6 p-1"
                    />
                    </div>
                <div>
                    
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="confirmPassword"
                        name="confirmPassword"
                        placeholder="confirm Password"
                        value={userData.confirmPassword}
                        onChange={handleInputChange}
                        className="bg-gray-200 rounded-lg m-6 p-1"
                    />
                </div>
                <button onClick={handleRegister} className="bg-green-600 text-white rounded-lg p-2 m-2">Sign up</button>
                <h3>{response}</h3>
        
                </div>
                
            </div>
            </div>
            <Footer />
        </div>
        </div>
    );
}

export default UserRegistration;
