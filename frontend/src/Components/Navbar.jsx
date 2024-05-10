import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from './userContext';


const Navbar = () => {

  const navigate = useNavigate()
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleLogout = () => {
    // Chiqish tugmasi bosilganda amalni bajarish
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Tokenni o'chirish
    navigate('/logout');

  };

  return (

    <div className='bg-gray-500'>
      <nav className='fixed top-0 left-0 bg-gray-200 w-full shadow'>
        <div className='container m-auto flex justify-between tracking-widest  items-center text-gray-700'>
          <ul className='hidden md:flex items-center pr-10  text-base font-semibold cursor-pointer'>
            <Link to={'/'}><li className='hover:bg-gray-400 rounded py-3 px-6 my-2'>Login</li></Link>
            <Link to={'/register'}><li className='hover:bg-gray-400 rounded py-3 px-6 my-2'>Register</li></Link>
            <li className='hover:bg-gray-400 rounded py-3 px-6 my-2'>Contact</li>
          </ul>
          <button onClick={() => setNavbarOpen(!navbarOpen)} className='block md:hidden py-3 px-4 mx-2 right-5 rounded focus:outline-none hover:bg-gray-400  group'>
            <div className='w-5 h-1 bg-gray-700 mb-1'></div>
            <div className='w-5 h-1 bg-gray-700 mb-1'></div>
            <div className='w-5 h-1 bg-gray-700 mb-1'></div>
            <div className={`${navbarOpen ? 'absolute -right-0 top-0 h-screen w-5/12 bg-gray-200 ' : 'hidden'}  `}>
              <ul className='flex flex-col items-center  w-full text-base cursor-pointer pt-12'>
                <div>

                  <i className="fa-sharp fa-solid fa-circle-xmark fa-2xl -left-5 absolute  text-gray-500 border-solid"><button className='hover:bg-blue-500  rounded w-full'></button></i>
                  <br /><br />
                  <div className='font-bold text-gray'>_____________________</div>
                </div>
                <br /><br /><br /><br />


                <Link to={'/'} className='w-full'><li className=' py-4 hover:bg-gray-400 rounded px-6  font-bold hover:text-white tracking-widest w-full'>Login<i className="fa-solid fa-taxi absolute left-12 py-1 items-center"></i></li></Link>
                <Link to={'/register'} className='w-full'><li className=' py-4 hover:bg-gray-400 rounded px-6  font-bold hover:text-white tracking-widest w-full'>Register<i className="fa-solid fa-address-card absolute left-12 py-1 items-center"></i></li></Link>

                <li className=' py-4 hover:bg-gray-400 rounded px-6  font-bold hover:text-white tracking-widest w-full'>Contact<i className="fa-solid fa-phone-volume absolute left-12 py-1 items-center"></i></li>
              </ul>
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <div className=' py-4 hover:bg-gray-400 rounded px-6  font-bold hover:text-white tracking-widest w-full'>
                <button onClick={handleLogout} className='relative mx-6'>chiqish<i className="fa-sharp fa-solid fa-right-from-bracket ml-3"> <Link to={'/logout'}></Link></i></button>
              </div>
            </div>
          </button>
          <button onClick={handleLogout} className='relative mx-6 hidden md:block'>  <Link to={'/logout'}>chiqish </Link>  <i className="fa-sharp fa-solid fa-right-from-bracket ml-3"> </i></button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
