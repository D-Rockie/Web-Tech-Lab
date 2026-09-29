# Setup Guide — Blog REST API (React + Express + MongoDB Atlas)

Follow these steps in order. Total time: about 20 minutes, most of it waiting for the Atlas cluster to start.

---

## Step 0 — Check what you already have

Open a terminal and run:

```bash
node -v      # must print v18 or higher
npm -v
```

If Node is missing, install the LTS build from https://nodejs.org and reopen the terminal.

**Windows PowerShell only** — if `npm` fails with *"running scripts is disabled on this system"*, run this once:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## Step 1 — Create a free MongoDB Atlas cluster

The assignment asks for Atlas (cloud), not a local MongoDB install.

1. Go to https://www.mongodb.com/cloud/atlas/register and sign up (a Google login works).
2. When asked to deploy a cluster, pick the **M0 free tier**.
3. Provider/region: any — pick the one closest to you (Mumbai if it is offered).
4. Name the cluster `Cluster0` and click **Create Deployment**. It takes 1–3 minutes to provision.

---

## Step 2 — Create a database user

Atlas usually shows this dialog right after the cluster is created. If not: **Database Access → Add New Database User**.

1. Authentication method: **Password**.
2. Username: `blogUser`
3. Password: click **Autogenerate** and **copy it somewhere now** — Atlas will not show it again.
4. Database User Privileges: **Read and write to any database**.
5. Click **Add User**.

> If the password contains `@`, `:`, `/` or `#`, either regenerate it or URL-encode it later. Those characters break the connection string. A plain alphanumeric password avoids the problem entirely.

---

## Step 3 — Allow your computer to connect

**Network Access → Add IP Address**.

- For lab use, click **Allow Access from Anywhere** (`0.0.0.0/0`).
- This matters because Atlas rejects every connection from an unlisted IP. College Wi-Fi also changes your IP often, so a single whitelisted address stops working the next day.

Wait for the entry's status to turn from *Pending* to **Active**.

---

## Step 4 — Copy the connection string

1. **Database → Connect** on your cluster.
2. Choose **Drivers**.
3. Driver: **Node.js**, Version: **6.7 or later**.
4. Copy the string shown. It looks like:

```
mongodb+srv://blogUser:<db_password>@cluster0.ab1cd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

---

## Step 5 — Create the server's `.env` file

Inside the `server/` folder there is a file called `.env.example`. Make a copy of it named `.env`:

```bash
# Windows (PowerShell), from inside the server folder
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Open `server/.env` and paste your connection string, replacing `<db_password>` with the real password from Step 2:

```
ATLAS_URI=mongodb+srv://blogUser:YourRealPassword@cluster0.ab1cd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=blog
PORT=5050
```

Three things to get right:
- The `<` and `>` brackets around the password must be **deleted**, not just filled in.
- No quotes around the value, and no spaces around the `=`.
- `.env` is listed in `.gitignore` — it must never be pushed to GitHub.

---

## Step 6 — Install dependencies

Two separate `npm install` runs, because the frontend and backend are two separate Node projects.

```bash
cd server
npm install

cd ../app
npm install
```

---

## Step 7 — Start the backend

In **terminal 1**:

```bash
cd server
npm run dev
```

Expected output:

```
Connected to MongoDB Atlas — database: blog
Server listening on http://localhost:5050
```

If you see `MongoDB connection failed`, stop here and go to the Troubleshooting table — the frontend cannot work until this line appears.

Quick check in the browser: open http://localhost:5050/posts — it should show `[]` (an empty array, since there are no posts yet).

---

## Step 8 — Start the frontend

Leave terminal 1 running. Open **terminal 2**:

```bash
cd app
npm run dev
```

Expected output:

```
VITE v5.4.8  ready in 412 ms
➜  Local:   http://localhost:5173/
```

Open http://localhost:5173 in the browser. You should see the DevBlog header and "No posts yet".

**Both terminals must stay open.** Closing terminal 1 kills the API and every page will show a fetch error.

---

## Step 9 — Test the full CRUD flow in the UI

Do these in order and watch terminal 1 — one log line appears per request:

