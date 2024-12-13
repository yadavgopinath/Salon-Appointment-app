// models/Appointment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Appointment;
