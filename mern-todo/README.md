# MERN To-Do List (Web Technology Lab – Ex. 9)

React (Vite) + Node.js/Express + MongoDB (Mongoose). Full CRUD on tasks.

## Prerequisites
- Node.js 18+
- MongoDB running locally (`mongod` / MongoDB service) **or** a MongoDB Atlas connection string

## Run it

### 1. Backend (terminal 1)
```bash
cd server
npm install
# .env is included; if missing: copy .env.example .env
npm run dev
```
Expected:
```
MongoDB connected: mern_todo
Server running on http://localhost:5000
```

### 2. Frontend (terminal 2)
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173

## API
| Method | Endpoint           | Action                    |
|--------|--------------------|---------------------------|
| GET    | /api/todos         | List all tasks            |
| POST   | /api/todos         | Create `{ "task": "..." }`|
| PUT    | /api/todos/:id     | Update `{ "completed": true }` |
| DELETE | /api/todos/:id     | Delete task               |

## Troubleshooting
- `ECONNREFUSED ::1:27017` → use `127.0.0.1` instead of `localhost` in MONGO_URI.
- `ECONNREFUSED 127.0.0.1:27017` → MongoDB isn't running. Start the MongoDB service.
- PowerShell "running scripts is disabled" → `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- UI shows "Could not load tasks: Server responded 500/504" → backend isn't running or can't reach MongoDB.
