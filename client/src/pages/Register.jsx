import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setuserName] = React.useState('');
  const [useremail, setuserEmail] = React.useState('');
  const [userpassword, setUserpassword] = React.useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/register', { 
        name: username,
        email: useremail,
        password: userpassword
      });

      if (response.status === 201) {
        alert('User created successfully');
        setuserName('');  
        setuserEmail('');
        setUserpassword('');
        navigate('/login');
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col justify-start items-center h-full bg-backgroundImage bg-cover bg-center">
        <h1 className="mt-40 text-4xl font-bold">Register and Simplify <span className="text-blue-400">your</span> Finances!</h1>
        <form className="flex justify-center items-center flex-col" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-10 w-96 h-12 p-4 rounded-md bg-gray-900 border border-yellow-100"
            onChange={(e) => setuserName(e.target.value)}
            value={username}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-5 w-96 h-12 p-4 rounded-md bg-gray-900 border border-yellow-100"
            onChange={(e) => setuserEmail(e.target.value)}
            value={useremail}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="mt-5 w-96 h-12 p-4 rounded-md bg-gray-900 border border-yellow-100"
            onChange={(e) => setUserpassword(e.target.value)}
            value={userpassword}
          />
          <button className="mt-5 w-96 h-12 bg-yellow-300 rounded-md font-bold hover:bg-yellow-600 text-black">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
