import React from "react";
import { Link } from "react-router-dom";

// A presentational component: it owns no state and only renders what the
// parent page passes down as props.
export default function PostSummary({ post, onArchiveToggle, onDelete }) {
  const date = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Show only the first 140 characters in a list view
  const preview =
    post.body.length > 140 ? post.body.slice(0, 140).trimEnd() + "…" : post.body;

  return (
    <article className="card">
      <h2>
        <Link to={`/post/${post._id}`}>{post.title}</Link>
      </h2>

      <p className="meta">
        by {post.author} · {date}
      </p>

      <p className="preview">{preview}</p>

      {post.tags?.length > 0 && (
        <div className="tags">
          {post.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="card-actions">
        <Link className="btn ghost" to={`/post/${post._id}`}>
          Read
        </Link>
        <button className="btn ghost" onClick={() => onArchiveToggle(post)}>
          {post.archived ? "Restore" : "Archive"}
        </button>
        <button className="btn danger" onClick={() => onDelete(post._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
