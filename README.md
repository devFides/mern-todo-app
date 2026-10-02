# TODO App

A full-stack TODO application built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack

- **Frontend:** React + TypeScript (Vite), Tailwind CSS, axios
- **Backend:** Node.js, Express 5, Mongoose
- **Database:** MongoDB Atlas

`client/` and `server/` are independent Node projects, each with its own `package.json` and `node_modules`.

## Features

- View all TODOs
- Create a TODO (title + optional description)
- Edit a TODO's title/description
- Mark a TODO as done / not done
- Delete a TODO
- Loading, error, and success feedbacks
- Client-side and server-side input validation

## Project Structure

mern-todo-app/
├── client/ # React + TypeScript frontend — see client/README.md
├── server/ # Express + MongoDB backend — see server/README.md
└── README.md # this file

## Getting Started

Each half of the app has its own setup instructions:

- [`client/README.md`](./client/README.md) — frontend setup, environment variables, running the dev server
- [`server/README.md`](./server/README.md) — backend setup, MongoDB Atlas connection, running the API

# Terminal 1 — backend

cd server
npm install
npm run dev

# Terminal 2 — frontend

cd client
npm install
npm run dev

Then open the URL Vite prints (default `http://localhost:5173`).

## API Overview

| GET | `/api/todos` | Get all TODO items |
| POST | `/api/todos` | Create a new TODO item |
| PUT | `/api/todos/:id` | Update a TODO's title/description |
| PATCH | `/api/todos/:id/done` | Toggle a TODO's done status |
| DELETE | `/api/todos/:id` | Delete a TODO |

## Branching

Development happened on `develop`; PR creates on `develop` should be merge to the `main` branch.
