// ChatGPT

const Product = require("./Product");
const User = require("./User");
const Cart = require("./Cart");
const CartRow = require("./CartRow");
const Rating = require("./Rating");
const Session = require("./Session");
const ProductMedia = require("./ProductMedia");

// Relationships
User.hasMany(Cart, { foreignKey: "user_id", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Cart.hasMany(CartRow, { foreignKey: "cart_id", onDelete: "CASCADE" });
CartRow.belongsTo(Cart, { foreignKey: "cart_id" });

Product.hasMany(CartRow, { foreignKey: "product_id", onDelete: "CASCADE" });
CartRow.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(Rating, { foreignKey: "product_id", onDelete: "CASCADE" });
Rating.belongsTo(Product, { foreignKey: "product_id" });

User.hasMany(Rating, { foreignKey: "user_id", onDelete: "CASCADE" });
Rating.belongsTo(User, { foreignKey: "user_id" });

Session.belongsTo(User, { foreignKey: "user_id" });

Product.hasMany(ProductMedia, { foreignKey: "product_id", as: "media", onDelete: "CASCADE" });
ProductMedia.belongsTo(Product, { foreignKey: "product_id" });

module.exports = { Product, ProductMedia, User, Cart, CartRow, Rating, Session };
