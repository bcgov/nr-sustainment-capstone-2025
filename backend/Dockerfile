# Base image for the container
FROM node:20.17.0

# Copy files and install dependencies
WORKDIR /app/
COPY . ./
RUN npm ci && \
  npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run in dev mode, `npm run serve` for production
# CMD ["npm", "run", "serve", "--no-update-notifier", "--max-old-space-size=50"]
CMD ["npm", "run", "serve", "--no-update-notifier", "--max-old-space-size=50"]
