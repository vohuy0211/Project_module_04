import './History.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CartAPI } from '../../models/cart';
import Header from '../Common/Header/Header';

const HIstory = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderData, setOrderData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData: any = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  // console.log("userObject", userObject); //userId 
  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseOrder: any = await CartAPI.getOder(userObject.id)
      // console.log("con cac", responseOrder.oder[0].id);

      const response = await CartAPI.getHistory(responseOrder.oder[0].id);
      // console.log("dmjhsd,kfhsdk", response);
      setOrderData(response.data);
    };
    fetchData();
  }, []);
  const totalPrice = orderData?.length > 0 ? orderData.reduce((total, item) => total + item.Book.price * item.quantity, 0) : 0;
  // console.log("hahahah", orderData);
  return (
    <div className="history-wrapper">
      <Header />
      <h2>Lịch sử mua hàng</h2>

      {orderData?.map((item) => (
        <div className="order-item">
          <div className="order-header">
            <div className="order-meta">
              Mã đơn hàng: | Ngày đặt hàng: {new Date(item.oderDate).toLocaleDateString()}
            </div>
            <div className="order-status"></div>
          </div>
          <div className="product-list">
            <div className="product-item">
              <img
                className="product-image"
                src={item.Book.img}
                alt="Product"
              />
              <div className="product-details">
                <div className="product-name">Số lượng : {item?.quantity}</div>
                <div className="product-price">
                  Giá:{(item.Book.price * item.quantity).toLocaleString()} <span>đ</span>
                </div>
                <div className="product-price">
                  <h3>Tên sản phẩm : {item.Book.nameBook}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <Link className="action-button primary-button" to="/Cart">
              Quay lại giỏ hàng
            </Link>
          </div>
          <div>
            <h4>
              Tình trạng :
              {item.status === 1 ? (
                <h3>Đang giao hàng</h3>
              ) : item.status === 2 ? (
                <h3>Đã giao hàng</h3>
              ) : (
                <h3>Không xác định</h3>
              )}

            </h4>
          </div>
        </div>
      ))}
      <div>Tổng tiền :  {totalPrice?.toLocaleString()}đ</div>

      <div className="separator"></div>
      <div className="footer-section">
        <div>
          <a className="footer-link" href="#">
            Trợ giúp
          </a>
          <a className="footer-link" href="#">
            Điều khoản
          </a>
          <a className="footer-link" href="#">
            Bảo mật
          </a>
        </div>
        <div>
          <a className="footer-link" href="#">
            Shopee © 2023
          </a>
        </div>
      </div>
    </div>
  )
}

export default HIstory