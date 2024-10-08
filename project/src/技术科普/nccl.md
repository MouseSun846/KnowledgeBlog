---
date: 2024-09-29
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