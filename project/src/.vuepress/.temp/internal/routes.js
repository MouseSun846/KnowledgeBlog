export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/index.html.js"), meta: {"t":"博客主页","i":"home"} }],
  ["/%E4%BB%8B%E7%BB%8D/%E4%BB%8B%E7%BB%8D.html", { loader: () => import(/* webpackChunkName: "介绍_介绍.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/介绍/介绍.html.js"), meta: {"d":1717632000000,"l":"2024年6月6日","c":["个人介绍"],"g":["个人"],"e":"<p>大家好，我是一名全栈开发工程师，拥有广泛的编程语言知识和丰富的技术经验。以下是我的专业技能和经验介绍：</p>\n<h4>编程语言</h4>\n<ul>\n<li><strong>Java</strong>: 熟练使用Java进行企业级应用开发，精通Spring Boot框架，擅长构建高性能和可扩展的后端服务。</li>\n<li><strong>C++</strong>: 具备扎实的C++基础，能够开发高效的系统级应用程序。</li>\n<li><strong>C</strong>: 精通C语言，擅长底层编程和系统开发。</li>\n<li><strong>Python</strong>: 精通Python，尤其在数据分析、机器学习以及自动化脚本编写方面有丰富经验。</li>\n<li><strong>Go</strong>: 熟悉Go语言，能够利用其高并发和高性能特点开发后端服务。</li>\n</ul>","r":{"minutes":1.64,"words":491},"t":"个人介绍","i":"pen-to-square","y":"a"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/404.html.js"), meta: {"t":""} }],
  ["/%E4%BB%8B%E7%BB%8D/", { loader: () => import(/* webpackChunkName: "介绍_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/介绍/index.html.js"), meta: {"t":"介绍"} }],
  ["/category/", { loader: () => import(/* webpackChunkName: "category_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/index.html.js"), meta: {"t":"分类","I":false} }],
  ["/category/%E4%B8%AA%E4%BA%BA%E4%BB%8B%E7%BB%8D/", { loader: () => import(/* webpackChunkName: "category_个人介绍_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/category/个人介绍/index.html.js"), meta: {"t":"个人介绍 分类","I":false} }],
  ["/tag/", { loader: () => import(/* webpackChunkName: "tag_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/index.html.js"), meta: {"t":"标签","I":false} }],
  ["/tag/%E4%B8%AA%E4%BA%BA/", { loader: () => import(/* webpackChunkName: "tag_个人_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/tag/个人/index.html.js"), meta: {"t":"标签: 个人","I":false} }],
  ["/article/", { loader: () => import(/* webpackChunkName: "article_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/article/index.html.js"), meta: {"t":"文章","I":false} }],
  ["/star/", { loader: () => import(/* webpackChunkName: "star_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/star/index.html.js"), meta: {"t":"星标","I":false} }],
  ["/timeline/", { loader: () => import(/* webpackChunkName: "timeline_index.html" */"D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/timeline/index.html.js"), meta: {"t":"时间轴","I":false} }],
]);
