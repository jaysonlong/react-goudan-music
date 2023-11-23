# build stage
FROM node:16 as build-stage

WORKDIR /app
ENV REACT_APP_BACKEND_URL=./backend
COPY . .
RUN npm install
RUN npm run build

# production stage
FROM nginx:1.24.0 as production-stage

COPY --from=build-stage /app/build /var/www/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]