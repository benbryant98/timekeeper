const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Weekly extends Model {}

Weekly.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  sequelize,
  timestamps: true,
  freezeTableName: true,
  modelName: "weekly",
});

module.exports = Weekly;
