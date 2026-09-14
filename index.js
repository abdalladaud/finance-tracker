import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./utilities/db.js";
import limiter from "./middlewares/rateLimiter.js";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notfound.js";
import errorHandler from "./middlewares/errorHandler.js";
import uploadRoutes from "./routes/upload.js";

//routes
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";
import adminRoutes from "./routes/admin.js";
import categoriesRoutes from "./routes/categories.js";

//Swagger
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utilities/swagger.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger);
app.use(limiter);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoriesRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Finance Tracker API is running",
  });
});

// Swagger Documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
