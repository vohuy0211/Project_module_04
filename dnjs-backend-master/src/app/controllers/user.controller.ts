import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import sceret from '../../configs/jwt.config';
import { User } from '../models/user.model';

let refreshTokenArr: any = []
export class UserController {
  static async handleRegister(req: Request, res: Response): Promise<any> {
    // get email vs password ở body
    const { email, password } = req.body;
    console.log(req.body);
    try {
      //kiểm tra username đã tồn tại chưa
      const UserData = await User.findOne({ where: { email } });

      // nếu mà tồn tại username thì báo lỗi
      if (UserData) {
        return res.status(400).json({ msg: 'email already exists' });
      }
      // trường hợp k tồn tại username
      const saltRounds = 10; //độ an toàn mã hóa của password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt); // Mã hóa password
      const user = await User.create({ ...req.body, password: hashedPassword }); // Insert dữ liệu, password = password mới mã hóa

      return res.status(200).json({ msg: 'Register Successfully' });
    } catch (error) {
      // lỗi serve
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async handleLogin(req: Request, res: Response) {
    // get username vs password ở body
    const { email, password } = req.body;
    try {
      // Kiểm tra username và trả về toàn bộ data
      const user: any = await User.findOne({ where: { email } });
      console.log("dataUser", user);
      // Nếu có user thì so sánh password bằng hàm compare
      if (user) {
        const myPass = await bcrypt.compare(password, user.dataValues.password);
        if (myPass) {
          const accessToken = jwt.sign(user.dataValues, sceret.sceretKey, { expiresIn: "6000s" });
          const refreshToken: any = jwt.sign(user.dataValues, sceret.sceretKeyRefresh, { expiresIn: "365d" });
          refreshTokenArr.push(refreshToken)
          const { password, ...data } = user.dataValues;
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          res.status(200).json({
            data,
            accessToken
          })
        } else {
          res.status(401).json({ msg: 'Password Wrong' });
        }
      } else {
        // Nếu sai thì báo lỗi
        res.status(401).json({ msg: 'email dont exist' });
      }
    } catch (error) {
      res.status(404).json({ msg: 'not found' });
    }
  }

  static async refreshToken(req: Request, res: Response): Promise<any> {
    const refreshToken = req.cookies.refreshToken;
    console.log(111, refreshToken);

    //Lưu ý nhớ cài đặt cookie-parser
    if (!refreshToken) res.status(401).json("Unauthenticated")
    if (!refreshTokenArr.includes(refreshToken)) {
      return res.status(401).json("Unauthenticated")
    }
    jwt.verify(refreshToken, sceret.sceretKeyRefresh, (err: any, user: any) => {
      if (err) {
        return res.status(400).json("refreshToken is not valid")
      }
      const { iat, exp, ...userOther } = user
      console.log(user);
      refreshTokenArr = refreshTokenArr.filter(token => token !== refreshToken) //lọc ra những thằng cũ
      //nếu đúng thì nó sẽ tạo accessToken mới và cả refreshToken mới
      const newAccessToken = jwt.sign(userOther, sceret.sceretKey, { expiresIn: "6000s" })
      const newRefreshToken = jwt.sign(userOther, sceret.sceretKeyRefresh, { expiresIn: "365d" })
      refreshTokenArr.push(newRefreshToken)
      res.cookie("refreshToken", newRefreshToken, { //Lưu NewrefreshToken vào cookie khi reset thành công 
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      res.status(200).json(newAccessToken)
      return
    })
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken")
    refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refreshToken)
    res.status(200).json("Logout successfully")
  }

  static async handleGetUser(req: Request, res: Response): Promise<any> {
    try {
      console.log(req)
      const userAll: any = await User.findAll();
      res.status(200).json({ data: userAll });
      // return res.status(200).json({msg:"0ok"})
    } catch (error) {
      return res.status(500).json({ msg: 'Server loi' });
    }
  }

  static async handlePutUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { username, phoneNumber, address, role, status } = req.body;
      const updateUser = await User.update({ username, phoneNumber, address, role, status }, { where: { id: id } });
      res.status(200).json({ data: updateUser });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi' });
    }
  }

  static async handlePutUserAth(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { username, phoneNumber, address } = req.body;
      const updateUser = await User.update({ username, phoneNumber, address }, { where: { id: id } });
      res.status(200).json({ data: updateUser });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async handleGetUserById(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        // If the user with the provided ID is not found
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  static async handleSearch(req: Request, res: Response) {
    const searchTerm = req.params.searchTerm;
    console.log(req.params.searchTerm);
    try {
      const userAll = await User.findAll({
        where: {
          username: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      });
      res.status(200).json({ data: userAll });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server loi' });
    }
  }
}

