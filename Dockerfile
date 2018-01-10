FROM node:carbon

WORKDIR /app

ADD . /app

RUN npm install

CMD ["npm", "run", "build"]
