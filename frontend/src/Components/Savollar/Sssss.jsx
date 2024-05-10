import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../userContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Javob = () => {
  const { natija } = useContext(UserContext);
  const [data, setData] = useState(() => {
    // Check if data exists in localStorage, otherwise use the context data
    const storedData = localStorage.getItem('javobData');
    return storedData ? JSON.parse(storedData) : natija;
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Save the data to localStorage when it changes
    localStorage.setItem('javobData', JSON.stringify(data));
  }, [data]);

  const handleClearLocalStorage = () => {
    // Clear localStorage data
    localStorage.removeItem('javobData');
    
    // Clear backend data
    axios.delete('http://localhost:3000/test/deleteSavollar')
      .then(response => {
        console.log(response.data); // Log the response from the server
        // Additional logic if needed
      })
      .catch(error => {
        console.error('Xatolik:', error); // Log any errors
      });
  };

  useEffect(() => {
    // This effect will execute only when the component mounts
    navigate('/javob');
  }, []);

  return (
    <>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <div className=' flex-col justify-center items-center  text-center mx-auto w-8/12'>
        <h2 className='text-xl font-bold '> Savollarning umumiy soni: {data.totalQuestions}</h2>
        <br /><br />
        <h1 className='text-xl font-bold'>
          To'g'ri javoblar soni: {data.correctCount}
        </h1>
        <br /><br />
        <h2 className='text-xl font-bold'> Umumiy balingiz: {data.userScore}</h2><br /><br /><br />
        <button className='bg-blue-300  py-2 px-4 hover:bg-blue-500 text-white' onClick={handleClearLocalStorage}>
          <Link to={'/menu'}>Orqaga</Link>
        </button>
      </div>
    </>
  );
}

export default Javob;
