import mongoose, { Schema } from "mongoose";
import User from "./jobseeker.model";

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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reequired for create Jobcategory"],
    },
  },
  { timestamps: true }
);

const jobCategory = mongoose.model("jobcategory", jobCategorySchema);
export default jobCategory;
