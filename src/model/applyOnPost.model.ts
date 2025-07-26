import mongoose from "mongoose";
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const applyOnPostSchema = new mongoose.Schema(
  {
    experience: {
      type: Number,
      required: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "userId required for validate user"],
    },

    resume: [
      {
        type: String,
        required: [true, "Resume required for true"],
      },
    ],
    coverLetter: [
      {
        type: String,
      },
    ],
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    email: {
      type: String,
      unique: false,
      trim: true,
      match: [emailRegex, "Please enter the valid email"],
      required: [true, "Email required for Submit application."],
    },
    number: {
      type: Number,
      required: [true, "Phonenumber required for the register."],
    },
    postId: {
      type: mongoose.Types.ObjectId,
      required: [true, "post id is necessary for verify post."],
    },
    linkdenProfile: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const AppliedOnPost = mongoose.model("applyonpost", applyOnPostSchema);
export default AppliedOnPost;
