import { Express } from 'express';

import { BookController } from '../controllers/book.controller';
import { upload } from '../middlewares/upload.middleware';

const URL = `/api/v1/book`

export default (app: Express) => {
  app.get(`${URL}/getBook`, BookController.handleGetBook);
  app.post(`${URL}/postBook`, BookController.handlePostBook);
  app.get(`${URL}/getBook/:id`, BookController.handleGetBookId);
  app.delete(`${URL}/deleteBook/:id`, BookController.handleDelete);
  app.get(`${URL}/searchBook/:searchTerm`, BookController.handleSearch);
  app.patch(`${URL}/patchBook/:id`, BookController.handlePatchBook);
}