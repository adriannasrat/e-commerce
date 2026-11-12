const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price_ore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: DataTypes.STRING(64),
  tagline: DataTypes.STRING,
  finish_name: DataTypes.STRING(64),
  category: DataTypes.STRING(16),
  // Set when the product leaves the range. Retired products are not sold.
  retired_at: DataTypes.DATE,
});


module.exports = Product;
