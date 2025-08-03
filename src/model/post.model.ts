import mongoose, { model } from "mongoose";
import { ref } from "process";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      // required: true,
      trim: true,
    },
    qualification: {
      type: String,
      required: false,
      trim: true,
    },
    salary: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: false,
      // default: "Fresher also",
    },
    picturePost: [
      {
        type: String,
      },
    ],

    aapliedUser: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    jobCategoryid: {
      type: mongoose.Types.ObjectId,
      required: [true, "please provide jobcategory"],
      ref: "jobCategory",
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    acceptApplicant: [
      {
        type: mongoose.Types.ObjectId,
        ref: "accpetInterviews",
        // required: false,
      },
    ],
  },
  { timestamps: true }
);

const Post = model("post", postSchema);
export default Post;
