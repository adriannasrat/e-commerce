const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// One image or film of a product. Paths are relative to the media base
// address, which the storefront owns.
const ProductMedia = sequelize.define(
  "ProductMedia",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    role: { type: DataTypes.STRING(16), allowNull: false },
    kind: { type: DataTypes.STRING(16), allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    path: { type: DataTypes.STRING, allowNull: false },
    poster_path: DataTypes.STRING,
    alt: { type: DataTypes.STRING, allowNull: false },
    label: DataTypes.STRING(128),
    caption: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    crop_left: DataTypes.INTEGER,
    crop_top: DataTypes.INTEGER,
    crop_right: DataTypes.INTEGER,
    crop_bottom: DataTypes.INTEGER,
    focus: DataTypes.STRING(32),
    tone: DataTypes.STRING(8),
  },
  { tableName: "ProductMedia" },
);

module.exports = ProductMedia;
