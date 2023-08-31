import { Express, Request, Response } from 'express';

import { upload } from '../middlewares/upload.middleware';

export default (app: Express) => {
  app.post("/api/v1/upload", upload.single("uploadFile"), (req: Request, res: Response) => {
    //tạo đường dẫn ảnh để lưu vào database
    // req.protocol = 'http'
    //req.get('host') => địa chỉ url hiện tại 

    const url = req.protocol + "://" + req.get("host");
    //tạo đường dẫn ảnh
    const imgURL = {
      image: url + "/images/" + req.file?.filename,
    };

    return res.status(200).json({
      message: "create successfully",
      imageUrl: imgURL
    })
  })
}