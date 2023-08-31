import { Express } from 'express';

import { OderController } from '../controllers/oder.controller';

const URL = `/api/v1/oder`
export default (app: Express) => {
  app.post(`${URL}/postOder`, OderController.postOder);
  app.get(`${URL}/getOder`, OderController.getAllOder);
  app.get(`${URL}/:id`, OderController.getOderById);
}
