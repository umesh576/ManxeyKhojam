import mongoose, { model } from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

const Post = model("post", postSchema);
export default Post;
