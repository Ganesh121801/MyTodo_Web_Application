import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4002;
const DB_URI = process.env.MONGODB_URI;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.options('*', cors()); // Pre-flight request handler for all routes

// CORS Configuration
const frontendUrl = process.env.NODE_ENV === 'production'
  ? 'https://mytodo-web-application-wmw4.onrender.com'  // Deployed frontend URL for production
  : 'http://localhost:4001'; // Local backend URL for development

app.use(
  cors({
    origin: frontendUrl,  // Dynamically set the frontend URL based on the environment
    credentials: true,     // Allow cookies/credentials to be sent
    methods: "GET,POST, PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],  // Add other headers as needed
  })
);

// DB connection code
try {
  await mongoose.connect(DB_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// Routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

// Deployment handling
if (process.env.NODE_ENV === 'production') {
  const dirPath = path.resolve();
  app.use(express.static(path.join(dirPath, 'Frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirPath, 'Frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
