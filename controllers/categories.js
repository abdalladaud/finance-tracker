import Category from "../models/Category.js";

// Get all categories
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.json(categories);
  } catch (error) {
    next(error);
  }
};