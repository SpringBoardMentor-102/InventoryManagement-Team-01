// External Imports
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Internal Component Imports
import SignIn from './components/unprotected/SignIn'
import Reset from './components/protected/Reset'
import Confirm from './components/unprotected/Confirm'
import SignUp from './components/unprotected/SignUp';
import Dashboard from './components/protected/Dashboard';
import AdminDashboard from './components/protected/AdminDashboard';
import ForgotPassword from './components/unprotected/ForgotPassword';
import EmailNotification from './components/unprotected/EmailNotification';
import NotFound from './components/unprotected/NotFound';
import RegConfig from './components/unprotected/RegConfig';
import Search from './components/protected/Search';
// import Filter from './components/protected/Filter';
import ProductList from './components/protected/ProductList';
import TransactionHistory from './components/protected/TransactionHistory';
import ProductDetail from './components/protected/ProductDetail';
import Checkout from './components/protected/Checkout';

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
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/forgot' element={<ForgotPassword />} />
         <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/email_notification' element={<EmailNotification />} />
        <Route path='/search_product' element={<Search />} />
        <Route path ='/checkout' element={<Checkout/>}/>
         {/* <Route path='/Filter' element={<Filter />} /> */}
         <Route path ='/history' element={<TransactionHistory/>}/>
        <Route path='*' element={<NotFound />} />
        <Route path='/' exact element={<ProductList/>}/>
        <Route path='/product/:id' element={<ProductDetail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
