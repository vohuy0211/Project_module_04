import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../Component/Login/Login';
import Invoice from '../Component/ManagerInvoice/Invoice';
import Product from '../Component/ManagerProduct/Product';
import User from '../Component/ManagerUser/User';
import RequireLogin from '../Component/RequireLogin/RequireLogin';
import LayoutAdmin from '../Layout/LayoutAdmin/LayoutAdmin';

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route element={<RequireLogin />}>
          <Route path='/User' element={<LayoutAdmin><User /></LayoutAdmin>} />
          <Route path='/Product' element={<LayoutAdmin><Product /></LayoutAdmin>} />
          <Route path='/Invoice' element={<LayoutAdmin><Invoice /></LayoutAdmin>} />
        </Route>

      </Routes>
    </div>
  )
}

export default Router