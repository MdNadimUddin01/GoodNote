import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();

//dataBase Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db Connnection successfull");
  })
  .catch((err) => {
    console.log("Db connection unsuccessfull");
    console.log(err.message);
  });

//middleWare
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["https://good-note-psi.vercel.app", "http://localhost:5173/"]; // Add any other domains as needed

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is Running at ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("this is Home Page");
});

//import Route

import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

//error Handling

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  // console.log(err.message);
  const message = err.message || "Internal Server Error";
  // console.log(message);

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
