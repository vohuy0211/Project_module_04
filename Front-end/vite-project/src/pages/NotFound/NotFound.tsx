import React from "react";

import asset from "../../assets/img"; // Đảm bảo bạn đã nhập đúng đường dẫn tới hình ảnh notFound

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
      }}
    >
      <img
        src={asset.notFound}
        alt="Not Found"
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </div>
  );
};

export default NotFound;
