#######################################
# builder image
#######################################
FROM node:18 as daikon_core_app_ce-build

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
FROM nginx:1.23

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=daikon_core_app_ce-build /app/build /usr/share/nginx/html/
