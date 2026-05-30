import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import morgan from "morgan";
import cors from "cors";

import path from "path";


import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
  origin: ["http://localhost:5173","https://langchain-gemini-assistant.onrender.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
})


app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);


app.use(express.static("./public"));
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "./public/index.html"));
  
})



export default app