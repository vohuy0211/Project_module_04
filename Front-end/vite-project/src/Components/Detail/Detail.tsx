import './Detail.css';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineComment, AiOutlineSend } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { BookAPI } from '../../models/book';
import { CartAPI } from '../../models/cart';
import { IBookAPI } from '../../types/book';

// import { ICart } from '../../types/cart';

const Detail = () => {
  const { id } = useParams();
  const [idBook, setIdBook] = useState<IBookAPI>();
  // const dispatch = useDispatch(); // 1. Sử dụng useDispatch

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BookAPI.getBookId(id as any).then((data) => {
      console.log("Đúng chưa con chó", data.data);
      const dataDetails = data.data;
      setIdBook(dataDetails);
    });
  }, [id]);

  const categoryArr = idBook?.category.split(",");
  console.log(categoryArr);

  const handleAddtoCart = async (id: number) => {
    const userValue = localStorage.getItem("user");
    const userOrder = userValue ? JSON.parse(userValue) : undefined;

    const valueOrder = { user_id: userOrder.id };
    console.log("user==>", valueOrder);

    await CartAPI.addOder(valueOrder);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await CartAPI.getOder(userOrder.id).then((oder: any) => {
      // console.log("haha", oder.oder[0].id);
      // console.log("hahaha");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataValue: any = {
        quantity: 1,
        book_id: id,
        oders_id: oder.oder[0].id,
      };
      console.log("dataValue", dataValue);
      return dataValue;
    }).then((data) => {
      CartAPI.addToCart(data);
      toast.success("Thêm vào giỏ hàng thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })

  };
  return (
    <div className="wrapper-Detail-card">
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
      <h1>Thông tin truyện</h1>
      <div className="wrapper-Detail">
        <div>
          <h1>THỂ LOẠI</h1>
          <ul>
            {categoryArr?.map((item) => (
              <li className="categoryItem" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img src={idBook?.img} />
        </div>
        <div className="Detail-card">
          <h3>{idBook?.nameBook}</h3>

          <h4>
            Giá : {idBook?.price.toLocaleString()}
            <span>đ</span>
          </h4>
          <p>
            Số lượng <input type="number" />
          </p>
          <h5>Giới thiệu :{idBook?.description}</h5>
          <h5>Số lượng còn lại : {idBook?.quantity}</h5>
          <h5>Tác giả : {idBook?.author}</h5>
          <button onClick={() => idBook?.id && handleAddtoCart(idBook.id)}>
            Thêm vào giỏ hàng
          </button>
          <br></br>
          <br></br>
          <div className='heart'>
            <AiFillHeart />

          </div>
        </div>
      </div>
      <br></br>
      <div className='wrapper-content-comment'>
        <div className='wrapper-comment'>
          <input type='texxt' placeholder='Nhập bình luận ....' />
          <button><AiOutlineSend /></button>
        </div>
        <div className='user-comment'>
          <div>
            <h5>Huy võ</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail