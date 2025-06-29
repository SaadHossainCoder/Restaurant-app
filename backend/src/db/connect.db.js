import mongoose from "mongoose";

const connection = async () => {
    try {
        // db connection string
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        // log the connection details
        console.log("\n✅ MongoDB connected successfully:", connectionInstance.connection.host, connectionInstance.connection.name,"✅"); // log the connection string
    } catch (error) {
        console.error("❌ MongoDB connection error:", error,'❌'); // log the error
        process.exit(1); // Exit the process with failure
    }
}

// export the connection function
export default connection;