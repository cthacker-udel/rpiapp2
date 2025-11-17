FROM node:latest

# set pwd to /app
WORKDIR /app

# copy package.json for dependencies
COPY package.json .

# install deps
RUN npm i

# globally install vite
RUN npm i -g vite

# copy all files to current pwd
COPY . .

ARG VITE_PUBLIC_WEBSOCKET_URL
ENV VITE_PUBLIC_WEBSOCKET_URL=$VITE_PUBLIC_WEBSOCKET_URL

# build production level application
RUN ["npm", "run", "build"]

# expose port 8080
EXPOSE 80

# run production level application
ENTRYPOINT ["vite", "preview", "--port", "80", "--host", "0.0.0.0"]