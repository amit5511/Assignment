FROM node:21

WORKDIR /Assignment

COPY ./package*.json ./
RUN npm install
COPY . .
CMD ["npm","run","start"]