# Start your image with a node base image
FROM node:alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

COPY . .

RUN npm install \
    && npm install typescript -g \
    && npm run build

CMD ["node", "./dist/app.js"]
