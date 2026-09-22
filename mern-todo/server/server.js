require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_todo";

// Middleware
app.use(cors());          // allow the React dev server (port 5173) to call us
app.use(express.json());  // parse JSON request bodies into req.body

// Log every request (handy for the lab output)
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.get("/", (req, res) => res.send("MERN To-Do API is running"));
app.use("/api/todos", todoRoutes);

// Connect to MongoDB first, then start listening
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected:", mongoose.connection.name);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
