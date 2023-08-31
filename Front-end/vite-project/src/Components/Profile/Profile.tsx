import './Profile.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { IRegister, Login } from '../../models/User';
import Header from '../Common/Header/Header';

const Profile = () => {

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<IRegister | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataUser, setDataUser] = useState<any>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataEdit, setDataEdit] = useState<any>({})
  console.log(editingUser);

  const handleGetUserById = async () => {
    try {
      const response = await Login.getUserById(userData.id)
      // console.log("aaaa", response.data);
      setDataUser(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // console.log(dataUser);
  useEffect(() => {
    handleGetUserById()
  }, [])



  const userDataStr = localStorage.getItem("user");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData: any | null = userDataStr ? JSON.parse(userDataStr) : null;

  const handleEdit = async (user: IRegister) => {
    setEditingUser(user);
    // console.log(setEditingUser);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await Login.getUserById(userData.id);
    // console.log(response.data);
    setDataEdit(response.data);
    setShowModal(true);
    // console.log(dataEdit);

  };
  const handleCancel = () => {
    setShowModal(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDataEdit((prevDataEdit: any) => ({
      ...prevDataEdit,
      [name]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await Login.EditUser(dataEdit.id, dataEdit)
      console.log(response);
      handleGetUserById()
      setShowModal(false);
      toast.success("Cập nhật thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setShowModal(false);
      console.error("Error updating book data:", error);
    }
  }


  return (
    <>
      <Header />
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
      <br></br>
      <div className="profile">

        <div className="profile-header">
          <h2>Thông tin cá nhân</h2>
        </div>
        {dataUser && (
          <div className="profile-content">
            <div className="profile-item">
              <span className="profile-label">Username:</span>
              <span className="profile-value">{dataUser.username}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Phone Number:</span>
              <span className="profile-value">{dataUser.phoneNumber}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Address:</span>
              <span className="profile-value">{dataUser.address}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{dataUser.email}</span>
            </div>
            <button className='btn-update' onClick={() => handleEdit(dataUser.id)}>Edit</button>
          </div>
        )}
        {showModal && (
          <>
            <div className="modals">
              <div
                className="modal-content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <form onSubmit={handleSubmit}>

                  <div>
                    <label htmlFor="username">
                      username:
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={dataEdit.username}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={dataEdit.address}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber">PhoneNumber:</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={dataEdit.phoneNumber}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={dataEdit.email}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="btn-update-a">
                    <button className="button-update" type="submit">
                      Update
                    </button>
                    <button
                      className="button-cancel"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
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
    </>
  );
};

export default Profile;
