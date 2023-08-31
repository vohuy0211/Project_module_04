import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CardProduct from '../Components/CartProduct/CardProduct';
import Detail from '../Components/Detail/Detail';
import History from '../Components/History/HIstory';
import HomePage from '../Components/HomePage/HomePage';
import Login from '../Components/Login/Login';
import Profile from '../Components/Profile/Profile';
import Register from '../Components/Register/Register';
import RequireLogin from '../Components/RequireAuth/RequireAuth';
import HomeUser from '../HomeUser/HomeUser';
import LayoutCard from '../Layout/LayoutCard/LayoutCard';
import LoginLayout from '../Layout/LoginLayout/LoginLayout';
import Main from '../Layout/UserLayout/Main';
import NotFound from '../pages/NotFound/NotFound';

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Main />}>
          <Route index element={<HomeUser />} />
        </Route>

        <Route element={<RequireLogin />}>
          <Route path='/User' element={<LayoutCard><HomePage /></LayoutCard>} />
          <Route path='/Detail/:id' element={<LayoutCard><Detail /></LayoutCard>} />
          <Route path='/Cart' element={<CardProduct />} />
          <Route path='/History' element={<History />} />
          <Route path='/Profile' element={<Profile />} />
        </Route>

        <Route path='/Login' element={<LoginLayout><Login /></LoginLayout>} />
        <Route path='/Register' element={<LoginLayout><Register /></LoginLayout>} />
      </Routes>
    </div>
  );
};

export default Router;
