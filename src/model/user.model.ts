import mongoose from "mongoose";
import { Role } from "../@types/role.jobseeker";
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const jobSeeker = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Firstname required for the register."],
      minLength: [3, "Firstname must be longer than 3 character"],
      maxLength: [20, "firstname must be small than the 20 letter"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Lastname required for the register."],
      minLength: [3, "Lastname must be longer than 3 character"],
      maxLength: [20, "Lastname must be small than the 20 letter"],
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
      minLength: [3, "Password must be longer than 3 characters"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phonenumber required for the register."],

      min: [1000000000, "Phone number must be at least 10 digits"], // Example for 10-digit numbers
      max: [9999999999, "Phone number must be at most 10 digits"],
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.jobSeeker,
    },
    jobType: {
      type: String,
      trim: true,
    },
    skill: {
      type: String,
      required: [
        true,
        "Please mention your skill for the better job requirement",
      ],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Address required for the register."],
    },
    gender: {
      type: String,
      trim: true,
      required: [true, "Gender required for the register."],
    },
    createdPost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "post",
      },
    ],
    appliedPost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "applyPost",
      },
    ],
    createdOtp: {
      type: Number,
      required: false,
    },
    profile: {
      type: String,
    },
    appliedOnPost: [
      {
        type: mongoose.Types.ObjectId,
        ref: "AppliedOnPost",
      },
    ],
  },

  //this timesatmp can save the crated time date also sotre in the database
  { timestamps: true }
);

const User = mongoose.model("user", jobSeeker);
export default User;
