import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import uuidv4 from 'uuid/v4';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

//init storage
export const fileStorage = multer.diskStorage({
  //sét úp nơi để lưu trữ
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, "./public/images");
  },
  //tạo đường dẫn ảnh ngẫu nhiên
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    const fileName: string = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

// set up việc lọc hình ảnh
export const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

// khởi tạo middleware
export const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});