---
date: 2024-07-03
title: k8s知识点
category:
  - k8s
tag:
  - 笔记
---
::: tip k8s 笔记总结
:::

# pv
## 访问模式（Access Modes）
Kubernetes支持的访问模式如下。
* ReadWriteOnce（RWO）：读写权限，并且只能被单个Node挂
载。

* ReadOnlyMany（ROX）：只读权限，允许被多个Node挂载。

* ReadWriteMany（RWX）：读写权限，允许被多个Node挂载。
  
某些PV可能支持多种访问模式，但PV在挂载时只能使用一种访问模式，多种访问模式不能同时生效。

## 回收策略（Reclaim Policy）
Kubernetes支持的回收策略如下。
* Retain：保留数据，需要手工处理。
* Recycle：简单清除文件的操作。
* Delete：与PV相连的后端存储完成Volume的删除操作。

目前只有NFS和HostPath两种类型的PV支持Recycle策略；
AWSElasticBlockStore、GCEPersistentDisk、AzureDisk和Cinder类型的PV支持Delete策略。

## PV (STATUS)
在 Kubernetes 中，PersistentVolume (PV) 是一个集群级别的资源，用于表示集群中持久化存储的详细信息和状态。PV 的状态由其 `STATUS` 字段来表示，它反映了存储卷的当前状态。了解这些状态有助于掌握 PV 在生命周期中的位置，以及它是否能够被持久卷声明 (PersistentVolumeClaim, PVC) 使用。

以下是 Kubernetes 中 PV 的几种可能的状态：

### 1. `Available`
- **描述**: 该状态表示 PV 可以被绑定到 PVC。PV 处于 `Available` 状态时，它未被任何 PVC 使用，可以供新的 PVC 绑定。
- **特点**: 
  - PV 还未与任何 PVC 绑定。
  - 准备好用于新的 PVC 绑定。

### 2. `Bound`
- **描述**: 该状态表示 PV 已经被绑定到一个 PVC，且正被 PVC 使用。
- **特点**: 
  - PV 已经与一个 PVC 绑定。
  - 它不能再被其他 PVC 绑定，直到被释放。

### 3. `Released`
- **描述**: 该状态表示 PV 之前已经绑定的 PVC 已经被删除，但是 PV 本身还没有被集群中的任何新 PVC 再次使用。
- **特点**: 
  - PVC 已被删除。
  - 数据可能仍然存在于 PV 上，但它还未被新的 PVC 重新绑定。

### 4. `Failed`
- **描述**: 该状态表示 PV 由于某种原因无法使用，通常是因为与 PV 相关的存储设备出现了错误或问题。
- **特点**: 
  - PV 在操作过程中遇到错误，无法正常使用。
  - 可能需要管理员干预以修复问题。

## 状态转换

PV 的状态转换通常遵循以下过程：

1. **初始状态**: PV 被创建后，处于 `Available` 状态。
2. **绑定**: 一个 PVC 请求匹配 PV，PV 被绑定到 PVC 后，状态变为 `Bound`。
3. **释放**: PVC 被删除后，PV 状态变为 `Released`。
4. **再利用或删除**:
   - 如果允许再利用，管理员可以手动将 PV 状态重置为 `Available`，使其可以绑定到新的 PVC。
   - 如果 PV 被认为不再需要，可能会被删除。

### 状态图示

以下是状态转换的示意图：

```
Available
    |
    |  PVC 绑定
    V
Bound
    |
    |  PVC 删除
    V
Released
    |
    |  删除或再利用
    V
Failed (或) Available
```

# Resourcequotas与Limitranges

在 Kubernetes（K8s）集群中，**ResourceQuotas** 和 **LimitRanges** 是两种用于资源管理和控制的机制。它们帮助管理员确保资源的公平分配和高效利用。以下是对这两者的详细介绍：

## ResourceQuotas

**ResourceQuotas** 是一种在 Kubernetes 中用来限制命名空间（Namespace）内资源总量的机制。它们用于防止某个命名空间消耗过多的集群资源，从而影响其他命名空间的正常运行。

### 作用

