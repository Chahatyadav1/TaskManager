FROM node:18-alpine3.17
WORKDIR ./usr/app
copy package*.json  ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]

