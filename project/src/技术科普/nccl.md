---
date: 2024-10-08
title: nccl
category:
  - nccl
tag:
  - nccl
---

::: tip nccl
:::


## nccl

NCCL是一款独立的库，提供标准的 GPU 通信例程，支持全规约（all-reduce）、全收集（all-gather）、规约（reduce）、广播（broadcast）、规约并散播（reduce-scatter）以及任意基于发送/接收的通信模式。该库经过优化，能够在使用 PCIe、NVLink、NVSwitch 以及基于 InfiniBand Verbs 或 TCP/IP 套接字的网络平台上实现高带宽。NCCL 支持任意数量的 GPU，无论是安装在单节点还是跨多个节点的系统中，并且可以在单进程或多进程（如 MPI）应用程序中使用。

NCCL 概述  
NVIDIA 集体通信库（NCCL，发音为“Nickel”）是一个库，提供拓扑感知的 GPU 间通信原语，能够方便地集成到应用程序中。

NCCL 实现了集体通信和点对点发送/接收原语。它不是一个完整的并行编程框架，而是一个专注于加速 GPU 间通信的库。

NCCL 提供以下集体通信原语：
- AllReduce（全规约）
- Broadcast（广播）
- Reduce（规约）
- AllGather（全收集）
- ReduceScatter（规约并散播）

此外，它还支持点对点发送/接收通信，允许实现 scatter、gather 或 all-to-all 操作。

在集体通信中，通信处理器之间的紧密同步是关键。传统上，基于 CUDA 的集体操作通常通过 CUDA 内存拷贝操作和 CUDA 核函数结合本地规约来实现。而 NCCL 则将每个集体操作实现为一个处理通信和计算操作的单一核函数。这样可以实现快速同步，并最大限度地减少达到峰值带宽所需的资源。

NCCL 方便地免除了开发人员为特定机器优化应用程序的需求。NCCL 在多个 GPU 之间提供快速的集体通信，无论是在单个节点内还是跨节点。它支持多种互连技术，包括 PCIe、NVLINK、InfiniBand Verbs 和 IP 套接字。

除了性能，简便的编程体验也是 NCCL 设计的主要考虑因素之一。NCCL 使用简单的 C API，可以轻松通过多种编程语言访问。NCCL 紧密遵循 MPI（消息传递接口）定义的流行集体操作 API，因此熟悉 MPI 的用户会发现 NCCL 的 API 非常容易使用。与 MPI 略有不同的是，NCCL 的集体操作带有一个“流”参数，使其能够直接与 CUDA 编程模型集成。最后，NCCL 几乎兼容任何多 GPU 并行化模型，例如：

- 单线程控制所有 GPU
- 多线程（例如，每个 GPU 一个线程）
- 多进程（例如，MPI）

NCCL 在深度学习框架中有着广泛的应用，AllReduce 集体操作在神经网络训练中被广泛使用。通过 NCCL 提供的多 GPU 和多节点通信，可以实现神经网络训练的高效扩展。

NCCL 是一个通信库，提供用于高性能应用的 GPU 间优化通信。与 MPI 不同，NCCL 不提供并行环境，也不包含进程启动器和管理器。因此，NCCL 依赖于应用程序的进程管理系统和 CPU 端的通信系统来进行自启动。

与 MPI 和其他为性能优化的库类似，NCCL 不提供 GPU 之间的安全网络通信。因此，用户有责任确保 NCCL 在安全的网络上运行，无论是在自启动阶段（由 NCCL_SOCKET_IFNAME 控制）还是在高速通信过程中。

### 下载源码

```
git clone https://github.com/NVIDIA/nccl-tests.git 
```

### 构建编译

* 修改换行格式 LF

  ```
  src\device\generate.py

  src\device\Makefile

  ```
* 编译并安装
  ```
   make -j src.build
   make install
  ```
* 构建产物如下
  ```
  ├── include
  │   ├── nccl.h
  │   └── nccl_net.h
  ├── lib
      ├── libnccl.so -> libnccl.so.2
      ├── libnccl.so.2 -> libnccl.so.2.23.4
      ├── libnccl.so.2.23.4
      ├── libnccl_static.a
      └── pkgconfig
          └── nccl.pc
  ```

## nccl-test

### 下载

```
git clone https://github.com/NVIDIA/nccl-tests.git
```

### 编译
```
cd nccl-tests 
make
```