- **限制命名空间资源使用**: ResourceQuotas 确保每个命名空间不会消耗超过指定的资源限额。
- **控制资源分配**: 它们帮助管理员公平分配集群资源，防止资源耗尽。
- **提升资源管理能力**: 通过设置资源限额，管理员可以更好地管理和监控资源使用情况。

### 配置示例

以下是一个 ResourceQuota 的 YAML 配置示例，它限制了某个命名空间内的 CPU 和内存总量，以及对象数量（如 Pod 和 Service）：

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: example-quota
  namespace: example-namespace
spec:
  hard:
    pods: "10"                  # 限制 Pod 的总数量
    services: "5"               # 限制 Service 的总数量
    requests.cpu: "4"           # 限制 CPU 请求总量
    requests.memory: "8Gi"      # 限制内存请求总量
    limits.cpu: "10"            # 限制 CPU 使用总量
    limits.memory: "16Gi"       # 限制内存使用总量
```

### 主要字段

- **hard**: 定义了资源的硬性限制，包括 CPU、内存、存储和对象数量等。
- **scopes**: 可选字段，指定了 ResourceQuota 适用的对象范围（如仅应用于某些特定的资源类型）。

### 使用场景

- **开发环境**: 限制资源以确保测试环境不会占用过多的生产资源。
- **多租户环境**: 在共享集群中，控制不同租户（命名空间）之间的资源使用。
- **成本管理**: 控制资源使用来管理和控制成本。

## LimitRanges

**LimitRanges** 是一种在 Kubernetes 中用于限制命名空间内单个 Pod 或容器资源使用的机制。与 ResourceQuotas 的整体限制不同，LimitRanges 主要控制单个 Pod 或容器的资源使用范围。

### 作用

- **设置默认资源限制**: 如果 Pod 或容器没有指定资源请求和限制，LimitRanges 可以提供默认值。
- **防止资源过度消耗**: 通过限制单个容器或 Pod 的资源使用，防止过多的资源消耗影响整个集群的性能。
- **鼓励合理的资源分配**: 鼓励开发人员在部署 Pod 时合理设置资源请求和限制。

### 配置示例

以下是一个 LimitRange 的 YAML 配置示例，它为容器设置了 CPU 和内存的默认值和最大/最小值：

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: example-limits
  namespace: example-namespace
spec:
  limits:
  - max:
      cpu: "1"             # 容器的最大 CPU 使用量
      memory: "1Gi"        # 容器的最大内存使用量
    min:
      cpu: "100m"          # 容器的最小 CPU 使用量
      memory: "128Mi"      # 容器的最小内存使用量
    default:
      cpu: "500m"          # 容器的默认 CPU 请求量
      memory: "512Mi"      # 容器的默认内存请求量
    defaultRequest:
      cpu: "250m"          # 容器的默认 CPU 请求
      memory: "256Mi"      # 容器的默认内存请求
    type: Container        # 应用类型
```

### 主要字段

- **max**: 定义了单个容器可以请求的最大资源量。
- **min**: 定义了单个容器必须请求的最小资源量。
- **default**: 定义了容器没有指定资源请求和限制时的默认值。
- **defaultRequest**: 定义了容器没有指定资源请求时的默认请求值。
- **type**: 指定了限制适用于 Pod 还是容器。

### 使用场景

- **应用程序标准化**: 在命名空间内强制执行资源使用标准，确保所有容器符合预期的资源使用模式。
- **资源优化**: 防止资源过度配置或资源不足，从而优化集群性能和资源利用率。
- **开发与测试环境**: 在不同环境中设置不同的限制，确保资源的合理分配和使用。

## 比较与总结

- **ResourceQuotas**:
  - **范围**: 适用于整个命名空间的资源总量。
  - **目的**: 控制命名空间内的资源使用上限，确保集群资源的公平分配和高效利用。
  - **典型场景**: 多租户环境、开发环境中的资源限制。

- **LimitRanges**:
  - **范围**: 适用于单个 Pod 或容器的资源使用。
  - **目的**: 设置资源使用的默认值和最大/最小限制，防止个体资源过度消耗。
  - **典型场景**: 应用程序的资源标准化和资源优化。

两者结合使用，可以在 Kubernetes 集群中提供强大的资源管理能力，确保资源的公平分配和高效使用。

# k8s技能图谱

![](/assets/images/k8s技能图谱.png)