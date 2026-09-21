import "dotenv/config";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import connectDB from "../utilities/db.js";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Salary",
  "Other",
];

const seedCategories = async () => {
  try {
    await connectDB();

    await Category.deleteMany();

    await Category.insertMany(
      categories.map((name) => ({ name }))
    );

    console.log("Categories seeded successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();