### 运行
```
export NCCL_DEBUG=TRACE
./build/all_reduce_perf -b 8 -e 8M -f 2 -g 1


(base) root@DESKTOP-P54EAF3:/mnt/d/Code/nccl-tests# ./build/all_reduce_perf -b 8 -e 8M -f 2 -g 1
# nThread 1 nGpus 1 minBytes 8 maxBytes 8388608 step: 2(factor) warmup iters: 5 iters: 20 agg iters: 1 validation: 1 graph: 0
#
# Using devices
#  Rank  0 Group  0 Pid  58239 on DESKTOP-P54EAF3 device  0 [0x01] NVIDIA GeForce GTX 1660 SUPER
DESKTOP-P54EAF3:58239:58239 [0] NCCL INFO Bootstrap : Using eth0:172.26.190.235<0>
DESKTOP-P54EAF3:58239:58239 [0] NCCL INFO cudaDriverVersion 12050
DESKTOP-P54EAF3:58239:58239 [0] NCCL INFO NCCL version 2.23.4+cuda12.1
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO NET/Plugin: Could not find: libnccl-net.so. Using internal network plugin.
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Failed to open libibverbs.so[.1]
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO NET/Socket : Using [0]eth0:172.26.190.235<0> [1]br-eaee979aadb0:172.19.0.1<0> [2]vethd14a450:fe80::c821:6bff:fea5:dcf9%vethd14a450<0> [3]vethc5ec3b7:fe80::74f5:23ff:fe0a:3d6d%vethc5ec3b7<0>
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO PROFILER/Plugin: Could not find: libnccl-profiler.so.
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Using network Socket
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO ncclCommInitAll comm 0x559205409610 rank 0 nranks 1 cudaDev 0 nvmlDev 0 busId 1000 commId 0x89b784d33d72ebbb - Init START
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Bootstrap timings total 0.000344 (create 0.000019, send 0.000105, recv 0.000096, ring 0.000000, delay 0.000000)
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO comm 0x559205409610 rank 0 nRanks 1 nNodes 1 localRanks 1 localRank 0 MNNVL 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 00/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 01/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 02/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 03/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 04/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 05/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 06/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 07/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 08/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 09/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 10/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 11/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 12/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 13/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 14/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 15/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 16/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 17/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 18/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 19/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 20/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 21/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 22/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 23/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 24/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 25/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 26/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 27/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 28/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 29/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 30/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 31/32 : 0
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Trees [0] -1/-1/-1->0->-1 [1] -1/-1/-1->0->-1 [2] -1/-1/-1->0->-1 [3] -1/-1/-1->0->-1 [4] -1/-1/-1->0->-1 [5] -1/-1/-1->0->-1 [6] -1/-1/-1->0->-1 [7] -1/-1/-1->0->-1 [8] -1/-1/-1->0->-1 [9] -1/-1/-1->0->-1 [10] -1/-1/-1->0->-1 [11] -1/-1/-1->0->-1 [12] -1/-1/-1->0->-1 [13] -1/-1/-1->0->-1 [14] -1/-1/-1->0->-1 [15] -1/-1/-1->0->-1 [16] -1/-1/-1->0->-1 [17] -1/-1/-1->0->-1 [18] -1/-1/-1->0->-1 [19] -1/-1/-1->0->-1 [20] -1/-1/-1->0->-1 [21] -1/-1/-1->0->-1 [22] -1/-1/-1->0->-1 [23] -1/-1/-1->0->-1 [24] -1/-1/-1->0->-1 [25] -1/-1/-1->0->-1 [26] -1/-1/-1->0->-1 [27] -1/-1/-1->0->-1 [28] -1/-1/-1->0->-1 [29] -1/-1/-1->0->-1 [30] -1/-1/-1->0->-1 [31] -1/-1/-1->0->-1
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO P2P Chunksize set to 131072
DESKTOP-P54EAF3:58239:58246 [0] NCCL INFO [Proxy Service] Device 0 CPU core 8
DESKTOP-P54EAF3:58239:58247 [0] NCCL INFO [Proxy Service UDS] Device 0 CPU core 11
DESKTOP-P54EAF3:58239:58248 [0] NCCL INFO [Proxy Progress] Device 0 CPU core 14
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO 32 coll channels, 32 collnet channels, 0 nvls channels, 32 p2p channels, 32 p2p channels per peer
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO CC Off, Multi-GPU CC Off, workFifoBytes 1048576
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO TUNER/Plugin: Could not find: libnccl-tuner.so libnccl-net.so. Using internal tuner plugin.
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO ncclCommInitAll comm 0x559205409610 rank 0 nranks 1 cudaDev 0 nvmlDev 0 busId 1000 commId 0x89b784d33d72ebbb - Init COMPLETE
DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Init timings - ncclCommInitAll: rank 0 nranks 1 total 0.22 (kernels 0.15, alloc 0.05, bootstrap 0.00, allgathers 0.00, topo 0.00, graphs 0.00, connections 0.01, rest 0.00) 
#
#                                                              out-of-place                       in-place
#       size         count      type   redop    root     time   algbw   busbw #wrong     time   algbw   busbw #wrong
#        (B)    (elements)                               (us)  (GB/s)  (GB/s)            (us)  (GB/s)  (GB/s)
           8             2     float     sum      -1     9.32    0.00    0.00      0     0.14    0.06    0.00      0
          16             4     float     sum      -1    14.29    0.00    0.00      0     0.15    0.11    0.00      0
          32             8     float     sum      -1    12.24    0.00    0.00      0     0.15    0.22    0.00      0
          64            16     float     sum      -1    14.00    0.00    0.00      0     0.15    0.44    0.00      0
         128            32     float     sum      -1    11.98    0.01    0.00      0     1.06    0.12    0.00      0
         256            64     float     sum      -1    11.72    0.02    0.00      0     0.15    1.71    0.00      0
         512           128     float     sum      -1    13.87    0.04    0.00      0     0.15    3.53    0.00      0
        1024           256     float     sum      -1    13.81    0.07    0.00      0     0.15    6.83    0.00      0
        2048           512     float     sum      -1    17.77    0.12    0.00      0     0.15   13.65    0.00      0
        4096          1024     float     sum      -1    14.04    0.29    0.00      0     0.15   28.25    0.00      0
        8192          2048     float     sum      -1    13.54    0.61    0.00      0     0.15   54.61    0.00      0
       16384          4096     float     sum      -1    11.61    1.41    0.00      0     0.15  109.23    0.00      0
       32768          8192     float     sum      -1    13.64    2.40    0.00      0     0.15  218.45    0.00      0
       65536         16384     float     sum      -1    15.48    4.23    0.00      0     0.13  504.12    0.00      0
      131072         32768     float     sum      -1    23.09    5.68    0.00      0     0.13  1008.25    0.00      0
      262144         65536     float     sum      -1    25.09   10.45    0.00      0     0.14  1872.46    0.00      0
      524288        131072     float     sum      -1    26.29   19.94    0.00      0     0.15  3615.78    0.00      0
     1048576        262144     float     sum      -1    20.98   49.98    0.00      0     0.16  6553.60    0.00      0
     2097152        524288     float     sum      -1    26.15   80.20    0.00      0     0.16  13530.01    0.00      0
     4194304       1048576     float     sum      -1    37.97  110.46    0.00      0     0.15  27962.03    0.00      0
     8388608       2097152     float     sum      -1    66.97  125.27    0.00      0     0.14  59918.63    0.00      0
DESKTOP-P54EAF3:58239:58239 [0] NCCL INFO comm 0x559205409610 rank 0 nranks 1 cudaDev 0 busId 1000 - Destroy COMPLETE
# Out of bounds values : 0 OK
# Avg bus bandwidth    : 0
#
```

