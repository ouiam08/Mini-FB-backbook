import React from "react";


const AuthUser = ({formData, handleInputChange, handleSubmit, response}) => {
    return (
        <div>
            <h1>Authentication</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
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
                    />
                </div>
                <button type="submit">Sign In</button>
                <h3>{response}</h3>
            </form>
        </div>
    );
};

export default AuthUser;
