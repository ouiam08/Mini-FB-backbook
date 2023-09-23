import React from 'react';

function UserRegistration(props) {
    const { handleRegisterUser, name,password, setName,setPassword } = props;
  return (
    <div>
      <h1>User Registration</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e)=>{setName(e.currentTarget.value)}}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>{setPassword(e.currentTarget.value)}}
        />
        {console.log(password , name)}
        <button onClick={handleRegisterUser}>Register</button>
      </div>
    </div>
  );
}

export default UserRegistration;
