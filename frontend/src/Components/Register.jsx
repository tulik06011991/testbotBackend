import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
const navigate =useNavigate();
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/register',
        { username: username, email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        },
      );
     
     console.log(response)
      if (response.data) {
        toast.success(`muvaffaqiyatli o'tdingiz`)
        setUsername('');
        setEmail('');
        setPassword('');
        
       } else {
         toast.error('xatolik yuz berdi')
       }

    } catch (error) {
      console.log(error)
     toast.error(`login yoki parol xato`)
      }
    }

  return (
    <div>

      <div class="h-screen bg-indigo-100 flex justify-center items-center">
        <div class="lg:w-2/5 md:w-1/2 w-2/3">
          <form class="bg-white p-10 rounded-lg shadow-lg min-w-full">
            <h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Formregister</h1>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md" for="username">Username</label>
              <input  onChange={(e) => setUsername(e.target.value)} class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"  type="text" name="username" id="username" placeholder="username" />
            </div>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md" for="email">Email</label>
              <input  onChange={(e) => setEmail(e.target.value)} class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="email" id="email" placeholder="@email" />
            </div>
            <div>
              <label class="text-gray-800 font-semibold block my-3 text-md" for="password">Password</label>
              <input  onChange={(e) => setPassword(e.target.value)} class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="password" />
            </div>
           
            <button onClick={handleSubmitt} type="submit" class="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Register</button>
            
          </form>
          <ToastContainer position="top-center"  />
        </div>
      </div></div>
  )
}

export default Register