### 参数

所有测试支持相同的一组参数：

* GPU 数量
  * `-t,--nthreads <线程数>` 每个进程的线程数。默认值：1。
  * `-g,--ngpus <每个线程的 GPU 数量>` 每个线程使用的 GPU 数量。默认值：1。
* 扫描的大小范围
  * `-b,--minbytes <最小字节数>` 开始的最小大小。默认值：32M。
  * `-e,--maxbytes <最大字节数>` 结束的最大大小。默认值：32M。
  * 递增方式可以是固定递增或乘法因子。仅应使用其中一种方式：
    * `-i,--stepbytes <递增字节数>` 各大小之间的固定增量。默认值：1M。
    * `-f,--stepfactor <递增因子>` 各大小之间的乘法因子。默认值：禁用。
* NCCL 操作参数
  * `-o,--op <sum/prod/min/max/avg/all>` 指定执行哪种规约操作。仅对 Allreduce、Reduce 或 ReduceScatter 等规约操作有效。默认值：Sum（求和）。
  * `-d,--datatype <nccltype/all>` 指定使用哪种数据类型。默认值：Float（浮点数）。
  * `-r,--root <root/all>` 指定使用哪个 root，仅对有 root 的操作（如广播或规约）有效。默认值：0。
* 性能参数
  * `-n,--iters <迭代次数>` 迭代次数。默认值：20。
  * `-w,--warmup_iters <预热迭代次数>` 预热迭代次数（不计时）。默认值：5。
  * `-m,--agg_iters <聚合次数>` 每次迭代中聚合在一起的操作次数。默认值：1。
  * `-N,--run_cycles <循环次数>` 运行并打印每个循环。默认值：1；0=无限循环。
  * `-a,--average <0/1/2/3>` 将性能报告为所有节点的平均值（仅适用于 MPI=1）。<0=Rank0, 1=平均, 2=最小, 3=最大>。默认值：1（平均）。
* 测试操作
  * `-p,--parallel_init <0/1>` 使用线程并行初始化 NCCL。默认值：0。
  * `-c,--check <检查迭代次数>` 执行指定次数的迭代，每次迭代都检查结果的正确性。对于大量 GPU 来说，这可能非常慢。默认值：1。
  * `-z,--blocking <0/1>` 使 NCCL 操作阻塞，即在每次操作后等待并同步 CPU。默认值：0。
  * `-G,--cudagraph <CUDA 图启动次数>` 将迭代捕获为 CUDA 图，然后重复指定次数。默认值：0。
  * `-C,--report_cputime <0/1>` 报告 CPU 时间而非延迟。默认值：0。
  * `-R,--local_register <1/0>` 在发送/接收缓冲区上启用本地缓冲区注册。默认值：0。
  * `-T,--timeout <超时时间（秒）>` 在指定秒数后对每个测试进行超时。默认值：禁用。


```
def get_group_rank(group: ProcessGroup, global_rank: int) -> int:
    """
    Translate a global rank into a group rank.

    ``global_rank`` must be part of ``group`` otherwise this raises RuntimeError.

    Args:
        group (ProcessGroup): ProcessGroup to find the relative rank.
        global_rank (int): Global rank to query.

    Returns:
        Group rank of ``global_rank`` relative to ``group``

    N.B. calling this function on the default process group returns identity
    """
    if group is GroupMember.WORLD:
        return global_rank
    if group not in _world.pg_group_ranks:
        raise ValueError(
            f"Group {group} is not registered, please create group with torch.distributed.new_group API"
        )
    group_ranks = _world.pg_group_ranks[group]
    if global_rank not in group_ranks:
        raise ValueError(f"Global rank {global_rank} is not part of group {group}")

    return group_ranks[global_rank]
```

