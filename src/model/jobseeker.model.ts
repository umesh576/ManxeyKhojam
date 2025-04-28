import mongoose from "mongoose";
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const jobSeeker = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },

  email: {
    required: true,
    type: String,
    unique: true,
    trim: true,
    match: [emailRegex, "Please enter the valid email"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },

  role: {
    enum: ["Jobseeker", "Employer", "admin", "superadmin"],
    required: true,
    default: "jobseeker",
  },
  jobType: {
    type: String,
    required: true,
    trim: true,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("user", jobSeeker);
export default User;
