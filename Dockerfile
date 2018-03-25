FROM node:carbon

WORKDIR /app

ADD . /app

RUN npm install

CMD ["make"]
