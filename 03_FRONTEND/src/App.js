// External Imports
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Internal Component Imports
import SignIn from './components/unprotected/SignIn'
import Reset from './components/protected/Reset'
import Confirm from './components/unprotected/Confirm'
import SignUp from './components/unprotected/SignUp';
import Dashboard from './components/protected/Dashboard';
import ForgotPassword from './components/unprotected/ForgotPassword';
import EmailNotification from './components/unprotected/EmailNotification';
import NotFound from './components/unprotected/NotFound';
import RegConfig from './components/unprotected/RegConfig';
import Search from './components/protected/Search';

// create an app to render routes
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reg_config' element={<RegConfig />} />
        <Route path='/reset' element={<Reset />} />
        <Route path="/confirm-email" element={<Confirm />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/email_notification' element={<EmailNotification />} />
        <Route path='/search_product' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
