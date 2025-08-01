import mongoose from "mongoose";

const acceptInterviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    applyOnpostId: {
      type: mongoose.Types.ObjectId,
      ref: "appliedOnpost",
      required: [true, "User id required for verify user."],
    },
    interviewDate: {
      type: String,
      required: true,
    },
    interviewTime: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const AcceptInterview = mongoose.model(
  "accpetInterviews",
  acceptInterviewSchema
);

export default AcceptInterview;
