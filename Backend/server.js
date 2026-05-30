import dotenv from "dotenv";
import app from "./src/app.js";
import "./src/config/database.js";
import connectDB from "./src/config/database.js";
import http from "http";
import { initSoket } from "./src/sockets/server.socket.js";


dotenv.config();


const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

initSoket(httpServer);


connectDB()
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
    process.exit(1);
  })



httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});