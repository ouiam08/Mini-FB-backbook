import React from 'react';

function UserRegistration({
                              handleInputChange,
                              handleRegister,
                              userData,
                                response
                          }) {
    return (
        <div>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={userData.name}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={userData.password}
                    onChange={handleInputChange}

                />
                <button onClick={handleRegister}>Register</button>
                <h3>{response}</h3>
            </div>
        </div>
    );
}

export default UserRegistration;
