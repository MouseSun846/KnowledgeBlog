import comp from "D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/云原生/k8s.html.vue"
const data = JSON.parse("{\"path\":\"/%E4%BA%91%E5%8E%9F%E7%94%9F/k8s.html\",\"title\":\"k8s知识点\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2024-07-03T00:00:00.000Z\",\"title\":\"k8s知识点\",\"category\":[\"k8s\"],\"tag\":[\"笔记\"],\"description\":\"k8s 笔记总结 pv 访问模式（Access Modes） Kubernetes支持的访问模式如下。 ReadWriteOnce（RWO）：读写权限，并且只能被单个Node挂 载。 ReadOnlyMany（ROX）：只读权限，允许被多个Node挂载。 ReadWriteMany（RWX）：读写权限，允许被多个Node挂载。 某些PV可能支持多种访问...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/%E4%BA%91%E5%8E%9F%E7%94%9F/k8s.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"知识笔记\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"k8s知识点\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"k8s 笔记总结 pv 访问模式（Access Modes） Kubernetes支持的访问模式如下。 ReadWriteOnce（RWO）：读写权限，并且只能被单个Node挂 载。 ReadOnlyMany（ROX）：只读权限，允许被多个Node挂载。 ReadWriteMany（RWX）：读写权限，允许被多个Node挂载。 某些PV可能支持多种访问...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/assets/images/k8s技能图谱.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-07-08T03:35:52.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"MouseSun\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"笔记\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-07-03T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-07-08T03:35:52.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"k8s知识点\\\",\\\"image\\\":[\\\"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/assets/images/k8s技能图谱.png\\\"],\\\"datePublished\\\":\\\"2024-07-03T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2024-07-08T03:35:52.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"MouseSun\\\",\\\"url\\\":\\\"https://github.com/MouseSun846\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"访问模式（Access Modes）\",\"slug\":\"访问模式-access-modes\",\"link\":\"#访问模式-access-modes\",\"children\":[]},{\"level\":2,\"title\":\"回收策略（Reclaim Policy）\",\"slug\":\"回收策略-reclaim-policy\",\"link\":\"#回收策略-reclaim-policy\",\"children\":[]},{\"level\":2,\"title\":\"PV (STATUS)\",\"slug\":\"pv-status\",\"link\":\"#pv-status\",\"children\":[{\"level\":3,\"title\":\"1. Available\",\"slug\":\"_1-available\",\"link\":\"#_1-available\",\"children\":[]},{\"level\":3,\"title\":\"2. Bound\",\"slug\":\"_2-bound\",\"link\":\"#_2-bound\",\"children\":[]},{\"level\":3,\"title\":\"3. Released\",\"slug\":\"_3-released\",\"link\":\"#_3-released\",\"children\":[]},{\"level\":3,\"title\":\"4. Failed\",\"slug\":\"_4-failed\",\"link\":\"#_4-failed\",\"children\":[]}]},{\"level\":2,\"title\":\"状态转换\",\"slug\":\"状态转换\",\"link\":\"#状态转换\",\"children\":[{\"level\":3,\"title\":\"状态图示\",\"slug\":\"状态图示\",\"link\":\"#状态图示\",\"children\":[]}]},{\"level\":2,\"title\":\"ResourceQuotas\",\"slug\":\"resourcequotas\",\"link\":\"#resourcequotas\",\"children\":[{\"level\":3,\"title\":\"作用\",\"slug\":\"作用\",\"link\":\"#作用\",\"children\":[]},{\"level\":3,\"title\":\"配置示例\",\"slug\":\"配置示例\",\"link\":\"#配置示例\",\"children\":[]},{\"level\":3,\"title\":\"主要字段\",\"slug\":\"主要字段\",\"link\":\"#主要字段\",\"children\":[]},{\"level\":3,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]}]},{\"level\":2,\"title\":\"LimitRanges\",\"slug\":\"limitranges\",\"link\":\"#limitranges\",\"children\":[{\"level\":3,\"title\":\"作用\",\"slug\":\"作用-1\",\"link\":\"#作用-1\",\"children\":[]},{\"level\":3,\"title\":\"配置示例\",\"slug\":\"配置示例-1\",\"link\":\"#配置示例-1\",\"children\":[]},{\"level\":3,\"title\":\"主要字段\",\"slug\":\"主要字段-1\",\"link\":\"#主要字段-1\",\"children\":[]},{\"level\":3,\"title\":\"使用场景\",\"slug\":\"使用场景-1\",\"link\":\"#使用场景-1\",\"children\":[]}]},{\"level\":2,\"title\":\"比较与总结\",\"slug\":\"比较与总结\",\"link\":\"#比较与总结\",\"children\":[]}],\"git\":{\"createdTime\":1719990112000,\"updatedTime\":1720409752000,\"contributors\":[{\"name\":\"mousesun\",\"email\":\"3026098675@qq.com\",\"commits\":6}]},\"readingTime\":{\"minutes\":6.39,\"words\":1917},\"filePathRelative\":\"云原生/k8s.md\",\"localizedDate\":\"2024年7月3日\",\"excerpt\":\"<div class=\\\"hint-container tip\\\">\\n<p class=\\\"hint-container-title\\\">k8s 笔记总结</p>\\n</div>\\n<h1>pv</h1>\\n<h2>访问模式（Access Modes）</h2>\\n<p>Kubernetes支持的访问模式如下。</p>\\n<ul>\\n<li>\\n<p>ReadWriteOnce（RWO）：读写权限，并且只能被单个Node挂\\n载。</p>\\n</li>\\n<li>\\n<p>ReadOnlyMany（ROX）：只读权限，允许被多个Node挂载。</p>\\n</li>\\n<li>\\n<p>ReadWriteMany（RWX）：读写权限，允许被多个Node挂载。</p>\\n</li>\\n</ul>\",\"autoDesc\":true}")
export { comp, data }
