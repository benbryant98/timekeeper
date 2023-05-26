const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Daily extends Model {}

Daily.init(
  {
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
    weekly_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "weekly",
        key: "id",
      },
    },
  },
  { sequelize, timestamps: true, freezeTableName: true, modelName: "daily" }
);

module.exports = Daily;
