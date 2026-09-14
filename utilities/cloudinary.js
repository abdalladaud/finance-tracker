import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "ojuogemj",
  api_key: process.env.CLOUDINARY_API_KEY || "952946791433818",
  api_secret: process.env.CLOUDINARY_API_SECRET || "UNEHQLDG6XvjrfUBgt7fH9pjMpk",
});

export default cloudinary;