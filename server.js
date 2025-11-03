const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Import routes
const employeeRoutes = require("./routes/employeeRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");

// Use routes
app.use("/api/employees", employeeRoutes);
app.use("/api/enquiries", enquiryRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 CRM API is running!",
    endpoints: {
      auth: {
        register: "POST /api/employees/register",
        login: "POST /api/employees/login",
        profile: "GET /api/employees/profile (Protected)",
      },
      enquiries: {
        submit: "POST /api/enquiries/public",
        getPublic: "GET /api/enquiries/public (Protected)",
        getPrivate: "GET /api/enquiries/private (Protected)",
        claim: "PATCH /api/enquiries/:id/claim (Protected)",
      },
    },
  });
});

// Database initialization
const { syncDatabase } = require("./models");

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    requestedUrl: req.originalUrl,
    availableEndpoints: {
      register: "POST /api/employees/register",
      login: "POST /api/employees/login",
      submitEnquiry: "POST /api/enquiries/public",
    },
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    message: "Internal server error",
  });
});

// Start server
const startServer = async () => {
  try {
    // Sync database
    await syncDatabase();

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Database: ${process.env.DB_STORAGE}`);
      console.log(`🔗 API URL: http://localhost:${PORT}`);
      console.log("\n📝 Available Endpoints:");
      console.log("   POST /api/employees/register");
      console.log("   POST /api/employees/login");
      console.log("   POST /api/enquiries/public");
      console.log("   GET  /api/enquiries/public (Protected)");
      console.log("   GET  /api/enquiries/private (Protected)");
      console.log("   PATCH /api/enquiries/:id/claim (Protected)");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
