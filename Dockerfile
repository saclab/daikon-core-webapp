#######################################
# builder image
#######################################
FROM node:16 as build-tpt-app

ARG MAX_OLD_SPACE_SIZE=4000
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build


#######################################
# nginx image
#######################################
FROM nginx:1.21

COPY --from=build-tpt-app /app/build /usr/share/nginx/html
