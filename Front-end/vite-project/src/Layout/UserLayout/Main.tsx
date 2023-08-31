import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../../Components/Common/Footer/Footer';
import Header from '../../Components/Common/Header/Header';

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Main