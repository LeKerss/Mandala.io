FROM alpine

WORKDIR mandala-server

RUN apk add --update nodejs nodejs-npm

ADD ./package.json ./

RUN npm install

ADD . .

EXPOSE 3000

CMD npm start