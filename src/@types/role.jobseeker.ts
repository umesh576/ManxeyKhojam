import mongoose from "mongoose";

export enum Role {
  jobSeeker = "JobSeeker",
  employer = "Employer",
  admin = "Admin",
  superAdmin = "superAdmin",
}

export const jobSeeker = [Role.jobSeeker];
export const employer = [Role.employer];
export const admin = [Role.admin];
export const superAdmin = [Role.superAdmin];

export interface Ipayload {
  _id: mongoose.Types.ObjectId;
  firstName: String;
  lastName: String;
  role: Role;
}
