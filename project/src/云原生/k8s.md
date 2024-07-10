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


## k8s技能图谱

![](/assets/images/k8s技能图谱.png)

## 静态pod

`Static Pod` 是 Kubernetes 中的一种特殊类型的 Pod，它由 kubelet 直接管理，而不是通过 Kubernetes API Server 来创建和管理。Static Pod 通常用于集群管理工具（如 Kubernetes 本身）的部署和管理，尤其是在 Kubernetes 控制平面组件（如 etcd、kube-apiserver、kube-controller-manager 和 kube-scheduler）自身的管理中。

### Static Pod 的特点

1. **由 kubelet 管理**：
   - Static Pod 由运行在节点上的 kubelet 直接管理，不需要 API Server 的参与。
   - kubelet 会定期扫描特定的目录（通常是 `/etc/kubernetes/manifests`）中的 Pod 定义文件，并根据这些文件创建和管理 Pod。

2. **没有 ReplicaSet 或 Deployment**：
   - Static Pod 不是通过 Deployment、ReplicaSet 或其他控制器管理的，因此它们没有自动伸缩、滚动更新等高级特性。

3. **静态配置**：
   - Static Pod 的配置是静态文件，通常是 JSON 或 YAML 格式，存放在节点的文件系统中。
   - 这些配置文件不会因为 API Server 或 etcd 的故障而丢失，因此非常适合用于管理集群的核心组件。

4. **自动重启**：
   - 如果 Static Pod 崩溃或被删除，kubelet 会根据配置文件自动重新创建它们，保证这些关键组件的高可用性。

### 创建 Static Pod

要创建一个 Static Pod，你需要在节点的特定目录中（通常是 `/etc/kubernetes/manifests`）创建一个包含 Pod 定义的 YAML 文件。以下是一个示例：

```yaml
# 文件路径：/etc/kubernetes/manifests/static-pod-example.yaml
apiVersion: v1
kind: Pod
metadata:
  name: static-pod-example
  namespace: kube-system
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

将上述 YAML 文件保存到节点的 `/etc/kubernetes/manifests` 目录中后，kubelet 会自动检测到该文件并创建对应的 Pod。

### 使用场景

Static Pod 通常用于以下场景：

1. **Kubernetes 控制平面组件**：
   - 部署和管理 Kubernetes 控制平面组件（如 etcd、kube-apiserver、kube-controller-manager 和 kube-scheduler），这些组件必须在集群启动时运行，不能依赖于 Kubernetes 自身来管理。

2. **集群启动和恢复**：
   - 在集群启动或恢复过程中，使用 Static Pod 确保关键组件能够独立于 Kubernetes API Server 和 etcd 正常启动。

3. **简化的节点管理**：
   - 在一些简化的集群管理方案中，可能会使用 Static Pod 来运行节点级别的服务或代理，而不依赖于 Kubernetes 控制器。

### 监控和管理

由于 Static Pod 由 kubelet 直接管理，因此它们的一些管理和监控操作与普通 Pod 略有不同：

- **日志查看**：你仍然可以使用 `kubectl logs` 命令查看 Static Pod 的日志。
- **状态检查**：可以使用 `kubectl get pod -n kube-system` 命令查看 Static Pod 的状态。
- **更新 Pod**：要更新 Static Pod，需要手动编辑对应的 YAML 文件，kubelet 会自动检测到文件的变化并重新创建 Pod。

Static Pod 是 Kubernetes 提供的一种灵活机制，用于确保关键组件的高可用性和独立性，是集群稳定运行的关键保障之一。