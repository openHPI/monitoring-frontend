FROM node:alpine
WORKDIR /usr/src/monitoring-frontend
COPY . .
RUN npm install
CMD npm start
