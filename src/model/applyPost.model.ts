import mongoose, { Schema } from "mongoose";

const applyPostSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "UserId must be needed"],
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: [true, "Verify In which post is applying."],
      ref: "Post",
    },
    postDetails: [
      {
        type: String,
        required: true,
      },
    ],
    aapliedPeople: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    linkdenProfile: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ApplyPost = mongoose.model("applyPost", applyPostSchema);

export default ApplyPost;
