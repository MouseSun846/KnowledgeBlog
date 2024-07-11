import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as r}from"./app-DKXe7Dgd.js";const a={},i=r('<div class="hint-container tip"><p class="hint-container-title">MInference：通过动态稀疏注意力加速长上下文 LLM 的预填充</p><h2 id="地址" tabindex="-1"><a class="header-anchor" href="#地址"><span>地址</span></a></h2><p><a href="https://github.com/microsoft/MInference" target="_blank" rel="noopener noreferrer">https://github.com/microsoft/MInference</a></p><h2 id="论文" tabindex="-1"><a class="header-anchor" href="#论文"><span>论文</span></a></h2><p><a href="https://hqjiang.com/minference.html" target="_blank" rel="noopener noreferrer">https://hqjiang.com/minference.html</a></p><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2><p>论文介绍了一种名为 MInference 的动态稀疏注意力方法，用于解决长上下文 LLM 推理中的问题，并通过多种实验和测试展示了其效果。</p><h2 id="重要亮点" tabindex="-1"><a class="header-anchor" href="#重要亮点"><span>重要亮点</span></a></h2><ul><li><p>MInference 的提出背景：长上下文 LLM 推理面临预填充阶段注意力延迟长、KV 缓存存储和传输成本高等挑战，之前方法难以低成本在单个 A100 GPU 实现百万级标记提示的可接受延迟，MInference 应运而生。</p></li><li><p>MInference 的工作原理：利用动态稀疏注意的静态空间聚合模式，离线确定每个头的最佳动态稀疏模式，在推理中动态近似动态稀疏索引，使用优化的 GPU 内核执行高效计算，显著减少预填充阶段延迟。</p></li><li><p>MInference 的主要贡献：加速长上下文 LLM 的预填充阶段多达 10 倍；将动态稀疏注意力分为三种模式并设计搜索算法；引入在线近似方法和优化内核，提出最佳推理代码库；通过四个基准测试评估，在成本效率和系统延迟方面表现出色。</p></li><li><p>长上下文基准测试中的实验结果：在问答、编码、基于检索等一系列任务中测试 MInference，有效保留或扩展实际上下文窗口处理能力，在不同模型和方法对比中性能良好。</p></li><li><p>内核中的延迟细分和稀疏模式：展示三种注意力模式和 FlashAttention 的微基准测试结果，Vertical-Slash 虽慢但仍有显著加速，还展示了 Vertical-Slash 头部 kernel 中的稀疏索引。</p></li></ul></div>',1),o=[i];function c(p,l){return t(),n("div",null,o)}const m=e(a,[["render",c],["__file","开源技术.html.vue"]]),f=JSON.parse('{"path":"/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E5%BC%80%E6%BA%90%E6%8A%80%E6%9C%AF.html","title":"开源技术","lang":"zh-CN","frontmatter":{"date":"2024-07-11T00:00:00.000Z","title":"开源技术","category":["开源技术"],"tag":["推理引擎"],"description":"MInference：通过动态稀疏注意力加速长上下文 LLM 的预填充 地址 https://github.com/microsoft/MInference 论文 https://hqjiang.com/minference.html 介绍 论文介绍了一种名为 MInference 的动态稀疏注意力方法，用于解决长上下文 LLM 推理中的问题，并通过多...","head":[["meta",{"property":"og:url","content":"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/%E5%BC%80%E6%BA%90%E6%8A%80%E6%9C%AF.html"}],["meta",{"property":"og:site_name","content":"知识笔记"}],["meta",{"property":"og:title","content":"开源技术"}],["meta",{"property":"og:description","content":"MInference：通过动态稀疏注意力加速长上下文 LLM 的预填充 地址 https://github.com/microsoft/MInference 论文 https://hqjiang.com/minference.html 介绍 论文介绍了一种名为 MInference 的动态稀疏注意力方法，用于解决长上下文 LLM 推理中的问题，并通过多..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"MouseSun"}],["meta",{"property":"article:tag","content":"推理引擎"}],["meta",{"property":"article:published_time","content":"2024-07-11T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"开源技术\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-11T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"MouseSun\\",\\"url\\":\\"https://github.com/MouseSun846\\"}]}"]]},"headers":[],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":1.59,"words":478},"filePathRelative":"技术科普/开源技术.md","localizedDate":"2024年7月11日","excerpt":"<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">MInference：通过动态稀疏注意力加速长上下文 LLM 的预填充</p>\\n<h2>地址</h2>\\n<p><a href=\\"https://github.com/microsoft/MInference\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/microsoft/MInference</a></p>\\n<h2>论文</h2>\\n<p><a href=\\"https://hqjiang.com/minference.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://hqjiang.com/minference.html</a></p>\\n<h2>介绍</h2>\\n<p>论文介绍了一种名为 MInference 的动态稀疏注意力方法，用于解决长上下文 LLM 推理中的问题，并通过多种实验和测试展示了其效果。</p>\\n<h2>重要亮点</h2>\\n<ul>\\n<li>\\n<p>MInference 的提出背景：长上下文 LLM 推理面临预填充阶段注意力延迟长、KV 缓存存储和传输成本高等挑战，之前方法难以低成本在单个 A100 GPU 实现百万级标记提示的可接受延迟，MInference 应运而生。</p>\\n</li>\\n<li>\\n<p>MInference 的工作原理：利用动态稀疏注意的静态空间聚合模式，离线确定每个头的最佳动态稀疏模式，在推理中动态近似动态稀疏索引，使用优化的 GPU 内核执行高效计算，显著减少预填充阶段延迟。</p>\\n</li>\\n<li>\\n<p>MInference 的主要贡献：加速长上下文 LLM 的预填充阶段多达 10 倍；将动态稀疏注意力分为三种模式并设计搜索算法；引入在线近似方法和优化内核，提出最佳推理代码库；通过四个基准测试评估，在成本效率和系统延迟方面表现出色。</p>\\n</li>\\n<li>\\n<p>长上下文基准测试中的实验结果：在问答、编码、基于检索等一系列任务中测试 MInference，有效保留或扩展实际上下文窗口处理能力，在不同模型和方法对比中性能良好。</p>\\n</li>\\n<li>\\n<p>内核中的延迟细分和稀疏模式：展示三种注意力模式和 FlashAttention 的微基准测试结果，Vertical-Slash 虽慢但仍有显著加速，还展示了 Vertical-Slash 头部 kernel 中的稀疏索引。</p>\\n</li>\\n</ul>\\n</div>","autoDesc":true}');export{m as comp,f as data};
