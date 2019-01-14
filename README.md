# openHPI Monitoring Frontend
![alt text](https://img.shields.io/travis/com/openHPI/monitoring-frontend.svg "Travis Build") 

Frontend service for the openHPI monitoring dashboard.

## Deployment

1. Please follow the deployment instructions under https://github.com/openHPI/monitoring-analytics#deployment.


## Development

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


## Building Docker Images manually

1. Login to your docker account
    ```
    docker login
    ```
1. Build the image
    ```
    docker build -t friedow/monitoring-frontend:latest .
    ```
1. Test the image
    ```
    docker run -p 8080:8080 friedow/monitoring-frontend:latest
    ```
1. Push the image
    ```
    docker push friedow/monitoring-frontend:latest
    ```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
