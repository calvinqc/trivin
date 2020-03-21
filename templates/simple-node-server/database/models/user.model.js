import mongoose from "mongoose";
import userSchema from "../schemas/user.schema";

const User = mongoose.model("User", userSchema);

export default User;
