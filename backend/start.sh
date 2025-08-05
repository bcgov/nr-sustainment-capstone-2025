#!/bin/sh
set -e

export DATABASE_URL="postgresql://postgres:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/postgres?schema=public"

echo "Running Prisma migrate..."
npx prisma migrate deploy

echo "Starting server..."
npm run serve