FROM alpine
WORKDIR client

RUN apk add --update nodejs nodejs-npm

ADD ./package.json ./
RUN npm install

ADD . .

RUN npm run build

FROM alpine
RUN apk update && apk add lighttpd

COPY --from=0 client/index.html client/bundle.js /var/www/localhost/htdocs/
COPY --from=0 client/libraries/ /var/www/localhost/htdocs/libraries/

CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]
