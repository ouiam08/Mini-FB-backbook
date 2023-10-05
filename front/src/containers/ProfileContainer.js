import React, {useState} from 'react';
import Profile from "../components/Profile";
import useGetUserByID from "../hooks/users/useGetUserByID";
import Cookies from "js-cookie";

const ProfileContainer = () => {
    const userId = Cookies.get('userID');
    const {user,status} = useGetUserByID(userId);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleUpdateProfile = () => {
        // Implement the logic for updating the user's profile here
    };

    const handleDeleteAccount = () => {
        // Implement the logic for deleting the user's account here
    };

    return (
        <Profile user={user}
                 handleDeleteAccount={handleDeleteAccount}
                 handleUpdateProfile={handleUpdateProfile}
                 toggleDropdown={toggleDropdown}
                 isDropdownOpen={isDropdownOpen}/>
    );
};

export default ProfileContainer;