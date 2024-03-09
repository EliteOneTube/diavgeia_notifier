FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install \
    && npm install typescript -g \
    && npm run build

CMD ["node", "./dist/app.js"]
