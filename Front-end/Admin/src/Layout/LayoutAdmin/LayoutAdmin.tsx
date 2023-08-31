import './LayoutAdmin.css';

import React from 'react';

import Navbar from '../../Component/Navbar/Navbar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LayoutAdmin = ({ children }:any) => {
  return (
   <div className="Admin">
      <Navbar />
      {children}
    </div>
  )
}

export default LayoutAdmin