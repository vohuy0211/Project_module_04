import { Express } from 'express';

import { HistoryController } from '../controllers/history.controller';

// import { History } from './../models/history.model';

const URL = "/api/v1/history"

export default (app: Express) => {
  // app.get(`${URL}/`, HistoryController.handleGetHistory);
  app.post(`${URL}/postHistory`, HistoryController.handlePostHistory);
  app.get(`${URL}/getHistory/:id`, HistoryController.handleGetHistoryById);
  app.get(`${URL}/getHistoryAll`, HistoryController.handleGetHistoryAll);
  app.get(`${URL}/getHistoryById/:id`, HistoryController.handleGetById);
  app.patch(`${URL}/patchHistory/:id`, HistoryController.handlePatchHistory);
}