// import dotenv and configure 
import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

// import express 
import express from "express";
import cookieParser from "cookie-parser";
// import cors
import cors from "cors";

// ✅ initialize app first
const app = express();

// ✅ then use middlewares
app.use(cors({
    // origin: process.env.CLIENT_URL ,
    origin: process.env.CLIENT_URL ,
    // origin: ["http://localhost:5173", "http://192.168.0.101:5173"],
    credentials: true,
}));

// configure express to use json and urlencoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// import routes
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import productRouter from "./routes/product.routes.js";
import errorRoutes from "./routes/error.routes.js";

// routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/errors", errorRoutes);

// export
export { app };
