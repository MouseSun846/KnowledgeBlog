import comp from "D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/triton.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/triton.html\",\"title\":\"Triton Inference Server\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2024-10-22T00:00:00.000Z\",\"title\":\"Triton Inference Server\",\"category\":[\"AI Framework\"],\"tag\":[\"Triton\"],\"description\":\"Triton Inference Server 指标解释 参考 平均请求在队列中等待的时间百分比（不包括缓存命中）： expr: 使用 rate(nv_inference_queue_duration_us[1m]) 计算在过去1分钟内，推理请求在队列中等待的时间的速率。 clamp_min(rate(nv_inference_compute_infe...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/triton.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"知识笔记\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Triton Inference Server\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Triton Inference Server 指标解释 参考 平均请求在队列中等待的时间百分比（不包括缓存命中）： expr: 使用 rate(nv_inference_queue_duration_us[1m]) 计算在过去1分钟内，推理请求在队列中等待的时间的速率。 clamp_min(rate(nv_inference_compute_infe...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-10-22T02:06:05.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"MouseSun\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Triton\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-10-22T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-10-22T02:06:05.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Triton Inference Server\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2024-10-22T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2024-10-22T02:06:05.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"MouseSun\\\",\\\"url\\\":\\\"https://github.com/MouseSun846\\\",\\\"email\\\":\\\"\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"指标解释\",\"slug\":\"指标解释\",\"link\":\"#指标解释\",\"children\":[]},{\"level\":2,\"title\":\"HPA\",\"slug\":\"hpa\",\"link\":\"#hpa\",\"children\":[]}],\"git\":{\"createdTime\":1729562609000,\"updatedTime\":1729562765000,\"contributors\":[{\"name\":\"mousesun\",\"email\":\"3026098675@qq.com\",\"commits\":2}]},\"readingTime\":{\"minutes\":1.35,\"words\":406},\"filePathRelative\":\"技术科普/triton.md\",\"localizedDate\":\"2024年10月22日\",\"excerpt\":\"<div class=\\\"hint-container info\\\">\\n<p class=\\\"hint-container-title\\\">Triton Inference Server</p>\\n</div>\\n<h2>指标解释</h2>\\n<p><a href=\\\"https://github1s.com/triton-inference-server/tutorials/blob/main/Deployment/Kubernetes/EKS_Multinode_Triton_TRTLLM/multinode_helm_chart/triton-metrics_prometheus-rule.yaml#L38\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">参考</a></p>\",\"autoDesc\":true}")
export { comp, data }
