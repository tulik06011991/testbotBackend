import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



const DeleteAnswer = () => {
    const [message, setMessage] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/')// Foydalanuvchi Login sahifasiga yo'naltiriladi
        }
    }, []);
    const handleClearLocalStorage = () => {
        const token = localStorage.getItem('token');
        axios.delete('http://localhost:3000/test/deleteJavoblar',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': token
                },
                withCredentials: true
            },)
            .then(response => {
                setMessage(response.data); // Log the response from the server

            })
            .catch(error => {
                console.error('Xatolik:', error); // Log any errors
            });
    };
    return (
        <div className='mx-auto w-6/12'><br /><br /><br /><br /><br /><br /><br />
            <div className='d-flex justify-center items-center'>
                <h1>  {message && (
                    <h2 className='text-xl mb-8'>Hamma javoblar o'chirildi</h2>
                )} </h1>
                <button className='bg-blue-300  py-2 px-8    rounded hover:bg-blue-500 text-white' onClick={handleClearLocalStorage}>
                    <Link to={'/adminpanel'}>Orqaga</Link>
                </button></div>
        </div>
    )
}

export default DeleteAnswer