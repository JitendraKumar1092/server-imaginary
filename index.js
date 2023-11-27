import express from "express";
import postRoutes from "./routes/postRoutes.js";
import imaginaryRoutes from "./routes/imaginaryRoutes.js";

import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/imaginary", imaginaryRoutes);
app.get("/", async (req, res) => {
  res.send("hello from Imaginary");
});
const url = process.env.MONGO_URL;
const startServer = async () => {
  try {
    connectDB(url);
    app.listen(8080, () => console.log("server has started on port 8080"));
  } catch (err) {
    console.log(err);
  }
};
startServer();
