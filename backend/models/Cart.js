const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  payed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});


module.exports = Cart;