这段代码的主要功能是将一个全局的 rank 转换为在某个进程组中的 rank。它实现了在分布式训练中，通过全局 rank 查询某个特定进程组内的相对 rank。如果 `global_rank` 不在给定的进程组 `group` 中，该函数会抛出 `ValueError` 异常。

### 具体工作原理

1. **判断是否为默认进程组**：
   - 如果 `group` 是默认的进程组 `GroupMember.WORLD`，则直接返回 `global_rank`，因为默认进程组中的 rank 就是全局 rank，保持不变。
   
2. **检查组是否注册**：
   - 如果 `group` 没有在 `_world.pg_group_ranks` 中找到，则抛出异常。`_world.pg_group_ranks` 存储了所有创建的进程组及其对应的 ranks。

3. **检查全局 rank 是否在该组中**：
   - 如果 `global_rank` 不在 `group_ranks` 列表中，抛出异常。`group_ranks` 保存了 `group` 中的全局 rank 映射。

4. **返回相对 rank**：
   - 最终根据 `group_ranks` 返回 `global_rank` 在 `group` 中的相对 rank。

### 参数说明：
- `group (ProcessGroup)`：PyTorch 分布式的进程组，通常由 `torch.distributed.new_group` 创建。
- `global_rank (int)`：全局 rank 值，通常是指分布式训练中全局进程的编号。

### 返回：
- 返回值是 `global_rank` 在指定 `group` 中的 rank。

### 代码解释：
```python
if group is GroupMember.WORLD:
    return global_rank
```
- 这段代码检查传入的 `group` 是否是默认的全局进程组。如果是的话，`global_rank` 和相对 rank 是一致的，直接返回。

```python
if group not in _world.pg_group_ranks:
    raise ValueError(
        f"Group {group} is not registered, please create group with torch.distributed.new_group API"
    )
```
- 这里检查是否传入的 `group` 已经被注册到 `_world.pg_group_ranks` 中。如果没有注册，则抛出 `ValueError`，并提示用户需要通过 `torch.distributed.new_group` 来创建该组。

```python
group_ranks = _world.pg_group_ranks[group]
if global_rank not in group_ranks:
    raise ValueError(f"Global rank {global_rank} is not part of group {group}")
```
- 这段代码从 `_world.pg_group_ranks` 获取当前 `group` 的所有全局 rank。如果 `global_rank` 不在该组中，则抛出异常。

```python
return group_ranks[global_rank]
```
- 最终返回 `global_rank` 在 `group` 中的相对 rank。

### 应用场景
此功能非常适用于在分布式训练中处理多个进程组的情况，用户可以轻松找到某个全局 rank 在特定组内的 rank，从而进行更细粒度的进程控制或通信。


## torch/cuda/nccl.py
```
# `output` used to be `outputs`, taking in a list of tensors. So we have two
# arguments for BC reasons.
def reduce(
    inputs: Sequence[torch.Tensor],
    output: Optional[Union[torch.Tensor, Sequence[torch.Tensor]]] = None,
    root: int = 0,
    op: int = SUM,
    streams: Optional[Sequence[torch.cuda.Stream]] = None,
    comms=None,
    *,
    outputs: Optional[Sequence[torch.Tensor]] = None,
) -> None:
    _check_sequence_type(inputs)
    _output: torch.Tensor
    if outputs is not None:
        if output is not None:
            raise ValueError(
                "'output' and 'outputs' can not be both specified. 'outputs' is deprecated in "
                "favor of 'output', taking in a single output tensor. The signature of reduce is: "
                "reduce(inputs, output=None, root=0, op=SUM, streams=None, comms=None)."
            )
        else:
            warnings.warn(
                "`nccl.reduce` with an output tensor list is deprecated. "
                "Please specify a single output tensor with argument 'output' instead instead.",
                FutureWarning,
                stacklevel=2,
            )
            _output = outputs[root]
    elif not isinstance(output, torch.Tensor) and isinstance(
        output, collections.abc.Sequence
    ):
        # User called old API with positional arguments of list of output tensors.
        warnings.warn(
            "nccl.reduce with an output tensor list is deprecated. "
            "Please specify a single output tensor.",
            FutureWarning,
            stacklevel=2,
        )
        _output = output[root]
    else:
        _output = inputs[root] if output is None else output
    torch._C._nccl_reduce(inputs, _output, root, op, streams, comms)
```
这段代码实现了 `reduce` 函数的分布式操作，用于将多个 GPU 的张量根据某种操作（如求和）合并到一个目标张量中，特别是在使用 PyTorch 的 NCCL 后端时。这是常见的分布式通信操作，例如在多卡训练中汇总各个设备上的张量。

