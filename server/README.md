# TODO App — Backend

Express + MongoDB REST API for the TODO application.

## Tech Stack

- Node.js, Express 5
- Mongoose (MongoDB ODM)
- MongoDB Atlas (cloud-hosted MongoDB)
- cors, dotenv

## Prerequisites

- Node.js 20.19+ or 22.12+
- A MongoDB Atlas account (free tier is sufficient) — or a local MongoDB instance (see below)

## Setup

```bash
cd server
npm install
```

Create a `.env` file in `server/`

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/todoapp?retryWrites=true&w=majority
CLIENT_ORIGIN=http://localhost:5173
```

### MongoDB connection notes

Developed and tested against **MongoDB Atlas** (free M0 tier):

1. Create a cluster, a database user (username/password), and allow network access from your IP.
2. Copy the `mongodb+srv://...` string from **Database → Connect → Drivers**, append your password, and append the database name (`todoapp`) before the query string.
3. Paste it into `MONGODB_URI` above.

**A local MongoDB instance also works** — Mongoose doesn't care which. Point `MONGODB_URI` at it instead:

```env
MONGODB_URI=mongodb://localhost:27017/todoapp
```

## Running

```bash
npm run dev    # nodemon, restarts on file changes
npm start      # plain node, no auto-restart
```

On success: MongoDB connected: <your-cluster-host>
Server running on http://localhost:5000

Health check: `GET http://localhost:5000/` → `{"API running"}`

## API Reference

Base URL: `http://localhost:5000/api`

| GET | `/todos` | — | Get all TODOs, newest first |
| POST | `/todos` | `{ title, description? }` | Create a TODO |
| PUT | `/todos/:id` | `{ title?, description? }` | Update title and/or description |
| PATCH | `/todos/:id/done` | — | Toggle done status |
| DELETE | `/todos/:id` | — | Delete a TODO |

### Todo shape

```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "done": false,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Validation rules

- `title`: required, non-empty after trimming, max 100 characters
- `description`: optional, max 500 characters
- `:id` params must be a valid MongoDB ObjectId

### Error responses

All errors return `{ "message": "..." }`:

| Status | When                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| 400    | Invalid input (missing/empty/too-long title, over-length description, malformed `:id`, malformed JSON body) |
| 404    | No TODO found for the given `:id`                                                                           |
| 500    | Unexpected server error (logged server-side, never leaked to the client)                                    |
