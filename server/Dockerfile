FROM alpine
WORKDIR mandala-server
ADD ./package.json ./
RUN apk add --update nodejs nodejs-npm
RUN npm install
EXPOSE 3000
RUN npm run start