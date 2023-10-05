import React from 'react';
import cover from '../Assets/images/cover.jpg';
import person from '../Assets/images/person.jpg';
import dots from "../Assets/images/more.png";

const Profile = ({ user, handleDeleteAccount, handleUpdateProfile, toggleDropdown, isDropdownOpen }) => {
    return (
        <div className="bg-cover bg-center h-64 relative flex items-center rounded m-2" style={{ backgroundImage: `url(${cover})` }}>
            <div className="container mx-auto p-4">
                <div className="flex items-center">
                    <img src={person} alt="Profile Picture" className="rounded-full w-32 h-32 border-4 border-white" />
                    <div className="ml-4">
                        <h1 className="text-2xl text-white font-semibold">{user.name}</h1>
                        <p className="text-white text-lg">{user.description}</p>
                    </div>
                    <div className="absolute top-0 right-0 p-3 cursor-pointer" onClick={toggleDropdown}>
                        <img src={dots} alt="More Options" className="w-6 h-6" />
                    </div>
                </div>
                {isDropdownOpen && (
                    <div className="absolute top-10 right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-2 mt-2">
                        <ul className="list-none">
                            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleUpdateProfile}>
                                Update Profile
                            </li>
                            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleDeleteAccount}>
                                Delete Account
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;