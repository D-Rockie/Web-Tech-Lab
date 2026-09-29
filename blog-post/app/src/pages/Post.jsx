import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, updatePost, deletePost } from "../api.js";

// READ one + UPDATE + DELETE, all on a single page.
export default function Post() {
  const { id } = useParams(); // the :id part of /post/:id
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", body: "", tags: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Re-runs whenever the id in the URL changes
  useEffect(() => {
    getPost(id)
      .then((data) => {
        setPost(data);
        setForm({
          title: data.title,
          author: data.author,
          body: data.body,
          tags: (data.tags || []).join(", "),
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await updatePost(id, form);
      setPost(updated);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleArchive = async () => {
    try {
      const updated = await updatePost(id, { archived: !post.archived });
      setPost(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post permanently?")) return;
    try {
      await deletePost(id);
      navigate("/"); // nothing left to show, so go back to the list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="muted">Loading post…</p>;
  if (error && !post) return <p className="error">{error}</p>;
  if (!post) return null;

  const created = new Date(post.createdAt).toLocaleString("en-IN");
  const updated = new Date(post.updatedAt).toLocaleString("en-IN");

  // ---- Edit mode ----
  if (editing) {
    return (
      <>
        <div className="page-head">
          <h1>Edit Post</h1>
        </div>
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleSave}>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} />
          </label>
          <label>
            Author
            <input name="author" value={form.author} onChange={handleChange} />
          </label>
          <label>
            Content
            <textarea name="body" rows={10} value={form.body} onChange={handleChange} />
          </label>
          <label>
            Tags <span className="hint">(comma separated)</span>
            <input name="tags" value={form.tags} onChange={handleChange} />
          </label>
          <div className="row">
            <button className="btn primary" type="submit">
              Save Changes
            </button>
            <button className="btn ghost" type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </>
    );
  }

  // ---- Read mode ----
  return (
    <>
      <Link className="back" to={post.archived ? "/archive" : "/"}>
        ← Back
      </Link>

      <article className="post">
        <h1>{post.title}</h1>
        <p className="meta">
          by {post.author} · {created}
          {post.archived && <span className="badge">Archived</span>}
        </p>

        {post.tags?.length > 0 && (
          <div className="tags">
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="body">
          {/* Each blank-line-separated block becomes its own paragraph */}
          {post.body.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {updated !== created && <p className="muted small">Last updated {updated}</p>}

        {error && <p className="error">{error}</p>}

        <div className="card-actions">
          <button className="btn primary" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button className="btn ghost" onClick={handleArchive}>
            {post.archived ? "Restore" : "Archive"}
          </button>
          <button className="btn danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </article>
    </>
  );
}
