import "dotenv/config";
import express from "express";
import connectDB from "./configs/db.js";
import { clerkWebHooks } from "./controllers/webhooks.controller.js";
// import cors from 'cors'
// !Important
await connectDB();

// !Variables
const app = express();
const port = process.env.PORT || 50001;
// !Middlewares
app.use(express.json());
// app.use(cors());
// !Routes
app.get("/", (req, res) => {
  try {
    res.send("API WORKING || Job Portal");
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
// webhooks
app.post("/webhooks", clerkWebHooks);
// !Start
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