### 核心功能
该函数通过调用 `torch._C._nccl_reduce` 来实现具体的 `reduce` 操作，该函数执行 GPU 间张量的归约（如求和、乘积等操作），并将结果存储在某个 root 节点的目标张量中。

### 参数解析

1. **inputs**: 
   - `Sequence[torch.Tensor]`，表示输入的张量序列，来自不同的 GPU。每个张量包含设备上局部计算的结果。

2. **output**:
   - `Optional[Union[torch.Tensor, Sequence[torch.Tensor]]]`，可选参数，用于存放归约操作的结果。如果没有提供，将使用 root 节点上的输入张量。

3. **root**:
   - `int`，表示哪个 GPU 作为 root，将接收所有 GPU 的归约结果。默认是 `0`。

4. **op**:
   - `int`，指定归约操作，默认为 `SUM`（加法）。其它可能的操作有 `PROD`（乘法）、`MIN`（最小值）、`MAX`（最大值）等。

5. **streams**:
   - `Optional[Sequence[torch.cuda.Stream]]`，可以为每个 GPU 提供 CUDA 流，方便在不同 CUDA 流上进行归约操作。默认为空，即使用默认流。

6. **comms**:
   - 可选的通信器对象，负责管理 GPU 间的通信。

7. **outputs**:
   - `Optional[Sequence[torch.Tensor]]`，这是一个过时参数，用于指定多个输出张量的列表。新的 API 只需要传入一个单一的 `output`，如果同时传入 `outputs` 和 `output`，则会报错。

### 核心逻辑

1. **处理参数的兼容性**:
   - 首先检查 `inputs` 的类型是否正确。接着处理参数 `outputs` 和 `output` 的兼容性，确保两者不会同时传入。如果用户使用了旧版 API (`outputs`)，会抛出警告，提醒用户该功能将被弃用。

2. **处理旧 API**:
   - 如果 `output` 是一个张量序列而不是单个张量，函数会继续支持这种旧的用法，但是同样会抛出警告，提示用户迁移到新的 API。

3. **调用底层 NCCL 函数**:
   - 最后，函数调用 `torch._C._nccl_reduce` 执行真正的张量归约操作，使用给定的 `inputs`、`_output`、`root`、`op` 和其他可选参数。

### 示例

假设我们在分布式训练中使用 4 个 GPU，执行 `reduce` 操作：

```python
inputs = [torch.tensor([1.0]).cuda(i) for i in range(4)]  # 各个 GPU 上的张量
output = torch.tensor([0.0]).cuda(0)  # root GPU 上的输出张量

reduce(inputs, output=output, root=0)
print(output)  # 输出归约后的结果
```

这段代码将各个 GPU 上的张量相加，并将结果存储在 root GPU（GPU 0）的 `output` 张量中。    


## torch/csrc/cuda/python_nccl.cpp
```
PyObject* THCPModule_nccl_reduce(PyObject* self, PyObject* args) {
  HANDLE_TH_ERRORS
  PyObject *_inputs = nullptr, *_output = nullptr, *_streams = nullptr,
           *_comms = nullptr;
  int root = 0, op = 0;

  if (!PyArg_ParseTuple(
          args, "OOiiOO", &_inputs, &_output, &root, &op, &_streams, &_comms)) {
    THPUtils_invalidArguments(
        args,
        nullptr,
        "nccl_reduce",
        1,
        "(sequence[Tensor] inputs, Tensor output, int root,"
        " int op, sequence[torch.cuda.Stream or None]");
    return nullptr;
  }

  std::vector<at::Tensor> inputs = extract_tensors(_inputs);
  auto output = extract_tensor(_output);
  std::vector<std::optional<at::cuda::CUDAStream>> streams =
      unpack_streams(_streams, inputs.size());
  auto user_comms = unpack_comms(_comms, inputs.size());

  {
    pybind11::gil_scoped_release no_gil;
    torch::cuda::nccl::reduce(inputs, output, root, op, streams, user_comms);
  }

  Py_RETURN_NONE;
  END_HANDLE_TH_ERRORS
}
```

上述代码是 PyTorch 中一个 C++ 函数，它通过 Python 的 C API 实现了 NCCL `reduce` 操作的接口。这个函数可以在 Python 中调用，从而完成 NCCL 的 `reduce` 操作。NCCL（NVIDIA Collective Communications Library）是一种用于多 GPU 间高效通信的库，特别适用于深度学习框架中的集体通信操作，如 `reduce`、`allreduce` 等。

### 代码解析

1. **函数定义**:
   ```cpp
   PyObject* THCPModule_nccl_reduce(PyObject* self, PyObject* args)
   ```
   这是一个 Python C API 的函数，`PyObject*` 是 Python 对象的通用类型，`self` 通常指模块对象，而 `args` 是从 Python 传递给这个函数的参数。

