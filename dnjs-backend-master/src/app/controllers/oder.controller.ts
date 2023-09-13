import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Oders } from '../models/oder.model';

export class OderController {
  static async postOder(req: Request, res: Response) {
    try {
      const { status, user_id } = req.body;
      console.log('oder :', req.body);
      const checkId = await Oders.findOne({ where: { user_id: user_id } });
      if (!checkId) {
        const result = await Oders.create({ status, user_id });
        res.status(200).json({ message: 'Inserted successfully', result });
      }
      console.log('checkId : ', checkId);
      res.status(200).json({ message: 'Updated successfully', checkId });
    } catch (error) {
      res.status(500).json({ message: 'không nhận được' });
    }
  }

  static async getAllOder(req: Request, res: Response) {
    console.log(req);

    try {
      const dataOder = await Oders.findAll();
      res.status(200).json({ Oders: dataOder });
    } catch (error) {
      console.log(error);

    }
  }

  static async getOderById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const dataOder = await Oders.findAll({ where: { user_id: id } });
      res.status(200).json({ oder: dataOder });
    } catch (error) { }
  }
}

