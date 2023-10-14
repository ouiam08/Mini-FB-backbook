import React, {useState} from "react";
import {useAuthUser} from "../../hooks/Auth/useAuthentificateUser"
import AuthUser from "../../components/authComponents/AuthUser";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";


const AuthUserContainer = () => {
    const {authUserMutation} = useAuthUser();
    const [response, setResponse] = useState('')
    const navigate = useNavigate();
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
        Cookies.set('userID', authUserMutation.data);
        window.location.href = "/";
    }

    return (
        <AuthUser
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            response={response}
            navigate={navigate}
        />
    );
};
export default AuthUserContainer;

