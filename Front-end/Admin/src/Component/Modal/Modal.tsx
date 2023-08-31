import './Modal.css';

import { Link } from 'react-router-dom';

const Modal = () => {
  return (
    <div>
      <div className='wrapper-exp'>
        <section className='modal-exp'>
          <h2>Phiên đăng nhập đã hết,vui lòng đăng nhập lại</h2>
          <Link to="/">Đăng nhập</Link>
        </section>
      </div>
    </div>
  )
}

export default Modal