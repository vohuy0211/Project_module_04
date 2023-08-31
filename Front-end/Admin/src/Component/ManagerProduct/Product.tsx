import './Product.css';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import axiosClient from '../../api/axiosClient';
import { BookAPI } from '../../models/Book';
import { IBook, IEditBook } from '../../types/typeBook';
import LoadingComponent from '../Loading';

const Product = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [showModal, setShowModal] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [dataBook, setDataBook] = useState<Array<IBook>>([]);
  // const [isCall, setIsCall] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(true);
  const [dataEdit, setDataEdit] = useState<IEditBook>({} as IEditBook)

  const handleGetAllBook = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await BookAPI.getAllBook();
      console.log("setDATA", response.data.data);
      setLoading(false)
      setDataBook(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (isDataFetched) {
      // Only fetch data if it's not already fetched
      setLoading(false)
      handleGetAllBook();

    }
    return () => {
      setIsDataFetched(false);
    };
  }, [isDataFetched]);
  console.log(dataBook);


  const handleDelete = async (id: number) => {
    // console.log("id nè ", id);
    try {
      await BookAPI.deleteId(id);
      setDataBook((preveData) => preveData.filter((item) => item.id !== id));
      setLoading(false)
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      if (searchTerm) {
        const response = await BookAPI.searchBook(searchTerm);
        console.log(response.data.data);
        const data = response.data.data;
        setLoading(false)
        setDataBook(data);
      } else {
        setIsDataFetched(true);
      }
    } catch (error) {
      console.error("Error searching books:", error);
      setLoading(false)
    }
  };

  const handleEdit = async (id: number) => {
    setShowModal(true);
    const response = await BookAPI.getBookById(id);
    console.log(response.data.data);
    const data = response.data.data;
    console.log("data", data)
    setLoading(false)
    setDataEdit(data);
  };

  //handle onChangeEdit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setDataEdit((prevDataEdit) => ({
      ...prevDataEdit,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setLoading(false)
    setShowModal(false);
  };

  const handleModalAddBook = () => {
    setLoading(false)
    setShowAddBook(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChangeValue = (e: any) => {
    const { name, value } = e.target;
    setDataEdit({
      ...dataEdit,
      [name]: value,
    });
  };

  const handleCloseModalBook = () => {
    setLoading(false)
    setShowAddBook(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageChange = (e: any) => {
    //lấy ra đường dẫn ảnh khi click
    const file = e.target.files[0];
    //call api lên server để lấy về đường dẫn dạng localhost:8080//images/...
    axiosClient({
      method: "POST",
      url: "api/v1/upload",
      data: {
        uploadFile: file,
      },
      headers: {
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        console.log(res.data.imageUrl.image);
        setDataEdit({ ...dataEdit, img: res.data.imageUrl.image });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddBook = async (e: any) => {
    e.preventDefault();
    try {
      console.log("hello e zai", dataEdit);
      const response = await BookAPI.postBook(dataEdit);
      console.log(response);
      setLoading(false)
      handleGetAllBook();
      setShowAddBook(false);
      toast.success("Thêm sản phẩm thành công", {
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
      setShowAddBook(false);
      setLoading(false)
      console.error("Error updating book data:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(dataEdit);
    try {
      const response = await BookAPI.updateBook(dataEdit.id, dataEdit);
      // setIsDataFetched(true);
      handleGetAllBook();
      console.log(response);
      setShowModal(false);
      setLoading(false)
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
      setLoading(false)
      console.error("Error updating book data:", error);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataBook.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);

  return (
    <div className="table-user">
      {loading && <LoadingComponent />}
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
      <div className="dashboard-content">
        <div className="dashboard-content-container">
          <div className="dashboard-content-header">
            <h2>Product List</h2>
            <button className="addBook" onClick={handleModalAddBook}>
              Add products
            </button>
            {showAddBook && (
              <>
                <div className="modals-book">
                  <div className="modal-content-book">
                    <form onSubmit={handleAddBook}>
                      <div>
                        <label htmlFor="image">Hình ảnh:</label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleImageChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="productName">Tên sản phẩm:</label>
                        <input
                          type="text"
                          name="nameBook"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="productName">Tác giả:</label>
                        <input
                          type="text"
                          name="author"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="price">Giá sản phẩm:</label>
                        <input
                          type="text"
                          name="price"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="stock">Hàng tồn kho:</label>
                        <input
                          type="text"
                          name="quantity"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="category">Thể loại:</label>
                        <input
                          type="text"
                          name="category"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div>
                        <label htmlFor="category">Nội dung :</label>
                        <input
                          type="text"
                          name="description"
                          onChange={handleOnChangeValue}
                        />
                      </div>
                      <div className="btn-update">
                        <button className="button-update" type="submit">
                          Add product
                        </button>
                        <button
                          className="button-cancel"
                          onClick={handleCloseModalBook}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
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
              <th>HÌNH ẢNH</th>
              <th>TÊN SẢN PHẨM</th>
              <th>GIÁ SẢN PHẨM</th>
              <th>TỒN KHO</th>
              <th>CATOGERY</th>
              <th>ACTION</th>
            </thead>
            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id}>
                  <td>
                    <span>{product.id}</span>
                  </td>
                  <td className="img-book">
                    <img src={product.img} />
                  </td>
                  <td>
                    <div>{product.nameBook}</div>
                  </td>
                  <td>
                    <div>
                      <span>{product.price.toLocaleString()}đ</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>{product.quantity}</span>
                    </div>
                  </td>
                  <td>
                    <span>{product.category}</span>
                  </td>
                  <td>
                    <button
                      className="button-edit"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
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
                            <img
                              src={dataEdit?.img}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <form onSubmit={handleSubmit}>
                              <div>
                                <input
                                  type="file"
                                  name="image"
                                  onChange={handleImageChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="productName">
                                  Tên sản phẩm:
                                </label>
                                <input
                                  type="text"
                                  name="nameBook"
                                  value={dataEdit.nameBook}
                                  onChange={handleOnChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="price">Giá sản phẩm:</label>
                                <input
                                  type="text"
                                  name="price"
                                  value={dataEdit.price}
                                  onChange={handleOnChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="stock">Hàng tồn kho:</label>
                                <input
                                  type="text"
                                  name="quantity"
                                  value={dataEdit.quantity}
                                  onChange={handleOnChange}
                                />
                              </div>
                              <div>
                                <label htmlFor="category">Thể loại:</label>
                                <input
                                  type="text"
                                  name="category"
                                  value={dataEdit.category}
                                  onChange={handleOnChange}
                                />
                              </div>
                              <div className="btn-update">
                                <button className="button-update" type="submit">
                                  Update
                                </button>
                                <button
                                  className="button-cancel"
                                  onClick={handleCloseModal}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </>
                    )}
                    <button
                      className="button-delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
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
              disabled={indexOfLastItem >= dataBook.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product