import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log("MONGO_URI:", process.env.MONGO_URI); 
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 60000, // Increase timeout to 60 seconds
        });
        console.log("Connected to DB");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connection to MongoDB: ", error.message);
        process.exit(1); // Exit with failure
    }
};
