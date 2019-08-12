FROM elmsln/haxcms:latest as haxcms

FROM node:8

COPY --from=haxcms /var/www/html/build /haxcms/build
COPY --from=haxcms /var/www/html/dist /haxcms/dist
COPY --from=haxcms /var/www/html/package.json /haxcms/package.json

WORKDIR /home/node/app

COPY package.json package.json
RUN npm install
COPY . .

CMD [ "npm", "start" ]