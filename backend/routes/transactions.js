import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getMonthlySummary
} from "../controllers/transactions.js";

import protect from "../middlewares/auth.js";
import validateZod from "../middlewares/validateZod.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../schemas/transactionSchema.js";

const router = express.Router();

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Create a new transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid or missing token
 */
router.post(
  "/",
  protect,
  validateZod(createTransactionSchema),
  createTransaction
);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get current user's transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's transactions
 *       401:
 *         description: Invalid or missing token
 */
router.get("/", protect, getTransactions);

/**
 * @swagger
 * /api/transactions/monthly-summary:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get monthly transaction summary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly income and expense summary by category
 *       401:
 *         description: Unauthorized
 */
router.get("/monthly-summary", protect, getMonthlySummary);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get a single transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction found
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Transaction not found
 */
router.get("/:id", protect, getTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     tags:
 *       - Transactions
 *     summary: Update a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Transaction not found
 */
router.put(
  "/:id",
  protect,
  validateZod(updateTransactionSchema),
  updateTransaction
);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     tags:
 *       - Transactions
 *     summary: Delete a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Transaction not found
 */
router.delete("/:id", protect, deleteTransaction);



export default router;
