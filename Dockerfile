# syntax=docker/dockerfile:1.7-labs

FROM node:24-alpine3.21 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN NODE_ENV=production npm run build


FROM nginx:1.27.5-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3030
CMD ["nginx", "-g", "daemon off;"]
