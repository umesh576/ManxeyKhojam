import mongoose from "mongoose";

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
        required: [true, "resume required for true"],
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
    postId: {
      type: mongoose.Types.ObjectId,
      required: [true, "post id is necessary for verify post."],
    },
  },
  { timestamps: true }
);

const AppliedOnPost = mongoose.model("applyonpost", applyOnPostSchema);
export default AppliedOnPost;
