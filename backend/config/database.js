import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error("Connect Failed", error.message);
    console.log("MONGO_URI:", process.env.MONGO_URI);
    process.exit(1);
  }
};
