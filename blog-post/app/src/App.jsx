import React from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Post from "./pages/Post.jsx";
import Archive from "./pages/Archive.jsx";

export default function App() {
  return (
    <div className="layout">
      <header className="site-header">
        <Link to="/" className="brand">
          Dev<span>Blog</span>
        </Link>
        <nav>
          {/* NavLink adds the "active" class automatically for the current route */}
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/create">New Post</NavLink>
          <NavLink to="/archive">Archive</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="*" element={<p className="muted">404 — page not found</p>} />
        </Routes>
      </main>

      <footer className="site-footer">
        React · Express · MongoDB Atlas — Web Technology Lab
      </footer>
    </div>
  );
}
