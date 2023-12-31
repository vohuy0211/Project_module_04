import { Express } from 'express';

import { UserController } from '../controllers/user.controller';
import { checkAuthentication } from '../middlewares/CheckAuth';

const URL = `/api/v1/user`

export default (app: Express) => {
  app.get(`${URL}/get-user`, UserController.handleGetUser)
  app.get(`${URL}/get-user/:id`, UserController.handleGetUserById)
  app.get(`${URL}/searchUser/:searchTerm`, UserController.handleSearch)
  app.post(`${URL}/register`, UserController.handleRegister)
  app.post(`${URL}/login`, UserController.handleLogin)
  app.post(`${URL}/refresh-token`, UserController.refreshToken)
  app.post(`${URL}/logout`, checkAuthentication, UserController.logout)
  app.patch(`${URL}/patch-user/:id`, UserController.handlePutUserAth)
  app.patch(`${URL}/patch-user-admin/:id`, UserController.handlePutUser)
}
