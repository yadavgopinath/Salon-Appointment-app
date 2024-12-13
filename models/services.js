// models/Service.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Service = sequelize.define('Service', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // duration in minutes
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Make sure to allow null if not all services have images
    }
  });
module.exports = Service;
