import express from "express";
import { register, login, updateProfile } from "../controllers/auth.js";
import validateZod from "../middlewares/validateZod.js";
import { createUserSchema, updateUserSchema  } from "../schemas/userSchema.js";
import protect from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already in use or validation failed
 */

router.post("/register", validateZod(createUserSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *       401:
 *         description: Invalid or missing token
 */
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

/**
 * @swagger
 * /api/auth/profile:
 *   patch:
 *     tags:
 *       - Auth
 *     summary: Update current user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation failed or email already in use
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: User not found
 */

router.patch(
  "/profile",
  protect,
  upload.single("profileImage"),
  validateZod(updateUserSchema),
  updateProfile
);


export default router;