import { DataTypes } from 'sequelize';

import { connectMysql } from '../../lib/db/mysql.connect';
import { Books } from './book.model';
import { Oders } from './oder.model';

export const OderItems = connectMysql.define(
  'OderItem',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oders_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

OderItems.belongsTo(Oders, { foreignKey: 'oders_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
OderItems.belongsTo(Books, { foreignKey: 'book_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });

OderItems.sync().then(() => {
  console.log('giỏ hàng đc tạo');
});


