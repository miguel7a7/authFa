import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  fullname: {
    type: String,
    required: true,
  },

  fecha_reg: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;