2. **参数解析**:
   ```cpp
   if (!PyArg_ParseTuple(
           args, "OOiiOO", &_inputs, &_output, &root, &op, &_streams, &_comms))
   ```
   `PyArg_ParseTuple` 用于从 Python 参数 `args` 中解析出输入的值。格式化字符串 `"OOiiOO"` 表示该函数期望接收的参数类型依次是：
   - `O`: Python 对象（`_inputs`）
   - `O`: Python 对象（`_output`）
   - `i`: 整数（`root`，指定哪个 GPU 是 root 节点）
   - `i`: 整数（`op`，指定 NCCL 操作类型，如 `SUM` 或 `MAX` 等）
   - `O`: Python 对象（`_streams`）
   - `O`: Python 对象（`_comms`，通信对象）
   
   如果参数无法解析，将返回 `nullptr`，并抛出错误。

3. **参数转换**:
   - `extract_tensors(_inputs)` 和 `extract_tensor(_output)` 是从 Python 对象中提取张量的自定义函数。
   - `unpack_streams(_streams, inputs.size())` 是将 `streams` 从 Python 对象中解包成 `CUDAStream` 对象。
   - `unpack_comms(_comms, inputs.size())` 同样用于将通信器对象解包。

4. **释放 GIL 锁**:
   ```cpp
   pybind11::gil_scoped_release no_gil;
   ```
   `pybind11::gil_scoped_release` 用于释放 Python 的全局解释器锁（GIL），允许并行执行。因为 NCCL 操作是 GPU 通信操作，可能耗时较长，所以在执行这些操作前释放 GIL 是必要的。

5. **调用 NCCL `reduce`**:
   ```cpp
   torch::cuda::nccl::reduce(inputs, output, root, op, streams, user_comms);
   ```
   调用了 PyTorch CUDA 模块中的 NCCL `reduce` 函数，将输入张量 `inputs` 通过 NCCL 通信操作聚合成 `output` 张量，`root` 指定了哪块 GPU 是主节点（负责聚合结果），`op` 指定了操作类型，如 `SUM`。

6. **返回 `None`**:
   ```cpp
   Py_RETURN_NONE;
   ```
   函数完成后，返回 `None`，表示没有返回值。

7. **错误处理**:
   - `HANDLE_TH_ERRORS` 和 `END_HANDLE_TH_ERRORS` 是用于捕获和处理 C++ 异常的宏。如果在函数执行过程中发生异常，它们将自动捕捉并将错误报告给 Python 层。

### 总结

此函数的作用是在 Python 层提供了 NCCL `reduce` 操作的接口，允许用户在 Python 中调用 NCCL 底层的 C++ 实现，以高效地在多 GPU 间进行通信和数据聚合。整个过程中，C++ 代码负责参数解析、执行 NCCL 操作并返回结果，而 Python 代码则以封装的方式调用这些底层实现。这种模式在深度学习框架中非常常见，尤其是在需要加速的分布式训练场景下。



## torch/csrc/cuda/Module.cpp
```
#ifdef USE_NCCL
    {"_nccl_version", THCPModule_nccl_version, METH_NOARGS, nullptr},
    {"_nccl_version_suffix",
     THCPModule_nccl_version_suffix,
     METH_NOARGS,
     nullptr},
    {"_nccl_unique_id", THCPModule_nccl_unique_id, METH_NOARGS, nullptr},
    {"_nccl_init_rank", THCPModule_nccl_init_rank, METH_VARARGS, nullptr},
    {"_nccl_reduce", THCPModule_nccl_reduce, METH_VARARGS, nullptr},
    {"_nccl_all_reduce", THCPModule_nccl_all_reduce, METH_VARARGS, nullptr},
    {"_nccl_broadcast", THCPModule_nccl_broadcast, METH_VARARGS, nullptr},
    {"_nccl_all_gather", THCPModule_nccl_all_gather, METH_VARARGS, nullptr},
    {"_nccl_reduce_scatter",
     THCPModule_nccl_reduce_scatter,
     METH_VARARGS,
     nullptr},
#endif
```

这段代码是 PyTorch 的 C++ 代码片段，主要用于注册与 NCCL（NVIDIA Collective Communications Library）相关的 Python API 函数。通过这些函数，用户可以在 Python 中调用 NCCL 的功能，如初始化 NCCL、执行集合操作等。下面是对代码的逐行分析：

### 代码结构和功能

```cpp
#ifdef USE_NCCL
```
- 这一行使用条件编译指令来检查是否启用了 NCCL 支持。如果编译时定义了 `USE_NCCL`，则编译器会包含以下代码块。

```cpp
    {"_nccl_version", THCPModule_nccl_version, METH_NOARGS, nullptr},
```
- 这一行注册了 `_nccl_version` 函数，该函数将返回 NCCL 的版本信息。`METH_NOARGS` 表示该函数不接受任何参数。

```cpp
    {"_nccl_version_suffix", THCPModule_nccl_version_suffix, METH_NOARGS, nullptr},
```
- 注册了 `_nccl_version_suffix` 函数，返回 NCCL 版本的后缀。

```cpp
    {"_nccl_unique_id", THCPModule_nccl_unique_id, METH_NOARGS, nullptr},
```
- 注册了 `_nccl_unique_id` 函数，用于生成 NCCL 的唯一标识符（Unique ID）。

```cpp
    {"_nccl_init_rank", THCPModule_nccl_init_rank, METH_VARARGS, nullptr},
```
- 注册了 `_nccl_init_rank` 函数，接受参数并用于初始化 NCCL 通信。

