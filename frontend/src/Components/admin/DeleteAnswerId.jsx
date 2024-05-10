import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteAnswerId = () => {
  const navigate= useNavigate()
  const { id } = useParams();
  console.log(id); // Ekranga `6621e9deb47fbf9082cee08c` qiymatini chiqaradi

  const [deleted, setDeleted] = useState(false);

 useEffect(() =>{
  const deleteUserAnswer = async () => {
    try {
      await axios.delete(`http://localhost:3000/test/deleteJavoblarId/${id}`);
      setDeleted(true);
    } catch (error) {
      console.error('Error deleting user answer:', error);
    }
  };
  deleteUserAnswer()

 },[])
  

   if(deleted){
    navigate('/adminpanel')
    

   }

  return (
    <>
    
    </>
  );
};

export default DeleteAnswerId;
