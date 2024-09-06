#stage 1
FROM nexus-dockerhub.andersenlab.dev/node:14.21-slim as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN ng build
RUN ls -la

#stage 2
FROM nginx:1.23.3-alpine
EXPOSE 80
COPY ./CI-CD/default.conf /etc/nginx/conf.d/
COPY --from=node /app/dist/andtm /usr/share/nginx/html
