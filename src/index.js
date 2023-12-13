import express from "express";
import postRoutes from "./routes/postRoutes.js";
import imaginaryRoutes from "./routes/imaginaryRoutes.js";

import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
dotenv.config();
const app = express();

const url = process.env.MONGO_URL;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);

app.use("/api/v1/imaginary", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://imaginary-ai.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}, imaginaryRoutes);

app.get("/", async (req, res) => {
  res.send("hello from Imaginary");
});

app.get("/", (req, res) => {
  res.send("hello");
});
connectDB(url);

// const startServer = async () => {
//   try {
//     app.listen(3000, () => console.log("server has started on port 8080"));
//   } catch (err) {
//     console.log(err);
//   }
// };
// startServer();

export default app;
