const jwt = require('jsonwebtoken');
const { Employee } = require('../models');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const employee = await Employee.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!employee) {
        return res.status(401).json({ message: 'Not authorized, employee not found' });
      }

      req.user = employee;
      next();

    } catch (error) {
      console.error('JWT Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = protect;