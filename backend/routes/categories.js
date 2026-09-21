import express from "express";
import { getCategories } from "../controllers/categories.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all predefined categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getCategories);

export default router;