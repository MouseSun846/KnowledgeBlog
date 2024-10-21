<template><div><div class="hint-container tip">
<p class="hint-container-title">Lobechat</p>
</div>
<h2 id="部署文档" tabindex="-1"><a class="header-anchor" href="#部署文档"><span>部署文档</span></a></h2>
<p><a href="https://lobehub.com/zh/docs/self-hosting/server-database/docker-compose" target="_blank" rel="noopener noreferrer">使用 Docker Compose 部署 LobeChat 服务端数据库版本</a></p>
<h2 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose"><span>docker-compose</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>root@iZ2zei23h3vwykyqq9th6oZ:/home/lobe-chat/docker-compose/local# cat docker-compose.yml </span></span>
<span class="line"><span>name: lobe-chat-database</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  network-service:</span></span>
<span class="line"><span>    image: alpine</span></span>
<span class="line"><span>    container_name: lobe-network</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - '${MINIO_PORT}:${MINIO_PORT}' # MinIO API</span></span>
<span class="line"><span>      - '9001:9001' # MinIO Console</span></span>
<span class="line"><span>      - '${CASDOOR_PORT}:8000' # Casdoor</span></span>
<span class="line"><span>      - '${LOBE_PORT}:3210' # LobeChat</span></span>
<span class="line"><span>    command: tail -f /dev/null</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - lobe-network</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  postgresql:</span></span>
<span class="line"><span>    image: pgvector/pgvector:pg16</span></span>
<span class="line"><span>    container_name: lobe-postgres</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - '5432:5432'</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - './data:/var/lib/postgresql/data'</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - 'POSTGRES_DB=${LOBE_DB_NAME}'</span></span>
<span class="line"><span>      - 'POSTGRES_PASSWORD=${POSTGRES_PASSWORD}'</span></span>
<span class="line"><span>    healthcheck:</span></span>
<span class="line"><span>      test: ['CMD-SHELL', 'pg_isready -U postgres']</span></span>
<span class="line"><span>      interval: 5s</span></span>
<span class="line"><span>      timeout: 5s</span></span>
<span class="line"><span>      retries: 5</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - lobe-network</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  minio:</span></span>
<span class="line"><span>    image: minio/minio</span></span>
<span class="line"><span>    container_name: lobe-minio</span></span>
<span class="line"><span>    network_mode: 'service:network-service'</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - './s3_data:/etc/minio/data'</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - 'MINIO_ROOT_USER=${MINIO_ROOT_USER}'</span></span>
<span class="line"><span>      - 'MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD}'</span></span>
<span class="line"><span>      - 'MINIO_API_CORS_ALLOW_ORIGIN=http://182.92.116.31:${LOBE_PORT}'</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    command: ></span></span>
<span class="line"><span>      server /etc/minio/data --address ":${MINIO_PORT}" --console-address ":9001"</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  casdoor:</span></span>
<span class="line"><span>    image: casbin/casdoor</span></span>
<span class="line"><span>    container_name: lobe-casdoor</span></span>
<span class="line"><span>    entrypoint: /bin/sh -c './server --createDatabase=true'</span></span>
<span class="line"><span>    network_mode: 'service:network-service'</span></span>
<span class="line"><span>    depends_on:</span></span>
<span class="line"><span>      postgresql:</span></span>
<span class="line"><span>        condition: service_healthy</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      RUNNING_IN_DOCKER: 'true'</span></span>
<span class="line"><span>      driverName: 'postgres'</span></span>
<span class="line"><span>      dataSourceName: 'user=postgres password=${POSTGRES_PASSWORD} host=postgresql port=5432 sslmode=disable dbname=casdoor'</span></span>
<span class="line"><span>      origin: 'http://182.92.116.31:${CASDOOR_PORT}'</span></span>
<span class="line"><span>      runmode: 'dev'</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./init_data.json:/init_data.json</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  lobe:</span></span>
<span class="line"><span>    image: lobehub/lobe-chat-database</span></span>
<span class="line"><span>    container_name: lobe-chat</span></span>
<span class="line"><span>    network_mode: 'service:network-service'</span></span>
<span class="line"><span>    depends_on:</span></span>
<span class="line"><span>      postgresql:</span></span>
<span class="line"><span>        condition: service_healthy</span></span>
<span class="line"><span>      network-service:</span></span>
<span class="line"><span>        condition: service_started</span></span>
<span class="line"><span>      minio:</span></span>
<span class="line"><span>        condition: service_started</span></span>
<span class="line"><span>      casdoor:</span></span>
<span class="line"><span>        condition: service_started</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - 'APP_URL=http://182.92.116.31:3210'</span></span>
<span class="line"><span>      - 'NEXT_AUTH_SSO_PROVIDERS=casdoor'</span></span>
<span class="line"><span>      - 'KEY_VAULTS_SECRET=Kix2wcUONd4CX51E/ZPAd36BqM4wzJgKjPtz2sGztqQ='</span></span>
<span class="line"><span>      - 'NEXT_AUTH_SECRET=QCtusYE5HEzg1IGy1BMbW4SNgF+yBkcKha4ghUyI6WY='</span></span>
<span class="line"><span>      - 'AUTH_URL=http://182.92.116.31:8800/api/auth'</span></span>
<span class="line"><span>      - 'AUTH_CASDOOR_ISSUER=http://182.92.116.31:8800/'</span></span>
<span class="line"><span>      - 'DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgresql:5432/${LOBE_DB_NAME}'</span></span>
<span class="line"><span>      - 'S3_ENDPOINT=http://182.92.116.31:${MINIO_PORT}'</span></span>
<span class="line"><span>      - 'S3_BUCKET=${MINIO_LOBE_BUCKET}'</span></span>
<span class="line"><span>      - 'S3_PUBLIC_DOMAIN=http://182.90.116.31:${MINIO_PORT}'</span></span>
<span class="line"><span>      - 'S3_ENABLE_PATH_STYLE=1'</span></span>
<span class="line"><span>      - 'LLM_VISION_IMAGE_USE_BASE64=1'</span></span>
<span class="line"><span>    env_file:</span></span>
<span class="line"><span>      - .env</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span></span></span>
<span class="line"><span>volumes:</span></span>
<span class="line"><span>  data:</span></span>
<span class="line"><span>    driver: local</span></span>
<span class="line"><span>  s3_data:</span></span>
<span class="line"><span>    driver: local</span></span>
<span class="line"><span></span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  lobe-network:</span></span>
<span class="line"><span>    driver: bridge</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="env" tabindex="-1"><a class="header-anchor" href="#env"><span>env</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>root@iZ2zei23h3vwykyqq9th6oZ:/home/lobe-chat/docker-compose/local# cat .env</span></span>
<span class="line"><span># Proxy, if you need it</span></span>
<span class="line"><span># HTTP_PROXY=http://localhost:7890</span></span>
<span class="line"><span># HTTPS_PROXY=http://localhost:7890</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># Other environment variables, as needed. You can refer to the environment variables configuration for the client version, making sure not to have ACCESS_CODE.</span></span>
<span class="line"><span># OPENAI_API_KEY=sk-xxxx</span></span>
<span class="line"><span># OPENAI_PROXY_URL=https://api.openai.com/v1</span></span>
<span class="line"><span># OPENAI_MODEL_LIST=...</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># ===========================</span></span>
<span class="line"><span># ====== Preset config ====== </span></span>
<span class="line"><span># ===========================</span></span>
<span class="line"><span># if no special requirements, no need to change</span></span>
<span class="line"><span>LOBE_PORT=3210</span></span>
<span class="line"><span>CASDOOR_PORT=8800</span></span>
<span class="line"><span>MINIO_PORT=9000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Postgres related, which are the necessary environment variables for DB</span></span>
<span class="line"><span>LOBE_DB_NAME=lobechat</span></span>
<span class="line"><span>POSTGRES_PASSWORD=uWNZugjBqixf8dxC</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Casdoor secret</span></span>
<span class="line"><span>AUTH_CASDOOR_ID=a387a4892ee19b1a2249</span></span>
<span class="line"><span>AUTH_CASDOOR_SECRET=dbf205949d704de81b0b5b3603174e23fbecc354</span></span>
<span class="line"><span># MinIO S3 configuration</span></span>
<span class="line"><span>MINIO_ROOT_USER=YOUR_MINIO_USER</span></span>
<span class="line"><span>MINIO_ROOT_PASSWORD=YOUR_MINIO_PASSWORD</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Configure the bucket information of MinIO</span></span>
<span class="line"><span>MINIO_LOBE_BUCKET=lobe</span></span>
<span class="line"><span>S3_ACCESS_KEY_ID=soaucnP8Bip0TDdUjxng</span></span>
<span class="line"><span>S3_SECRET_ACCESS_KEY=ZPUzvY34umfcfxvWKSv0P00vczVMB6YmgJS5J9eO</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="minio-bucket-config-json" tabindex="-1"><a class="header-anchor" href="#minio-bucket-config-json"><span>minio-bucket.config.json</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>root@iZ2zei23h3vwykyqq9th6oZ:/home/lobe-chat/docker-compose# cat minio-bucket.config.json </span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  "Statement": [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      "Effect": "Allow",</span></span>
<span class="line"><span>      "Principal": {</span></span>
<span class="line"><span>        "AWS": ["*"]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      "Action": ["s3:GetBucketLocation"],</span></span>
<span class="line"><span>      "Resource": ["arn:aws:s3:::lobe"]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      "Effect": "Allow",</span></span>
<span class="line"><span>      "Principal": {</span></span>
<span class="line"><span>        "AWS": ["*"]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      "Action": ["s3:ListBucket"],</span></span>
<span class="line"><span>      "Resource": ["arn:aws:s3:::lobe"],</span></span>
<span class="line"><span>      "Condition": {</span></span>
<span class="line"><span>        "StringEquals": {</span></span>
<span class="line"><span>          "s3:prefix": ["files/*"]</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      "Effect": "Allow",</span></span>
<span class="line"><span>      "Principal": {</span></span>
<span class="line"><span>        "AWS": ["*"]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],</span></span>
<span class="line"><span>      "Resource": ["arn:aws:s3:::lobe/files/**"]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  "Version": "2012-10-17"</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


