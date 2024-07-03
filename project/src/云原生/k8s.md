---
date: 2024-07-03
title: k8s知识点
category:
  - k8s
tag:
  - 笔记
---
k8s 笔记总结

# pv
## 访问模式（Access Modes）
Kubernetes支持的访问模式如下。
* ReadWriteOnce（RWO）：读写权限，并且只能被单个Node挂
载。

* ReadOnlyMany（ROX）：只读权限，允许被多个Node挂载。
S
* ReadWriteMany（RWX）：读写权限，允许被多个Node挂载。
  
某些PV可能支持多种访问模式，但PV在挂载时只能使用一种访问模式，多种访问模式不能同时生效。

## 回收策略（Reclaim Policy）
Kubernetes支持的回收策略如下。
* Retain：保留数据，需要手工处理。
* Recycle：简单清除文件的操作。
* Delete：与PV相连的后端存储完成Volume的删除操作。

目前只有NFS和HostPath两种类型的PV支持Recycle策略；
AWSElasticBlockStore、GCEPersistentDisk、AzureDisk和Cinder类型的PV支持Delete策略。

## pv (STATUS)
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
