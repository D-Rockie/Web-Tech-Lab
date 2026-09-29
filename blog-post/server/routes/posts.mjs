// All REST endpoints for blog posts, mounted at /posts by index.mjs.
import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();
const posts = db.collection("posts");

// Mongo _id values are 24-character hex strings. Anything else would make
// new ObjectId(id) throw, so it is checked before every lookup by id.
const isValidId = (id) => ObjectId.isValid(id) && String(new ObjectId(id)) === id;

// GET /posts            -> all active posts (newest first)
// GET /posts?archived=1 -> archived posts only
router.get("/", async (req, res) => {
  try {
    const archived = req.query.archived === "1" || req.query.archived === "true";
    const results = await posts
      .find({ archived })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /posts/:id -> one post
router.get("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ error: "Invalid post id" });
  }
  try {
    const result = await posts.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /posts -> create a post
router.post("/", async (req, res) => {
  const { title, author, body, tags } = req.body;

  if (!title?.trim() || !author?.trim() || !body?.trim()) {
    return res.status(400).json({ error: "title, author and body are required" });
  }

  const newPost = {
    title: title.trim(),
    author: author.trim(),
    body: body.trim(),
    // tags may arrive as an array or as a comma-separated string from the form
    tags: Array.isArray(tags)
      ? tags
      : String(tags || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
    archived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const result = await posts.insertOne(newPost);
    res.status(201).json({ _id: result.insertedId, ...newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /posts/:id -> update a post (edit fields or archive/unarchive)
router.patch("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ error: "Invalid post id" });
  }

  const { title, author, body, tags, archived } = req.body;
  const fields = { updatedAt: new Date() };

  // Only the fields actually sent are updated, so a PATCH that toggles
  // "archived" does not wipe the title or body.
  if (title !== undefined) fields.title = String(title).trim();
  if (author !== undefined) fields.author = String(author).trim();
  if (body !== undefined) fields.body = String(body).trim();
  if (archived !== undefined) fields.archived = Boolean(archived);
  if (tags !== undefined) {
    fields.tags = Array.isArray(tags)
      ? tags
      : String(tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
  }

  try {
    const result = await posts.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: fields },
      { returnDocument: "after" }
    );
    if (!result) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /posts/:id -> remove a post
router.delete("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ error: "Invalid post id" });
  }
  try {
    const result = await posts.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
