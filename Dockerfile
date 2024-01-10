FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install


FROM image AS test

COPY . .

CMD ["node", "./dist/app.js"]


EXPOSE 3300

