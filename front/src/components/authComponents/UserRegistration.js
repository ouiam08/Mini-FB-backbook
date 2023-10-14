import React from 'react';
import Earth from '../../Assets/images/earth.jpg';

function UserRegistration({
                              handleInputChange,
                              handleRegister,
                              userData,
                              response
                          }) {
    return (
        <div className="flex items-center justify-center h-full w-full m-10">
            <div className="inline-flex items-center bg-white shadow-md rounded-lg m-4 p-6 text-center">
                <div>
                    <img src={Earth} alt="" className="w-60 h-50 rounded-full m-4"/>
                </div>
                <div className="ml-4">
                    <h1 className="text-center text-2xl font-bold  m-6">Register</h1>

                    <div className="mb-4 flex items-center mt-5">
                        <label htmlFor="username" className="w-30 text-right pr-4">Username:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            className="flex-grow bg-gray-200 rounded-lg p-2 ml-14"
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <label htmlFor="password" className="w-30 text-right pr-4">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            className="flex-grow bg-gray-200 rounded-lg p-2 ml-14"
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <label htmlFor="confirmPassword" className="w-30 text-right pr-4">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="confirm Password"
                            value={userData.confirmPassword}
                            onChange={handleInputChange}
                            className="flex-grow bg-gray-200 rounded-lg p-2  "
                        />
                    </div>

                    <button onClick={handleRegister}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-2 mt-6">
                        Sign up
                    </button>

                    <h3 className="text-green-600 mt-4">{response}</h3>
                    <h5 className="mt-8">
                        Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Sign in</a>
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default UserRegistration;
