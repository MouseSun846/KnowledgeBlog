---
date: 2024-09-03
title: Kong和Nginx部署服务
category:
  - kong
tag:
  - kong
  - nginx
  - html
---
::: Kong和Nginx创建服务和路由
:::


下面是你使用Kong和Nginx创建服务和路由的步骤总结：

### 1. Nginx容器启动
你通过以下命令启动了一个Nginx容器，该容器暴露8088端口并挂载了配置文件和项目目录：
```bash
docker run -itd --name nginx --privileged --restart=always --network=kong-net -m 2GB -p 8088:8088 -v /mnt/d/docker/nginx/project:/data/project -v /mnt/d/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf nginx:latest
```
- **容器名**: `nginx`
- **网络**: `kong-net`
- **端口映射**: 8088:8088
- **挂载**: 项目目录和nginx配置文件

### 2. 安装Kong
按照Kong官方文档[安装指南](https://docs.konghq.com/gateway/latest/install/docker/)安装了Kong，并确保Kong服务已正确启动。

### 3. 创建服务 `hello_service`
通过以下命令在Kong中创建了一个名为 `hello_service` 的服务，指向Nginx服务中的 `index.html` 文件：
```bash
curl -i -s -X POST http://localhost:8001/services \
 --data name=hello_service \
 --data url='http://nginx:8088/index.html'
```

### 4. 查询服务 `hello_service`
通过以下命令查询了服务是否成功创建：
```bash
curl -X GET http://localhost:8001/services/hello_service
```

### 5. 删除服务 `hello_service`
如果需要删除服务，可以使用以下命令：
```bash
curl -i -s -X DELETE http://localhost:8001/services/hello_service
```

### 6. 创建路由 `hello_route`
为 `hello_service` 创建了一个路由 `hello_route`，设置路径为 `/hello`：
```bash
curl -i -X POST http://localhost:8001/services/hello_service/routes \
 --data 'paths[]=/hello' \
 --data name=hello_route
```

### 7. 查询路由 `hello_route`
通过以下命令查询了路由是否成功创建：
```bash
curl -X GET http://localhost:8001/services/hello_service/routes/hello_route
```

### 8. 删除路由 `hello_route`
如果需要删除路由，可以使用以下命令：
```bash
curl -i -s -X DELETE http://localhost:8001/routes/hello_route
```

### 9. 访问服务
最终，你可以通过以下命令访问Kong代理的服务：
```bash
curl -X GET http://localhost:8000/hello
```
这将通过Kong访问到Nginx提供的 `index.html` 页面。

### 总结
- **Nginx容器**: 用于提供静态文件，通过Kong路由访问。
- **Kong服务**: 用于管理和代理请求，将Kong中的服务映射到Nginx容器中的资源。
- **Kong路由**: 用于定义访问路径，将特定的路径请求路由到相应的服务。
- **验证和管理**: 通过 `curl` 命令查询、删除服务和路由，确保配置正确。

这个配置实现了通过Kong网关将请求转发到Nginx容器中的具体路径。



::: tip index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(to right, #ff7e5f, #feb47b); /* 渐变背景 */
            color: white;
            font-family: Arial, sans-serif;
            font-size: 48px;
        }

        h1 {
            margin: 0;
        }

        footer {
            text-align: center;
            position: absolute;
            bottom: 10px;
            width: 100%;
            font-size: 14px;
            color: #ffffff;
        }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>

    <footer>
        <p><a href="https://beian.miit.gov.cn/" target="_blank" style="color: white;">8888888</a></p>
    </footer>
</body>
</html>

```
:::



::: tip nginx.conf

```
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    access_log off;
    error_log /dev/null crit;

    sendfile        on;

    keepalive_timeout  65;

    server {
        listen 8088;
        server_name localhost;
        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  30m;

        ssl_prefer_server_ciphers  on;


        # 安全链接可选的加密协议
        ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;

        # 配置加密套件/加密算法，写法遵循 openssl 标准。
        ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;



        location / {
            proxy_redirect off;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_read_timeout 3600s;   
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-Port $server_port;
            add_header backendIP $upstream_addr;
            add_header backendCode $upstream_status;            
            # 允许跨域的请求，可以自定义变量$http_origin，*表示所有
            add_header 'Access-Control-Allow-Origin' *;
            # 允许携带cookie请求
            add_header 'Access-Control-Allow-Credentials' 'true';
            # 允许跨域请求的方法：GET,POST,OPTIONS,PUT
            add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT';
            # 允许请求时携带的头部信息，*表示所有
            add_header 'Access-Control-Allow-Headers' *;
            # 允许发送按段获取资源的请求
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
            add_header X-Frame-Options SAMEORIGIN always;
            # 禁用缓存
            proxy_cache off;
            
            # 添加 Cache-Control 响应头
            add_header Cache-Control "no-cache, no-store";            
            # 一定要有！！！否则Post请求无法进行跨域！
            # 在发送Post跨域请求前，会以Options方式发送预检请求，服务器接受时才会正式请求
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain; charset=utf-8';
                add_header 'Content-Length' 0;
                # 对于Options方式的请求返回204，表示接受跨域请求
                return 204;
            }
               
            root /data/project;
            index index.html; # 默认文件名          
        }

    }
}

```
:::