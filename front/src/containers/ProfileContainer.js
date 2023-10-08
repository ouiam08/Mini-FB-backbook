import React, {useState} from 'react';
import Profile from "../components/Profile";
import useGetUserByID from "../hooks/users/useGetUserByID";
import Cookies from "js-cookie";
import DeletePopUp from "../components/DeletePopUp";
import useDeleteUser from "../hooks/users/UseDeleteUser";
import UpdatePopUp from "../components/UpdatePopUp";
import useUpdateUser from "../hooks/users/useUpdateUser";

const ProfileContainer = () => {
    const userId = Cookies.get('userID');
    const {user} = useGetUserByID(userId);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const {deleteUserMutation} = useDeleteUser();
    const {updateUserMutation} = useUpdateUser();
    const [formData, setFormData] = useState(user);
    const [response, setResponse] = useState('')

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


    const handleDeleteAccount = async () => {
        try {
            await deleteUserMutation.mutateAsync(userId);
        } catch (error) {
            console.error('Error deleting post:', error);
        }

    };
    if (deleteUserMutation.isSuccess) {
        Cookies.set('userID', 0)
        window.location.href = '/signin'
    }
    const handleCancel = () => {
        setIsOpen(false)
    };
    const handleCancelUpdate = () => {
        setIsUpdateOpen(false)
    };
    const handleOpenPopUp = () => {
        setIsOpen(true)
    };
    const handleOpenUpdatePopUp = () => {
        setFormData(user)
        setIsUpdateOpen(true)
    };
    const handleUpdateAccount = async (e) => {
        e.preventDefault();
        if (formData.name !== '' && formData.password !== '' && formData.description !== '') {
            await updateUserMutation.mutateAsync(formData).then(() => setIsUpdateOpen(false));
        } else {
            setResponse('Field should not be empty!')
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const base64Image = e.target.result.split(",")[1];
                const updatedUser = {
                    id: user.id,
                    name: user.name,
                    password: user.password,
                    description: user.description,
                    photo: base64Image,
                };
                await updateUserMutation.mutateAsync(updatedUser);
            };

            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <Profile user={user}
                     toggleDropdown={toggleDropdown}
                     isDropdownOpen={isDropdownOpen}
                     handleOpenPopUp={handleOpenPopUp}
                     handleOpenUpdatePopUp={handleOpenUpdatePopUp}
                     handleImageUpload={handleImageUpload}/>
            {isOpen &&
                <DeletePopUp handleDeleteAcount={handleDeleteAccount}
                             handleCancel={handleCancel}/>
            }

            {isUpdateOpen &&
                <UpdatePopUp handleCancelUpdate={handleCancelUpdate}
                             handleUpdateAccount={handleUpdateAccount}
                             handleInputChange={handleInputChange}
                             formData={formData}
                             response={response}/>
            }
        </>
    );
};

export default ProfileContainer;