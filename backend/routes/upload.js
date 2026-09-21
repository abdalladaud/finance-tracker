import express from "express";
import protect from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import { uploadProfileImage } from "../controllers/upload.js";

const router = express.Router();

/**
 * @swagger
 * /api/upload/profile:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Upload profile image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully
 *       400:
 *         description: Please upload an image
 *       401:
 *         description: Invalid or missing token
 */
router.post(
  "/profile",
  protect,
  upload.single("image"),
  uploadProfileImage
);

export default router;