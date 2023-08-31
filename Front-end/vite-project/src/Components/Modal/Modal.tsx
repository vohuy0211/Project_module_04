import './Modal.css';

import React from 'react';
import { Link } from 'react-router-dom';

const Modal = () => {
  return (
    <div>
      <div className='wrapper-exp'>
        <section className='modal-exp'>
          <h2>Phiên đăng nhập đã hết,vui lòng đăng nhập lại</h2>
          <Link to="/login">Đăng nhập</Link>
        </section>
      </div>
    </div>
  )
}

export default Modal