// import Sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { dev } from '../../configs/db.config';

 export  const connectMysql = new Sequelize(dev.db.DATABASE, dev.db.USER, dev.db.PASSWORD, {
  host: dev.db.HOST,
  dialect: dev.db.dialect as any,
  operatorsAliases: false as any,

  pool: {
    max: dev.pool.max,
    min: dev.pool.min,
    acquire: dev.pool.acquire,
    idle: dev.pool.idle,
  },
});

