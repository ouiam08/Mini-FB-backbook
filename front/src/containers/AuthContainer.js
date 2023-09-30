import React, {useState} from "react";
import {useAuthUser} from "../hooks/Auth/useAuthentificateUser"
import AuthUser from "../components/AuthUser";
import Cookies from 'js-cookie';


const AuthUserContainer = () => {
    const {authUserMutation} = useAuthUser();
    const [response, setResponse] = useState('')
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name !== '' && formData.password !== '') {
            try {
                await authUserMutation.mutateAsync(formData);

            } catch (error) {
                setResponse(error.response.data)
            }
        } else {
            setResponse('Name and password should not be empty!')
        }
    };

    
    if (authUserMutation.status === 'success') {
        const authenticatedUserName = formData.name;
        Cookies.set('userID', authUserMutation.data);
        window.location.href = `/?username=${authenticatedUserName}`;
    }

    return (
        <AuthUser
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            response={response}
        />
    );
};
export default AuthUserContainer;

