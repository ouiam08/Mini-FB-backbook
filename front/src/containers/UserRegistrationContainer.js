import React, { useState } from 'react';
import UserRegistration from '../components/UserRegistration';
import useRegisterUser from '../hooks/Auth/useRegisterUser';

function UserRegistrationContainer() {
  const { registerUserMutation } = useRegisterUser();
  
const [name,setName] = useState("");
const [password,setPassword] =  useState("")

  const handleRegisterUser = async () => {
    try {
      const registrationData = {
        name: name,
        password: password,
      };

      await registerUserMutation.mutateAsync(registrationData);
      setName("")
      setPassword("")
      
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

 

  return (
    <div>
      <UserRegistration
        handleRegisterUser={handleRegisterUser}
        name={name}
        password={password} 
        setPassword = {setPassword}
        setName = {setName}

      />
    </div>
  );
}

export default UserRegistrationContainer;
