import mongoose from "mongoose";

const jobCategorySchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
      required: [true, "Jobtitle is required for job category"],
    },
    decription: {
      type: String,
      trim: true,
      required: [true, "Decription needed for more accurate information"],
      minLength: [10, "Give more info about job"],
    },
    postCreatedOn: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const jobCategory = mongoose.model("jobcategory", jobCategorySchema);
export default jobCategory;
