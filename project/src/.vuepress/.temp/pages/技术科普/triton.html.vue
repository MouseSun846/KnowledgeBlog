<template><div><div class="hint-container info">
<p class="hint-container-title">Triton Inference Server</p>
</div>
<h2 id="指标解释" tabindex="-1"><a class="header-anchor" href="#指标解释"><span>指标解释</span></a></h2>
<p><a href="https://github1s.com/triton-inference-server/tutorials/blob/main/Deployment/Kubernetes/EKS_Multinode_Triton_TRTLLM/multinode_helm_chart/triton-metrics_prometheus-rule.yaml#L38" target="_blank" rel="noopener noreferrer">参考</a></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># Average percentage of time inference requests spend in queue (not including cache hits).</span></span>
<span class="line"><span>- expr: rate(nv_inference_queue_duration_us[1m])/clamp_min(rate(nv_inference_compute_infer_duration_us[1m]),1)</span></span>
<span class="line"><span>record: triton:queue_compute:ratio</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>平均请求在队列中等待的时间百分比（不包括缓存命中）</strong>：
<ul>
<li><code v-pre>expr</code>: 使用 <code v-pre>rate(nv_inference_queue_duration_us[1m])</code> 计算在过去1分钟内，推理请求在队列中等待的时间的速率。</li>
<li><code v-pre>clamp_min(rate(nv_inference_compute_infer_duration_us[1m]),1)</code>: 计算在过去1分钟内，推理计算持续时间的速率，并确保其最小值为1，以避免除以零的情况。</li>
<li><code v-pre>record</code>: 这个结果被记录为 <code v-pre>triton:queue_compute:ratio</code>，用于后续的数据分析或监控。</li>
</ul>
</li>
</ul>
<p>总体来说，这个表达式用于监控推理请求在队列中等待的时间相对于实际计算时间的比例，帮助评估系统的性能。</p>
<h2 id="hpa" tabindex="-1"><a class="header-anchor" href="#hpa"><span>HPA</span></a></h2>
<p><a href="https://github1s.com/triton-inference-server/tutorials/tree/main" target="_blank" rel="noopener noreferrer">参考</a></p>
<p>Once the dashboard has been setup, you will be able to visualize the current state of your cluster. These visualizations can provide insight into why we've chosen to use the queue:compute ratio instead of GPU utilization as the metric used to control the behavior of the horizontal pod autoscaler.</p>
<p>一旦仪表板设置完成，您将能够可视化集群的当前状态。这些可视化可以提供洞察，解释为什么我们选择使用队列计算比率（queue:compute ratio）而不是 GPU 利用率作为控制水平 Pod 自动缩放器行为的指标。</p>
<p>这意味着，通过观察队列与计算的比率，可以更好地理解集群的性能和负载情况，从而做出更合理的扩展决策。</p>
</div></template>


