// const express = require("express");
// const cors = require("cors");
// const tenantRoutes = require("./routes/tenantRoutes");
// const db = require("./config/db");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/", tenantRoutes);

// // Test DB connection
// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("Error connecting to database:", err);
//   } else {
//     console.log("Database connected successfully");
//     connection.release();
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import TenantRoutes from "./routes/tenantRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/tenants", TenantRoutes);

// Error Handling Middleware (WAJIB di paling bawah)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
