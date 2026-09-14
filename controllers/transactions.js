import Transaction from "../models/Transaction.js";

//create a new transaction
export const createTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,
      user: req.user._id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// get all transactions for the authenticated user
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    });

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// get a single transaction by ID for the authenticated user
export const getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// update a transaction by ID for the authenticated user
export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// delete a transaction by ID for the authenticated user
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get monthly summary
// Get monthly summary
export const getMonthlySummary = async (req, res, next) => {
  try {
    const { month } = req.query;

    const selectedMonth = month || new Date().toISOString().slice(0, 7);

    const [year, monthNumber] = selectedMonth.split("-").map(Number);

    const startDate = new Date(year, monthNumber - 1, 1);
    const endDate = new Date(year, monthNumber, 1);

    const summary = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            type: "$type",
            category: "$category",
          },
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          "_id.type": 1,
          "_id.category": 1,
        },
      },
    ]);

    res.json({
      month: selectedMonth,
      summary,
    });
  } catch (error) {
    next(error);
  }
};