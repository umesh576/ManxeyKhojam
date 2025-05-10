import mongoose, { model } from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "decription needed for better understanding"],
    trim: true,
  },
  qualification: {
    type: String,
    required: false,
    trim: true,
  },
  salary: {
    type: Number,
    required: false,
  },
  experience: {
    type: Number,
    required: false,
    default: "Fresher also",
  },
  picturePost: {
    type: String,
  },
});

const Post = model("post", postSchema);
export default Post;
