FROM node:20.17.0

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn prisma generate
RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:prod"]