import User from "../models/User.js";
import { generateToken } from "../utilities/generateToken.js";
import { uploadToCloudinary } from "./upload.js";

// Register new user
export const register = async (req, res, next) => {
  let { name, password, email, role } = req.body;

  try {
    email = email.toLowerCase();

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const user = await User.create({
      name,
      password,
      email,
      role,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    if (req.body.email !== undefined) {
      const email = req.body.email.toLowerCase();

      const exists = await User.findOne({
        email,
        _id: { $ne: user._id },
      });

      if (exists) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }

      user.email = email;
    }

    // Upload new profile image to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      user.profileImage = result.secure_url;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};