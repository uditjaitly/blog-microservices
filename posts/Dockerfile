FROM node:alpine

WORKDIR /usr/apps

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]