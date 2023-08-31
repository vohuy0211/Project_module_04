import { Express, Request, Response } from 'express';

import BookRoute from './book.router';
import historyRouter from './history.router';
import Oder from './oder.router';
import OderItemRoute from './oderItem.route';
import uploadRouter from './upload.router';
import UserRoute from './user.route';

function Routes(app: Express) {
  UserRoute(app)
  BookRoute(app)
  uploadRouter(app)
  OderItemRoute(app)
  Oder(app)
  historyRouter(app)
}

export default Routes;