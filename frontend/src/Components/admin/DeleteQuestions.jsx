import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DeleteQuestions  = () => {
   
  const [deleted, setDeleted] = useState(false);
  const navigate= useNavigate()
  useEffect(() =>{
      const deleteUserAnswer = async () => {
        try {
          await axios.delete(`http://localhost:3000/test/deleteSavollar`);
          setDeleted(true);
        } catch (error) {
          console.error('Error deleting user answer:', error);
        }
      };
    
     

deleteUserAnswer()

  },[])
  if (deleted) {
        
    navigate('/adminpanel')
  }


  return  (
    <>
     
    </>
  );
};




export default DeleteQuestions
