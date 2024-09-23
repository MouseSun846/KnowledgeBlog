import comp from "D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/操作系统.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F.html\",\"title\":\"操作系统\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2024-08-13T00:00:00.000Z\",\"title\":\"操作系统\",\"category\":[\"操作系统\"],\"tag\":[\"操作系统\"],\"description\":\"strace命令 strace 是一个用于跟踪系统调用和信号的工具，它可以帮助你诊断程序的行为或调试程序。-p 选项用于附加到一个正在运行的进程上，并实时显示它的系统调用。 解释命令： strace：调用 strace 工具。 -p 871：指定进程ID（PID）为 871 的进程。strace 会附加到这个进程，并跟踪它的系统调用。 使用场景： 实时...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"知识笔记\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"操作系统\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"strace命令 strace 是一个用于跟踪系统调用和信号的工具，它可以帮助你诊断程序的行为或调试程序。-p 选项用于附加到一个正在运行的进程上，并实时显示它的系统调用。 解释命令： strace：调用 strace 工具。 -p 871：指定进程ID（PID）为 871 的进程。strace 会附加到这个进程，并跟踪它的系统调用。 使用场景： 实时...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/assets/images/038be2db-9a5c-4678-9cf4-e0a6f5018d9e.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-09-23T03:10:42.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"MouseSun\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"操作系统\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-08-13T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-09-23T03:10:42.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"操作系统\\\",\\\"image\\\":[\\\"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/assets/images/038be2db-9a5c-4678-9cf4-e0a6f5018d9e.png\\\",\\\"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/assets/images/262bfb6c-3622-47a4-8bcf-4ff4efc3131d.png\\\"],\\\"datePublished\\\":\\\"2024-08-13T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2024-09-23T03:10:42.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"MouseSun\\\",\\\"url\\\":\\\"https://github.com/MouseSun846\\\",\\\"email\\\":\\\"\\\"}]}\"]]},\"headers\":[{\"level\":3,\"title\":\"解释命令：\",\"slug\":\"解释命令\",\"link\":\"#解释命令\",\"children\":[]},{\"level\":3,\"title\":\"使用场景：\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]},{\"level\":3,\"title\":\"注意事项：\",\"slug\":\"注意事项\",\"link\":\"#注意事项\",\"children\":[]},{\"level\":2,\"title\":\"扩容磁盘\",\"slug\":\"扩容磁盘\",\"link\":\"#扩容磁盘\",\"children\":[{\"level\":3,\"title\":\"1. 卸载并删除 nvme0n1p1 分区\",\"slug\":\"_1-卸载并删除-nvme0n1p1-分区\",\"link\":\"#_1-卸载并删除-nvme0n1p1-分区\",\"children\":[]},{\"level\":3,\"title\":\"2. 创建新的分区并标记为 LVM\",\"slug\":\"_2-创建新的分区并标记为-lvm\",\"link\":\"#_2-创建新的分区并标记为-lvm\",\"children\":[]},{\"level\":3,\"title\":\"3. 将新分区添加到 LVM 物理卷\",\"slug\":\"_3-将新分区添加到-lvm-物理卷\",\"link\":\"#_3-将新分区添加到-lvm-物理卷\",\"children\":[]},{\"level\":3,\"title\":\"4. 扩展逻辑卷 centos-root\",\"slug\":\"_4-扩展逻辑卷-centos-root\",\"link\":\"#_4-扩展逻辑卷-centos-root\",\"children\":[]},{\"level\":3,\"title\":\"5. 扩展 XFS 文件系统\",\"slug\":\"_5-扩展-xfs-文件系统\",\"link\":\"#_5-扩展-xfs-文件系统\",\"children\":[]},{\"level\":3,\"title\":\"6. 验证扩展结果\",\"slug\":\"_6-验证扩展结果\",\"link\":\"#_6-验证扩展结果\",\"children\":[]}]},{\"level\":2,\"title\":\"wsl 启用systemd\",\"slug\":\"wsl-启用systemd\",\"link\":\"#wsl-启用systemd\",\"children\":[]},{\"level\":2,\"title\":\"WSL2迁移至其他目录\",\"slug\":\"wsl2迁移至其他目录\",\"link\":\"#wsl2迁移至其他目录\",\"children\":[]}],\"git\":{\"createdTime\":1723512197000,\"updatedTime\":1727061042000,\"contributors\":[{\"name\":\"mousesun\",\"email\":\"3026098675@qq.com\",\"commits\":4}]},\"readingTime\":{\"minutes\":6.69,\"words\":2007},\"filePathRelative\":\"技术科普/操作系统.md\",\"localizedDate\":\"2024年8月13日\",\"excerpt\":\"<div class=\\\"hint-container tip\\\">\\n<p class=\\\"hint-container-title\\\">strace命令</p>\\n</div>\\n<p><code>strace</code> 是一个用于跟踪系统调用和信号的工具，它可以帮助你诊断程序的行为或调试程序。<code>-p</code> 选项用于附加到一个正在运行的进程上，并实时显示它的系统调用。</p>\\n<h3>解释命令：</h3>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-highlighter=\\\"shiki\\\" data-ext=\\\"bash\\\" data-title=\\\"bash\\\" style=\\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\\"><pre class=\\\"shiki shiki-themes github-light one-dark-pro vp-code\\\"><code><span class=\\\"line\\\"><span style=\\\"--shiki-light:#6F42C1;--shiki-dark:#61AFEF\\\">strace</span><span style=\\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\\"> -p</span><span style=\\\"--shiki-light:#005CC5;--shiki-dark:#D19A66\\\"> 871</span></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")
export { comp, data }
