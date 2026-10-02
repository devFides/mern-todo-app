# TODO App — Frontend

React + TypeScript single-page app for the TODO application, built with Vite and styled with Tailwind CSS.

## Tech Stack

- React 18+ with TypeScript
- Vite (build tool / dev server)
- Tailwind CSS
- axios (HTTP client)

## Prerequisites

- Node.js 20.19+ or 22.12+
- The backend running (see [`../server/README.md`](../server/README.md)) — this app has nothing to display without it

## Setup

```bash
cd client
npm install
```

Create a `.env` file in `client/` (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

Adjust the port if your backend runs on a different one. Restart the dev server after changing `.env` — Vite only reads env files at startup.

## Running

```bash
npm run dev
```

Opens at `http://localhost:5173` by default.

````bash
npm run build     # production build, also type-checks
npm run lint       # ESLint
npm run preview    # preview the production build locally```


## Features

- CRUD operations of Todo
- Update todo status: "completed"/ "uncompleted"
- validation (required title, 100-char title limit, 500-char description limit)
- Submit button disabled until the form is valid
- A single `Notification` component handles both success/failure status messages

````
