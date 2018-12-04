# openHPI Monitoring Frontend
![alt text](https://img.shields.io/travis/com/openHPI/monitoring-frontend.svg "Travis Build") 

Frontend service for the openHPI monitoring dashboard.

## Deployment

1. Download the <a href="https://github.com/openHPI/monitoring-frontend/blob/master/docker-compose.yml" download>docker-compose.yml</a>.

1. Deploy the service using docker compose / stack: 
  ```docker-compose up``` or ```docker stack -c docker-compose.yml```.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
1. Clone the repository
    ```
    git clone https://github.com/openHPI/monitoring-frontend
    cd monitoring-frontend
    ```
1. Install the dependencies
    ```
    npm install
    ```
1. Start the app
    ```
    npm start
    ```
1. Server is running on http://localhost:8080.


## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
