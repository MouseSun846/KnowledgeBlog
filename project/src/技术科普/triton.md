---
date: 2024-10-22
title: Triton Inference Server
category:
  - AI Framework
tag:
  - Triton
---
::: info Triton Inference Server
:::


## 指标解释

[参考](https://github1s.com/triton-inference-server/tutorials/blob/main/Deployment/Kubernetes/EKS_Multinode_Triton_TRTLLM/multinode_helm_chart/triton-metrics_prometheus-rule.yaml#L38)

```
# Average percentage of time inference requests spend in queue (not including cache hits).
- expr: rate(nv_inference_queue_duration_us[1m])/clamp_min(rate(nv_inference_compute_infer_duration_us[1m]),1)
record: triton:queue_compute:ratio
```      

- **平均请求在队列中等待的时间百分比（不包括缓存命中）**：
  - `expr`: 使用 `rate(nv_inference_queue_duration_us[1m])` 计算在过去1分钟内，推理请求在队列中等待的时间的速率。
  - `clamp_min(rate(nv_inference_compute_infer_duration_us[1m]),1)`: 计算在过去1分钟内，推理计算持续时间的速率，并确保其最小值为1，以避免除以零的情况。
  - `record`: 这个结果被记录为 `triton:queue_compute:ratio`，用于后续的数据分析或监控。

总体来说，这个表达式用于监控推理请求在队列中等待的时间相对于实际计算时间的比例，帮助评估系统的性能。

## HPA

[参考](https://github1s.com/triton-inference-server/tutorials/tree/main)

Once the dashboard has been setup, you will be able to visualize the current state of your cluster. These visualizations can provide insight into why we've chosen to use the queue:compute ratio instead of GPU utilization as the metric used to control the behavior of the horizontal pod autoscaler.

一旦仪表板设置完成，您将能够可视化集群的当前状态。这些可视化可以提供洞察，解释为什么我们选择使用队列计算比率（queue:compute ratio）而不是 GPU 利用率作为控制水平 Pod 自动缩放器行为的指标。

这意味着，通过观察队列与计算的比率，可以更好地理解集群的性能和负载情况，从而做出更合理的扩展决策。