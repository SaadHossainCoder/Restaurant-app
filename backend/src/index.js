// import dotenv and configure 
import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

// import db connection function
import connection from "./db/connect.db.js";
//import express app
import { app } from "./app.js";
connection()
    .then(() => {
        app.on("error", (err) => {
            console.error("Error in connection to database", err);
            throw err;
        })
        //start the server
        app.listen(process.env.PORT || 8000, () => {
            console.log(`🚀 Server is running on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection error:", error);
        process.exit(1);
    })

