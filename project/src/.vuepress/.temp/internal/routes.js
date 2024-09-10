export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/index.html.js"), meta: {"t":"主页","i":"home"} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/etcd.html", { loader: () => import(/* webpackChunkName: "云原生_etcd.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/etcd.html.js"), meta: {"d":1720396800000,"l":"2024年7月8日","c":["etcd"],"g":["分布式锁"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">etcd获取分布式锁</p>\n<div class=\"language- line-numbers-mode\" data-highlighter=\"shiki\" data-ext=\"\" data-title=\"\" style=\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\"><pre class=\"shiki shiki-themes github-light one-dark-pro vp-code\"><code><span class=\"line\"><span>cli, err := clientv3.New(clientv3.Config{Endpoints: endpoints})</span></span>\n<span class=\"line\"><span>if err != nil {</span></span>\n<span class=\"line\"><span>   log.Fatal(err)</span></span>\n<span class=\"line\"><span>}</span></span>\n<span class=\"line\"><span>defer cli.Close()</span></span>\n<span class=\"line\"><span>// create two separate sessions for lock competition</span></span>\n<span class=\"line\"><span>s1, err := concurrency.NewSession(cli, concurrency.WithTTL(10))</span></span>\n<span class=\"line\"><span>if err != nil {</span></span>\n<span class=\"line\"><span>   log.Fatal(err)</span></span>\n<span class=\"line\"><span>}</span></span>\n<span class=\"line\"><span>defer s1.Close()</span></span>\n<span class=\"line\"><span>m1 := concurrency.NewMutex(s1, \"/my-lock/\")</span></span>\n<span class=\"line\"><span>// acquire lock for s1</span></span>\n<span class=\"line\"><span>if err := m1.Lock(context.TODO()); err != nil {</span></span>\n<span class=\"line\"><span>   log.Fatal(err)</span></span>\n<span class=\"line\"><span>}</span></span>\n<span class=\"line\"><span>fmt.Println(\"acquired lock for s1\")</span></span>\n<span class=\"line\"><span>if err := m1.Unlock(context.TODO()); err != nil {</span></span>\n<span class=\"line\"><span>   log.Fatal(err)</span></span>\n<span class=\"line\"><span>}</span></span>\n<span class=\"line\"><span>fmt.Println(\"released lock for s1\")</span></span></code></pre>\n<div class=\"line-numbers\" aria-hidden=\"true\" style=\"counter-reset:line-number 0\"><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div></div></div><p>1、首先通过 concurrency.NewSession 方法创建 Session，本质是创建了一个 TTL 为 10 的 Lease。</p>\n<p>2、其次得到 session 对象后，通过 concurrency.NewMutex 创建了一个 mutex 对象，包含 Lease、key prefix 等信息。</p>\n<p>3、然后通过 mutex 对象的 Lock 方法尝试获取锁。</p>\n<p>当 CreateRevision 为 0 时，它会创建一个 prefix 为 /my-lock 的 key（ /my-lock + LeaseID)，并获取到 /my-lock prefix 下面最早创建的一个 key（revision 最小），分布式锁最终是由写入此 key 的 client 获得，其他 client 则进入等待模式。</p>\n<p>4、最后使用结束，可通过 mutex 对象的 Unlock 方法释放锁。</p>\n</div>","r":{"minutes":2.06,"words":619},"t":"etcd","y":"a"} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/k8s.html", { loader: () => import(/* webpackChunkName: "云原生_k8s.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/k8s.html.js"), meta: {"d":1719964800000,"l":"2024年7月3日","c":["k8s"],"g":["笔记"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">k8s 笔记总结</p>\n</div>\n<h1>pv</h1>\n<h2>访问模式（Access Modes）</h2>\n<p>Kubernetes支持的访问模式如下。</p>\n<ul>\n<li>\n<p>ReadWriteOnce（RWO）：读写权限，并且只能被单个Node挂\n载。</p>\n</li>\n<li>\n<p>ReadOnlyMany（ROX）：只读权限，允许被多个Node挂载。</p>\n</li>\n<li>\n<p>ReadWriteMany（RWX）：读写权限，允许被多个Node挂载。</p>\n</li>\n</ul>","r":{"minutes":19.91,"words":5973},"t":"k8s知识点","y":"a"} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/kong.html", { loader: () => import(/* webpackChunkName: "云原生_kong.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/kong.html.js"), meta: {"d":1725321600000,"l":"2024年9月3日","c":["kong"],"g":["kong","nginx","html"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">Kong和Nginx创建服务和路由</p>\n</div>\n<p>下面是你使用Kong和Nginx创建服务和路由的步骤总结：</p>\n<h3>1. Nginx容器启动</h3>\n<p>你通过以下命令启动了一个Nginx容器，该容器暴露8088端口并挂载了配置文件和项目目录：</p>\n<div class=\"language-bash line-numbers-mode\" data-highlighter=\"shiki\" data-ext=\"bash\" data-title=\"bash\" style=\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\"><pre class=\"shiki shiki-themes github-light one-dark-pro vp-code\"><code><span class=\"line\"><span style=\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\">docker</span><span style=\"--shiki-light:#032F62;--shiki-dark:#98C379\"> run</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> -itd</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> --name</span><span style=\"--shiki-light:#032F62;--shiki-dark:#98C379\"> nginx</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> --privileged</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> --restart=always</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> --network=kong-net</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> -m</span><span style=\"--shiki-light:#032F62;--shiki-dark:#98C379\"> 2GB</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> -p</span><span style=\"--shiki-light:#032F62;--shiki-dark:#98C379\"> 8088:8088</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> -v</span><span style=\"--shiki-light:#032F62;--shiki-dark:#98C379\"> /mnt/d/docker/nginx/project:/data/project</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> -v</span><span style=\"--shiki-light:#032F62;--shiki-dark:#98C379\"> /mnt/d/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf</span><span style=\"--shiki-light:#032F62;--shiki-dark:#98C379\"> nginx:latest</span></span></code></pre>\n<div class=\"line-numbers\" aria-hidden=\"true\" style=\"counter-reset:line-number 0\"><div class=\"line-number\"></div></div></div>","r":{"minutes":3.4,"words":1019},"t":"Kong和Nginx部署服务","y":"a"} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/kubeflow.html", { loader: () => import(/* webpackChunkName: "云原生_kubeflow.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/kubeflow.html.js"), meta: {"d":1717632000000,"l":"2024年6月6日","c":["云原生"],"g":["Kubeflow"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">k8s 云原生之Kubeflow 简介</p>\n</div>\n<h1>官网</h1>\n<p><a href=\"https://www.kubeflow.org/docs/started/introduction/\" target=\"_blank\" rel=\"noopener noreferrer\">https://www.kubeflow.org/docs/started/introduction/</a></p>\n<h1>介绍</h1>\n<p>Kubeflow 简介\nKubeflow 项目致力于让机器学习 (ML) 工作流在 Kubernetes 上的部署变得简单、可移植且可扩展。我们的目标不是重新创建其他服务，而是提供一种简单的方法，将最佳的 ML 开源系统部署到各种基础设施中。只要您运行 Kubernetes，就可以运行 Kubeflow。\n下图展示了主要的 Kubeflow 组件，涵盖 Kubernetes 之上 ML 生命周期的每个步骤。\n<img src=\"/assets/images/kubeflow-intro-diagram.drawio.svg\" alt=\"\" loading=\"lazy\"></p>","r":{"minutes":18.44,"words":5533},"t":"Kubeflow 简介","y":"a"} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/operator.html", { loader: () => import(/* webpackChunkName: "云原生_operator.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/operator.html.js"), meta: {"d":1719532800000,"l":"2024年6月28日","c":["云原生"],"g":["operator"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">什么是 Kubernetes Operator？</p>\n</div>\n<p><strong>Kubernetes Operator</strong> 是一种软件扩展，使用 Kubernetes 原生的 API 和工具来自动管理复杂应用的生命周期。Operator 可以将人类操作员（例如系统管理员）的操作自动化，管理 Kubernetes 应用程序的配置、部署、升级、备份和故障处理等任务。</p>\n<h3>Operator 的基本概念</h3>\n<ul>\n<li>\n<p><strong>Custom Resource (自定义资源，CR)</strong>:\nKubernetes 的内置资源（如 Pod、Service）可能无法满足所有应用的需求。CR 提供了定义自定义对象的能力，使得用户可以在 Kubernetes 中引入新的资源类型。</p>\n</li>\n<li>\n<p><strong>Custom Resource Definition (自定义资源定义，CRD)</strong>:\nCRD 是 Kubernetes 用于定义 CR 结构的机制。通过 CRD，用户可以创建和管理新的自定义资源。</p>\n</li>\n<li>\n<p><strong>Controller (控制器)</strong>:\n控制器是 Kubernetes 中一个不断循环检查资源实际状态并使其符合预期状态的逻辑组件。Operator 就是一个高级的控制器，专门用于管理自定义资源。</p>\n</li>\n</ul>","r":{"minutes":3.57,"words":1072},"t":"k8s operator","y":"a"} }],
  ["/%E4%BB%8B%E7%BB%8D/%E4%BB%8B%E7%BB%8D.html", { loader: () => import(/* webpackChunkName: "介绍_介绍.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/介绍/介绍.html.js"), meta: {"d":1717632000000,"l":"2024年6月6日","c":["个人介绍"],"g":["个人"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">个人简介</p>\n<p>大家好，我是一名全栈开发工程师，拥有广泛的编程语言知识和丰富的技术经验。以下是我的专业技能和经验介绍：</p>\n</div>\n<p>大家好，我是一名充满热情的全栈开发工程师，具备广泛的编程语言知识和丰富的实际项目经验。我始终追求技术创新，致力于通过高效、优质的代码解决复杂的业务问题。在开发过程中，我不仅关注性能优化和可扩展性，还注重代码的可维护性和团队协作，能够快速适应不同的项目需求。</p>\n<h3>编程语言</h3>\n<ul>\n<li><strong>Java</strong>: 我在Java领域有着深厚的积累，尤其擅长使用Spring Boot框架开发企业级应用，能够设计并实现高并发、高性能的后端服务，保障系统的稳定性与可扩展性。</li>\n<li><strong>C++</strong>: 扎实的C++功底让我在系统级应用开发中游刃有余，能够编写高效、稳定的底层代码，解决复杂的系统问题。</li>\n<li><strong>C</strong>: 精通C语言，擅长底层系统开发，具备处理硬件交互及操作系统底层模块的经验。</li>\n<li><strong>Python</strong>: 熟练掌握Python，尤其在数据分析、机器学习领域有丰富经验，能够快速构建高效的分析和自动化工具。</li>\n<li><strong>Go</strong>: 熟练使用Go语言开发高并发应用，善于利用其高效的内存管理机制和原生的协程支持，构建稳定的后端服务。</li>\n</ul>","r":{"minutes":3.32,"words":996},"t":"个人介绍","y":"a"} }],
  ["/%E5%B7%A5%E5%85%B7/Clash%E8%BD%ACV2ray.html", { loader: () => import(/* webpackChunkName: "工具_Clash转V2ray.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/工具/Clash转V2ray.html.js"), meta: {"d":1724716800000,"l":"2024年8月27日","c":["代理"],"g":["clash","v2ray"],"r":{"minutes":0.06,"words":19},"t":"clash节点转为V2ray","y":"a"} }],
  ["/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B%E9%83%A8%E7%BD%B2.html", { loader: () => import(/* webpackChunkName: "技术科普_AI大模型部署.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/AI大模型部署.html.js"), meta: {"d":1724716800000,"l":"2024年8月27日","c":["AIGC"],"g":["FastGpt","chatgpt-on-web"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">FastGpt</p>\n</div>\n<h2>地址</h2>\n<p><a href=\"https://github.com/labring/FastGPT\" target=\"_blank\" rel=\"noopener noreferrer\">https://github.com/labring/FastGPT</a></p>\n<h2>文档</h2>\n<p><a href=\"https://doc.tryfastgpt.ai/docs/\" target=\"_blank\" rel=\"noopener noreferrer\">https://doc.tryfastgpt.ai/docs/</a></p>","r":{"minutes":6.3,"words":1889},"t":"FastGpt+chatgpt-on-web","y":"a"} }],
  ["/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/pytorch.html", { loader: () => import(/* webpackChunkName: "技术科普_pytorch.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/pytorch.html.js"), meta: {"d":1725408000000,"l":"2024年9月4日","c":["分布式"],"g":["PyTorch","c10d"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">PyTorch c10d</p>\n</div>\n<p>PyTorch 的 <code>c10d</code> 通信库是用于分布式计算的核心组件，特别是在需要跨多个设备（如多个GPU或多台机器）进行并行计算时。<code>c10d</code> 提供了分布式数据并行（Distributed Data Parallel, DDP）的底层实现，支持高效的数据同步和通信操作。</p>\n<h3>主要功能</h3>\n<ol>\n<li>\n<p><strong>通信后端</strong>：\n<code>c10d</code> 支持多种通信后端（Backend），如：</p>\n<ul>\n<li><code>NCCL</code>: 适用于GPU间通信，特别是在NVIDIA硬件上。</li>\n<li><code>GLOO</code>: 适用于CPU和GPU的跨平台通信。</li>\n<li><code>MPI</code>: 基于Message Passing Interface，适合大规模分布式系统。</li>\n</ul>\n</li>\n<li>\n<p><strong>进程组（Process Group）</strong>：\n<code>c10d</code> 中的进程组是通信的基本单元，可以将多个进程组织成一个组，以便它们之间进行通信。可以在不同的进程组之间进行广播、归约、全归约等操作。</p>\n</li>\n<li>\n<p><strong>广播和同步</strong>：\n<code>c10d</code> 提供了对数据进行广播和同步的接口，确保在多个进程或设备之间一致地传递数据。例如，在多GPU训练中，同步不同GPU上的模型参数。</p>\n</li>\n<li>\n<p><strong>梯度同步</strong>：\n在分布式数据并行训练中，<code>c10d</code> 自动同步各个设备计算出的梯度，从而确保在所有设备上更新后的模型参数保持一致。</p>\n</li>\n<li>\n<p><strong>AllReduce操作</strong>：\n<code>c10d</code> 支持AllReduce操作，这是在分布式训练中非常常用的操作，能够高效地合并不同设备上的梯度并更新模型参数。</p>\n</li>\n</ol>","r":{"minutes":12.15,"words":3645},"t":"PyTorch","y":"a"} }],
  ["/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E5%B7%A5%E5%85%B7.html", { loader: () => import(/* webpackChunkName: "技术科普_工具.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/工具.html.js"), meta: {"d":1721865600000,"l":"2024年7月25日","c":["工具"],"g":["skill"],"e":"<h2>ubuntu</h2>\n<h3>ping 安装</h3>\n<div class=\"language- line-numbers-mode\" data-highlighter=\"shiki\" data-ext=\"\" data-title=\"\" style=\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\"><pre class=\"shiki shiki-themes github-light one-dark-pro vp-code\"><code><span class=\"line\"><span>apt install iputils-ping</span></span></code></pre>\n<div class=\"line-numbers\" aria-hidden=\"true\" style=\"counter-reset:line-number 0\"><div class=\"line-number\"></div></div></div>","r":{"minutes":0.1,"words":31},"t":"常用工具总结","y":"a"} }],
  ["/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E5%BC%80%E6%BA%90%E6%8A%80%E6%9C%AF.html", { loader: () => import(/* webpackChunkName: "技术科普_开源技术.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/开源技术.html.js"), meta: {"d":1720656000000,"l":"2024年7月11日","c":["开源技术"],"g":["推理引擎"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">MInference：通过动态稀疏注意力加速长上下文 LLM 的预填充</p>\n<h2>地址</h2>\n<p><a href=\"https://github.com/microsoft/MInference\" target=\"_blank\" rel=\"noopener noreferrer\">https://github.com/microsoft/MInference</a></p>\n<h2>论文</h2>\n<p><a href=\"https://hqjiang.com/minference.html\" target=\"_blank\" rel=\"noopener noreferrer\">https://hqjiang.com/minference.html</a></p>\n<h2>介绍</h2>\n<p>论文介绍了一种名为 MInference 的动态稀疏注意力方法，用于解决长上下文 LLM 推理中的问题，并通过多种实验和测试展示了其效果。</p>\n<h2>重要亮点</h2>\n<ul>\n<li>\n<p>MInference 的提出背景：长上下文 LLM 推理面临预填充阶段注意力延迟长、KV 缓存存储和传输成本高等挑战，之前方法难以低成本在单个 A100 GPU 实现百万级标记提示的可接受延迟，MInference 应运而生。</p>\n</li>\n<li>\n<p>MInference 的工作原理：利用动态稀疏注意的静态空间聚合模式，离线确定每个头的最佳动态稀疏模式，在推理中动态近似动态稀疏索引，使用优化的 GPU 内核执行高效计算，显著减少预填充阶段延迟。</p>\n</li>\n<li>\n<p>MInference 的主要贡献：加速长上下文 LLM 的预填充阶段多达 10 倍；将动态稀疏注意力分为三种模式并设计搜索算法；引入在线近似方法和优化内核，提出最佳推理代码库；通过四个基准测试评估，在成本效率和系统延迟方面表现出色。</p>\n</li>\n<li>\n<p>长上下文基准测试中的实验结果：在问答、编码、基于检索等一系列任务中测试 MInference，有效保留或扩展实际上下文窗口处理能力，在不同模型和方法对比中性能良好。</p>\n</li>\n<li>\n<p>内核中的延迟细分和稀疏模式：展示三种注意力模式和 FlashAttention 的微基准测试结果，Vertical-Slash 虽慢但仍有显著加速，还展示了 Vertical-Slash 头部 kernel 中的稀疏索引。</p>\n</li>\n</ul>\n</div>","r":{"minutes":1.59,"words":478},"t":"开源技术","y":"a"} }],
  ["/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F.html", { loader: () => import(/* webpackChunkName: "技术科普_操作系统.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/操作系统.html.js"), meta: {"d":1723507200000,"l":"2024年8月13日","c":["操作系统"],"g":["操作系统"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">strace命令</p>\n</div>\n<p><code>strace</code> 是一个用于跟踪系统调用和信号的工具，它可以帮助你诊断程序的行为或调试程序。<code>-p</code> 选项用于附加到一个正在运行的进程上，并实时显示它的系统调用。</p>\n<h3>解释命令：</h3>\n<div class=\"language-bash line-numbers-mode\" data-highlighter=\"shiki\" data-ext=\"bash\" data-title=\"bash\" style=\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\"><pre class=\"shiki shiki-themes github-light one-dark-pro vp-code\"><code><span class=\"line\"><span style=\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\">strace</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> -p</span><span style=\"--shiki-light:#005CC5;--shiki-dark:#D19A66\"> 871</span></span></code></pre>\n<div class=\"line-numbers\" aria-hidden=\"true\" style=\"counter-reset:line-number 0\"><div class=\"line-number\"></div></div></div>","r":{"minutes":6.07,"words":1820},"t":"操作系统","y":"a"} }],
  ["/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C.html", { loader: () => import(/* webpackChunkName: "技术科普_计算机网络.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/计算机网络.html.js"), meta: {"d":1720396800000,"l":"2024年7月8日","c":["网络"],"g":["http"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">http2与http1区别?</p>\n</div>\n<p>HTTP/2 是对 HTTP/1.x 协议的重大升级，旨在提高网络性能和效率。以下是 HTTP/2 相对于 HTTP/1 的一些关键区别和改进：</p>\n<h3>1. 协议基础</h3>\n<ul>\n<li><strong>HTTP/1.x</strong>: 基于纯文本的协议，使用新行符分隔的文本消息进行通信。</li>\n<li><strong>HTTP/2</strong>: 基于二进制的协议，使用二进制帧传输数据，更高效地解析和传输数据。</li>\n</ul>","r":{"minutes":24.55,"words":7366},"t":"计算机网络","y":"a"} }],
  ["/%E6%9D%82%E8%B0%88/%E7%8B%AC%E7%AB%8B%E5%BC%80%E5%8F%91%E8%80%85.html", { loader: () => import(/* webpackChunkName: "杂谈_独立开发者.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/杂谈/独立开发者.html.js"), meta: {"d":1718064000000,"l":"2024年6月11日","c":["杂谈"],"g":["独立开发者"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">杂谈之独立开发者一点思考</p>\n</div>\n<h1>博文1</h1>\n<p><a href=\"https://indiehacker.one/\" target=\"_blank\" rel=\"noopener noreferrer\">https://indiehacker.one/</a></p>\n<p><strong>全文总结</strong>\n本文主要介绍了独立开发者的相关内容，包括什么是独立开发者、为什么要做独立开发者、有哪些牛逼的独立开发者、独立开发者面临的困境、独立开发的一些基本流程、想法、如何判断想法的是不是可以赚钱、三大核心问题、如何解决用户的问题、使用什么样的编程语言、采用什么样的产品形态、一个 MVP 产品最少需要做多少工作、一周开发一个新产品、三点金规铁律、发布、别人说你的产品是垃圾，伪需求怎么办、增长、心态、如何保持积极的心态、如何面对压力等。</p>","r":{"minutes":6.21,"words":1862},"t":"独立开发者一点思考","y":"a"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/404.html.js"), meta: {"t":""} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/", { loader: () => import(/* webpackChunkName: "云原生_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/index.html.js"), meta: {"t":"云原生"} }],
  ["/%E4%BB%8B%E7%BB%8D/", { loader: () => import(/* webpackChunkName: "介绍_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/介绍/index.html.js"), meta: {"t":"介绍"} }],
  ["/%E5%B7%A5%E5%85%B7/", { loader: () => import(/* webpackChunkName: "工具_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/工具/index.html.js"), meta: {"t":"工具"} }],
  ["/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/", { loader: () => import(/* webpackChunkName: "技术科普_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/index.html.js"), meta: {"t":"技术科普"} }],
  ["/%E6%9D%82%E8%B0%88/", { loader: () => import(/* webpackChunkName: "杂谈_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/杂谈/index.html.js"), meta: {"t":"杂谈"} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "category_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/index.html.js"), meta: {"t":"分类","I":false} }],
  ["/category/etcd/", { loader: () => import(/* webpackChunkName: "category_etcd_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/etcd/index.html.js"), meta: {"t":"etcd 分类","I":false} }],
  ["/category/k8s/", { loader: () => import(/* webpackChunkName: "category_k8s_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/k8s/index.html.js"), meta: {"t":"k8s 分类","I":false} }],
  ["/category/kong/", { loader: () => import(/* webpackChunkName: "category_kong_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/kong/index.html.js"), meta: {"t":"kong 分类","I":false} }],
  ["/category/%E4%BA%91%E5%8E%9F%E7%94%9F/", { loader: () => import(/* webpackChunkName: "category_云原生_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/云原生/index.html.js"), meta: {"t":"云原生 分类","I":false} }],
  ["/category/%E4%B8%AA%E4%BA%BA%E4%BB%8B%E7%BB%8D/", { loader: () => import(/* webpackChunkName: "category_个人介绍_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/个人介绍/index.html.js"), meta: {"t":"个人介绍 分类","I":false} }],
  ["/category/%E4%BB%A3%E7%90%86/", { loader: () => import(/* webpackChunkName: "category_代理_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/代理/index.html.js"), meta: {"t":"代理 分类","I":false} }],
  ["/category/aigc/", { loader: () => import(/* webpackChunkName: "category_aigc_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/aigc/index.html.js"), meta: {"t":"AIGC 分类","I":false} }],
  ["/category/%E5%88%86%E5%B8%83%E5%BC%8F/", { loader: () => import(/* webpackChunkName: "category_分布式_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/分布式/index.html.js"), meta: {"t":"分布式 分类","I":false} }],
  ["/category/%E5%B7%A5%E5%85%B7/", { loader: () => import(/* webpackChunkName: "category_工具_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/工具/index.html.js"), meta: {"t":"工具 分类","I":false} }],
  ["/category/%E5%BC%80%E6%BA%90%E6%8A%80%E6%9C%AF/", { loader: () => import(/* webpackChunkName: "category_开源技术_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/开源技术/index.html.js"), meta: {"t":"开源技术 分类","I":false} }],
  ["/category/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/", { loader: () => import(/* webpackChunkName: "category_操作系统_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/操作系统/index.html.js"), meta: {"t":"操作系统 分类","I":false} }],
  ["/category/%E7%BD%91%E7%BB%9C/", { loader: () => import(/* webpackChunkName: "category_网络_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/网络/index.html.js"), meta: {"t":"网络 分类","I":false} }],
  ["/category/%E6%9D%82%E8%B0%88/", { loader: () => import(/* webpackChunkName: "category_杂谈_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/杂谈/index.html.js"), meta: {"t":"杂谈 分类","I":false} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "tag_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/index.html.js"), meta: {"t":"标签","I":false} }],
  ["/tag/%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81/", { loader: () => import(/* webpackChunkName: "tag_分布式锁_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/分布式锁/index.html.js"), meta: {"t":"标签: 分布式锁","I":false} }],
  ["/tag/%E7%AC%94%E8%AE%B0/", { loader: () => import(/* webpackChunkName: "tag_笔记_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/笔记/index.html.js"), meta: {"t":"标签: 笔记","I":false} }],
  ["/tag/kong/", { loader: () => import(/* webpackChunkName: "tag_kong_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/kong/index.html.js"), meta: {"t":"标签: kong","I":false} }],
  ["/tag/nginx/", { loader: () => import(/* webpackChunkName: "tag_nginx_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/nginx/index.html.js"), meta: {"t":"标签: nginx","I":false} }],
  ["/tag/html/", { loader: () => import(/* webpackChunkName: "tag_html_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/html/index.html.js"), meta: {"t":"标签: html","I":false} }],
  ["/tag/kubeflow/", { loader: () => import(/* webpackChunkName: "tag_kubeflow_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/kubeflow/index.html.js"), meta: {"t":"标签: Kubeflow","I":false} }],
  ["/tag/operator/", { loader: () => import(/* webpackChunkName: "tag_operator_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/operator/index.html.js"), meta: {"t":"标签: operator","I":false} }],
  ["/tag/%E4%B8%AA%E4%BA%BA/", { loader: () => import(/* webpackChunkName: "tag_个人_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/个人/index.html.js"), meta: {"t":"标签: 个人","I":false} }],
  ["/tag/clash/", { loader: () => import(/* webpackChunkName: "tag_clash_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/clash/index.html.js"), meta: {"t":"标签: clash","I":false} }],
  ["/tag/v2ray/", { loader: () => import(/* webpackChunkName: "tag_v2ray_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/v2ray/index.html.js"), meta: {"t":"标签: v2ray","I":false} }],
  ["/tag/fastgpt/", { loader: () => import(/* webpackChunkName: "tag_fastgpt_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/fastgpt/index.html.js"), meta: {"t":"标签: FastGpt","I":false} }],
  ["/tag/chatgpt-on-web/", { loader: () => import(/* webpackChunkName: "tag_chatgpt-on-web_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/chatgpt-on-web/index.html.js"), meta: {"t":"标签: chatgpt-on-web","I":false} }],
  ["/tag/pytorch/", { loader: () => import(/* webpackChunkName: "tag_pytorch_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/pytorch/index.html.js"), meta: {"t":"标签: PyTorch","I":false} }],
  ["/tag/c10d/", { loader: () => import(/* webpackChunkName: "tag_c10d_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/c10d/index.html.js"), meta: {"t":"标签: c10d","I":false} }],
  ["/tag/skill/", { loader: () => import(/* webpackChunkName: "tag_skill_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/skill/index.html.js"), meta: {"t":"标签: skill","I":false} }],
  ["/tag/%E6%8E%A8%E7%90%86%E5%BC%95%E6%93%8E/", { loader: () => import(/* webpackChunkName: "tag_推理引擎_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/推理引擎/index.html.js"), meta: {"t":"标签: 推理引擎","I":false} }],
  ["/tag/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/", { loader: () => import(/* webpackChunkName: "tag_操作系统_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/操作系统/index.html.js"), meta: {"t":"标签: 操作系统","I":false} }],
  ["/tag/http/", { loader: () => import(/* webpackChunkName: "tag_http_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/http/index.html.js"), meta: {"t":"标签: http","I":false} }],
  ["/tag/%E7%8B%AC%E7%AB%8B%E5%BC%80%E5%8F%91%E8%80%85/", { loader: () => import(/* webpackChunkName: "tag_独立开发者_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/独立开发者/index.html.js"), meta: {"t":"标签: 独立开发者","I":false} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "article_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/article/index.html.js"), meta: {"t":"文章","I":false} }],
  ["/star/", { loader: () => import(/* webpackChunkName: "star_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/star/index.html.js"), meta: {"t":"星标","I":false} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "timeline_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"t":"时间轴","I":false} }],
]);