```cpp
    {"_nccl_reduce", THCPModule_nccl_reduce, METH_VARARGS, nullptr},
```
- 注册了 `_nccl_reduce` 函数，用于执行 NCCL 的 reduce 操作，接受一组输入张量和输出张量。

```cpp
    {"_nccl_all_reduce", THCPModule_nccl_all_reduce, METH_VARARGS, nullptr},
```
- 注册了 `_nccl_all_reduce` 函数，用于执行所有进程的 reduce 操作。

```cpp
    {"_nccl_broadcast", THCPModule_nccl_broadcast, METH_VARARGS, nullptr},
```
- 注册了 `_nccl_broadcast` 函数，用于执行广播操作，将数据从一个进程传递到所有其他进程。

```cpp
    {"_nccl_all_gather", THCPModule_nccl_all_gather, METH_VARARGS, nullptr},
```
- 注册了 `_nccl_all_gather` 函数，用于收集所有进程的数据到每个进程中。

```cpp
    {"_nccl_reduce_scatter", THCPModule_nccl_reduce_scatter, METH_VARARGS, nullptr},
```
- 注册了 `_nccl_reduce_scatter` 函数，用于执行 reduce scatter 操作，将数据先进行 reduce，然后再分散到所有进程。

### 总结
这段代码负责将 NCCL 的相关操作函数注册到 PyTorch 的 Python 接口中。这样用户在使用 PyTorch 时，可以方便地调用这些 NCCL 的操作来进行高效的多GPU并行计算。这种设计使得 PyTorch 的 CUDA 加速功能与 NCCL 库的集体通信能力紧密集成。



## torch\_dynamo\trace_rules.py
```
def _load_obj_from_str(fully_qualified_name):
    module, obj_name = fully_qualified_name.rsplit(".", maxsplit=1)
    return getattr(importlib.import_module(module), obj_name)
```

这个 Python 函数 `_load_obj_from_str` 用于根据一个完全限定的对象名称（通常是模块路径和对象名称的组合）动态地加载模块中的对象。下面是对该函数的逐行分析：

### 代码解析

```python
def _load_obj_from_str(fully_qualified_name):
```
- 定义了一个名为 `_load_obj_from_str` 的函数，接受一个参数 `fully_qualified_name`，这是一个字符串，包含模块路径和对象名称，例如 `module.submodule.ClassName`。

```python
    module, obj_name = fully_qualified_name.rsplit(".", maxsplit=1)
```
- 使用 `rsplit` 方法将 `fully_qualified_name` 从右侧分割成模块名和对象名。`maxsplit=1` 参数确保只分割一次，这样得到的 `module` 是模块路径，而 `obj_name` 是模块中的对象名称。

```python
    return getattr(importlib.import_module(module), obj_name)
```
- 使用 `importlib.import_module` 动态导入指定的模块。
- 使用 `getattr` 从导入的模块中获取指定的对象，返回这个对象。

### 示例用法

假设你有一个模块结构如下：

```plaintext
my_package/
    __init__.py
    my_module.py
```

`my_module.py` 内容如下：

```python
class MyClass:
    def greet(self):
        return "Hello, world!"
```

你可以通过以下方式加载 `MyClass`：

```python
fully_qualified_name = "my_package.my_module.MyClass"
MyClass = _load_obj_from_str(fully_qualified_name)

instance = MyClass()
print(instance.greet())  # 输出: Hello, world!
```

### 总结

这个函数的主要作用是实现动态加载模块中的对象，允许你在运行时根据字符串路径获取对象。这种方法在需要根据配置文件或用户输入来加载类或函数时非常有用。



