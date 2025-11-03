const express = require("express");
const router = express.Router();
const {
  registerEmployee,
  loginEmployee,
  getProfile,
} = require("../controllers/employeeController");
const protect = require("../middlewares/auth");

// Public routes
router.post("/register", registerEmployee);
router.post("/login", loginEmployee);

// Protected routes
router.get("/profile", protect, getProfile);

module.exports = router;
