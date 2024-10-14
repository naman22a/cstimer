FROM node:20.17.0

WORKDIR /usr/src/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
COPY .env.production .env
RUN yarn prisma generate
RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]