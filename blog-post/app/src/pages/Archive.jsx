import React, { useEffect, useState } from "react";
import PostSummary from "../components/PostSummary.jsx";
import { getPosts, updatePost, deletePost } from "../api.js";

// Lists posts whose archived flag is true (GET /posts?archived=1).
// Archiving is a "soft delete": the document stays in MongoDB, only the
// flag changes, so a post can always be restored.
export default function Archive() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts(true)
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRestore = async (post) => {
    try {
      await updatePost(post._id, { archived: false });
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post permanently?")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="muted">Loading archive…</p>;

  return (
    <>
      <div className="page-head">
        <h1>Archive</h1>
        <span className="count">{posts.length} archived</span>
      </div>

      {error && <p className="error">{error}</p>}

      {posts.length === 0 ? (
        <p className="muted">Nothing archived yet.</p>
      ) : (
        posts.map((post) => (
          <PostSummary
            key={post._id}
            post={post}
            onArchiveToggle={handleRestore}
            onDelete={handleDelete}
          />
        ))
      )}
    </>
  );
}
