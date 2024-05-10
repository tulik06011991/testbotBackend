import axios from 'axios'
import React, {  useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'



const DeleteUser = () => {
    const {id} = useParams()
    const [data, setData] = useState('')
    const navigate = useNavigate()
    
    const handleDelete = async () =>{
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://localhost:3000/foydalanuvchi/user/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': token
                },
                withCredentials: true
            }
        )
       
        setData(response.data)
        console.log(response.data)
      
        } catch (error) {
            console.log(error)
            }
        }

  
  return (
    <div> <br /><br /><br /><br />
    <form onSubmit={handleDelete}>
        <h1 className='text-center text-xl mx-auto font-bold'>Foydalanuvchi o'chirilsinmi </h1>
        <br /><br /><br /><br />
        <div className='flex justify-evenly items-center m-12'>
            <div><button type='submit'className='bg-blue-300 rounded py-2 px-4 '>o'chirilsin</button></div>
            <Link to={'/adminfoydalanuvchilar'} className='bg-blue-300 rounded py-2 px-4  '><button> Orqaga </button></Link>
        </div>
    </form>
   
    </div>
  )
}

export default DeleteUser
