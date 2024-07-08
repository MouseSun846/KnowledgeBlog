export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/index.html.js"), meta: {"t":"主页","i":"home"} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/k8s.html", { loader: () => import(/* webpackChunkName: "云原生_k8s.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/k8s.html.js"), meta: {"d":1719964800000,"l":"2024年7月3日","c":["k8s"],"g":["笔记"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">k8s 笔记总结</p>\n</div>\n<h1>pv</h1>\n<h2>访问模式（Access Modes）</h2>\n<p>Kubernetes支持的访问模式如下。</p>\n<ul>\n<li>\n<p>ReadWriteOnce（RWO）：读写权限，并且只能被单个Node挂\n载。</p>\n</li>\n<li>\n<p>ReadOnlyMany（ROX）：只读权限，允许被多个Node挂载。</p>\n</li>\n<li>\n<p>ReadWriteMany（RWX）：读写权限，允许被多个Node挂载。</p>\n</li>\n</ul>","r":{"minutes":6.35,"words":1906},"t":"k8s知识点","y":"a"} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/kubeflow.html", { loader: () => import(/* webpackChunkName: "云原生_kubeflow.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/kubeflow.html.js"), meta: {"d":1717632000000,"l":"2024年6月6日","c":["云原生"],"g":["Kubeflow"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">k8s 云原生之Kubeflow 简介</p>\n</div>\n<h1>官网</h1>\n<p><a href=\"https://www.kubeflow.org/docs/started/introduction/\" target=\"_blank\" rel=\"noopener noreferrer\">https://www.kubeflow.org/docs/started/introduction/</a></p>\n<h1>介绍</h1>\n<p>Kubeflow 简介\nKubeflow 项目致力于让机器学习 (ML) 工作流在 Kubernetes 上的部署变得简单、可移植且可扩展。我们的目标不是重新创建其他服务，而是提供一种简单的方法，将最佳的 ML 开源系统部署到各种基础设施中。只要您运行 Kubernetes，就可以运行 Kubeflow。\n下图展示了主要的 Kubeflow 组件，涵盖 Kubernetes 之上 ML 生命周期的每个步骤。\n<img src=\"/assets/images/kubeflow-intro-diagram.drawio.svg\" alt=\"\" loading=\"lazy\"></p>","r":{"minutes":18.44,"words":5533},"t":"Kubeflow 简介","y":"a"} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/operator.html", { loader: () => import(/* webpackChunkName: "云原生_operator.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/operator.html.js"), meta: {"d":1719532800000,"l":"2024年6月28日","c":["云原生"],"g":["operator"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">什么是 Kubernetes Operator？</p>\n</div>\n<p><strong>Kubernetes Operator</strong> 是一种软件扩展，使用 Kubernetes 原生的 API 和工具来自动管理复杂应用的生命周期。Operator 可以将人类操作员（例如系统管理员）的操作自动化，管理 Kubernetes 应用程序的配置、部署、升级、备份和故障处理等任务。</p>\n<h3>Operator 的基本概念</h3>\n<ul>\n<li>\n<p><strong>Custom Resource (自定义资源，CR)</strong>:\nKubernetes 的内置资源（如 Pod、Service）可能无法满足所有应用的需求。CR 提供了定义自定义对象的能力，使得用户可以在 Kubernetes 中引入新的资源类型。</p>\n</li>\n<li>\n<p><strong>Custom Resource Definition (自定义资源定义，CRD)</strong>:\nCRD 是 Kubernetes 用于定义 CR 结构的机制。通过 CRD，用户可以创建和管理新的自定义资源。</p>\n</li>\n<li>\n<p><strong>Controller (控制器)</strong>:\n控制器是 Kubernetes 中一个不断循环检查资源实际状态并使其符合预期状态的逻辑组件。Operator 就是一个高级的控制器，专门用于管理自定义资源。</p>\n</li>\n</ul>","r":{"minutes":3.57,"words":1072},"t":"k8s operator","y":"a"} }],
  ["/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C.html", { loader: () => import(/* webpackChunkName: "技术科普_计算机网络.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/计算机网络.html.js"), meta: {"d":1720396800000,"l":"2024年7月8日","c":["网络"],"g":["http"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">http2与http1区别?</p>\n</div>\n<p>HTTP/2 是对 HTTP/1.x 协议的重大升级，旨在提高网络性能和效率。以下是 HTTP/2 相对于 HTTP/1 的一些关键区别和改进：</p>\n<h3>1. 协议基础</h3>\n<ul>\n<li><strong>HTTP/1.x</strong>: 基于纯文本的协议，使用新行符分隔的文本消息进行通信。</li>\n<li><strong>HTTP/2</strong>: 基于二进制的协议，使用二进制帧传输数据，更高效地解析和传输数据。</li>\n</ul>","r":{"minutes":3.56,"words":1067},"t":"计算机网络","y":"a"} }],
  ["/%E4%BB%8B%E7%BB%8D/%E4%BB%8B%E7%BB%8D.html", { loader: () => import(/* webpackChunkName: "介绍_介绍.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/介绍/介绍.html.js"), meta: {"d":1717632000000,"l":"2024年6月6日","c":["个人介绍"],"g":["个人"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">个人简介</p>\n<p>大家好，我是一名全栈开发工程师，拥有广泛的编程语言知识和丰富的技术经验。以下是我的专业技能和经验介绍：</p>\n</div>\n<h4>编程语言</h4>\n<ul>\n<li><strong>Java</strong>: 熟练使用Java进行企业级应用开发，精通Spring Boot框架，擅长构建高性能和可扩展的后端服务。</li>\n<li><strong>C++</strong>: 具备扎实的C++基础，能够开发高效的系统级应用程序。</li>\n<li><strong>C</strong>: 精通C语言，擅长底层编程和系统开发。</li>\n<li><strong>Python</strong>: 精通Python，尤其在数据分析、机器学习以及自动化脚本编写方面有丰富经验。</li>\n<li><strong>Go</strong>: 熟悉Go语言，能够利用其高并发和高性能特点开发后端服务。</li>\n</ul>","r":{"minutes":1.64,"words":492},"t":"个人介绍","y":"a"} }],
  ["/%E6%9D%82%E8%B0%88/%E7%8B%AC%E7%AB%8B%E5%BC%80%E5%8F%91%E8%80%85.html", { loader: () => import(/* webpackChunkName: "杂谈_独立开发者.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/杂谈/独立开发者.html.js"), meta: {"d":1718064000000,"l":"2024年6月11日","c":["杂谈"],"g":["独立开发者"],"e":"<div class=\"hint-container tip\">\n<p class=\"hint-container-title\">杂谈之独立开发者一点思考</p>\n</div>\n<h1>博文1</h1>\n<p><a href=\"https://indiehacker.one/\" target=\"_blank\" rel=\"noopener noreferrer\">https://indiehacker.one/</a></p>\n<p><strong>全文总结</strong>\n本文主要介绍了独立开发者的相关内容，包括什么是独立开发者、为什么要做独立开发者、有哪些牛逼的独立开发者、独立开发者面临的困境、独立开发的一些基本流程、想法、如何判断想法的是不是可以赚钱、三大核心问题、如何解决用户的问题、使用什么样的编程语言、采用什么样的产品形态、一个 MVP 产品最少需要做多少工作、一周开发一个新产品、三点金规铁律、发布、别人说你的产品是垃圾，伪需求怎么办、增长、心态、如何保持积极的心态、如何面对压力等。</p>","r":{"minutes":6.21,"words":1862},"t":"独立开发者一点思考","y":"a"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/404.html.js"), meta: {"t":""} }],
  ["/%E4%BA%91%E5%8E%9F%E7%94%9F/", { loader: () => import(/* webpackChunkName: "云原生_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/index.html.js"), meta: {"t":"云原生"} }],
  ["/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/", { loader: () => import(/* webpackChunkName: "技术科普_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/index.html.js"), meta: {"t":"技术科普"} }],
  ["/%E4%BB%8B%E7%BB%8D/", { loader: () => import(/* webpackChunkName: "介绍_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/介绍/index.html.js"), meta: {"t":"介绍"} }],
  ["/%E6%9D%82%E8%B0%88/", { loader: () => import(/* webpackChunkName: "杂谈_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/杂谈/index.html.js"), meta: {"t":"杂谈"} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "category_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/index.html.js"), meta: {"t":"分类","I":false} }],
  ["/category/k8s/", { loader: () => import(/* webpackChunkName: "category_k8s_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/k8s/index.html.js"), meta: {"t":"k8s 分类","I":false} }],
  ["/category/%E4%BA%91%E5%8E%9F%E7%94%9F/", { loader: () => import(/* webpackChunkName: "category_云原生_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/云原生/index.html.js"), meta: {"t":"云原生 分类","I":false} }],
  ["/category/%E7%BD%91%E7%BB%9C/", { loader: () => import(/* webpackChunkName: "category_网络_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/网络/index.html.js"), meta: {"t":"网络 分类","I":false} }],
  ["/category/%E4%B8%AA%E4%BA%BA%E4%BB%8B%E7%BB%8D/", { loader: () => import(/* webpackChunkName: "category_个人介绍_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/个人介绍/index.html.js"), meta: {"t":"个人介绍 分类","I":false} }],
  ["/category/%E6%9D%82%E8%B0%88/", { loader: () => import(/* webpackChunkName: "category_杂谈_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/杂谈/index.html.js"), meta: {"t":"杂谈 分类","I":false} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "tag_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/index.html.js"), meta: {"t":"标签","I":false} }],
  ["/tag/%E7%AC%94%E8%AE%B0/", { loader: () => import(/* webpackChunkName: "tag_笔记_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/笔记/index.html.js"), meta: {"t":"标签: 笔记","I":false} }],
  ["/tag/kubeflow/", { loader: () => import(/* webpackChunkName: "tag_kubeflow_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/kubeflow/index.html.js"), meta: {"t":"标签: Kubeflow","I":false} }],
  ["/tag/operator/", { loader: () => import(/* webpackChunkName: "tag_operator_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/operator/index.html.js"), meta: {"t":"标签: operator","I":false} }],
  ["/tag/http/", { loader: () => import(/* webpackChunkName: "tag_http_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/http/index.html.js"), meta: {"t":"标签: http","I":false} }],
  ["/tag/%E4%B8%AA%E4%BA%BA/", { loader: () => import(/* webpackChunkName: "tag_个人_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/个人/index.html.js"), meta: {"t":"标签: 个人","I":false} }],
  ["/tag/%E7%8B%AC%E7%AB%8B%E5%BC%80%E5%8F%91%E8%80%85/", { loader: () => import(/* webpackChunkName: "tag_独立开发者_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/独立开发者/index.html.js"), meta: {"t":"标签: 独立开发者","I":false} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "article_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/article/index.html.js"), meta: {"t":"文章","I":false} }],
  ["/star/", { loader: () => import(/* webpackChunkName: "star_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/star/index.html.js"), meta: {"t":"星标","I":false} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "timeline_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"t":"时间轴","I":false} }],
]);
