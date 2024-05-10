import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Logout = () => {
 
 const navigate  = useNavigate()
    useEffect(() =>{
      
        const handleLogout = async () => {
          
          const javobDATA = localStorage.getItem('javobData')
          if(!javobDATA){
            localStorage.removeItem('ID')
            navigate('/')

          }else{

            localStorage.removeItem('javobData');
            localStorage.removeItem('ID')
          }
            try {
              const response = await axios.get('http://localhost:3000/auth/logout', {
                
              withCredentials: true // Cookie-larni so'rovga qo'shish
              });
              const token = response.headers.get('access_token')
             
              // Ekranga chiqaramiz
            } catch (error) {
              console.error('Xatolik yuz berdi:', error);
            }
          };
          handleLogout()

    },[])


  return (
    <div>.</div>
  )
}

export default Logout
