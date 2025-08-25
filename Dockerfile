FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn config set network-timeout 3000000

RUN yarn install --frozen-lockfile

COPY prisma ./prisma/
RUN yarn prisma generate

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn","run", "start:prod"]
