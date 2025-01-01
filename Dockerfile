FROM node:20.12.2

WORKDIR /myapp

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]