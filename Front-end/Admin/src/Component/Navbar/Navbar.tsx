import './Navbar.css';

import React from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { LuBookCopy } from 'react-icons/lu';
import { RiProductHuntFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

// import User from './../ManagerUser/User';

const Navbar = () => {
  return (
    <div className="wrapper-navbar">
      <ul className="wrapper-navbar-item">
        <div>
          <h2>BookStore</h2>
        </div>
        <li>
          <BiUserCircle />
          <Link to="/User"> Quản lí người dùng</Link>
        </li>
        <li>
          <RiProductHuntFill />
          <Link to="/Product"> Quản lí sản phẩm</Link>
        </li>
        <li>
          <LuBookCopy />
          <Link to="/Invoice"> Quản lí hoá đơn</Link>
        </li>
      </ul>
      <div className="Navbar-Logout ">
        <Link to="/" className='logout'>
          Logout
        </Link>
        <div className="iconLogout">
          <AiOutlinePoweroff />
        </div>
      </div>
    </div>
  )
}

export default Navbar