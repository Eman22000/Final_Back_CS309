import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import mugRouter from "./routes/mugRoute.js";

// app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

// Home endpoint
app.get("/", (req, res) => {
    res.send("API is working!");
});

// API endpoints
app.use("/api/mug", mugRouter);
app.use("/images" , express.static('uploads'))

// Server listener
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
