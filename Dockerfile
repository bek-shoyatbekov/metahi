FROM node:21-alpine AS base

WORKDIR /src/app

COPY package*.json ./

RUN npm install


FROM base AS test

COPY . .

CMD ["node", "./dist/app.js"]


EXPOSE 3300

