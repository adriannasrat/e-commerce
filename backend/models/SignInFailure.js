const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SignInFailure = sequelize.define(
  "SignInFailure",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email_hash: {
      type: DataTypes.CHAR(64),
      allowNull: false,
    },
    address_hash: {
      type: DataTypes.CHAR(64),
      allowNull: false,
    },
  },
  { tableName: "SignInFailures", updatedAt: false },
);

module.exports = SignInFailure;
