const sequelize = require('../config/database');
const Employee = require('./employee');
const Enquiry = require('./enquiry');

// Define relationships
Employee.hasMany(Enquiry, { foreignKey: 'counselorId' });
Enquiry.belongsTo(Employee, { foreignKey: 'counselorId' });

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    await sequelize.sync({ force: false });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = {
  sequelize,
  Employee,
  Enquiry,
  syncDatabase
};