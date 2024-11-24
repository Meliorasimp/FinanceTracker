import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Loginpage = () => {
  const [useremail, setUseremail] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email: useremail,
        password: userpassword
      });

      if (response.status === 200) {
        const userdata = response.data.user;
        const token = response.data.token;
        const decodedtoken = jwtDecode(token);
        console.log('User data:', userdata);
        console.log('Token:', token);
        console.log('Decoded token:', decodedtoken);

        // Store the token and user data
        localStorage.setItem('userinfo', JSON.stringify(userdata));
        localStorage.setItem('token', token);

        // Redirect the user
        navigate('/dashboard');
      } else {
        console.error('Unexpected response status:', response.status);
        setMessage('Unexpected error occurred.');
      }

    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col justify-start items-center h-full bg-backgroundImage bg-cover bg-center">
        <h1 className="mt-52 text-4xl font-bold">Welcome Back!</h1>
        <form className="flex justify-center items-center flex-col" onSubmit={handleLoginSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="mt-5 w-96 h-12 p-4 rounded-md bg-gray-900 border border-yellow-100"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Enter your password" 
            className="mt-5 w-96 h-12 p-4 rounded-md bg-gray-900 border border-yellow-100"
            value={userpassword}
            onChange={(e) => setUserpassword(e.target.value)}
            required 
          />
          <button className="mt-5 w-96 h-12 bg-yellow-300 rounded-md font-bold hover:bg-yellow-600 text-black">
            Login
          </button>
        </form>
        {message && <p className="mt-5 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Loginpage;
