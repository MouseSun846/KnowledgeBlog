import comp from "D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/技术科普/pytorch.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/pytorch.html\",\"title\":\"PyTorch\",\"lang\":\"zh-CN\",\"frontmatter\":{\"date\":\"2024-09-04T00:00:00.000Z\",\"title\":\"PyTorch\",\"category\":[\"分布式\"],\"tag\":[\"PyTorch\",\"c10d\"],\"description\":\"PyTorch c10d PyTorch 的 c10d 通信库是用于分布式计算的核心组件，特别是在需要跨多个设备（如多个GPU或多台机器）进行并行计算时。c10d 提供了分布式数据并行（Distributed Data Parallel, DDP）的底层实现，支持高效的数据同步和通信操作。 主要功能 通信后端： c10d 支持多种通信后端（Backen...\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/pytorch.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"知识笔记\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"PyTorch\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"PyTorch c10d PyTorch 的 c10d 通信库是用于分布式计算的核心组件，特别是在需要跨多个设备（如多个GPU或多台机器）进行并行计算时。c10d 提供了分布式数据并行（Distributed Data Parallel, DDP）的底层实现，支持高效的数据同步和通信操作。 主要功能 通信后端： c10d 支持多种通信后端（Backen...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2024-10-09T02:10:26.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"MouseSun\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"PyTorch\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"c10d\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-09-04T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2024-10-09T02:10:26.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"PyTorch\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2024-09-04T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2024-10-09T02:10:26.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"MouseSun\\\",\\\"url\\\":\\\"https://github.com/MouseSun846\\\",\\\"email\\\":\\\"\\\"}]}\"]]},\"headers\":[{\"level\":3,\"title\":\"主要功能\",\"slug\":\"主要功能\",\"link\":\"#主要功能\",\"children\":[]},{\"level\":3,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]},{\"level\":3,\"title\":\"示例代码\",\"slug\":\"示例代码\",\"link\":\"#示例代码\",\"children\":[]},{\"level\":3,\"title\":\"总结\",\"slug\":\"总结\",\"link\":\"#总结\",\"children\":[]},{\"level\":3,\"title\":\"SPMD 模型的核心思想\",\"slug\":\"spmd-模型的核心思想\",\"link\":\"#spmd-模型的核心思想\",\"children\":[]},{\"level\":3,\"title\":\"SPMD 与其他并行模型的比较\",\"slug\":\"spmd-与其他并行模型的比较\",\"link\":\"#spmd-与其他并行模型的比较\",\"children\":[]},{\"level\":3,\"title\":\"应用场景\",\"slug\":\"应用场景\",\"link\":\"#应用场景\",\"children\":[]},{\"level\":3,\"title\":\"示例\",\"slug\":\"示例\",\"link\":\"#示例\",\"children\":[]},{\"level\":3,\"title\":\"总结\",\"slug\":\"总结-1\",\"link\":\"#总结-1\",\"children\":[]},{\"level\":3,\"title\":\"MPMD 模型的核心思想\",\"slug\":\"mpmd-模型的核心思想\",\"link\":\"#mpmd-模型的核心思想\",\"children\":[]},{\"level\":3,\"title\":\"MPMD 与 SPMD 的比较\",\"slug\":\"mpmd-与-spmd-的比较\",\"link\":\"#mpmd-与-spmd-的比较\",\"children\":[]},{\"level\":3,\"title\":\"应用场景\",\"slug\":\"应用场景-1\",\"link\":\"#应用场景-1\",\"children\":[]},{\"level\":3,\"title\":\"示例场景\",\"slug\":\"示例场景\",\"link\":\"#示例场景\",\"children\":[]},{\"level\":3,\"title\":\"实现 MPMD 的框架\",\"slug\":\"实现-mpmd-的框架\",\"link\":\"#实现-mpmd-的框架\",\"children\":[]},{\"level\":3,\"title\":\"总结\",\"slug\":\"总结-2\",\"link\":\"#总结-2\",\"children\":[]},{\"level\":3,\"title\":\"MPI 的核心概念\",\"slug\":\"mpi-的核心概念\",\"link\":\"#mpi-的核心概念\",\"children\":[]},{\"level\":3,\"title\":\"MPI 的主要功能\",\"slug\":\"mpi-的主要功能\",\"link\":\"#mpi-的主要功能\",\"children\":[]},{\"level\":3,\"title\":\"使用场景\",\"slug\":\"使用场景-1\",\"link\":\"#使用场景-1\",\"children\":[]},{\"level\":3,\"title\":\"示例代码\",\"slug\":\"示例代码-1\",\"link\":\"#示例代码-1\",\"children\":[]},{\"level\":3,\"title\":\"总结\",\"slug\":\"总结-3\",\"link\":\"#总结-3\",\"children\":[]},{\"level\":2,\"title\":\"源码解读\",\"slug\":\"源码解读\",\"link\":\"#源码解读\",\"children\":[]},{\"level\":2,\"title\":\"init_process_group\",\"slug\":\"init-process-group\",\"link\":\"#init-process-group\",\"children\":[{\"level\":3,\"title\":\"初始化默认的分布式进程组。\",\"slug\":\"初始化默认的分布式进程组。\",\"link\":\"#初始化默认的分布式进程组。\",\"children\":[]}]},{\"level\":2,\"title\":\"Backend\",\"slug\":\"backend\",\"link\":\"#backend\",\"children\":[{\"level\":3,\"title\":\"Backend 类\",\"slug\":\"backend-类\",\"link\":\"#backend-类\",\"children\":[]}]}],\"git\":{\"createdTime\":1725441477000,\"updatedTime\":1728439826000,\"contributors\":[{\"name\":\"mousesun\",\"email\":\"3026098675@qq.com\",\"commits\":2}]},\"readingTime\":{\"minutes\":15.34,\"words\":4601},\"filePathRelative\":\"技术科普/pytorch.md\",\"localizedDate\":\"2024年9月4日\",\"excerpt\":\"<div class=\\\"hint-container tip\\\">\\n<p class=\\\"hint-container-title\\\">PyTorch c10d</p>\\n</div>\\n<p>PyTorch 的 <code>c10d</code> 通信库是用于分布式计算的核心组件，特别是在需要跨多个设备（如多个GPU或多台机器）进行并行计算时。<code>c10d</code> 提供了分布式数据并行（Distributed Data Parallel, DDP）的底层实现，支持高效的数据同步和通信操作。</p>\\n<h3>主要功能</h3>\\n<ol>\\n<li>\\n<p><strong>通信后端</strong>：\\n<code>c10d</code> 支持多种通信后端（Backend），如：</p>\\n<ul>\\n<li><code>NCCL</code>: 适用于GPU间通信，特别是在NVIDIA硬件上。</li>\\n<li><code>GLOO</code>: 适用于CPU和GPU的跨平台通信。</li>\\n<li><code>MPI</code>: 基于Message Passing Interface，适合大规模分布式系统。</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>进程组（Process Group）</strong>：\\n<code>c10d</code> 中的进程组是通信的基本单元，可以将多个进程组织成一个组，以便它们之间进行通信。可以在不同的进程组之间进行广播、归约、全归约等操作。</p>\\n</li>\\n<li>\\n<p><strong>广播和同步</strong>：\\n<code>c10d</code> 提供了对数据进行广播和同步的接口，确保在多个进程或设备之间一致地传递数据。例如，在多GPU训练中，同步不同GPU上的模型参数。</p>\\n</li>\\n<li>\\n<p><strong>梯度同步</strong>：\\n在分布式数据并行训练中，<code>c10d</code> 自动同步各个设备计算出的梯度，从而确保在所有设备上更新后的模型参数保持一致。</p>\\n</li>\\n<li>\\n<p><strong>AllReduce操作</strong>：\\n<code>c10d</code> 支持AllReduce操作，这是在分布式训练中非常常用的操作，能够高效地合并不同设备上的梯度并更新模型参数。</p>\\n</li>\\n</ol>\",\"autoDesc\":true}")
export { comp, data }
