FROM node:20.12.2

WORKDIR /myapp

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4010

CMD ["node", "index.js"]