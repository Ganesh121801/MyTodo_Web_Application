import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser"
import path from "path";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4002;
const DB_URI = process.env.MONGODB_URI;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, //for jo bhi fronend se request ayega usko allow krana he
    methods: "GET,POST, PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"], //add other headers you want to allow here
  })
);

//db connection code
try {
  await mongoose.connect(DB_URI);
  console.log("Connected To MongoDB Server");
} catch (error) {
  console.log(error);
}

//routes

//routes about todo tasks
app.use("/todo", todoRoute);
app.use("/user", userRoute);

// code for deployment 
if (process.env.NODE_ENV === 'production') {
  const dirPath = path.resolve();
  app.use(express.static(path.join(dirPath, 'Frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirPath, 'Frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`The Application is running on port ${PORT} `);
});
