# Comment System — Full Stack Project

A minimal admin dashboard to moderate article comments. It provides:

- API (Express + Knex + PostgreSQL) to manage comments (create, list pending, approve, delete)
- Admin UI (React + Vite + MUI) to login and approve/delete pending comments
- Docker Compose for local Postgres and pgAdmin

## Tech stack

- Backend: Node.js, Express, Knex, PostgreSQL, Zod, JWT, http-status-codes
- Frontend: React 18, Vite, Material UI (MUI)
- Dev tools: Nodemon, TypeScript
- Data: Postgres via Docker, pgAdmin

---

## Prerequisites

- Node.js 18+
- Docker Desktop (for the DB)
- pnpm, npm, or yarn

---

## 1) Backend — Setup & Run

1. Create a `.env` file in `backend/` (example):

```
# App
PORT=3000
ADMIN_USER=admin
ADMIN_PASS=1234
JWT_SECRET=supersecret

# Postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=app
DB_PASSWORD=app
DB_NAME=comments

# Optional: pgAdmin
PGADMIN_DEFAULT_EMAIL=admin@local
PGADMIN_DEFAULT_PASSWORD=admin
```

2. Install dependencies:

```bash
cd backend
npm install
```

3. Start Postgres and pgAdmin:

```bash
# in backend/
docker compose up -d
```

4. Run database migrations:

```bash
# in backend/
npm run migrate:latest
```

5. Start the backend server (dev):

```bash
# in backend/
npm run dev
```

Server runs at http://localhost:3000 (unless PORT differs).

### Useful backend endpoints

- GET `/health` → returns "Server is up and running"
- POST `/admin/auth/login` { username, password } → { token }
- GET `/admin/comments/pending` (Bearer token) → list pending comments
- POST `/admin/comments/:id/approve` (Bearer token) → { ok: true }
- DELETE `/admin/comments/:id` (Bearer token) → { ok: true }

Public comments endpoints (no auth required):

- GET `/api/comments/:articleId` → list approved comments for an article
- POST `/api/comments/:articleId` { authorName, content } → { ok: true }

---

## 2) Frontend — Setup & Run

1. Create a `.env` file in `frontend/`:

```
VITE_API_BASE=http://localhost:3000
```

2. Install and run:

```bash
# in frontend/
npm install
npm run dev
```

App will run at the printed Vite dev URL (usually http://localhost:5173).

Login using ADMIN_USER/ADMIN_PASS from the backend `.env`. The token is stored in localStorage and used for moderation actions.

---

## 3) End-to-end demo

1. Start backend and DB (as above)
2. Start frontend (as above)
3. Open the app, go to /login
4. Login with admin credentials
5. Pending page will load pending comments (if none, shows an empty state)
6. Approve/Delete to moderate

---

## 4) API usage examples (curl)

Login and save token:

```bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"1234"}' \
  http://localhost:3000/admin/auth/login
```

List pending comments (replace TOKEN):

```bash
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/admin/comments/pending
```

Approve a comment:

```bash
curl -X POST -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/admin/comments/123/approve
```

Delete a comment:

```bash
curl -X DELETE -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/admin/comments/123
```

Create a public comment:

```bash
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{"authorName":"Jane","content":"Nice article!"}' \
  http://localhost:3000/api/comments/ARTICLE_ID
```

Get approved comments for an article (public):

```bash
curl http://localhost:3000/api/comments/ARTICLE_ID
```

---

## 5) Troubleshooting

- 500 Internal Server Error: backend intentionally hides details; check server logs
- 401 Unauthorized: missing/invalid token → login again
- DB connection issues: ensure Docker is running and env vars are correct
- Migrations not applied: run `npm run migrate:latest` in backend

---

## 6) Project structure

```
backend/
  src/
    index.ts          # Express app wiring
    routers/          # Routes
    controller/       # Business logic
    middelwares/      # Auth, validate, error handler
    models/           # Types/enums/errors
  docker-compose.yml  # DB + pgAdmin
  migrations/         # Knex migrations

frontend/
  src/
    pages/            # React pages
    components/       # UI components
    api.ts            # API client
    strings.ts        # All UI strings
```

---
