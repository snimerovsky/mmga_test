FROM node:11.15

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN npm install

RUN yarn build

FROM nginx:latest

COPY --from=0 /app/build /usr/share/nginx/html

COPY ./deploy/nginx_prod.conf /etc/nginx/conf.d/default.conf
