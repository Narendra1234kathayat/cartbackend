import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import cors from "cors";
import dotenv from "dotenv";

// Initialize dotenv
dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


import UserRoutes from "./routes/User.Routes.js"


app.use("/api/auth",UserRoutes)

connectDB()
  .then(() => {
    console.log(`Server running on port ${process.env.PORT}`);
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("Some error occurred", err);
  });
