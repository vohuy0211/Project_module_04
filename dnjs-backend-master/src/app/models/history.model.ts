import { DataTypes } from 'sequelize';

import { connectMysql } from '../../lib/db/mysql.connect';
import { Books } from './book.model';
import { Oders } from './oder.model';
import { OderItems } from './oderItem.model';

export const History = connectMysql.define(
  'History',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    oders_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    books_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  }
);

History.belongsTo(Oders, { foreignKey: 'oders_id', onDelete: 'CASCADE' });
Oders.hasMany(History, { foreignKey: 'oders_id' });

History.belongsTo(Books, { foreignKey: 'books_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Books.hasMany(History, { foreignKey: 'books_id' });

History.belongsTo(OderItems, { foreignKey: 'OderItems_id', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Books.hasMany(History, { foreignKey: 'OderItems_id' });
History.sync().then(() => {
  console.log('bảng history đã được tạo');
});