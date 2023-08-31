import './Login.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import axiosClient from '../../api/axiosClient';
import { ILogin } from '../../models/Login';
import { handleLogin } from '../../store/slice/LoginSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deleteCookie(name: any) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
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

        localStorage.removeItem('token');
        localStorage.removeItem('user')
      })
    }
  }, [])
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
      const payload: ILogin = {
        email: inputValue.email,
        password: inputValue.password,
      };
      console.log("dữ liệu===>", payload);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await dispatch(handleLogin(payload) as any).unwrap();
      console.log("LOGIN", response.data.data.role);
      const checkUser = response.data.data.role;
      if (checkUser == 2) {
        toast.success("Hello ADMIN", {
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
          navigate("/User");
        }, 2000);
      } else {
        toast.error("Xin lỗi , bạn không đủ quyền hạn để đăng nhập !!!!", {
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
      console.log(error.message);
      toast.error(error.message, {
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
    <MDBContainer fluid className='body'>
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

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <form onSubmit={handleSubmit}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100' >

                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>


                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"
                  onChange={handleInputChange}
                  name="email"
                />
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"
                  onChange={handleInputChange}
                  name="password"
                />

                <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                <MDBBtn outline className='mx-2 px-5' color='white' size='lg' type='submit'>
                  Login
                </MDBBtn>


                <div className='d-flex flex-row mt-3 mb-5'>
                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='facebook-f' size="lg" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='twitter' size="lg" />
                  </MDBBtn>

                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='google' size="lg" />
                  </MDBBtn>
                </div>

                <div>
                  <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>

                </div>
              </MDBCardBody>
            </form>

          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;