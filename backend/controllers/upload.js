import User from "../models/User.js";
import cloudinary from "../utilities/cloudinary.js";

// Upload image to Cloudinary
export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "finance-tracker/profile-images",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(buffer);
  });
};

// Upload profile image
export const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        profileImage: result.secure_url,
      },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    next(error);
  }
};