// One place for every call to the REST API, so the pages stay readable and
// the base URL is defined only once.
const BASE = "/posts"; // Vite proxies /posts to http://localhost:5050/posts

async function request(url, options) {
  const res = await fetch(url, options);
  // fetch() does NOT throw on 400/404/500 - it only throws on network
  // failure. The status has to be checked by hand.
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export const getPosts = (archived = false) =>
  request(`${BASE}${archived ? "?archived=1" : ""}`);

export const getPost = (id) => request(`${BASE}/${id}`);

export const createPost = (post) =>
  request(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

export const updatePost = (id, fields) =>
  request(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

export const deletePost = (id) => request(`${BASE}/${id}`, { method: "DELETE" });
