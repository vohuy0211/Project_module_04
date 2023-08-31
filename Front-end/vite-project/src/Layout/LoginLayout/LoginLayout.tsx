import './LoginLayout.css';

import React from 'react';
import { CiFacebook } from 'react-icons/ci';
import { FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import asset from '../../assets/img';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoginLayout = ({ children }:any) => {
  return (
    <div>
        <div className="Login">
      <div className="Login-Header">
        <div className="Header-logo">
          <Link to="/">
            {" "}
            <img src={asset.logo} />
          </Link>
        </div>
        <div className="Header-Login">Đăng ký</div>
      </div>
      <div className="Login-Content">
        <img src={asset.imgContentLogin} />
        <div className="Login-form">{children}</div>
      </div>
      <div className="Login-footer">
        <div className="Tab-footer-icon">
          <h4>Giới thiệu</h4>
          <h4>Tác giả</h4>
          <h4>Kinh doanh</h4>
          <h4>Báo chí</h4>
          <h4>Thư mục</h4>
          <h4>Thiết lập</h4>
          <h4>Bảo mật</h4>
          <h4>Công việc</h4>
        </div>
        <div className="Login-footer-icon">
          <CiFacebook />
          <FiTwitter />
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginLayout