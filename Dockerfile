# Build stage
FROM node:8.16-stretch as node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx ng build --prod --base-href=/placeholder-base-href/ --output-path=dist/ -c=docker

# Run stage
FROM nginx:1.16-alpine
COPY --from=node /app/dist /app/lv2
COPY ./docker/angular-nginx.conf /etc/nginx/conf.d/default.conf

COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh 
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]