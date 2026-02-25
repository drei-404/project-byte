# Project BYTE

Project BYTE is a Next.js 16 application with:

- Public-facing pages for courses, organizations, and news
- Admin dashboard for managing users, news, organizations, and trainees
- Magic-link admin authentication with NextAuth
- PostgreSQL + Prisma for persistent data
- Nextcloud-backed file upload flows for media assets

## Clone From GitHub (Fail-Safe)

Use either HTTPS or SSH.

### Option A: HTTPS (recommended if SSH is not configured)

```bash
git clone https://github.com/<your-org-or-user>/project-byte.git
cd project-byte
```

### Option B: SSH (recommended if your SSH key is already added to GitHub)

```bash
git clone git@github.com:<your-org-or-user>/project-byte.git
cd project-byte
```

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL (local instance or hosted)
- Access to SMTP credentials (for magic-link auth)
- Access to Nextcloud credentials (for upload APIs)

## First-Time Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.local.example .env.local
```

If `.env.local.example` is not present, create `.env.local` manually and add:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"

SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="smtp-user"
SMTP_PASS="smtp-password"
SMTP_FROM="Project BYTE <no-reply@example.com>"

NEXTCLOUD_BASE_API_URL="https://nextcloud.example.com/remote.php/dav/files"
NEXTCLOUD_EMAIL="nextcloud-account-email@example.com"
NEXTCLOUD_USERNAME="nextcloud-username"
NEXTCLOUD_APP_PASSWORD="nextcloud-app-password"
```

3. Sync database schema:

```bash
npx prisma generate
npx prisma db push
```

4. Start local development:

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Common Commands

```bash
npm run dev    # start local dev server
npm run build  # production build
npm run start  # run production server
npm run lint   # run ESLint
```

## Clone/Setup Troubleshooting

- `Repository not found`:
  - Confirm repo path and permissions.
  - If private, make sure you are logged in to GitHub and have access.

- `Permission denied (publickey)` with SSH:
  - Your SSH key is not configured in GitHub. Use HTTPS clone or register your key.

- `npm install` fails:
  - Verify Node and npm versions.
  - Remove `node_modules` and `package-lock.json`, then run `npm install` again.

- Auth redirects do not work:
  - Ensure `NEXTAUTH_URL` matches your local URL.
  - Ensure `NEXTAUTH_SECRET` is set.

- Upload endpoints fail:
  - Re-check `NEXTCLOUD_*` variables.
  - Confirm Nextcloud app password and base API URL are valid.

- Database connection errors:
  - Validate `DATABASE_URL`.
  - Ensure PostgreSQL is reachable and credentials are correct.

## Notes

- `.env*` is gitignored; keep secrets in local or secure deployment environments.
- Prisma client is generated into `lib/generated/prisma`.
