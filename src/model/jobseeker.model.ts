import mongoose from "mongoose";
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const jobSeeker = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Firstname required for the register."],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Lastname required for the register."],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    match: [emailRegex, "Please enter the valid email"],
    required: [true, "Email required for the register."],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password required for the register."],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phonenumber required for the register."],
  },
  role: {
    enum: ["Jobseeker", "Employer", "admin", "superadmin"],
    // default: "jobseeker",
    // required: [true, "Role required for the register."],
  },
  jobType: {
    type: String,
    trim: true,
  },

  address: {
    type: String,
    trim: true,
    required: [true, "Address required for the register."],
  },
});

const User = mongoose.model("user", jobSeeker);
export default User;
