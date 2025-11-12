FROM node:latest

# set pwd to /app
WORKDIR /app

# copy package.json for dependencies
COPY package.json .

# install deps
RUN npm i

# copy all files to current pwd
COPY . .

# build production level application
RUN ["npm", "run", "build"]

# expose port 8080
EXPOSE 8080

# run production level application
CMD ["npm", "run", "preview"]