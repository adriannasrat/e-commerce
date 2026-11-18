const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// A line keeps the price it was bought at, whatever the product costs later.
const OrderLine = sequelize.define("OrderLine", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit_price_ore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderLine;
