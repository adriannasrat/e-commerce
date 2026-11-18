const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// pending: placed, awaiting payment. paid: payment confirmed. cancelled: never paid.
const ORDER_STATUSES = ["pending", "paid", "cancelled"];

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(16),
    allowNull: false,
    validate: { isIn: [ORDER_STATUSES] },
  },
  paid_at: DataTypes.DATE,
});

module.exports = Order;
module.exports.ORDER_STATUSES = ORDER_STATUSES;
