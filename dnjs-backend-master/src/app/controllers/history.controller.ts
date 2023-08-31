import { Request, Response } from 'express';

import { Books } from '../models/book.model';
import { History } from '../models/history.model';
import { Oders } from '../models/oder.model';
import { OderItems } from '../models/oderItem.model';
import { User } from '../models/user.model';

export class HistoryController {

  static async handlePostHistory(req: Request, res: Response) {
    try {
      const { price, oderDate, oders_id, books_id, quantity, status } = req.body;
      console.log(req.body);
      const result = await History.create({ price, oderDate, oders_id, books_id, quantity, status });
      // const book = await Book.findByPk(books_id);
      // if (book) {
      //   const updateQuantity = book.quantity - quantity;
      //   await Book.update({ quantity: updateQuantity });
      // }
      res.status(200).json({ data: result });
    } catch (error) {
      console.log(error);
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
  static async handleGetHistoryById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      console.log('order id ', id);
      // const finOrder = await Oders.findOne({ id: id } as any);
      // console.log("data ===>", finOrder);

      // const orderId = finOrder.dataValues.id;
      // console.log("orderId", orderId);

      const historyUser = await History.findAll({
        where: { oders_id: id },
        include: [
          {
            model: Oders,
            attributes: ['id', 'user_id'],
            include: [{ model: User, attributes: ['username', 'address', 'phoneNumber'] }],
          },
          { model: Books, attributes: ['id', 'nameBook', 'price', 'img'] },
        ],
      });
      if (!historyUser) {
        res.status(404).json({ message: 'Không tìm thấy lịch sử đơn hàng với id đã cho', data: [] });
      }
      res.status(200).json({ data: historyUser });
    } catch (error) {
      res.status(500).json({ message: 'Không tìm thấy  với id đã cho', data: [] });
    }
  }
  static async handleGetHistoryAll(req: Request, res: Response) {
    console.log(req);

    try {
      const historyData = await History.findAll({
        include: [
          {
            model: Oders,
            attributes: ['id', 'user_id'],
            include: [
              {
                model: User,
                attributes: ['username', 'address', 'phoneNumber'],
              },
            ],
          },
          {
            model: Books,
            attributes: ['id', 'nameBook', 'price', 'img'],
          },
          {
            model: OderItems,
            attributes: ['quantity'],
          }
        ],
      });

      if (!historyData || historyData.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy lịch sử đơn hàng', data: [] });
      }

      return res.status(200).json({ data: historyData });
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi khi truy vấn dữ liệu lịch sử', data: [] });
    }
  }
  static async handlePatchHistory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { status } = req.body;
      const updateHistory = await History.update({ status }, { where: { id: id } });
      res.status(200).json({ data: updateHistory });

    } catch (error) {
      res.status(500).json({ message: 'Lỗi' });
    }
  }
  static async handleGetById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const historyItem = await History.findOne({
        where: { id: id },
        include: [
          {
            model: Oders,
            attributes: ['id', 'user_id'],
            include: [
              {
                model: User,
                attributes: ['username', 'address', 'phoneNumber'],
              },
            ],
          },
          {
            model: Books,
            attributes: ['id', 'nameBook', 'price', 'img'],
          },
          {
            model: OderItems,
            attributes: ['quantity'],
          }
        ],
      });

      if (!historyItem) {
        return res.status(404).json({ message: 'Không tìm thấy lịch sử đơn hàng với id đã cho', data: null });
      }

      return res.status(200).json({ data: historyItem });
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi khi truy vấn dữ liệu lịch sử', data: null });
    }
  }
}