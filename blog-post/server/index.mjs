// Entry point of the REST API.
// The env file is loaded first, because db/conn.mjs reads process.env.ATLAS_URI
// the moment it is imported.
import "./loadEnvironment.mjs";

import express from "express";
import cors from "cors";
import posts from "./routes/posts.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());         // lets the React dev server on :5173 call this API
app.use(express.json()); // parses JSON request bodies into req.body

// Small logger so every request is visible in the terminal
app.use((req, _res, next) => {
  console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (_req, res) => res.send("Blog REST API is running"));
app.use("/posts", posts);

// Catch-all error handler: without this, a thrown error would hang the request
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
