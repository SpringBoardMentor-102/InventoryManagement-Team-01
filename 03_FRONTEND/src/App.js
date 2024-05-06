import React from 'react'
import SignIn from './components/SignIn'
import Reset from './components/Reset'
import Confirm from './components/Confirm'
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import EmailNotification from './components/EmailNotification';
import NotFound from './components/NotFound';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Reg_Config from './components/Reg_Config';
import Search from './components/Search';
import Filter from './component/Filter';
const App = () => {
  return (

<BrowserRouter>
  <Routes>
    <Route index element={<SignIn/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/reg_config' element={<Reg_Config/>}/>
    <Route path='/reset' element={<Reset/>}/>
    <Route path="/confirm-email" element={<Confirm />} />
    <Route path='/Dashboard'  element={<Dashboard/>}/>
    <Route path='/forgot'  element={<ForgotPassword/>}/>
    <Route path='/email_notification'  element={<EmailNotification/>}/>
    <Route path='/search_product'  element={<Search/>}/>
    <Route path='*' element={<NotFound/>}/>
    <Route path='/Filter' element ={<Filter/>}/>
  </Routes>
</BrowserRouter>
  )
}

export default App
