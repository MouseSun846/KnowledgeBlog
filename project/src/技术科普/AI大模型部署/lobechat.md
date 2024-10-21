---
date: 2024-10-21
title: Lobechat
category:
  - AIGC
tag:
  - Lobechat
---
::: tip Lobechat
:::

## 部署文档

[使用 Docker Compose 部署 LobeChat 服务端数据库版本](https://lobehub.com/zh/docs/self-hosting/server-database/docker-compose)

## docker-compose

```
root@iZ2zei23h3vwykyqq9th6oZ:/home/lobe-chat/docker-compose/local# cat docker-compose.yml 
name: lobe-chat-database
services:
  network-service:
    image: alpine
    container_name: lobe-network
    ports:
      - '${MINIO_PORT}:${MINIO_PORT}' # MinIO API
      - '9001:9001' # MinIO Console
      - '${CASDOOR_PORT}:8000' # Casdoor
      - '${LOBE_PORT}:3210' # LobeChat
    command: tail -f /dev/null
    networks:
      - lobe-network

  postgresql:
    image: pgvector/pgvector:pg16
    container_name: lobe-postgres
    ports:
      - '5432:5432'
    volumes:
      - './data:/var/lib/postgresql/data'
    environment:
      - 'POSTGRES_DB=${LOBE_DB_NAME}'
      - 'POSTGRES_PASSWORD=${POSTGRES_PASSWORD}'
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 5s
      timeout: 5s
      retries: 5
    restart: always
    networks:
      - lobe-network

  minio:
    image: minio/minio
    container_name: lobe-minio
    network_mode: 'service:network-service'
    volumes:
      - './s3_data:/etc/minio/data'
    environment:
      - 'MINIO_ROOT_USER=${MINIO_ROOT_USER}'
      - 'MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD}'
      - 'MINIO_API_CORS_ALLOW_ORIGIN=http://182.92.116.31:${LOBE_PORT}'
    restart: always
    command: >
      server /etc/minio/data --address ":${MINIO_PORT}" --console-address ":9001"


  casdoor:
    image: casbin/casdoor
    container_name: lobe-casdoor
    entrypoint: /bin/sh -c './server --createDatabase=true'
    network_mode: 'service:network-service'
    depends_on:
      postgresql:
        condition: service_healthy
    environment:
      RUNNING_IN_DOCKER: 'true'
      driverName: 'postgres'
      dataSourceName: 'user=postgres password=${POSTGRES_PASSWORD} host=postgresql port=5432 sslmode=disable dbname=casdoor'
      origin: 'http://182.92.116.31:${CASDOOR_PORT}'
      runmode: 'dev'
    volumes:
      - ./init_data.json:/init_data.json

  lobe:
    image: lobehub/lobe-chat-database
    container_name: lobe-chat
    network_mode: 'service:network-service'
    depends_on:
      postgresql:
        condition: service_healthy
      network-service:
        condition: service_started
      minio:
        condition: service_started
      casdoor:
        condition: service_started

    environment:
      - 'APP_URL=http://182.92.116.31:3210'
      - 'NEXT_AUTH_SSO_PROVIDERS=casdoor'
      - 'KEY_VAULTS_SECRET=Kix2wcUONd4CX51E/ZPAd36BqM4wzJgKjPtz2sGztqQ='
      - 'NEXT_AUTH_SECRET=QCtusYE5HEzg1IGy1BMbW4SNgF+yBkcKha4ghUyI6WY='
      - 'AUTH_URL=http://182.92.116.31:8800/api/auth'
      - 'AUTH_CASDOOR_ISSUER=http://182.92.116.31:8800/'
      - 'DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgresql:5432/${LOBE_DB_NAME}'
      - 'S3_ENDPOINT=http://182.92.116.31:${MINIO_PORT}'
      - 'S3_BUCKET=${MINIO_LOBE_BUCKET}'
      - 'S3_PUBLIC_DOMAIN=http://182.90.116.31:${MINIO_PORT}'
      - 'S3_ENABLE_PATH_STYLE=1'
      - 'LLM_VISION_IMAGE_USE_BASE64=1'
    env_file:
      - .env
    restart: always

volumes:
  data:
    driver: local
  s3_data:
    driver: local

networks:
  lobe-network:
    driver: bridge
```    


## env

```
root@iZ2zei23h3vwykyqq9th6oZ:/home/lobe-chat/docker-compose/local# cat .env
# Proxy, if you need it
# HTTP_PROXY=http://localhost:7890
# HTTPS_PROXY=http://localhost:7890


# Other environment variables, as needed. You can refer to the environment variables configuration for the client version, making sure not to have ACCESS_CODE.
# OPENAI_API_KEY=sk-xxxx
# OPENAI_PROXY_URL=https://api.openai.com/v1
# OPENAI_MODEL_LIST=...


# ===========================
# ====== Preset config ====== 
# ===========================
# if no special requirements, no need to change
LOBE_PORT=3210
CASDOOR_PORT=8800
MINIO_PORT=9000

# Postgres related, which are the necessary environment variables for DB
LOBE_DB_NAME=lobechat
POSTGRES_PASSWORD=uWNZugjBqixf8dxC

# Casdoor secret
AUTH_CASDOOR_ID=a387a4892ee19b1a2249
AUTH_CASDOOR_SECRET=dbf205949d704de81b0b5b3603174e23fbecc354
# MinIO S3 configuration
MINIO_ROOT_USER=YOUR_MINIO_USER
MINIO_ROOT_PASSWORD=YOUR_MINIO_PASSWORD

# Configure the bucket information of MinIO
MINIO_LOBE_BUCKET=lobe
S3_ACCESS_KEY_ID=soaucnP8Bip0TDdUjxng
S3_SECRET_ACCESS_KEY=ZPUzvY34umfcfxvWKSv0P00vczVMB6YmgJS5J9eO
```


## minio-bucket.config.json 

```
root@iZ2zei23h3vwykyqq9th6oZ:/home/lobe-chat/docker-compose# cat minio-bucket.config.json 
{
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": ["*"]
      },
      "Action": ["s3:GetBucketLocation"],
      "Resource": ["arn:aws:s3:::lobe"]
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": ["*"]
      },
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::lobe"],
      "Condition": {
        "StringEquals": {
          "s3:prefix": ["files/*"]
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": ["*"]
      },
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
      "Resource": ["arn:aws:s3:::lobe/files/**"]
    }
  ],
  "Version": "2012-10-17"
}
```