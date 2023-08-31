import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { IRegister } from '../../models/User';
// import { IRegister } from '../../models/User';
import { IError } from '../../types/user';
import { handleRegister } from '../store/slice/UserSlice';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState<IRegister>({
    id: 0,
    email: '',
    username: '',
    password: '',
    confirmPassword: "",
    phoneNumber: 0,
    address: '',
    role: 1,
    status: 1
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState<IError>({
    username: "",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "confirmPassword") {
      if (e.target.value === inputValue!.password) {
        setErrors({
          username: "",
          phoneNumber: "",
          address: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          confirmPassword: "Mật khẩu không trùng nhau"
        }));
      }
    }
    setInputValue({
      ...inputValue!,
      [e.target.name]: e.target.value,
    });
  };

  // validate

  // Cập nhật trạng thái lỗi

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {

    e.preventDefault();
    // console.log("oke");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErrors: any = {
      username: "",
      phoneNumber: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
    if (!inputValue?.username) {
      newErrors.username = "Vui lòng nhập tên người dùng";
    }
    if (!inputValue?.phoneNumber) {
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
    }
    if (!inputValue?.address) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }
    if (!inputValue?.email) {
      newErrors.email = "Vui lòng nhập email";
    }
    // Kiểm tra các trường input khác
    if (!inputValue?.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }
    // Kiểm tra trùng khớp mật khẩu
    if (inputValue?.password !== inputValue?.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không trùng nhau";
    }
    if (!inputValue?.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    }
    setErrors(newErrors); // Cập nhật trạng thái lỗi

    // Kiểm tra xem có lỗi không
    if (Object.keys(newErrors).some((key: string) => newErrors[key] !== "")) {
      return; // Nếu có lỗi, không thực hiện đăng ký
    }

    try {

      const { confirmPassword, ...payload } = inputValue;
      console.log(confirmPassword);

      // confirmPassword CHƯA ĐƯỢC SỬ DỤNG 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await dispatch(handleRegister(payload) as any).unwrap();
      toast.success("Register in successfully", {
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
        navigate("/Login"); // Chuyển đến trang đăng nhập
      }, 5000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      toast.error("Email đã có người sử dụng !!", {
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
    <>
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
      <form onSubmit={handleSubmit} method="POST">
        <h3>Tham gia Wattpad</h3>
        <p>
          Là một phần của cộng đồng tác giả và độc giả toàn cầu, mọi người đều
          được kết nối bằng sức mạnh của truyện đọc.
        </p>
        <div className="form-group">
          <label>Username:</label>
          <input type="name" name="username" onChange={handleInputChange} />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number :</label>
          <input
            type="number"
            name="phoneNumber"
            onChange={handleInputChange}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="form-group">
          <label>Address :</label>
          <input type="text" name="address" onChange={handleInputChange} />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input type="password" name="password" onChange={handleInputChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Nhập lại mật khẩu</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit">Đăng ký</button>
        <div className="Register-Login-1">
          <div>Bạn đã có tài khoản ?</div>
          <div className="Register">
            <h4>
              <Link to="/Login">Đăng nhập</Link>
            </h4>
          </div>
        </div>
      </form>
    </>
  )
}

export default Register