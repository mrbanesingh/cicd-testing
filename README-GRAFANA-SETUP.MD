# Monitoring with Grafana, Loki and Prometheus

### Installation and Setup

Step 1 : Install prom-client for Prometheus
https://www.npmjs.com/package/prom-client

#### 1. Prometheus Server

- Create a `prometheus-config.yml` file and copy the following configration. Don't forget to replace `<NDOEJS_SERVER_ADDRESS>` with actual value.

global:
scrape_interval: 4s

scrape_configs:

- job_name: prometheus
  static_configs:

  - targets: ["<NDOEJS_SERVER_ADDRESS>"]

- Start the Prometheus Server using docker compose
- Create a `docker-compose.yml` file
  version: "3"

services:
prom-server:
image: prom/prometheus
ports: - 9090:9090
volumes: - ./prometheus-config.yml:/etc/prometheus/prometheus.yml

To run - docker-compose up
The prometheus server is now up and running at PORT 9090

#### 2. Setup Grafana

docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss

#### username - admin password - admin

####creating custom metric below packages need too install

npm i response-time

npm i --save-dev @types/response-time

![grafana](https://grafana.com/static/img/grafana/showcase_visualize.jpg)

### 3. Setup Loki Server

docker run -d --name=loki -p 3100:3100 grafana/loki

npm i winston
npm install @types/winston

npm i winston-loki
-------------------------------Swagger Setup -------------------------

#### 1. Swagger UI Express

npm install swagger-jsdoc swagger-ui-express
npm install --save-dev @types/swagger-ui-express

npm install swagger-autogen swagger-ui-express
npm install --save-dev @types/swagger-ui-express
