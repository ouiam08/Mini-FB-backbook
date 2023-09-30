import React, {useState} from 'react'
import {useRegisterUser} from '../hooks/Auth/useRegisterUser';
import UserRegistration from '../components/UserRegistration';


function UserRegistrationContainer() {
    const [userData, setUserData] = useState({name: "", password: "", confirmPassword: ""});
    const {registerUserMutation} = useRegisterUser();
    const [response, setResponse] = useState('')

    const handleRegister = async () => {
        if (userData.name !== '' && userData.password !== '') {
            if (userData.password === userData.confirmPassword) {
                try {
                    const user = {
                        name: userData.name,
                        password: userData.password
                    };

                    await registerUserMutation.mutateAsync(user);
                    setUserData({name: '', password: ''});


                } catch (error) {
                    setResponse(error.response.data)
                }
            } else {
                setResponse('passwords do not match')
            }
        } else {
            setResponse('Name and password should not be empty!')
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    };


    if (registerUserMutation.status === "success") {
        window.location.href = "/signin"
    }

    return (

        <UserRegistration
            handleInputChange={handleInputChange}
            handleRegister={handleRegister}
            userData={userData}
            response={response}
        />

    )
}

export default UserRegistrationContainer;
