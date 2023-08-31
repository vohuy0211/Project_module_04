import './Footer.css';

import React from 'react';

const Footer = () => {
  return (
    <div>
       <div className="wrapper-advertisement">
        <h1>Được khám phá</h1>
        <div className="advertisement-row">
          <div className="Card-item">
            <div className="Card-item-img">
              <img src="https://www.wattpad.com/img//landing/writing-contests.png" />
            </div>
            <div>
              <h4>Cuộc thi viết</h4>
              <p className="text">
                Tham gia vào các cuộc thi viết để được xuất bản, giành giải
                thưởng, và trở thành đối tác với các thương hiệu toàn cầu.
              </p>
            </div>
          </div>
          <div className="Card-item">
            <div className="Card-item-img">
              <img src="https://www.wattpad.com/img//landing/wattys_avatar.png" />
            </div>
            <div>
              <h4>Wattys</h4>
              <p className="text">
                Tham gia vào các cuộc thi viết để được xuất bản, giành giải
                thưởng, và trở thành đối tác với các thương hiệu toàn cầu.
              </p>
            </div>
          </div>
          <div className="Card-item">
            <div className="Card-item-img">
              <img src="https://www.wattpad.com/img//landing/wp-picks.png" />
            </div>
            <div>
              <h4>Wattap chọn</h4>
              <p className="text">
                Tham gia vào các cuộc thi viết để được xuất bản, giành giải
                thưởng, và trở thành đối tác với các thương hiệu toàn cầu.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper-footer">
        <div className="wrapper-footer-content">
          <div className="wrapper-footer-item">
            <h2>Mang theo Wattpad với bạn</h2>
            <p>Đọc và viết bất cứ mọi nơi, ngay cả khi offline.</p>
          </div>
          <div className="wrapper-btn-icon">
            <button>Bắt đầu đọc</button>
            <button>Bắt đầu viết</button>
          </div>
          <div className="wrapper-footer-img">
            <img src="https://www.wattpad.com/img/landing/footer-devices.png" />
          </div>
        </div>
      </div>
      <div className="wrapper-footer-end">
        <div className="wrapper-footer-end-right">
          <h5>Truyện Tính phí</h5>
          <h5>Thử dùng gói Cao cấp</h5>
          <h5>Tải Ứng Dụng</h5>
          <h5>Ngôn ngữ</h5>
          <h5>Các tác giả</h5>
          <h5>Kinh Doanh</h5>
          <h5>Công việc</h5>
          <h5>Báo chí</h5>
        </div>
        <div className="wrapper-footer-end-left">
          <h5>Điều khoản </h5>
          <h5>Bảo mật</h5>
          <h5>Thiết lập</h5>
          <h5>Trợ giúp</h5>
        </div>
      </div>
    </div>
  )
}

export default Footer