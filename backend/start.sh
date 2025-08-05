#!/bin/sh
set -e

echo "Running Prisma migrate..."
npx prisma migrate deploy

echo "Starting server..."
npm run serve