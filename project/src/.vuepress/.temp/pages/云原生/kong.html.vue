<template><div><div class="hint-container tip">
<p class="hint-container-title">Kong和Nginx创建服务和路由</p>
</div>
<p>下面是你使用Kong和Nginx创建服务和路由的步骤总结：</p>
<h3 id="_1-nginx容器启动" tabindex="-1"><a class="header-anchor" href="#_1-nginx容器启动"><span>1. Nginx容器启动</span></a></h3>
<p>你通过以下命令启动了一个Nginx容器，该容器暴露8088端口并挂载了配置文件和项目目录：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -itd</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> nginx</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> --privileged</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> --restart=always</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> --network=kong-net</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 2GB</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 8088:8088</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -v</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /mnt/d/docker/nginx/project:/data/project</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -v</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /mnt/d/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> nginx:latest</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong>容器名</strong>: <code v-pre>nginx</code></li>
<li><strong>网络</strong>: <code v-pre>kong-net</code></li>
<li><strong>端口映射</strong>: 8088:8088</li>
<li><strong>挂载</strong>: 项目目录和nginx配置文件</li>
</ul>
<h3 id="_2-安装kong" tabindex="-1"><a class="header-anchor" href="#_2-安装kong"><span>2. 安装Kong</span></a></h3>
<p>按照Kong官方文档<a href="https://docs.konghq.com/gateway/latest/install/docker/" target="_blank" rel="noopener noreferrer">安装指南</a>安装了Kong，并确保Kong服务已正确启动。</p>
<h3 id="_3-创建服务-hello-service" tabindex="-1"><a class="header-anchor" href="#_3-创建服务-hello-service"><span>3. 创建服务 <code v-pre>hello_service</code></span></a></h3>
<p>通过以下命令在Kong中创建了一个名为 <code v-pre>hello_service</code> 的服务，指向Nginx服务中的 <code v-pre>index.html</code> 文件：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> POST</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> http://localhost:8001/services</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> --data</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> name=hello_service</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> --data</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> url='http://nginx:8088/index.html'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-查询服务-hello-service" tabindex="-1"><a class="header-anchor" href="#_4-查询服务-hello-service"><span>4. 查询服务 <code v-pre>hello_service</code></span></a></h3>
<p>通过以下命令查询了服务是否成功创建：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> http://localhost:8001/services/hello_service</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_5-删除服务-hello-service" tabindex="-1"><a class="header-anchor" href="#_5-删除服务-hello-service"><span>5. 删除服务 <code v-pre>hello_service</code></span></a></h3>
<p>如果需要删除服务，可以使用以下命令：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> DELETE</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> http://localhost:8001/services/hello_service</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_6-创建路由-hello-route" tabindex="-1"><a class="header-anchor" href="#_6-创建路由-hello-route"><span>6. 创建路由 <code v-pre>hello_route</code></span></a></h3>
<p>为 <code v-pre>hello_service</code> 创建了一个路由 <code v-pre>hello_route</code>，设置路径为 <code v-pre>/hello</code>：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> POST</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> http://localhost:8001/services/hello_service/routes</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> --data</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 'paths[]=/hello'</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> --data</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> name=hello_route</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-查询路由-hello-route" tabindex="-1"><a class="header-anchor" href="#_7-查询路由-hello-route"><span>7. 查询路由 <code v-pre>hello_route</code></span></a></h3>
<p>通过以下命令查询了路由是否成功创建：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> http://localhost:8001/services/hello_service/routes/hello_route</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_8-删除路由-hello-route" tabindex="-1"><a class="header-anchor" href="#_8-删除路由-hello-route"><span>8. 删除路由 <code v-pre>hello_route</code></span></a></h3>
<p>如果需要删除路由，可以使用以下命令：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> DELETE</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> http://localhost:8001/routes/hello_route</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_9-访问服务" tabindex="-1"><a class="header-anchor" href="#_9-访问服务"><span>9. 访问服务</span></a></h3>
<p>最终，你可以通过以下命令访问Kong代理的服务：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> GET</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> http://localhost:8000/hello</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这将通过Kong访问到Nginx提供的 <code v-pre>index.html</code> 页面。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<ul>
<li><strong>Nginx容器</strong>: 用于提供静态文件，通过Kong路由访问。</li>
<li><strong>Kong服务</strong>: 用于管理和代理请求，将Kong中的服务映射到Nginx容器中的资源。</li>
<li><strong>Kong路由</strong>: 用于定义访问路径，将特定的路径请求路由到相应的服务。</li>
<li><strong>验证和管理</strong>: 通过 <code v-pre>curl</code> 命令查询、删除服务和路由，确保配置正确。</li>
</ul>
<p>这个配置实现了通过Kong网关将请求转发到Nginx容器中的具体路径。</p>
<div class="hint-container tip">
<p class="hint-container-title">index.html</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>&#x3C;!DOCTYPE html></span></span>
<span class="line"><span>&#x3C;html lang="en"></span></span>
<span class="line"><span>&#x3C;head></span></span>
<span class="line"><span>    &#x3C;meta charset="UTF-8"></span></span>
<span class="line"><span>    &#x3C;meta name="viewport" content="width=device-width, initial-scale=1.0"></span></span>
<span class="line"><span>    &#x3C;title>Hello World&#x3C;/title></span></span>
<span class="line"><span>    &#x3C;style></span></span>
<span class="line"><span>        body {</span></span>
<span class="line"><span>            display: flex;</span></span>
<span class="line"><span>            justify-content: center;</span></span>
<span class="line"><span>            align-items: center;</span></span>
<span class="line"><span>            height: 100vh;</span></span>
<span class="line"><span>            margin: 0;</span></span>
<span class="line"><span>            background: linear-gradient(to right, #ff7e5f, #feb47b); /* 渐变背景 */</span></span>
<span class="line"><span>            color: white;</span></span>
<span class="line"><span>            font-family: Arial, sans-serif;</span></span>
<span class="line"><span>            font-size: 48px;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        h1 {</span></span>
<span class="line"><span>            margin: 0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        footer {</span></span>
<span class="line"><span>            text-align: center;</span></span>
<span class="line"><span>            position: absolute;</span></span>
<span class="line"><span>            bottom: 10px;</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>            font-size: 14px;</span></span>
<span class="line"><span>            color: #ffffff;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    &#x3C;/style></span></span>
<span class="line"><span>&#x3C;/head></span></span>
<span class="line"><span>&#x3C;body></span></span>
<span class="line"><span>    &#x3C;h1>Hello, World!&#x3C;/h1></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &#x3C;footer></span></span>
<span class="line"><span>        &#x3C;p>&#x3C;a href="https://beian.miit.gov.cn/" target="_blank" style="color: white;">8888888&#x3C;/a>&#x3C;/p></span></span>
<span class="line"><span>    &#x3C;/footer></span></span>
<span class="line"><span>&#x3C;/body></span></span>
<span class="line"><span>&#x3C;/html></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<div class="hint-container tip">
<p class="hint-container-title">nginx.conf</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>worker_processes  1;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>events {</span></span>
<span class="line"><span>    worker_connections  1024;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http {</span></span>
<span class="line"><span>    include       mime.types;</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    access_log off;</span></span>
<span class="line"><span>    error_log /dev/null crit;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sendfile        on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    keepalive_timeout  65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 8088;</span></span>
<span class="line"><span>        server_name localhost;</span></span>
<span class="line"><span>        ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span>        ssl_session_timeout  30m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ssl_prefer_server_ciphers  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 安全链接可选的加密协议</span></span>
<span class="line"><span>        ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 配置加密套件/加密算法，写法遵循 openssl 标准。</span></span>
<span class="line"><span>        ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            proxy_redirect off;</span></span>
<span class="line"><span>            proxy_http_version 1.1;</span></span>
<span class="line"><span>            proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span>            proxy_set_header Connection "upgrade";</span></span>
<span class="line"><span>            proxy_read_timeout 3600s;   </span></span>
<span class="line"><span>            proxy_set_header Host $host;</span></span>
<span class="line"><span>            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>            proxy_set_header X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span>            proxy_set_header X-Forwarded-Port $server_port;</span></span>
<span class="line"><span>            add_header backendIP $upstream_addr;</span></span>
<span class="line"><span>            add_header backendCode $upstream_status;            </span></span>
<span class="line"><span>            # 允许跨域的请求，可以自定义变量$http_origin，*表示所有</span></span>
<span class="line"><span>            add_header 'Access-Control-Allow-Origin' *;</span></span>
<span class="line"><span>            # 允许携带cookie请求</span></span>
<span class="line"><span>            add_header 'Access-Control-Allow-Credentials' 'true';</span></span>
<span class="line"><span>            # 允许跨域请求的方法：GET,POST,OPTIONS,PUT</span></span>
<span class="line"><span>            add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT';</span></span>
<span class="line"><span>            # 允许请求时携带的头部信息，*表示所有</span></span>
<span class="line"><span>            add_header 'Access-Control-Allow-Headers' *;</span></span>
<span class="line"><span>            # 允许发送按段获取资源的请求</span></span>
<span class="line"><span>            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';</span></span>
<span class="line"><span>            add_header X-Frame-Options SAMEORIGIN always;</span></span>
<span class="line"><span>            # 禁用缓存</span></span>
<span class="line"><span>            proxy_cache off;</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            # 添加 Cache-Control 响应头</span></span>
<span class="line"><span>            add_header Cache-Control "no-cache, no-store";            </span></span>
<span class="line"><span>            # 一定要有！！！否则Post请求无法进行跨域！</span></span>
<span class="line"><span>            # 在发送Post跨域请求前，会以Options方式发送预检请求，服务器接受时才会正式请求</span></span>
<span class="line"><span>            if ($request_method = 'OPTIONS') {</span></span>
<span class="line"><span>                add_header 'Access-Control-Max-Age' 1728000;</span></span>
<span class="line"><span>                add_header 'Content-Type' 'text/plain; charset=utf-8';</span></span>
<span class="line"><span>                add_header 'Content-Length' 0;</span></span>
<span class="line"><span>                # 对于Options方式的请求返回204，表示接受跨域请求</span></span>
<span class="line"><span>                return 204;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>               </span></span>
<span class="line"><span>            root /data/project;</span></span>
<span class="line"><span>            index index.html; # 默认文件名          </span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
</div></template>


