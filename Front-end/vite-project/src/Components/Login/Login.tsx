import './Login.css';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import axiosClient from '../../api/axiosClient';
import { handleLogin } from '../store/slice/UserSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deleteCookie(name: any) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Sử dụng hàm deleteCookie để xóa refreshToken

const Login = () => {
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      axiosClient({
        method: 'POST',
        url: "api/v1/user/logout",
      }).then(() => {
        toast.success("Đăng xuất thành công", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        deleteCookie('refreshToken');
        Cookies.remove('refreshToken')
        localStorage.removeItem('token');
        localStorage.removeItem('user')
      })
    }
  }, [])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = async (e: any) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const payload = {
        email: inputValue.email,
        password: inputValue.password,
      };
      // console.log("dữ liệu===>", payload);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await dispatch(handleLogin(payload) as any).unwrap();
      // localStorage.setItem("userLogin", JSON.stringify(response));
      // console.log(response);
      // console.log("login", response.data.data);
      const checkUser = response.data.data;
      if (checkUser.status === 1) {
        toast.success("Logged in successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/User"); // Chuyển đến trang đăng nhập
        }, 2000);
      } else {
        toast.error("Tài khoản bạn đã bị khoá", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log(error.message);
      toast.error("Login failed !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h3>Đăng nhập vào Wattpad</h3>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email"
            onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Đăng nhập</button>
        <div className="Register-Login">
          <div>Bạn chưa có tài khoản ?</div>
          <div className="Register">
            <h4>
              <Link to="/Register">Đăng ký</Link>
            </h4>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login