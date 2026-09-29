import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostSummary from "../components/PostSummary.jsx";
import { getPosts, updatePost, deletePost } from "../api.js";

// READ: lists every post that is not archived.
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // The empty dependency array makes this run once, after the first render.
  // Without it the fetch would repeat on every render and loop forever.
  useEffect(() => {
    getPosts(false)
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleArchiveToggle = async (post) => {
    try {
      await updatePost(post._id, { archived: true });
      // Remove it from this list straight away instead of re-fetching
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

  if (loading) return <p className="muted">Loading posts…</p>;

  return (
    <>
      <div className="page-head">
        <h1>All Posts</h1>
        <span className="count">{posts.length} published</span>
      </div>

      {error && <p className="error">{error}</p>}

      {posts.length === 0 ? (
        <p className="muted">
          No posts yet. <Link to="/create">Write the first one.</Link>
        </p>
      ) : (
        posts.map((post) => (
          <PostSummary
            key={post._id}
            post={post}
            onArchiveToggle={handleArchiveToggle}
            onDelete={handleDelete}
          />
        ))
      )}
    </>
  );
}
