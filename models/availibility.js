// availibility.js model
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');  // Make sure sequelize is imported here
const Service = require('./services');  // Ensure the Service model is imported here

const Availability = sequelize.define('Availability', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isBooked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Availability;
