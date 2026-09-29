import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api.js";

// CREATE: a controlled form that POSTs a new post to the API.
export default function Create() {
  const [form, setForm] = useState({ title: "", author: "", body: "", tags: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // One handler for every field: the input's name attribute selects the
  // property to update, so a new handler per field is not needed.
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser's default full-page form submit
    if (!form.title.trim() || !form.author.trim() || !form.body.trim()) {
      setError("Title, author and content are all required.");
      return;
    }
    setSaving(true);
    try {
      const saved = await createPost(form);
      navigate(`/post/${saved._id}`); // go straight to the new post
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <>
      <div className="page-head">
        <h1>New Post</h1>
      </div>

      {error && <p className="error">{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Understanding REST APIs"
          />
        </label>

        <label>
          Author
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Devaesh D"
          />
        </label>

        <label>
          Content
          <textarea
            name="body"
            rows={9}
            value={form.body}
            onChange={handleChange}
            placeholder="Write your post here..."
          />
        </label>

        <label>
          Tags <span className="hint">(comma separated)</span>
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="react, express, mongodb"
          />
        </label>

        <button className="btn primary" type="submit" disabled={saving}>
          {saving ? "Publishing…" : "Publish Post"}
        </button>
      </form>
    </>
  );
}
