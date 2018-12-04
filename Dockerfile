FROM node:10
WORKDIR /usr/src/monitoring-frontend
COPY . .
RUN npm install
CMD npm start
