FROM node:12-alpine
LABEL version="1.0"

WORKDIR /app

COPY package*.json /app/

#ARG NPM_TOKEN
COPY .npmrc .npmrc
#Configure config registry
#RUN npm config set registry https://registry.npmjs.org/
#RUN npm config set @ec.com.kruger:registry https://nexus.krugernetes.com/repository/npm-internal/

RUN npm install --no-package-lock
RUN rm -f .npmrc

#Datetime configuration
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/EST /etc/localtime
RUN apk del tzdata

COPY ./ /app/
RUN npm run build:all

CMD [ "npm", "start" ]