import React from 'react';
import cover from '../../Assets/images/cover.jpg';
import {AiOutlineCamera} from 'react-icons/ai'
import dots from "../../Assets/images/more.png";

const Profile = ({
                     updateAccess,
                     user,
                     handleOpenUpdatePopUp,
                     toggleDropdown,
                     isDropdownOpen,
                     handleOpenPopUp,
                     handleImageUpload
                 }) => {
    return (
        <div className="bg-cover bg-center h-64 relative flex items-center rounded m-2"
             style={{backgroundImage: `url(${cover})`}}>
            <div className="container mx-auto p-4">
                <div className="flex items-center">
                    <div className="relative">
                        <img src={`data:image/png;base64,${user.photo}`} alt="Profile Picture"
                             className="rounded-full w-32 h-32 border-4 border-white"/>
                        {updateAccess &&
                            <label htmlFor="profile-image"
                                   className="cursor-pointer absolute bottom-2 right-1.5 bg-white w-8 h-8 border-2 border-green-900 rounded-full flex items-center justify-center">
                                <input
                                    id="profile-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                                <AiOutlineCamera className="text-green-950 text-xl"/>
                            </label>}
                    </div>
                    <div className="ml-4">
                        <h1 className="text-2xl text-white font-semibold">{user.name}</h1>
                        <p className="text-white text-lg">{user.description}</p>
                    </div>
                    {updateAccess &&
                        <div className="absolute top-0 right-0 p-3 cursor-pointer" onMouseEnter={toggleDropdown}>
                            <img src={dots} alt="More Options" className="w-6 h-6"/>
                        </div>}

                </div>
                {isDropdownOpen && (
                    <div
                        className="absolute top-10 right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-2 mt-2">
                        <ul className="list-none">
                            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleOpenUpdatePopUp}>
                                Update Profile
                            </li>
                            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleOpenPopUp}>
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