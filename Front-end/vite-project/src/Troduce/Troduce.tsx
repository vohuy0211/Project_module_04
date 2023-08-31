import './Troduce.css';

import React from 'react';

import asset from '../assets/img';

const Troduce = () => {
  return (
    <div>
       <div className="wrapper-Content">
        <div className="wrapper-Content-introduce">
          <h2>Xin chào, chúng tôi là Wattpad.</h2>
          <h3>
            Nền tảng truyền thông xã hội về chia sẻ truyện được yêu thích nhất
            thế giới
          </h3>
          <h4>
            Wattpad kết nối cộng đồng toàn cầu gồm 85 triệu độc giả và tác giả
            thông qua sức mạnh của truyện đọc.
          </h4>
          <div className="wrapper-Content-button">
            <button>Bắt đầu đọc</button>
            <button>Bắt đầu viết</button>
          </div>
        </div>
        <div className="wrapper-Content-img">
          <img src={asset.imgContentLogin} />
        </div>
      </div>
      <div className="wrapper-Content-2">
        <h3>Wattpad Hoạt động Như thế nào</h3>
        <p>
          Để truyện của bạn được biết đến thông qua sức mạnh của cộng đồng và
          công nghệ trên Wattpad.
        </p>
        <div className="wrapper-Content-2-row">
          <div className="wrapper-Content-2-row-1">
            <h1>1</h1>
            <div className="dots">
              <div className="title">
                <h2>Viết</h2>
                <p>
                  Chia sẻ quan điểm độc đáo và truyện mới của bạn trên Wattpad.
                  Tìm các tài liệu viết bạn cần để sáng tác câu truyện của riêng
                  mình.
                </p>
              </div>
            </div>
          </div>
          <div className="wrapper-Content-2-row-1">
            <h1>2</h1>
            <div className="dots">
              <div className="title">
                <h2>Xây dựng</h2>
                <p>
                  Xây dựng đội ngũ người hâm mộ trên toàn thế giới khi câu
                  truyện của bạn có độc giả và sức hút. Kết nối với những tác
                  giả cùng chung quan điểm bằng việc kể truyện.
                </p>
              </div>
            </div>
          </div>
          <div className="wrapper-Content-2-row-1">
            <h1>3</h1>
            <div className="dots">
              <div className="title">
                <h2>Mở rộng</h2>
                <p>
                  Đạt trạng thái Wattpad Star và xuất bản hoặc chuyển thể truyện
                  của bạn thành phim điện ảnh hoặc truyền hình cùng Wattpad
                  Books và Wattpad Studios!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="startBubble">
          <div className="startBubble-item">
            <h1>50+</h1>
            <h1>Tài nguyên bài viết</h1>
          </div>
          <div className="startBubble-item">
            <h1>85 TRIỆU </h1>
            <h1>Độc giả..................</h1>
          </div>
          <div className="startBubble-item">
            <h1>1000+</h1>
            <h1>Thỏa thuận xuất bản truyện</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Troduce