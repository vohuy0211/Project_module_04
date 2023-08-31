import { Express } from 'express';

const URL = `/api/v1/favorites`

export default (app: Express) => {
  app.get(`${URL}/getBook`);
  app.post(`${URL}/postBook`);
  app.delete(`${URL}/deleteBook/:id`);
}