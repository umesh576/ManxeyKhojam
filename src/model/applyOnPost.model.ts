import mongoose from "mongoose";

const applyOnPostSchema = new mongoose.Schema(
  {
    experience: {
      type: Number,
      required: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "userId required fro validate user"],
    },
    resume: {
      type: String,
      required: [true, "resume required for true"],
    },
    coverLetter: {
      type: String,
      maxLength: 10,
    },
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      maxLength: [3, "Firstname is more than three letter."],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
      maxLength: [3, "Firstname is more than three letter."],
    },
  },
  { timestamps: true }
);

const AppliedOnPost = mongoose.model("applyonpost", applyOnPostSchema);
export default AppliedOnPost;
