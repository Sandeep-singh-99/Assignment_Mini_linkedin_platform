import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log(`Error connecting to the database: ${error.message}`);
        process.exit(1); 
    }
}