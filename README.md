🧩 Fastor CRM Backend - Eshwar

A secure and scalable Customer Relationship Management (CRM) backend built with Node.js, Express.js, and SQLite for the Fastor technical assessment.

🚀 Live Demo

API Base URL: https://fastor-crm-backend.onrender.com

GitHub Repository: https://github.com/shashankpadma0702/Fastor-BackendCode
📋 Features Implemented ✅ Core Requirements

Employee Registration & Login (JWT Authentication)

Public Enquiry Form (accessible without authentication)

Claim Lead (assign enquiry to logged-in employee)

Fetch Unclaimed Leads (Public Enquiries)

Fetch Claimed Leads (Private Enquiries)

SQLite database integrated using Sequelize ORM
🔒 Authentication

Secure JWT token-based authentication

Passwords are hashed using bcrypt

Protected routes with custom middleware
🧠 API Endpoints Method Endpoint Description Auth Required POST /api/employees/register Register new employee ❌ POST /api/employees/login Employee login to get JWT ❌ POST /api/enquiries Submit public enquiry ❌ GET /api/enquiries/public Get unclaimed (public) enquiries ✅ PUT /api/enquiries/:id/claim Claim an enquiry ✅ GET /api/enquiries/private Get logged-in employee's claimed enquiries ✅

🛠️ Tech Stack

Backend: Node.js + Express.js

Database: SQLite

Authentication: JWT + bcrypt

ORM: Sequelize

Deployment: Render
