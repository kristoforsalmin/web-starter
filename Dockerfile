FROM node:boron

WORKDIR /app

ADD . /app

RUN npm install

CMD ["npm", "run", "build"]
