import React from 'react';

import Footer from '../../Components/Common/Footer/Footer';
import Header from '../../Components/Common/Header/Header';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LayoutCard = ({ children }: any) => {
  return (
    <div>
      <Header />
      {children}
      <Footer/>
    </div>
  )
}

export default LayoutCard