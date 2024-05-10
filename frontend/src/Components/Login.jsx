
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import UserContext from './userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null)
  
  const {setUser} = useContext(UserContext)
  const {setId} = useContext(UserContext)

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        { email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        },
      );

      localStorage.setItem('token', response.data.token);


      localStorage.setItem('ID', response.data._id);

      // console.log(response.data)
      setUser(response.data._id)
      setId(response.data._id)
     console.log(response)
      if (response.data.isAdmin) {
        navigate('/adminpanel');
       } else {
         navigate('/menu');
       }

    } catch (error) {
      console.log(error)
     toast.error(`login yoki parol xato`)
      }
    }
  
  return (
    <div>
      
      <div className="h-screen bg-indigo-100 flex justify-center items-center">
        <div className="lg:w-2/5 md:w-1/2 w-2/3 ">
          <form  onSubmit={handleSubmitt} className="bg-white p-10 rounded-lg shadow-lg min-w-full">
            <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Login</h1>
            
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="email">Email</label>
              <input   onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="email" id="email" placeholder="@email" />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Password</label>
              <input   onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="password" />
            </div>
            <button type="submit" className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Login</button>
          </form>
         
          <ToastContainer position="top-center"  />
        </div>
      </div>
    </div>
  )
}

export default Login
