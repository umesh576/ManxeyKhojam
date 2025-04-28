import mongoose from "mongoose";

const connectDatabase = async (DB_URI: string) => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log("database cannot connected");
    });
};

export default connectDatabase;
