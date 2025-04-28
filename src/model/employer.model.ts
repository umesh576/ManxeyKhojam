import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  name: {
    required: [true, "name must be required for Registre"],
  },
});

const User = mongoose.model("employer", employerSchema);
export default User;
