import './Header.css';

import { useEffect, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import { GrCart } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import asset from '../../../assets/img';
import { CartAPI } from '../../../models/cart';
import { Login } from '../../../models/User';
// import { ILogin } from '../../../models/User';
import { ICart } from '../../../types/cart';
import { handleSearch } from '../../store/slice/searchSlice';

const Header = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData: any = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  const [dataOrder, setDataOrder] = useState<ICart>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataUser, setDataUser] = useState<any>({})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = useSelector((state: any) => state.update);
  // const [isCall, setIsCall] = useState(true);
  // const [updateCart, setUpdateCart] = useState<any>(0);
  const dispatch = useDispatch();
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const handleGetCart = async (id: number) => {
    // console.log(id);
    try {
      const response = await CartAPI.getToCart(id);
      // console.log("response", response.data.data);
      const data = response.data.data;
      setDataOrder(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    handleGetCart(userObject?.id);
  }, [update]);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    window.location.href = "/login";
  };

  // const handleAddtoCart = () => {
  //   setUpdateCart(dataOrder?.length);
  // };
  // useEffect(() => {
  //   handleAddtoCart();
  // }, [dataOrder]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchValue = (e: any) => {
    dispatch(handleSearch(e.target.value));
  };
  const handleToggleSetting = () => {
    setIsSettingOpen((prev) => !prev);
    // console.log(dataOrder);
  }

  const handleGetUserById = async () => {
    try {
      const response = await Login.getUserById(userObject.id)
      // console.log("aaaa", response.data);
      setDataUser(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    handleGetUserById()
  }, [])
  // console.log(dataUser);


  return (
    <div className="wrapper-header">
      <div className="wrapper-header-left">
        <div className="header-logo">
          {userObject ? (
            <Link to="/User">
              <img src={asset.logo} />
            </Link>
          ) : (
            <Link to="/">
              <img src={asset.logo} />
            </Link>
          )}
        </div>
        <div className="header-navbar">
          <ul>
            <a>Khám phá</a>
            <li>Cộng đồng</li>
            <li className="header-search">
              <BiSearchAlt2 />
              <input
                type="text"
                placeholder="Tìm kiếm"
                onChange={(e) => handleSearchValue(e)}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="wrapper-header-right">
        <div>
          {userObject ? (
            <Link to="">Xin chào !!! {dataUser.username} </Link>
          ) : (
            <Link to="/Login">Đăng nhập </Link>
          )}
        </div>
        <div className="icon-cart">
          <Link to="/Cart">
            <GrCart />
          </Link>
          <div className="count">{dataOrder?.length}</div>
          {userObject ? <button onClick={handleLogout}>Đăng xuất</button> : ""}
        </div>
        <div className="settings">
          <AiOutlineSetting onClick={handleToggleSetting} />
          {isSettingOpen && (
            <div className="settings-dropdown">
              <ul>
                <li>
                  <Link to="/Profile">Hồ sơ của tôi</Link>
                </li>
                <li>
                  <Link to="/History">Lịch sử giao hàng</Link>
                </li>
                <li>
                  <Link to="">Danh sách yêu thích</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}




export default Header;
