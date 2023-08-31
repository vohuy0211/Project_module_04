import { Express } from 'express';

import { OderItemController } from '../controllers/oderItem.controller';

const URL = "/api/v1/oderItem"

export default (app: Express) => {
  app.get(`${URL}/getOderItem`, OderItemController.handleGetOderItem);
  app.post(`${URL}/postOderItem`, OderItemController.handlePostOderItem);
  app.delete(`${URL}/:id`, OderItemController.handleDeleteItem);
  app.delete(`${URL}/ById/:id`, OderItemController.handleDeleteById);
  app.patch(`${URL}/:id`, OderItemController.handlePatchOderItem);
  app.get(`${URL}/:id`, OderItemController.handleGetOderItemById);
}

