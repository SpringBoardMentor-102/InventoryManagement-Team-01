import React from 'react'
import SignIn from './components/SignIn'
import Reset from './components/Reset'
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';

import NotFound from './components/NotFound';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

const App = () => {
  return (

<BrowserRouter>
  <Routes>
    <Route index element={<SignIn/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/reset' element={<Reset/>}/>
    <Route path='/dashboard'  element={<Dashboard/>}/>
    <Route path='/forgot'  element={<ForgotPassword/>}/>
    <Route path='*' element={<NotFound/>}/>
  </Routes>
</BrowserRouter>
  )
}

export default App