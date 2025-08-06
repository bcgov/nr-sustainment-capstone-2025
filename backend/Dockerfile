# Base image for the container
FROM node:20.19.2 AS dependencies

RUN apt-get update -y && apt-get install -y --no-install-recommends\
    openssl \
    curl

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

USER node

FROM node:20.19.2 AS build

WORKDIR /app

COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npx prisma generate

RUN npm run build

FROM node:20.19.2-slim AS prod

RUN apt-get update -y && apt-get install -y --no-install-recommends\
    openssl \
    curl
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules ./node_modules
COPY prisma ./prisma
COPY package*.json ./

# RUN npx prisma migrate deploy
# CMD ["npm", "run", "serve"]

COPY --chown=node:node start.sh /app/start.sh
RUN chmod +x /app/start.sh

USER node

CMD ["sh", "/app/start.sh"]