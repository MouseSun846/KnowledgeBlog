import{_ as e,c as t,o as n,a as r}from"./app-dI0hlF-1.js";const i={},a=r(`<p>::: Triton Inference Server :::</p><h2 id="指标解释" tabindex="-1"><a class="header-anchor" href="#指标解释"><span>指标解释</span></a></h2><p><a href="https://github1s.com/triton-inference-server/tutorials/blob/main/Deployment/Kubernetes/EKS_Multinode_Triton_TRTLLM/multinode_helm_chart/triton-metrics_prometheus-rule.yaml#L38" target="_blank" rel="noopener noreferrer">参考</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># Average percentage of time inference requests spend in queue (not including cache hits).</span></span>
<span class="line"><span>- expr: rate(nv_inference_queue_duration_us[1m])/clamp_min(rate(nv_inference_compute_infer_duration_us[1m]),1)</span></span>
<span class="line"><span>record: triton:queue_compute:ratio</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>平均请求在队列中等待的时间百分比（不包括缓存命中）</strong>： <ul><li><code>expr</code>: 使用 <code>rate(nv_inference_queue_duration_us[1m])</code> 计算在过去1分钟内，推理请求在队列中等待的时间的速率。</li><li><code>clamp_min(rate(nv_inference_compute_infer_duration_us[1m]),1)</code>: 计算在过去1分钟内，推理计算持续时间的速率，并确保其最小值为1，以避免除以零的情况。</li><li><code>record</code>: 这个结果被记录为 <code>triton:queue_compute:ratio</code>，用于后续的数据分析或监控。</li></ul></li></ul><p>总体来说，这个表达式用于监控推理请求在队列中等待的时间相对于实际计算时间的比例，帮助评估系统的性能。</p><h2 id="hpa" tabindex="-1"><a class="header-anchor" href="#hpa"><span>HPA</span></a></h2><p><a href="https://github1s.com/triton-inference-server/tutorials/tree/main" target="_blank" rel="noopener noreferrer">参考</a></p><p>Once the dashboard has been setup, you will be able to visualize the current state of your cluster. These visualizations can provide insight into why we&#39;ve chosen to use the queue:compute ratio instead of GPU utilization as the metric used to control the behavior of the horizontal pod autoscaler.</p><p>一旦仪表板设置完成，您将能够可视化集群的当前状态。这些可视化可以提供洞察，解释为什么我们选择使用队列计算比率（queue:compute ratio）而不是 GPU 利用率作为控制水平 Pod 自动缩放器行为的指标。</p><p>这意味着，通过观察队列与计算的比率，可以更好地理解集群的性能和负载情况，从而做出更合理的扩展决策。</p>`,11),o=[a];function s(l,c){return n(),t("div",null,o)}const u=e(i,[["render",s],["__file","triton.html.vue"]]),d=JSON.parse('{"path":"/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/triton.html","title":"Triton Inference Server","lang":"zh-CN","frontmatter":{"date":"2024-10-22T00:00:00.000Z","title":"Triton Inference Server","category":["AI Framework"],"tag":["Triton"],"description":"::: Triton Inference Server ::: 指标解释 参考 平均请求在队列中等待的时间百分比（不包括缓存命中）： expr: 使用 rate(nv_inference_queue_duration_us[1m]) 计算在过去1分钟内，推理请求在队列中等待的时间的速率。 clamp_min(rate(nv_inference_comp...","head":[["meta",{"property":"og:url","content":"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/triton.html"}],["meta",{"property":"og:site_name","content":"知识笔记"}],["meta",{"property":"og:title","content":"Triton Inference Server"}],["meta",{"property":"og:description","content":"::: Triton Inference Server ::: 指标解释 参考 平均请求在队列中等待的时间百分比（不包括缓存命中）： expr: 使用 rate(nv_inference_queue_duration_us[1m]) 计算在过去1分钟内，推理请求在队列中等待的时间的速率。 clamp_min(rate(nv_inference_comp..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"MouseSun"}],["meta",{"property":"article:tag","content":"Triton"}],["meta",{"property":"article:published_time","content":"2024-10-22T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Triton Inference Server\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-10-22T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"MouseSun\\",\\"url\\":\\"https://github.com/MouseSun846\\",\\"email\\":\\"\\"}]}"]]},"headers":[{"level":2,"title":"指标解释","slug":"指标解释","link":"#指标解释","children":[]},{"level":2,"title":"HPA","slug":"hpa","link":"#hpa","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":1.35,"words":405},"filePathRelative":"技术科普/triton.md","localizedDate":"2024年10月22日","excerpt":"<p>::: Triton Inference Server\\n:::</p>\\n<h2>指标解释</h2>\\n<p><a href=\\"https://github1s.com/triton-inference-server/tutorials/blob/main/Deployment/Kubernetes/EKS_Multinode_Triton_TRTLLM/multinode_helm_chart/triton-metrics_prometheus-rule.yaml#L38\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">参考</a></p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span># Average percentage of time inference requests spend in queue (not including cache hits).</span></span>\\n<span class=\\"line\\"><span>- expr: rate(nv_inference_queue_duration_us[1m])/clamp_min(rate(nv_inference_compute_infer_duration_us[1m]),1)</span></span>\\n<span class=\\"line\\"><span>record: triton:queue_compute:ratio</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{u as comp,d as data};
