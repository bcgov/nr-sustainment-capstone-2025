# Base image for the container
FROM node:20.19.2-alpine3.21 AS build

# Set working directory
WORKDIR /app/

# # Copy package files and install dependencies
COPY package*.json ./

# # Add curl for health checks
# RUN apk --no-cache add curl

RUN npm run build

# Copy the rest of the application code
COPY . ./

# Deploy container
# Caddy serves static files
FROM caddy:2.10.0-alpine
RUN apk add --no-cache ca-certificates curl

# Copy files and run formatting
COPY --from=build /app/build/ /app/dist
COPY Caddyfile /etc/caddy/Caddyfile
RUN caddy fmt --overwrite /etc/caddy/Caddyfile

# Expose the port the app runs on
EXPOSE 5173

# Run in dev mode by default
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

USER 1001