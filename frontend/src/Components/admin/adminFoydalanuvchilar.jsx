import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminFoydalanuvchilar = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState('');

    // Delete function
    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/foydalanuvchi/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': token
                },
                withCredentials: true
            });
            setData(data.filter(user => user.userId !== userId)); // Update state after deletion
        } catch (error) {
            console.log(error);
            // Handle error here if needed
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/foydalanuvchi/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': token
                    },
                    withCredentials: true
                });
                setData(response.data); // Update state with fetched user data


               
                localStorage.setItem('userIds', JSON.stringify(response.data.map(user => user.userId)));

            } catch (error) {
                console.log(error);
                // Handle error here if needed
            }
        };

        getUser(); // Invoke the getUser function
    }, []);

    return (
        <div>
            <br /><br /><br /><br /><br />
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative text-center ">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">User Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email Address</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
                    </tr>
                </thead>

                <tbody className="block md:table-row-group ">
                    {data.map((user, index) => (
                        <tr key={index} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell "><span className="inline-block w-1/3 md:hidden font-bold ">Name</span> {user.username} </td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">User Name</span>{user.userName}</td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Email Address</span>{user.email}</td>
                            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">

                                <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border mr-4 border-blue-500 rounded">Edit</button>
                                <button type='button' onClick={() => handleDelete(  localStorage.setItem('del', user.userId)   )} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button> */}

                                <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>                               
                                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border mr-4 border-blue-500 rounded">Edit</button> */}
                                <Link to={`/DeleteUser/${user._id}`} ><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded">Delete</button></Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center w-full '>
                <Link to={'/adminpanel'} >
                    <button className=' text-center px-4 py-2  w-3/8 bg-gray-800 text-white font-bold items-end rounded mr-8 mt-12 '>
                        Orqaga
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AdminFoydalanuvchilar;
