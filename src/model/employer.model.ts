import mongoose from "mongoose";
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const employerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Firstname is must Required"],
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

      minLength: [3, "Phonenumber must be longer than 3 character"],
      maxLength: [20, "Phonenumber must be small than the 20 letter"],
    },
  },
});

const User = mongoose.model("employer", employerSchema);
export default User;
