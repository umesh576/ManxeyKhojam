import mongoose, { model } from "mongoose";

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
    picturePost: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = model("post", postSchema);
export default Post;
