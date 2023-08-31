import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Books } from '../models/book.model';
import { Oders } from '../models/oder.model';
import { OderItems } from '../models/oderItem.model';

export class OderItemController {
  static async handleGetOderItem(req: Request, res: Response) {
    console.log(req);

    try {
      const OderAll = await OderItems.findAll({
        include: [
          {
            model: Books,
            attributes: ['price', 'nameBook', 'img'],
          },
        ],
        attributes: ['id', 'quantity', 'book_id'],
      });
      res.status(200).json({ data: OderAll });
    } catch (error) {
      res.status(500).json({ msg: 'Server loi' });
    }
  }

  static async handlePostOderItem(req: Request, res: Response) {
    try {
      const { book_id, oders_id } = req.body;
      let { quantity } = req.body;

      // Tìm kiếm oderItem trong cơ sở dữ liệu dựa vào book_id và oders_id
      const existingOderItem: any = await OderItems.findOne({
        where: {
          book_id: book_id,
          oders_id: oders_id,
        },
      });

      if (existingOderItem) {
        // Nếu sản phẩm đã có trong oderItem, cộng thêm 1 vào quantity
        quantity += existingOderItem.quantity;

        // Cập nhật quantity trong cơ sở dữ liệu
        await existingOderItem.update({ quantity: quantity });

        res.status(200).json({ message: 'Cập nhật giỏ hàng thành công', data: existingOderItem });
      } else {
        // Nếu sản phẩm chưa có trong oderItem, tạo mới oderItem
        const result = await OderItems.create({ book_id, oders_id, quantity });
        res.status(200).json({ message: 'Thêm vào giỏ hàng thành công', data: result });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi" });
    }
  }

  static async handleDeleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await OderItems.destroy({ where: { oders_id: id } });
      res.status(200).json({ message: 'Oder item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete oder item' });
    }
  }

  static async handleDeleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await OderItems.destroy({ where: { id: id } });
      res.status(200).json({ message: 'Oder item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete oder item' });
    }
  }

  static async handlePatchOderItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      await OderItems.update({ quantity }, { where: { id: id } });
      res.status(200).json({ message: 'Oder item updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update oder item' });
    }
  }

  static async handleGetOderItemById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      console.log('id ====', req.params.id);
      const orderUser: any = await Oders.findOne({
        where: {
          user_id: id,
        },
      });
      console.log(orderUser);
      const data = await OderItems.findAll({
        where: {
          oders_id: orderUser.id,
        },
        include: [
          {
            model: Books,
            attributes: ['price', 'nameBook', 'img'],
          },
        ],
        attributes: ['id', 'quantity', 'book_id'],
      });

      if (data) {
        res.status(200).json({ data: data });
      } else {
        res.status(500).json({ message: 'Không tìm thấy OderItem với id đã cho', data: [] });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}