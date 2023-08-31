import axios from 'axios';
import jwtDecode from 'jwt-decode';

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});
axios.defaults.withCredentials = true;
const refreshToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/user/refresh-token",
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("token", res.data);
    // console.log("accessToken", res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
//câú hình bộ đón chặn
// Thêm một bộ đón chặn request
axiosClient.interceptors.request.use(
  async (config) => {

    let token;
    try {
      const date = new Date(); //Tạo ngày giờ hiện tại kiểm tra
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      token = localStorage.getItem("token") as any;
      // console.log(token);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = await jwtDecode(token); //giải mã token
      // console.log(decodedToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        //Kiểm tra xem giờ hết hạn token vs giờ hiện tại nếu hết thì phải gọi api refresh để nhận token mới
        const data = await refreshToken();
        token = data;
      }
    } catch (err) {
      console.log(err);

    }

    if (token !== null) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {

    Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
axiosClient.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu respons
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    console.log("loi tra ve la", error.response);
    const { data, config, status } = error.response;
    if (config.url === "api/v1/user/register" && status === 400) {
      throw new Error(data.msg);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
