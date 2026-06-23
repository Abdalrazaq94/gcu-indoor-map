# GCU Campus Guide

A multi-purpose web app to help new GCU students get around the campus with ease, featuring an interactive indoor map, user accounts, and an admin panel.

**Live demo**

- Frontend: https://gcu-indoor-map.onrender.com
- Backend API: https://gcu-campus-guide-backend.onrender.com

> Note: the backend is hosted on a free tier that sleeps after inactivity, so the first request after a while may take 30–60 seconds to wake up.

---

## Tech Stack

### Frontend
| Technology | Purpose | Link |
|---|---|---|
| React | UI library (Create React App) | https://react.dev |
| React Router | Client-side routing | https://reactrouter.com |
| Axios | HTTP requests to the backend | https://axios-http.com |
| Tailwind CSS | Styling | https://tailwindcss.com |
| Material Tailwind | Pre-built UI components | https://www.material-tailwind.com |
| Framer Motion | Animations | https://www.framer.com/motion/ |
| React Toastify | Toast notifications | https://fkhadra.github.io/react-toastify/ |
| jwt-decode | Read JWT tokens on the client | https://github.com/auth0/jwt-decode |

### Backend
| Technology | Purpose | Link |
|---|---|---|
| Python | Backend language | https://www.python.org |
| Flask | Web framework / REST API | https://flask.palletsprojects.com |
| Flask-SQLAlchemy | ORM / database models | https://flask-sqlalchemy.palletsprojects.com |
| Flask-Migrate (Alembic) | Database migrations | https://flask-migrate.readthedocs.io |
| Flask-JWT-Extended | Authentication (JWT tokens) | https://flask-jwt-extended.readthedocs.io |
| Flask-Mailman | Sending emails (password reset) | https://github.com/waynerv/flask-mailman |
| Flask-CORS | Cross-origin requests | https://flask-cors.readthedocs.io |
| Werkzeug | Password hashing | https://werkzeug.palletsprojects.com |
| psycopg2 | PostgreSQL driver | https://www.psycopg.org |

### Database
| Technology | Purpose | Link |
|---|---|---|
| PostgreSQL | Production database | https://www.postgresql.org |
| MySQL | Local development database (via Docker) | https://www.mysql.com |

### DevOps & Hosting
| Technology | Purpose | Link |
|---|---|---|
| Docker | Containerisation | https://www.docker.com |
| Docker Compose | Run all services together locally | https://docs.docker.com/compose/ |
| Render | Hosting the backend (web service) and frontend (static site) | https://render.com |
| Supabase | Managed PostgreSQL database hosting | https://supabase.com |
| GitHub | Source control | https://github.com |

---

## Architecture

The app is deployed as three separate services that talk to each other:

```
Browser
   │
   ▼
Frontend (React static site on Render)
   │  HTTPS API calls
   ▼
Backend (Flask API on Render)
   │  SQL
   ▼
Database (PostgreSQL on Supabase)
```

Locally, all three run together in Docker via `docker-compose`.

---

## Getting Started (Local Development)

These instructions get a copy running on your local machine for development and testing.

### Prerequisites
- [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/)
- On Windows, Docker Desktop requires [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install)

### Installation

Clone the repository:
```bash
git clone https://github.com/Abdalrazaq94/gcu-indoor-map.git
cd gcu-indoor-map
```

### Environment variables

The backend needs a `.env` file (it is git-ignored and not committed). Create `backend/.env` with:

```env
FLASK_ENV=development
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<database>
JWT_SECRET_KEY=<a-long-random-secret>
MAIL_USERNAME=<your-mail-username>
MAIL_PASSWORD=<your-mail-password>
```

> `DATABASE_URL` can point at a local database container or at your Supabase database. If your password contains special characters (e.g. `@`), URL-encode them (`@` becomes `%40`).

### Run

Build and launch both the React and Flask apps (and the database):
```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

On startup the backend runs `flask db upgrade` to apply migrations and create the tables automatically.

---

## Deployment

The project is deployed for free (no credit card required) across Render and Supabase.

### Database — Supabase
1. Create a project on [Supabase](https://supabase.com) and save the database password.
2. Use the **Session pooler** connection string (IPv4-compatible) as your `DATABASE_URL`.

### Backend — Render (Web Service)
1. New → **Web Service**, connect the GitHub repo.
2. **Root Directory:** `backend` · **Language:** Docker · **Instance type:** Free.
3. Add environment variables: `DATABASE_URL`, `JWT_SECRET_KEY`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `FLASK_ENV`.
4. Deploy — Render builds from the `Dockerfile` and runs migrations on start.

### Frontend — Render (Static Site)
1. New → **Static Site**, connect the same repo.
2. **Root Directory:** `frontend` · **Build Command:** `npm install && npm run build` · **Publish Directory:** `build`.
3. Add a rewrite rule (for React Router): Source `/*` → Destination `/index.html` → Action **Rewrite**.
4. Deploy.

> The frontend's API calls point at the deployed backend URL (`https://gcu-campus-guide-backend.onrender.com`).

---

## Development Workflow

When you want to start work on a new feature:

1. Follow the **Installation** section above.
2. Move into the cloned directory: `cd gcu-indoor-map`
3. Make sure the development branch is up to date: `git pull origin development`
4. Branch off the current development branch: `git checkout -b feature-[TRELLO CARD NUMBER]`
5. Add changed files: `git add <filename1> <filename2>`
6. Commit frequently: `git commit -m "Describe what you changed/added"`
7. Push your feature branch: `git push -u origin feature-[TRELLO CARD NUMBER]`

### Pull Requests
1. Go to the repository on GitHub.
2. Click **Pull requests** → **New pull request**.
3. Set **development** as the base branch and your feature branch as the compare branch.
4. Write a descriptive title and explanation, then **Create pull request**.

Your feature will be reviewed and, if everything looks okay, merged into the development branch.

### Branches
- **Main:** Only used for deployment.
- **Development:** The main working branch; everything is merged here after review.
- **Feature:** Branches developers create for each feature they work on.

---

## Team

| Name | Role |
|---|---|
| Abadi Altaih Full-Stack Developer |(Frontend Lead) |
| Joe McskimmingFull-Stack Developer | (Backend Lead) |
| Zubeyr Osman | Frontend Developer |
| Liam Moore | Frontend Developer |
| Bohdan Kostiv | UX/UI Designer |

---

## Additional Documentation and Acknowledgments
- Trello
- Miro
- Discord
- Google Drive