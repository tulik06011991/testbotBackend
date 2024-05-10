import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import DeleteAnswerId from './DeleteAnswerId';



const adminPanel = () => {

  const [Users, setUsers] = useState([])
  const [sidebar, setSidebar] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/')// Foydalanuvchi Login sahifasiga yo'naltiriladi
    }
  }, []);



  useEffect(() => {
    const token = localStorage.getItem('token')
    const getUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/questions/adminInfoUser',
          {
            headers: {
              'Content-Type': 'application/json',
              'access_token': token
            },
            withCredentials: true
          }
        );
        localStorage.setItem('userIds', JSON.stringify(response.data.map(user => user.userId)))
        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        if (error) {
          navigate('/menu')
        }
        console.log(error);
      }
    };

    getUser();
  }, []);




  return (
    <>
      <br />
      <br />
      <br /><br />
      {localStorage.getItem('token') ? (
        <div className="bg-gray-200 -ml-3">
          <nav className="bg-white border-b border-gray-300">
            <div className="flex justify-between items-center px-9">
              <button onClick={() => setSidebar(!sidebar)} id="menuBtn">
                <i className="fas fa-bars text-cyan-500 text-lg"></i>
              </button>
              <div className="ml-1">
                <img src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png" alt="logo" className="h-20 w-28" />
              </div>
              <div className="space-x-4">
                <button>
                  <i className="fas fa-bell text-cyan-500 text-lg"></i>
                </button>
                <button>
                  <i className="fas fa-user text-cyan-500 text-lg"></i>
                </button>
              </div>
            </div>
          </nav>
          <div id="sideNav" className={`${sidebar ? 'lg:block' : 'hidden'} lg:block bg-white w-64 h-screen fixed rounded-none border-none`}>
            <div className="p-4 space-y-4">
              <Link to="/adminsavol" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <i className="fas fa-home text-white"></i>
                <span className="-mr-1 font-medium">AdminSavol</span>
              </Link>
              <Link to="/deleteanswer" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                <i className="fas fa-wallet"></i>
                <span>Barchasini o'chirish</span>
              </Link>

              <Link to="/getquestions" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                <i className="fas fa-exchange-alt"></i>
                <span>Savollar ro'yxati</span></Link>

              <Link to="/DeleteQuestions" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                <i className="fas fa-exchange-alt"></i>
                <span>Savollarni o'chirish</span>

              </Link>
              <Link to="/register" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                <i className="fas fa-user"></i>
                <span>Ro'yxatga olish</span>
              </Link>
              <Link to="/adminfoydalanuvchilar" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                <i className="fas fa-sign-out-alt"></i>
                <span>Foydalanuvchilar ro'yxati</span>
              </Link>
            </div>
          </div>
          <div className="lg:ml-64 lg:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2">
            <div className="bg-white rounded-full border-none p-3 mb-4 shadow-md">
              <div className="flex items-center">
                <i className="px-3 fas fa-search ml-1"></i>
                <input type="text" placeholder="Buscar..." className="ml-3 focus:outline-none w-full" />
              </div>
            </div>
            <div className="lg:flex gap-4 items-stretch">
              {/* Diğer bileşenler */}
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 w-full">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 w-full">
                  <div className="overflow-hidden w-full">
                    <table className="min-w-full">
                      {/* Tablo içeriği */}
                    </table>
                    {/* <!-- component --> */}

                    <div className="flex flex-col">
                      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                            <table className="min-w-full">
                              <thead className="bg-white border-b">
                                <tr>
                                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    #
                                  </th>
                                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Ism
                                  </th>
                                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    to'plagan bali
                                  </th>
                                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    savollar soni
                                  </th>
                                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    O'chirish
                                  </th>
                                </tr>
                              </thead>

                              {Users.map((user, index) => (
                                <tbody key={index} >
                                  <tr className="bg-gray-100 border-b">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {user.username}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {user.userball}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {user.savollar}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      <Link to={`/DeleteAnswerId/${user.userId}`} className='px-4 py-2 bg-gray-600 text-white cursor-pointer rounded hover:bg-blue-500' >O'chirish</Link>
                                    </td>
                                  </tr>
                                </tbody>
                              ))}

                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (navigate('/'))}
    </>
  )
}

export default adminPanel