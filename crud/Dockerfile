FROM node:latest
RUN /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]