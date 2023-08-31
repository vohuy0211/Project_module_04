import { DataTypes } from 'sequelize';

import { connectMysql } from '../../lib/db/mysql.connect';
import { User } from './user.model';

export const Oders = connectMysql.define(
  'oder',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: true,
  }
);

Oders.belongsTo(User, { foreignKey: 'user_id' });

Oders.sync().then(() => {
  console.log('bảng oder đã được tạo');
});


