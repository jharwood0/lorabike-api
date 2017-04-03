FROM node:boron

RUN mkdir -p /usr/src/lorabike-api
WORKDIR /usr/src/lorabike-api

copy package.json /usr/src/lorabike-api
RUN npm install

COPY . /usr/src/lorabike-api

EXPOSE 8080

CMD [ "npm", "start" ]
