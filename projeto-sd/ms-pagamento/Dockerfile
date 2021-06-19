FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3002

CMD npm start