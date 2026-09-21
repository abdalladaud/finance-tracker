import express from "express";
import protect from "../middlewares/auth.js";
import authorize from "../middlewares/authorize.js";

import {
  getAllTransactions,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAdminOverview
} from "../controllers/admin.js";

const router = express.Router();

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Access denied. Admin only
 */
router.get("/users", protect, authorize("admin"), getUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get a single user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User information
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Access denied. Admin only
 *       404:
 *         description: User not found
 */
router.get("/users/:id", protect, authorize("admin"), getUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Update a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *               role:
 *                 type: string
 *                 enum:
 *                   - user
 *                   - admin
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Access denied. Admin only
 *       404:
 *         description: User not found
 */
router.put("/users/:id", protect, authorize("admin"), updateUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Access denied. Admin only
 *       404:
 *         description: User not found
 */
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

/**
 * @swagger
 * /api/admin/transactions:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all users' transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all transactions
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Access denied. Admin only
 */
router.get(
  "/transactions",
  protect,
  authorize("admin"),
  getAllTransactions
);

/**
 * @swagger
 * /api/admin/overview:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get admin overview
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard overview
 *       401:
 *         description: Invalid or missing token
 *       403:
 *         description: Access denied. Admin only
 */
router.get(
  "/overview",
  protect,
  authorize("admin"),
  getAdminOverview
);

export default router;
