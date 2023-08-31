import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Modal from '../Modal/Modal';

const RequireLogin: React.FC = () => {
  const accessToken: string | null = localStorage.getItem("token");
  const [exp, setExp] = useState(false);
  useEffect(() => {
    try {
      const date = new Date();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decode: any = jwtDecode(accessToken!);
      if (decode && decode.exp > date.getTime() / 1000) {
        setExp(false);
      } else {
        setExp(true);
      }
    } catch (err) {
      console.log(err);

    }
  }, []);

  return (
    <>
      {exp && <Modal />}
      <Outlet />
    </>
  );
};

export default RequireLogin;