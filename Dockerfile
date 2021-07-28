FROM node:12 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

RUN rm -rf node_modules/ && rm -rf src/

FROM nginx

COPY --from=build /usr/src/app/build/ /usr/share/nginx/root/
COPY default.conf /etc/nginx/conf.d/

EXPOSE 80

WORKDIR /usr/share/nginx/root

CMD ["/bin/sh", "-c", "nginx -g \"daemon off;\""]