```
#include <Python.h>

extern PyObject* initModule(void);

#ifndef _WIN32
#ifdef __cplusplus
extern "C"
#endif
__attribute__((visibility("default"))) PyObject* PyInit__C(void);
#endif

PyMODINIT_FUNC PyInit__C(void)
{
  return initModule();
}
```
[python调用C/C++参考示例](https://zhuanlan.zhihu.com/p/647999983)

这段 C/C++ 代码片段展示了一个用于初始化 Python 扩展模块的函数实现。在 Python 中，C 扩展模块需要实现一个模块初始化函数，它会在 Python 加载模块时被调用。这段代码的主要目的是将 `initModule` 函数作为 Python 模块的初始化函数，并通过兼容不同平台的方式导出。

### 代码解析

1. **`extern PyObject* initModule(void);`**:
   - 声明了一个外部的 C 函数 `initModule`，它返回一个 `PyObject*`，用于初始化模块。这个函数可能在别的地方定义，并负责创建和初始化模块对象。

2. **平台相关宏控制**:
   - `#ifndef _WIN32`：如果不是 Windows 平台，则会编译接下来的代码，这表明这个部分主要是为非 Windows 平台准备的。
   - `#ifdef __cplusplus` 和 `extern "C"`：如果是在 C++ 中编译，这一部分会通过 `extern "C"` 指定 C 语言链接方式，确保 Python 模块能够以 C 语言的符号表被正确识别。
   - `__attribute__((visibility("default")))`：用于控制符号的可见性。它保证了 `PyInit__C` 函数在共享库中对外可见（动态链接时需要）。

3. **`PyMODINIT_FUNC PyInit__C(void)`**:
   - `PyMODINIT_FUNC` 是一个宏，通常定义为 `extern "C"`，它用于标识 Python 扩展模块的初始化函数。
   - Python 期望扩展模块的初始化函数遵循特定的命名规范。在 Python 3 中，初始化函数的名称应为 `PyInit_<module_name>`，这里是 `PyInit__C`，意味着 Python 加载的模块名称为 `_C`。
   - 这个函数返回一个 `PyObject*`，即模块对象，这个对象是通过调用 `initModule()` 获得的。

### 典型应用

这种模块初始化机制在 C 扩展模块中很常见，特别是在涉及到 Python 与 C/C++ 互操作时。`initModule()` 通常会调用一系列的 C API 函数来创建 Python 对象，并将它们绑定到模块的命名空间中。

#### 示例解释

```c
PyMODINIT_FUNC PyInit__C(void)
{
  return initModule();
}
```

- 当 Python 导入 `_C` 模块时，Python 解释器会调用 `PyInit__C()` 函数。这个函数又调用了 `initModule()`，返回初始化后的模块对象。
- 这个模块对象包含了所有需要导出的 C 函数和对象，使得这些函数能够被 Python 调用。

### 总结

这段代码展示了如何在非 Windows 环境下创建一个 C 扩展模块的初始化函数。它将 `initModule` 作为模块的实际初始化逻辑，用于设置模块的内容，并通过 `PyInit__C` 函数将其导出给 Python 使用。



## nccl topo

```
#define NCCL_TOPO_MAX_NODES 256

// Init search. Needs to be done before calling ncclTopoCompute
ncclResult_t ncclTopoSearchInit(struct ncclTopoSystem* system);

#define NCCL_TOPO_PATTERN_BALANCED_TREE 1   // Spread NIC traffic between two GPUs (Tree parent + one child on first GPU, second child on second GPU)
#define NCCL_TOPO_PATTERN_SPLIT_TREE 2      // Spread NIC traffic between two GPUs (Tree parent on first GPU, tree children on the second GPU)
#define NCCL_TOPO_PATTERN_TREE 3            // All NIC traffic going to/from the same GPU
#define NCCL_TOPO_PATTERN_RING 4            // Ring
#define NCCL_TOPO_PATTERN_NVLS 5            // NVLS+SHARP and NVLS+Tree
#define NCCL_TOPO_PATTERN_COLLNET_DIRECT 6  // Collnet Direct
```

NCCL（NVIDIA Collective Communications Library）拓扑结构的定义和初始化。这些定义用于描述不同的通信模式以及节点间的互联方式，尤其是如何在GPU之间分配网络接口卡（NIC）流量的策略。

### 代码解析：
1. **`NCCL_TOPO_MAX_NODES 256`**：
   这个宏定义了NCCL拓扑结构支持的**最大节点数为256**。这里的节点可以是GPU或网络设备（如NIC），意味着NCCL拓扑在设计上最多支持256个节点的互联。这与前面提到的NCCL理论上支持256卡互联是一致的。

2. **`ncclTopoSearchInit(struct ncclTopoSystem* system)`**：
   这个函数用于初始化NCCL拓扑搜索过程，准备计算通信拓扑。在调用 `ncclTopoCompute` 之前，必须先调用这个函数以初始化系统结构。

3. **拓扑通信模式定义**：
   NCCL提供了多种通信模式（`TOPO_PATTERN`），这些模式定义了不同情况下网络流量如何在GPU之间分布：
   - **`NCCL_TOPO_PATTERN_BALANCED_TREE`** (1): 
     平衡树形结构，NIC流量分布在两个GPU之间。树的父节点和一个子节点在第一个GPU上，第二个子节点在第二个GPU上。
   - **`NCCL_TOPO_PATTERN_SPLIT_TREE`** (2):
     拆分树形结构，NIC流量分布在两个GPU之间。树的父节点在第一个GPU上，子节点都在第二个GPU上。
   - **`NCCL_TOPO_PATTERN_TREE`** (3):
     所有的NIC流量都集中在同一个GPU上。
   - **`NCCL_TOPO_PATTERN_RING`** (4):
     环形结构，流量在GPU之间按顺序传递。
   - **`NCCL_TOPO_PATTERN_NVLS`** (5):
     结合NVLS（NVIDIA Virtual Link Switch）和SHARP（Scalable Hierarchical Aggregation and Reduction Protocol）技术，进行通信优化。
   - **`NCCL_TOPO_PATTERN_COLLNET_DIRECT`** (6):
     CollNet直接通信模式，通常用于优化大规模集群中的点对点通信。

### 拓扑结构的意义：
这些不同的拓扑模式允许NCCL根据具体的硬件拓扑和通信需求，选择最优的通信模式，以最大化带宽利用率、减少延迟，并优化多GPU、多节点的分布式训练任务。尤其在超大规模GPU集群中（例如256个GPU互联的场景），选择合适的拓扑模式对性能有显著影响。

因此，在实际使用中，理解这些拓扑模式的定义，并结合硬件架构和通信需求，能够有效提升NCCL的通信性能。