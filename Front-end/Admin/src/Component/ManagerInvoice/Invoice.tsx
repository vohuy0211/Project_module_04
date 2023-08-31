import './Invoice.css';

import React, { useEffect, useState } from 'react';

import { BookAPI } from '../../models/Book';
import { History } from '../../models/history';
import { OrderItem } from '../../types/typeBook';
import LoadingComponent from '../Loading';

// import { IOrder, OrderItem } from '../../types/typeBook';

const Invoice = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataOder, setDataOder] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  const [isCall, setIsCall] = useState(true);
  console.log(setIsCall);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoicePage = dataOder.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    const handleGetAllOder = async () => {
      const response = await BookAPI.getOder();
      // console.log(response.data.data);
      setLoading(false)
      setDataOder(response.data.data);
    };
    handleGetAllOder();
  }, [isCall]);
  // console.log(dataOder);

  const handleShip = async (id: number) => {
    // console.log(id);
    const response = await History.getHistoryById(id);
    console.log("haha", response.data.data);
    const dataById = response.data.data
    setLoading(false)
    if (dataById.status === 1) {
      try {
        const newStatus = 2;
        await History.editHistory(id, newStatus)

        setDataOder((prevData) =>
          prevData.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
          ));
        console.log(dataOder);

      } catch (error) {
        console.error("Error updating user status:", error);
      }
    } else {
      try {
        const newStatus = 1;
        await History.editHistory(id, newStatus)

        setDataOder((prevData) =>
          prevData.map((user) =>
            user.id === id ? { ...user, status: newStatus } : user
          ));
        console.log(dataOder);
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  }


  return (
    <div className="table-user">
      {loading && <LoadingComponent />}
      <div className="dashboard-content">
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <h2>Invoice List</h2>
            <div className="dashboard-content-search">
              <input
                type="text"
                placeholder="Search.."
                className="dashboard-content-input"
              />
            </div>
          </div>

          <table>
            <thead>
              <th>ID</th>
              <th>Order Date</th>
              <th>USERNAME</th>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>ADDRESS</th>
              <th>PHONE</th>
              <th>ACTION</th>
            </thead>
            <tbody>
              {currentInvoicePage?.map((item: OrderItem) => (
                <tr key={item.id}>
                  <td>
                    <span>{item.id}</span>
                  </td>
                  <td>
                    <span>
                      {new Date(item.oderDate).toLocaleDateString("en-US")}
                    </span>
                  </td>
                  <td>
                    <div>{item.oder.User.username}</div>
                  </td>
                  <td>
                    <div>{item.Book.nameBook}</div>
                  </td>
                  <td>
                    <div>
                      <span>{item.price.toLocaleString()} đ</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>{item.quantity}</span>
                    </div>
                  </td>
                  <td>{item.oder.User.address}</td>
                  <td>
                    <span>{item.oder.User.phoneNumber}</span>
                  </td>
                  <td>
                    {item.status !== 2 ? (
                      item.status === 1 ? (
                        <button className="btn-ship-1"
                          onClick={() => handleShip(item.id)}>Đang giao </button>
                      ) : (
                        ""
                      )
                    ) : "Đã giao"}
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
              disabled={indexOfLastItem >= dataOder.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice