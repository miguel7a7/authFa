import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI no esta definindo");
}
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("BD connectado");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la BD");
  }
};
