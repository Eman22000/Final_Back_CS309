import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/finalPro";

export const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
