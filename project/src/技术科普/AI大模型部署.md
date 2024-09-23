---
date: 2024-08-27
title: FastGpt+chatgpt-on-web
category:
  - AIGC
tag:
  - FastGpt
  - chatgpt-on-web
---
::: tip FastGpt
:::

## 地址
[https://github.com/labring/FastGPT](https://github.com/labring/FastGPT)
## 文档
[https://doc.tryfastgpt.ai/docs/](https://doc.tryfastgpt.ai/docs/)

## 配置
```
// 已使用 json5 进行解析，会自动去掉注释，无需手动去除
{
  "feConfigs": {
    "lafEnv": "https://laf.dev" // laf环境。 https://laf.run （杭州阿里云） ,或者私有化的laf环境。如果使用 Laf openapi 功能，需要最新版的 laf 。
  },
  "systemEnv": {
    "vectorMaxProcess": 15,
    "qaMaxProcess": 15,
    "pgHNSWEfSearch": 100 // 向量搜索参数。越大，搜索越精确，但是速度越慢。设置为100，有99%+精度。
  },
  "llmModels": [
    {
      "model": "gpt-3.5-turbo", // 模型名(对应OneAPI中渠道的模型名)
      "name": "gpt-3.5-turbo", // 模型别名
      "avatar": "/imgs/model/openai.svg", // 模型的logo
      "maxContext": 125000, // 最大上下文
      "maxResponse": 16000, // 最大回复
      "quoteMaxToken": 120000, // 最大引用内容
      "maxTemperature": 1.2, // 最大温度
      "charsPointsPrice": 0, // n积分/1k token（商业版）
      "censor": false, // 是否开启敏感校验（商业版）
      "vision": true, // 是否支持图片输入
      "datasetProcess": true, // 是否设置为知识库处理模型（QA），务必保证至少有一个为true，否则知识库会报错
      "usedInClassify": true, // 是否用于问题分类（务必保证至少有一个为true）
      "usedInExtractFields": true, // 是否用于内容提取（务必保证至少有一个为true）
      "usedInToolCall": true, // 是否用于工具调用（务必保证至少有一个为true）
      "usedInQueryExtension": true, // 是否用于问题优化（务必保证至少有一个为true）
      "toolChoice": true, // 是否支持工具选择（分类，内容提取，工具调用会用到。目前只有gpt支持）
      "functionCall": false, // 是否支持函数调用（分类，内容提取，工具调用会用到。会优先使用 toolChoice，如果为false，则使用 functionCall，如果仍为 false，则使用提示词模式）
      "customCQPrompt": "", // 自定义文本分类提示词（不支持工具和函数调用的模型
      "customExtractPrompt": "", // 自定义内容提取提示词
      "defaultSystemChatPrompt": "", // 对话默认携带的系统提示词
      "defaultConfig": {} // 请求API时，挟带一些默认配置（比如 GLM4 的 top_p）
    },
    {
      "model": "SparkDesk-v3.5",
      "name": "星火",
      "avatar": "/imgs/model/openai.svg",
      "maxContext": 125000,
      "maxResponse": 4000,
      "quoteMaxToken": 120000,
      "maxTemperature": 1.2,
      "charsPointsPrice": 0,
      "censor": false,
      "vision": true,
      "datasetProcess": false,
      "usedInClassify": true,
      "usedInExtractFields": true,
      "usedInToolCall": true,
      "usedInQueryExtension": true,
      "toolChoice": true,
      "functionCall": false,
      "customCQPrompt": "",
      "customExtractPrompt": "",
      "defaultSystemChatPrompt": "",
      "defaultConfig": {}
    }
  ],
  "vectorModels": [
    {
      "model": "text-embedding-ada-002", // 模型名（与OneAPI对应）
      "name": "Embedding-2", // 模型展示名
      "avatar": "/imgs/model/openai.svg", // logo
      "charsPointsPrice": 0, // n积分/1k token
      "defaultToken": 700, // 默认文本分割时候的 token
      "maxToken": 3000, // 最大 token
      "weight": 100, // 优先训练权重
      "defaultConfig": {}, // 自定义额外参数。例如，如果希望使用 embedding3-large 的话，可以传入 dimensions:1024，来返回1024维度的向量。（目前必须小于1536维度）
      "dbConfig": {}, // 存储时的额外参数（非对称向量模型时候需要用到）
      "queryConfig": {} // 参训时的额外参数
    },
    {
      "model": "text-embedding-3-large",
      "name": "text-embedding-3-large",
      "avatar": "/imgs/model/openai.svg",
      "charsPointsPrice": 0,
      "defaultToken": 512,
      "maxToken": 3000,
      "weight": 100,
      "defaultConfig": {
        "dimensions": 1024
      }
    },
    {
      "model": "text-embedding-3-small",
      "name": "text-embedding-3-small",
      "avatar": "/imgs/model/openai.svg",
      "charsPointsPrice": 0,
      "defaultToken": 512,
      "maxToken": 3000,
      "weight": 100
    }
  ],
  "reRankModels": [],
  "audioSpeechModels": [
    {
      "model": "tts-1",
      "name": "OpenAI TTS1",
      "charsPointsPrice": 0,
      "voices": [
        { "label": "Alloy", "value": "alloy", "bufferId": "openai-Alloy" },
        { "label": "Echo", "value": "echo", "bufferId": "openai-Echo" },
        { "label": "Fable", "value": "fable", "bufferId": "openai-Fable" },
        { "label": "Onyx", "value": "onyx", "bufferId": "openai-Onyx" },
        { "label": "Nova", "value": "nova", "bufferId": "openai-Nova" },
        { "label": "Shimmer", "value": "shimmer", "bufferId": "openai-Shimmer" }
      ]
    }
  ],
  "whisperModel": {
    "model": "whisper-1",
    "name": "Whisper1",
    "charsPointsPrice": 0
  }
}

```

## docker-compose
```
# 数据库的默认账号和密码仅首次运行时设置有效
# 如果修改了账号密码，记得改数据库和项目连接参数，别只改一处~
# 该配置文件只是给快速启动，测试使用。正式使用，记得务必修改账号密码，以及调整合适的知识库参数，共享内存等。
# 如何无法访问 dockerhub 和 git，可以用阿里云（阿里云没有arm包）

version: '3.3'
services:
  minio:
    container_name: minio
    image: minio/minio:RELEASE.2023-03-20T20-16-18Z
    environment:
      MINIO_ACCESS_KEY: minioadmin
      MINIO_SECRET_KEY: minioadmin
    ports:
      - '9001:9001'
      - '9000:9000'
    networks:
      - fastgpt
    volumes:
      - ./minio:/minio_data
    command: minio server /minio_data --console-address ":9001"
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:9000/minio/health/live']
      interval: 30s
      timeout: 20s
      retries: 3
  # milvus
  milvusEtcd:
    container_name: milvusEtcd
    image: quay.io/coreos/etcd:v3.5.5
    environment:
      - ETCD_AUTO_COMPACTION_MODE=revision
      - ETCD_AUTO_COMPACTION_RETENTION=1000
      - ETCD_QUOTA_BACKEND_BYTES=4294967296
      - ETCD_SNAPSHOT_COUNT=50000
    networks:
      - fastgpt
    volumes:
      - ./milvus/etcd:/etcd
    command: etcd -advertise-client-urls=http://127.0.0.1:2379 -listen-client-urls http://0.0.0.0:2379 --data-dir /etcd
    healthcheck:
      test: ['CMD', 'etcdctl', 'endpoint', 'health']
      interval: 30s
      timeout: 20s
      retries: 3
  milvusStandalone:
    container_name: milvusStandalone
    image: milvusdb/milvus:v2.4.3
    command: ['milvus', 'run', 'standalone']
    security_opt:
      - seccomp:unconfined
    environment:
      ETCD_ENDPOINTS: milvusEtcd:2379
      MINIO_ADDRESS: minio:9000
    networks:
      - fastgpt
    volumes:
      - ./milvus/data:/var/lib/milvus
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:9091/healthz']
      interval: 30s
      start_period: 90s
      timeout: 20s
      retries: 3
    depends_on:
      - 'milvusEtcd'
      - 'minio'

  mongo:
    image: registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18 # 阿里云
    container_name: mongo
    restart: always
    ports:
      - 27017:27017
    networks:
      - fastgpt
    command: mongod --keyFile /data/mongodb.key --replSet rs0
    environment:
      - MONGO_INITDB_ROOT_USERNAME=myusername
      - MONGO_INITDB_ROOT_PASSWORD=mypassword
    volumes:
      - mongo_data:/data/db
    entrypoint:
      - bash
      - -c
      - |
        openssl rand -base64 128 > /data/mongodb.key
        chmod 400 /data/mongodb.key
        chown 999:999 /data/mongodb.key
        echo 'const isInited = rs.status().ok === 1
        if(!isInited){
          rs.initiate({
              _id: "rs0",
              members: [
                  { _id: 0, host: "mongo:27017" }
              ]
          })
        }' > /data/initReplicaSet.js
        # 启动MongoDB服务
        exec docker-entrypoint.sh "$$@" &

        # 等待MongoDB服务启动
        until mongo -u myusername -p mypassword --authenticationDatabase admin --eval "print('waited for connection')" > /dev/null 2>&1; do
          echo "Waiting for MongoDB to start..."
          sleep 2
        done

        # 执行初始化副本集的脚本
        mongo -u myusername -p mypassword --authenticationDatabase admin /data/initReplicaSet.js

        # 等待docker-entrypoint.sh脚本执行的MongoDB服务进程
        wait $$!

  # fastgpt
  sandbox:
    container_name: sandbox
    image: ghcr.io/labring/fastgpt-sandbox:latest # git
    # image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sandbox:latest # 阿里云
    networks:
      - fastgpt
    restart: always
  fastgpt:
    container_name: fastgpt
    image: ghcr.io/labring/fastgpt:v4.8.9 # git
    # image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt:v4.8.9 # 阿里云
    ports:
      - 3000:3000
    networks:
      - fastgpt
    depends_on:
      - mongo
      - milvusStandalone
      - sandbox
    restart: always
    environment:
      # root 密码，用户名为: root。如果需要修改 root 密码，直接修改这个环境变量，并重启即可。
      - DEFAULT_ROOT_PSW=1234
      # AI模型的API地址哦。务必加 /v1。这里默认填写了OneApi的访问地址。
      - OPENAI_BASE_URL=http://oneapi:3000/v1
      # AI模型的API Key。（这里默认填写了OneAPI的快速默认key，测试通后，务必及时修改）
      - CHAT_API_KEY=sk-Aq0UoGRk8uJSAZfy3e986c5993Bb4aF3A9C3Eb20708144F4
      # 数据库最大连接数
      - DB_MAX_LINK=30
      # 登录凭证密钥
      - TOKEN_KEY=any
      # root的密钥，常用于升级时候的初始化请求
      - ROOT_KEY=root_key
      # 文件阅读加密
      - FILE_TOKEN_KEY=filetoken
      # MongoDB 连接参数. 用户名myusername,密码mypassword。
      - MONGODB_URI=mongodb://myusername:mypassword@mongo:27017/fastgpt?authSource=admin
      # zilliz 连接参数
      - MILVUS_ADDRESS=http://milvusStandalone:19530
      - MILVUS_TOKEN=none
      # sandbox 地址
      - SANDBOX_URL=http://sandbox:3000
      # 日志等级: debug, info, warn, error
      - LOG_LEVEL=info
      - STORE_LOG_LEVEL=warn
    volumes:
      - ./config.json:/app/data/config.json

  # oneapi
  mysql:
    image: mysql:5.7.16 # 阿里云
    # image: mysql:8.0.36
    container_name: mysql
    restart: always
    ports:
      - 3307:3306
    networks:
      - fastgpt
    command: --default-authentication-plugin=mysql_native_password
    environment:
      # 默认root密码，仅首次运行有效
      MYSQL_ROOT_PASSWORD: oneapimmysql
      MYSQL_DATABASE: oneapi
    volumes:
      - ./mysql:/var/lib/mysql

  oneapi:
    container_name: oneapi
    image: ghcr.io/songquanpeng/one-api:v0.6.7
    # image: registry.cn-hangzhou.aliyuncs.com/fastgpt/one-api:v0.6.6 # 阿里云
    ports:
      - 3001:3000
    depends_on:
      - mysql
    networks:
      - fastgpt
    restart: always
    environment:
      # mysql 连接参数
      - SQL_DSN=root:oneapimmysql@tcp(mysql:3306)/oneapi
      # 登录凭证加密密钥
      - SESSION_SECRET=oneapikey
      # 内存缓存
      - MEMORY_CACHE_ENABLED=true
      # 启动聚合更新，减少数据交互频率
      - BATCH_UPDATE_ENABLED=true
      # 聚合更新时长
      - BATCH_UPDATE_INTERVAL=10
      # 初始化的 root 密钥（建议部署完后更改，否则容易泄露）
      - INITIAL_ROOT_TOKEN=fastgpt
      - http_proxy=http://192.168.6.10:7897
      - https_proxy=http://192.168.6.10:7897
    volumes:
      - ./oneapi:/data
networks:
  fastgpt:

volumes:
  mongo_data:
```
上述fastgpt 配置的CHAT_API_KEY、OPENAI_BASE_URL是oneapi中的令牌地址
![image.png](/assets/images/oneapi.png)
## 访问
### fastgpt
[http://localhost:3000/app/list](http://localhost:3000/app/list)
账户密码：root/1234
## oneapi
[http://localhost:3001/](http://localhost:3001/)
账户密码： root/12345678

# chatgpt-on-web
## 地址
[https://github.com/zhayujie/chatgpt-on-wechat](https://github.com/zhayujie/chatgpt-on-wechat)

## 文档
[https://docs.link-ai.tech/cow/quick-start](https://docs.link-ai.tech/cow/quick-start)

## docker-compose
```
version: '2.0'
services:
  chatgpt-on-wechat:
    image: registry.cn-hangzhou.aliyuncs.com/software_hub/chatgpt-on-wechat:zhayujie-v1
    container_name: chatgpt-on-wechat
    security_opt:
      - seccomp:unconfined
    environment:
      OPEN_AI_API_KEY: 'fastgpt-yvdq8kJ9kaFfDN9AgZHLDcu1vOVOGROVVabX1DD4mBGuDazLqIPfqWmIjS'
      OPEN_AI_API_BASE: 'http://fastgpt:3000/api/v1'
      MODEL: 'gpt-3.5-turbo'
      CHANNEL_TYPE: 'wx'
      PROXY: ''
      HOT_RELOAD: 'False'
      SINGLE_CHAT_PREFIX: '["bot", "@bot"]'
      SINGLE_CHAT_REPLY_PREFIX: '"[bot] "'
      GROUP_CHAT_PREFIX: '["@bot"]'
      GROUP_NAME_WHITE_LIST: '["ChatGPT测试群", "ChatGPT测试群2", "AI助手百科全书", "知识助手", "我的家人"]'
      IMAGE_CREATE_PREFIX: '["画", "看", "找"]'
      CONVERSATION_MAX_TOKENS: 1000
      SPEECH_RECOGNITION: 'False'
      CHARACTER_DESC: '你是ChatGPT, 一个由OpenAI训练的大型语言模型, 你旨在回答并解决人们的任何问题，并且可以使用多种语言与人交流。'
      SUBSCRIBE_MSG: '感谢您的关注！\n这里是ChatGPT，可以自由对话。\n支持语音对话。\n支持图片输入。\n支持图片输出，画字开头的消息将按要求创作图片。\n支持tool、角色扮演和文字冒险等丰富的插件。\n输入{trigger_prefix}#help 查看详细指令。'
      EXPIRES_IN_SECONDS: 3600
      USE_GLOBAL_PLUGIN_CONFIG: 'True'
      USE_LINKAI: 'False'
      LINKAI_API_KEY: ''
    networks:
      - fastgpt

networks:
  fastgpt:
    name: fatgpt_fastgpt
    external: true
```
使用fastgpt apikey
![image.png](/assets/images/fastgptapi.png)



## cosyvoice 部署

[git地址](https://github.com/FunAudioLLM/CosyVoice)

docker地址: registry.cn-hangzhou.aliyuncs.com/software_hub/cosyvoice:v1

### 模型下载

```
git clone https://www.modelscope.cn/iic/CosyVoice-300M.git pretrained_models/CosyVoice-300M
```

### 镜像启动
```
docker run -itd --name cosyvoice --gpus all -v /home/lsy/cosyvoice/model:/model -p 50000:50000 -v cosyvoice:v1

```

### 服务启动
```
 python3 webui.py --port 50000 --model_dir /model/pretrained_models/CosyVoice-300M
```