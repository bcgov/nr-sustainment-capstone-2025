# Base image for the container
FROM node:20.19.2-alpine3.21

# Set working directory
WORKDIR /app/

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose the port the app runs on
EXPOSE 5173

# Run in dev mode by default
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
