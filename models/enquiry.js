const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enquiry = sequelize.define('Enquiry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  courseInterest: {
    type: DataTypes.STRING,
    allowNull: false
  },
  claimed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  counselorId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Enquiry;