| # | Action in the browser | Request logged | What should happen |
|---|---|---|---|
| 1 | Click **New Post**, fill all fields, **Publish** | `POST /posts` | You land on the new post's page |
| 2 | Click **Home** | `GET /posts` | The post appears in the list |
| 3 | Open the post, click **Edit**, change the title, **Save** | `PATCH /posts/:id` | The new title shows immediately |
| 4 | Click **Archive** | `PATCH /posts/:id` | Badge changes to *Archived* |
| 5 | Click **Archive** in the top nav | `GET /posts?archived=1` | The post is listed there |
| 6 | Click **Restore** | `PATCH /posts/:id` | It disappears from Archive, returns to Home |
| 7 | Click **Delete**, confirm | `DELETE /posts/:id` | The post is gone |
| 8 | Press **F5** to refresh | `GET /posts` | Remaining posts are still there — proof the data is in Atlas, not in browser memory |

> In development you will often see each `GET` logged **twice**. That is React StrictMode deliberately running effects twice to expose bugs. It is not a mistake in your code and it does not happen in a production build.

---

## Step 10 — Confirm the data is really in Atlas

In the Atlas web console: **Database → Browse Collections**.

You should see database `blog` → collection `posts`, with one document per post:

```json
{
  "_id": { "$oid": "66f1a2b3c4d5e6f7a8b9c001" },
  "title": "Understanding REST APIs",
  "author": "Devaesh D",
  "body": "A REST API exposes each resource at its own URL...",
  "tags": ["rest", "express", "http"],
  "archived": false,
  "createdAt": { "$date": "2026-09-28T09:05:39.612Z" },
  "updatedAt": { "$date": "2026-09-28T09:05:39.612Z" }
}
```

---

## Step 11 (optional) — Test the API directly

Useful for the lab record, and for proving the backend works independently of React.

Install the **Thunder Client** extension in VS Code, or use curl:

```bash
# Create
curl -X POST http://localhost:5050/posts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test post\",\"author\":\"Dev\",\"body\":\"Hello\",\"tags\":\"test\"}"

# Read all
curl http://localhost:5050/posts

# Read one
curl http://localhost:5050/posts/<paste_id_here>

# Update
curl -X PATCH http://localhost:5050/posts/<id> \
  -H "Content-Type: application/json" -d "{\"title\":\"Edited\"}"

# Delete
curl -X DELETE http://localhost:5050/posts/<id>
```

Error cases worth capturing as evidence:

| Request | Response |
|---|---|
| `POST` with an empty body field | `400 {"error":"title, author and body are required"}` |
| `GET /posts/123` | `400 {"error":"Invalid post id"}` |
| `GET /posts/507f1f77bcf86cd799439011` | `404 {"error":"Post not found"}` |

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `MongoDB connection failed: bad auth` | Wrong password, or `<` `>` left in the string | Re-copy the password, delete the angle brackets |
| `querySrv ENOTFOUND` | Cluster hostname mistyped, or no internet | Re-copy the string from Atlas → Connect |
| Connection times out after ~30s | Your IP is not whitelisted | Network Access → Allow Access from Anywhere |
| `ATLAS_URI is missing` | `.env` not created, or created in the wrong folder | It must be at `server/.env`, beside `index.mjs` |
| `EADDRINUSE :5050` | An old server is still running | Close the other terminal, or change `PORT` in `.env` |
| UI shows "Failed to fetch" | Backend is not running | Check terminal 1 for the "Server listening" line |
| UI loads but posts never appear | Vite proxy not picked up | Stop Vite (Ctrl+C) and `npm run dev` again — `vite.config.js` is only read at startup |
| `Cannot use import statement outside a module` | `"type": "module"` missing from `server/package.json` | It is already there — make sure you did not overwrite the file |

---

## Where each requirement of the assignment is implemented

| Requirement | File |
|---|---|
| React frontend | `app/src/App.jsx` + `app/src/pages/` |
| Reusable component | `app/src/components/PostSummary.jsx` |
| `fetch()` API calls | `app/src/api.js` |
| Express REST API | `server/index.mjs`, `server/routes/posts.mjs` |
| MongoDB Node.js driver | `server/db/conn.mjs` |
| `.env` configuration | `server/.env`, loaded by `server/loadEnvironment.mjs` |
| Create / Read / Update / Delete | `POST` / `GET` / `PATCH` / `DELETE` in `routes/posts.mjs` |
