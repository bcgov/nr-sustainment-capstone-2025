# Base image for the container
FROM node:20.19.2-alpine3.21

WORKDIR /app

COPY  . ./

RUN npm ci

COPY . .

RUN apk --no-cache add curl

# Install OpenSSL for Prisma and generate client
RUN apk add --no-cache openssl && \
    npx prisma generate

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]
