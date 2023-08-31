import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Books } from '../models/book.model';

export class BookController {
  static async handleGetBook(req: Request, res: Response): Promise<any> {
    console.log(req);

    try {
      const bookAll = await Books.findAll({
        order: [["nameBook", "ASC"]]
      });
      res.status(200).json({ data: bookAll });
    } catch (error) {
      console.log(error);

      res.status(500).json({ msg: 'Server loi' });
    }
  }

  static async handlePostBook(req: Request, res: Response) {
    console.log("abc", req.body);
    try {
      const { img, nameBook, quantity, author, description, category, price } = req.body;
      console.log('dữ liệu nè ===>', req.body);
      const result = await Books.create({ img, nameBook, quantity, author, description, category, price });
      res.status(200).json({ message: 'Inserted successfully', result });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async handleGetBookId(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      console.log(bookId);
      const dataBookId = await Books.findByPk(bookId);
      res.status(200).json({ data: dataBookId });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async handleDelete(req: Request, res: Response): Promise<any> {
    try {
      const bookId = req.params.id;
      const bookDelete = await Books.findByPk(bookId);
      if (!bookDelete) {
        return res.status(404).json({ message: 'Book not found' });
      }
      // Delete the book from the database
      await bookDelete.destroy();

      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async handleSearch(req: Request, res: Response) {
    const searchTerm = req.params.searchTerm;
    console.log(req.params.searchTerm);
    try {
      const bookAll = await Books.findAll({
        where: {
          nameBook: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      });
      res.status(200).json({ data: bookAll });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server loi' });
    }
  }
  static async handlePatchBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id;
      const { img, price, nameBook, quantity, author, description, category } = req.body;
      const updateBook = await Books.update(
        { img, price, nameBook, quantity, author, description, category },
        { where: { id: bookId } }
      );
      res.status(200).json({ message: 'Updated successfully', data: updateBook });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}