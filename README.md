# WebViewer annotations sample - using PostgreSQL and Node.js backend

[WebViewer](https://docs.apryse.com/web/guides/get-started) is a powerful JavaScript-based PDF Library that is part of the [Apryse SDK](https://apryse.com/). It provides a slick out-of-the-box responsive UI that enables you to view, annotate and manipulate PDFs and other document types inside any web project.

- [WebViewer Documentation](https://docs.apryse.com/web/guides/get-started)
- [WebViewer Demo](https://showcase.apryse.com/)

This is a WebViewer sample to show how you can save and load annotations through a PostgreSQL database with a Node.js backend.

## Get your trial key

A license key is required to run WebViewer. You can obtain a trial key in our [get started guides](https://docs.apryse.com/web/guides/get-started), or by signing-up on our [developer portal](https://dev.apryse.com/).

## Initial setup

Before you begin, make sure your development environment includes [Node.js](https://nodejs.org/en/) version 13 or later, and you have access to a running PostgreSQL server.

## Install

```
git clone --depth=1 https://github.com/ApryseSDK/webviewer-samples.git
cd webviewer-samples/webviewer-annotations-sqlite3 (postgres)
npm install
```

### Configure Database

#### Option 1: Using Environment Variables (Recommended)

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit the `.env` file with your database credentials:
   ```bash
   # Database Configuration
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_database_name
   
   # Environment
   NODE_ENV=development
   ```

#### Option 2: Using DATABASE_URL

Set the `DATABASE_URL` environment variable to point to your PostgreSQL instance:

```bash
export DATABASE_URL=postgresql://username:password@localhost:5432/yourdatabase
```

**Note:** The app will use `DATABASE_URL` if available (for production/Heroku), otherwise it will use the individual environment variables from the `.env` file.

## Run

```
npm start
```

## How to use

- Create annotations with annotation tools in the header
- Annotations will be automatically saved to the PostgreSQL database as you create and modify annotations
- Load annotations by refreshing the app
- Annotation data is now stored in your configured PostgreSQL database

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USER` | PostgreSQL username | `username` |
| `DB_PASSWORD` | PostgreSQL password | `password` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | PostgreSQL database name | `postgres` |
| `DATABASE_URL` | Full database connection URL | `null` |
| `NODE_ENV` | Environment mode | `development` |

## Deployment

For production deployment (e.g., Heroku), the app will automatically use the `DATABASE_URL` environment variable if available.

