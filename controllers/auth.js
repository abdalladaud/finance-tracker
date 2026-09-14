import User from "../models/User.js";
import { generateToken } from "../utilities/generateToken.js";
import { uploadToCloudinary } from "./upload.js";
import crypto from "crypto";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../utilities/email.js";

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

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    const user = await User.create({
      name,
      password,
      email,
      role,
      verificationToken,
      verificationTokenExpires,
    });

    await sendVerificationEmail(user.email, user.verificationToken);

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

    if (!user.emailVerified) {
      return res.status(401).json({
        message: "Please verify your email before logging in",
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
        emailVerified: user.emailVerified,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Verify user email
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification token",
      });
    }

    user.emailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    res.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Forgot password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");

    const resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpires = resetPasswordTokenExpires;

    await user.save();

    await sendResetPasswordEmail(user.email, user.resetPasswordToken);

    res.json({
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Reset password
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpires = null;

    await user.save();

    res.json({
      message: "Password reset successfully",
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

    // If a new profile image is uploaded, upload it to Cloudinary and update the user's profileImage field
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
