
import './index.css'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import Login from './Components/Login'
import {Routes, Route}  from 'react-router-dom'
import Menu from './Components/Menu'
import Biologiya from './Components/Savollar/Biologiya';
import Tarix from './Components/Savollar/Tarix';
import Ingliz_tili from './Components/Savollar/Ingliz_tili'
import Javob from './Components/Savollar/Javob'
import Logout from './Components/Logout'
import AdminSavol from './Components/admin/adminSavol'
import DeleteAnswerId from './Components/admin/DeleteAnswerId'
import AdminPanel from './Components/admin/adminPanel'
import UserContextProvider from './Components/userContextProvider'
import DeleteAnswer from './Components/admin/DeleteAnswer'
import DeleteQuestions from './Components/admin/DeleteQuestions'
import GetQuestions from './Components/admin/GetQuestions'
import AdminFoydalanuvchilar from './Components/admin/adminFoydalanuvchilar'
import DeleteUser from './Components/admin/DeleteUser'

function App() {
  return ( 
    <>
    <UserContextProvider>
    <Navbar/>
    <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/> 
      <Route path='/menu' element = {<Menu/>}/>  
      <Route path='/tarix' element = {<Tarix/>}/>    
      <Route path='/inglizTili' element = {<Ingliz_tili/>}/>   
      <Route path='/biologiya' element = {<Biologiya/>}/>  
      <Route path='/javob' element = {<Javob/>}/>    
      <Route path='/logout' element = {<Logout/>}/>
      <Route path='/adminsavol' element = {<AdminSavol/>}/> 
      <Route path='/adminpanel' element = {<AdminPanel/>}/>
      <Route path='/deleteanswer' element = {<DeleteAnswer/>}/>
      <Route path='/getquestions' element = {<GetQuestions/>}/>
      <Route path='/DeleteAnswerId/:id' element = {<DeleteAnswerId/>}/>
      <Route path='/DeleteQuestions' element = {<DeleteQuestions/>}/>
      <Route path='/adminfoydalanuvchilar' element = {<AdminFoydalanuvchilar/>}/>
      <Route path='/DeleteUser/:id' element = {<DeleteUser/>}/>
    </Routes>  
    </UserContextProvider>       
    </>
  )
}
export default App
