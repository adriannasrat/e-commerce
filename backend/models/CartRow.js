const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cart = require("./Cart");
const Product = require("./Product");

const CartRow = sequelize.define("CartRow", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_price_ore: DataTypes.INTEGER,
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cart,
      key: "id",
    },
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  },
});


module.exports = CartRow;
