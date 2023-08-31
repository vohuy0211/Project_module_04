import './User.css';

import { useEffect, useState } from 'react';

import { userAPI } from '../../models/User';
import { IUser } from '../../types/typeUser';
import LoadingComponent from '../Loading';

const User = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [dataUser, setDataUser] = useState<Array<IUser>>([]);
  const [isCall, setIsCall] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // ... your existing state ...

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUserPage = dataUser.slice(indexOfFirstItem, indexOfLastItem);
  // Lấy dữ liệu về render ra 
  useEffect(() => {
    const handleGetUser = async () => {
      // console.log(33333333);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await userAPI.getAllUsers();
      // console.log(response.data.data);
      setLoading(false)
      setDataUser(response.data.data);
    };
    if (isCall) {
      handleGetUser();
    }
    return () => {
      setIsCall(false);
    };
  }, [isCall]);

  // Chỉnh quyền đăng nhập của người dùng
  const handleActive = async (userId: number) => {
    setLoading(true)
    const response = await userAPI.getUserById(userId);
    // console.log(response.data.data);
    const dataById = response.data.data;
    if (dataById.status === 1) {
      try {
        const newStatus = 2;
        await userAPI.editUser(userId, newStatus);
        setLoading(false)
        setDataUser((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
        console.log("loi tra ve la", dataUser);
      } catch (error) {
        setLoading(false)
        console.error("Error updating user status:", error);
      }
    } else {
      try {
        const newStatus = 1;
        await userAPI.editUser(userId, newStatus);
        setLoading(false)
        setDataUser((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
        console.log("loi tra ve la", dataUser);
      } catch (error) {
        setLoading(false)
        console.error("Error updating user status:", error);
      }
    }
  };
  // Tìm kiếm
  const handleSearch = async (searchTerm: string) => {
    try {
      if (searchTerm) {
        const response = await userAPI.searchUser(searchTerm);
        setDataUser(response.data.data);
      } else {
        setIsCall(!isCall); // Reload all users if search term is empty
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  return (
    <div className="table-user">
      {loading && <LoadingComponent />}

      <div className="dashboard-content">
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <h2>User List</h2>
            <div className="dashboard-content-search">
              <input
                type="text"
                placeholder="Search.."
                className="dashboard-content-input"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onInput={(e: any) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          <table>
            <thead>
              <th>ID</th>
              <th>ROLE</th>
              <th>EMAIL</th>
              <th>USERNAME</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>ACTION</th>
            </thead>
            <tbody>

              {currentUserPage && currentUserPage?.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span>{user.id}</span>
                  </td>
                  <td>
                    {user.role === 1 ? (
                      <span>User</span>
                    ) : user.role === 2 ? (
                      <span>Admin</span>
                    ) : null}
                  </td>
                  <td>
                    <div>{user.email}</div>
                  </td>
                  <td>
                    <div>
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td>
                    <span>{user.phoneNumber}</span>
                  </td>
                  <td>
                    <span>{user.address}</span>
                  </td>
                  <td>
                    {user.role !== 2 ? (
                      user.status === 1 ? (
                        <button onClick={() => handleActive(user.id)}>Active</button>
                      ) : user.status === 2 ? (
                        <button onClick={() => handleActive(user.id)} className="color">
                          Block
                        </button>
                      ) : (
                        ""
                      )
                    ) : "...."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= dataUser.length}
            >
              Next
            </button>
          </div>

        </div>
        L</div>
    </div>
  )
}

export default User