import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");
  } catch (e) {
    console.error("Error occurred while connecting to DB:", e.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectToDB;