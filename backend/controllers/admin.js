import User from "../models/User.js";
import Transaction from "../models/Transaction.js";


// Get admin overview
export const getAdminOverview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const summary = await Transaction.aggregate([
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
          total: -1,
        },
      },
    ]);

    const totalIncome = summary
      .filter((item) => item._id.type === "income")
      .reduce((sum, item) => sum + item.total, 0);

    const totalExpenses = summary
      .filter((item) => item._id.type === "expense")
      .reduce((sum, item) => sum + item.total, 0);

    const topSpendingCategories = summary
      .filter((item) => item._id.type === "expense")
      .map((item) => ({
        category: item._id.category,
        total: item.total,
      }));

    res.json({
      totalUsers,
      totalIncome,
      totalExpenses,
      topSpendingCategories,
    });
  } catch (error) {
    next(error);
  }
};

//get all transactions
export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "name email profileImage");

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get a single user by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update a user by ID
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        role,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    next(error);
  }
};

// Delete a user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

