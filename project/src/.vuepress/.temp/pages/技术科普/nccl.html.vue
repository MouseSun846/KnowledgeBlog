<template><div><div class="hint-container tip">
<p class="hint-container-title">nccl</p>
</div>
<h2 id="nccl" tabindex="-1"><a class="header-anchor" href="#nccl"><span>nccl</span></a></h2>
<p>NCCL是一款独立的库，提供标准的 GPU 通信例程，支持全规约（all-reduce）、全收集（all-gather）、规约（reduce）、广播（broadcast）、规约并散播（reduce-scatter）以及任意基于发送/接收的通信模式。该库经过优化，能够在使用 PCIe、NVLink、NVSwitch 以及基于 InfiniBand Verbs 或 TCP/IP 套接字的网络平台上实现高带宽。NCCL 支持任意数量的 GPU，无论是安装在单节点还是跨多个节点的系统中，并且可以在单进程或多进程（如 MPI）应用程序中使用。</p>
<p>NCCL 概述<br>
NVIDIA 集体通信库（NCCL，发音为“Nickel”）是一个库，提供拓扑感知的 GPU 间通信原语，能够方便地集成到应用程序中。</p>
<p>NCCL 实现了集体通信和点对点发送/接收原语。它不是一个完整的并行编程框架，而是一个专注于加速 GPU 间通信的库。</p>
<p>NCCL 提供以下集体通信原语：</p>
<ul>
<li>AllReduce（全规约）</li>
<li>Broadcast（广播）</li>
<li>Reduce（规约）</li>
<li>AllGather（全收集）</li>
<li>ReduceScatter（规约并散播）</li>
</ul>
<p>此外，它还支持点对点发送/接收通信，允许实现 scatter、gather 或 all-to-all 操作。</p>
<p>在集体通信中，通信处理器之间的紧密同步是关键。传统上，基于 CUDA 的集体操作通常通过 CUDA 内存拷贝操作和 CUDA 核函数结合本地规约来实现。而 NCCL 则将每个集体操作实现为一个处理通信和计算操作的单一核函数。这样可以实现快速同步，并最大限度地减少达到峰值带宽所需的资源。</p>
<p>NCCL 方便地免除了开发人员为特定机器优化应用程序的需求。NCCL 在多个 GPU 之间提供快速的集体通信，无论是在单个节点内还是跨节点。它支持多种互连技术，包括 PCIe、NVLINK、InfiniBand Verbs 和 IP 套接字。</p>
<p>除了性能，简便的编程体验也是 NCCL 设计的主要考虑因素之一。NCCL 使用简单的 C API，可以轻松通过多种编程语言访问。NCCL 紧密遵循 MPI（消息传递接口）定义的流行集体操作 API，因此熟悉 MPI 的用户会发现 NCCL 的 API 非常容易使用。与 MPI 略有不同的是，NCCL 的集体操作带有一个“流”参数，使其能够直接与 CUDA 编程模型集成。最后，NCCL 几乎兼容任何多 GPU 并行化模型，例如：</p>
<ul>
<li>单线程控制所有 GPU</li>
<li>多线程（例如，每个 GPU 一个线程）</li>
<li>多进程（例如，MPI）</li>
</ul>
<p>NCCL 在深度学习框架中有着广泛的应用，AllReduce 集体操作在神经网络训练中被广泛使用。通过 NCCL 提供的多 GPU 和多节点通信，可以实现神经网络训练的高效扩展。</p>
<p>NCCL 是一个通信库，提供用于高性能应用的 GPU 间优化通信。与 MPI 不同，NCCL 不提供并行环境，也不包含进程启动器和管理器。因此，NCCL 依赖于应用程序的进程管理系统和 CPU 端的通信系统来进行自启动。</p>
<p>与 MPI 和其他为性能优化的库类似，NCCL 不提供 GPU 之间的安全网络通信。因此，用户有责任确保 NCCL 在安全的网络上运行，无论是在自启动阶段（由 NCCL_SOCKET_IFNAME 控制）还是在高速通信过程中。</p>
<h3 id="下载源码" tabindex="-1"><a class="header-anchor" href="#下载源码"><span>下载源码</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>git clone https://github.com/NVIDIA/nccl-tests.git</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="构建编译" tabindex="-1"><a class="header-anchor" href="#构建编译"><span>构建编译</span></a></h3>
<ul>
<li>
<p>修改换行格式 LF</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>src\device\generate.py</span></span>
<span class="line"><span></span></span>
<span class="line"><span>src\device\Makefile</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>编译并安装</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span> make -j src.build</span></span>
<span class="line"><span> make install</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>构建产物如下</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>├── include</span></span>
<span class="line"><span>│   ├── nccl.h</span></span>
<span class="line"><span>│   └── nccl_net.h</span></span>
<span class="line"><span>├── lib</span></span>
<span class="line"><span>    ├── libnccl.so -> libnccl.so.2</span></span>
<span class="line"><span>    ├── libnccl.so.2 -> libnccl.so.2.23.4</span></span>
<span class="line"><span>    ├── libnccl.so.2.23.4</span></span>
<span class="line"><span>    ├── libnccl_static.a</span></span>
<span class="line"><span>    └── pkgconfig</span></span>
<span class="line"><span>        └── nccl.pc</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="nccl-test" tabindex="-1"><a class="header-anchor" href="#nccl-test"><span>nccl-test</span></a></h2>
<h3 id="下载" tabindex="-1"><a class="header-anchor" href="#下载"><span>下载</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>git clone https://github.com/NVIDIA/nccl-tests.git</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="编译" tabindex="-1"><a class="header-anchor" href="#编译"><span>编译</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>cd nccl-tests </span></span>
<span class="line"><span>make</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行" tabindex="-1"><a class="header-anchor" href="#运行"><span>运行</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>export NCCL_DEBUG=TRACE</span></span>
<span class="line"><span>./build/all_reduce_perf -b 8 -e 8M -f 2 -g 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>(base) root@DESKTOP-P54EAF3:/mnt/d/Code/nccl-tests# ./build/all_reduce_perf -b 8 -e 8M -f 2 -g 1</span></span>
<span class="line"><span># nThread 1 nGpus 1 minBytes 8 maxBytes 8388608 step: 2(factor) warmup iters: 5 iters: 20 agg iters: 1 validation: 1 graph: 0</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Using devices</span></span>
<span class="line"><span>#  Rank  0 Group  0 Pid  58239 on DESKTOP-P54EAF3 device  0 [0x01] NVIDIA GeForce GTX 1660 SUPER</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58239 [0] NCCL INFO Bootstrap : Using eth0:172.26.190.235&#x3C;0></span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58239 [0] NCCL INFO cudaDriverVersion 12050</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58239 [0] NCCL INFO NCCL version 2.23.4+cuda12.1</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO NET/Plugin: Could not find: libnccl-net.so. Using internal network plugin.</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Failed to open libibverbs.so[.1]</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO NET/Socket : Using [0]eth0:172.26.190.235&#x3C;0> [1]br-eaee979aadb0:172.19.0.1&#x3C;0> [2]vethd14a450:fe80::c821:6bff:fea5:dcf9%vethd14a450&#x3C;0> [3]vethc5ec3b7:fe80::74f5:23ff:fe0a:3d6d%vethc5ec3b7&#x3C;0></span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO PROFILER/Plugin: Could not find: libnccl-profiler.so.</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Using network Socket</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO ncclCommInitAll comm 0x559205409610 rank 0 nranks 1 cudaDev 0 nvmlDev 0 busId 1000 commId 0x89b784d33d72ebbb - Init START</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Bootstrap timings total 0.000344 (create 0.000019, send 0.000105, recv 0.000096, ring 0.000000, delay 0.000000)</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO comm 0x559205409610 rank 0 nRanks 1 nNodes 1 localRanks 1 localRank 0 MNNVL 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 00/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 01/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 02/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 03/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 04/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 05/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 06/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 07/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 08/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 09/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 10/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 11/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 12/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 13/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 14/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 15/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 16/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 17/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 18/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 19/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 20/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 21/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 22/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 23/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 24/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 25/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 26/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 27/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 28/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 29/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 30/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Channel 31/32 : 0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Trees [0] -1/-1/-1->0->-1 [1] -1/-1/-1->0->-1 [2] -1/-1/-1->0->-1 [3] -1/-1/-1->0->-1 [4] -1/-1/-1->0->-1 [5] -1/-1/-1->0->-1 [6] -1/-1/-1->0->-1 [7] -1/-1/-1->0->-1 [8] -1/-1/-1->0->-1 [9] -1/-1/-1->0->-1 [10] -1/-1/-1->0->-1 [11] -1/-1/-1->0->-1 [12] -1/-1/-1->0->-1 [13] -1/-1/-1->0->-1 [14] -1/-1/-1->0->-1 [15] -1/-1/-1->0->-1 [16] -1/-1/-1->0->-1 [17] -1/-1/-1->0->-1 [18] -1/-1/-1->0->-1 [19] -1/-1/-1->0->-1 [20] -1/-1/-1->0->-1 [21] -1/-1/-1->0->-1 [22] -1/-1/-1->0->-1 [23] -1/-1/-1->0->-1 [24] -1/-1/-1->0->-1 [25] -1/-1/-1->0->-1 [26] -1/-1/-1->0->-1 [27] -1/-1/-1->0->-1 [28] -1/-1/-1->0->-1 [29] -1/-1/-1->0->-1 [30] -1/-1/-1->0->-1 [31] -1/-1/-1->0->-1</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO P2P Chunksize set to 131072</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58246 [0] NCCL INFO [Proxy Service] Device 0 CPU core 8</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58247 [0] NCCL INFO [Proxy Service UDS] Device 0 CPU core 11</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58248 [0] NCCL INFO [Proxy Progress] Device 0 CPU core 14</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO 32 coll channels, 32 collnet channels, 0 nvls channels, 32 p2p channels, 32 p2p channels per peer</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO CC Off, Multi-GPU CC Off, workFifoBytes 1048576</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO TUNER/Plugin: Could not find: libnccl-tuner.so libnccl-net.so. Using internal tuner plugin.</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO ncclCommInitAll comm 0x559205409610 rank 0 nranks 1 cudaDev 0 nvmlDev 0 busId 1000 commId 0x89b784d33d72ebbb - Init COMPLETE</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58245 [0] NCCL INFO Init timings - ncclCommInitAll: rank 0 nranks 1 total 0.22 (kernels 0.15, alloc 0.05, bootstrap 0.00, allgathers 0.00, topo 0.00, graphs 0.00, connections 0.01, rest 0.00) </span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>#                                                              out-of-place                       in-place</span></span>
<span class="line"><span>#       size         count      type   redop    root     time   algbw   busbw #wrong     time   algbw   busbw #wrong</span></span>
<span class="line"><span>#        (B)    (elements)                               (us)  (GB/s)  (GB/s)            (us)  (GB/s)  (GB/s)</span></span>
<span class="line"><span>           8             2     float     sum      -1     9.32    0.00    0.00      0     0.14    0.06    0.00      0</span></span>
<span class="line"><span>          16             4     float     sum      -1    14.29    0.00    0.00      0     0.15    0.11    0.00      0</span></span>
<span class="line"><span>          32             8     float     sum      -1    12.24    0.00    0.00      0     0.15    0.22    0.00      0</span></span>
<span class="line"><span>          64            16     float     sum      -1    14.00    0.00    0.00      0     0.15    0.44    0.00      0</span></span>
<span class="line"><span>         128            32     float     sum      -1    11.98    0.01    0.00      0     1.06    0.12    0.00      0</span></span>
<span class="line"><span>         256            64     float     sum      -1    11.72    0.02    0.00      0     0.15    1.71    0.00      0</span></span>
<span class="line"><span>         512           128     float     sum      -1    13.87    0.04    0.00      0     0.15    3.53    0.00      0</span></span>
<span class="line"><span>        1024           256     float     sum      -1    13.81    0.07    0.00      0     0.15    6.83    0.00      0</span></span>
<span class="line"><span>        2048           512     float     sum      -1    17.77    0.12    0.00      0     0.15   13.65    0.00      0</span></span>
<span class="line"><span>        4096          1024     float     sum      -1    14.04    0.29    0.00      0     0.15   28.25    0.00      0</span></span>
<span class="line"><span>        8192          2048     float     sum      -1    13.54    0.61    0.00      0     0.15   54.61    0.00      0</span></span>
<span class="line"><span>       16384          4096     float     sum      -1    11.61    1.41    0.00      0     0.15  109.23    0.00      0</span></span>
<span class="line"><span>       32768          8192     float     sum      -1    13.64    2.40    0.00      0     0.15  218.45    0.00      0</span></span>
<span class="line"><span>       65536         16384     float     sum      -1    15.48    4.23    0.00      0     0.13  504.12    0.00      0</span></span>
<span class="line"><span>      131072         32768     float     sum      -1    23.09    5.68    0.00      0     0.13  1008.25    0.00      0</span></span>
<span class="line"><span>      262144         65536     float     sum      -1    25.09   10.45    0.00      0     0.14  1872.46    0.00      0</span></span>
<span class="line"><span>      524288        131072     float     sum      -1    26.29   19.94    0.00      0     0.15  3615.78    0.00      0</span></span>
<span class="line"><span>     1048576        262144     float     sum      -1    20.98   49.98    0.00      0     0.16  6553.60    0.00      0</span></span>
<span class="line"><span>     2097152        524288     float     sum      -1    26.15   80.20    0.00      0     0.16  13530.01    0.00      0</span></span>
<span class="line"><span>     4194304       1048576     float     sum      -1    37.97  110.46    0.00      0     0.15  27962.03    0.00      0</span></span>
<span class="line"><span>     8388608       2097152     float     sum      -1    66.97  125.27    0.00      0     0.14  59918.63    0.00      0</span></span>
<span class="line"><span>DESKTOP-P54EAF3:58239:58239 [0] NCCL INFO comm 0x559205409610 rank 0 nranks 1 cudaDev 0 busId 1000 - Destroy COMPLETE</span></span>
<span class="line"><span># Out of bounds values : 0 OK</span></span>
<span class="line"><span># Avg bus bandwidth    : 0</span></span>
<span class="line"><span>#</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参数" tabindex="-1"><a class="header-anchor" href="#参数"><span>参数</span></a></h3>
<p>所有测试支持相同的一组参数：</p>
<ul>
<li>GPU 数量
<ul>
<li><code v-pre>-t,--nthreads &lt;线程数&gt;</code> 每个进程的线程数。默认值：1。</li>
<li><code v-pre>-g,--ngpus &lt;每个线程的 GPU 数量&gt;</code> 每个线程使用的 GPU 数量。默认值：1。</li>
</ul>
</li>
<li>扫描的大小范围
<ul>
<li><code v-pre>-b,--minbytes &lt;最小字节数&gt;</code> 开始的最小大小。默认值：32M。</li>
<li><code v-pre>-e,--maxbytes &lt;最大字节数&gt;</code> 结束的最大大小。默认值：32M。</li>
<li>递增方式可以是固定递增或乘法因子。仅应使用其中一种方式：
<ul>
<li><code v-pre>-i,--stepbytes &lt;递增字节数&gt;</code> 各大小之间的固定增量。默认值：1M。</li>
<li><code v-pre>-f,--stepfactor &lt;递增因子&gt;</code> 各大小之间的乘法因子。默认值：禁用。</li>
</ul>
</li>
</ul>
</li>
<li>NCCL 操作参数
<ul>
<li><code v-pre>-o,--op &lt;sum/prod/min/max/avg/all&gt;</code> 指定执行哪种规约操作。仅对 Allreduce、Reduce 或 ReduceScatter 等规约操作有效。默认值：Sum（求和）。</li>
<li><code v-pre>-d,--datatype &lt;nccltype/all&gt;</code> 指定使用哪种数据类型。默认值：Float（浮点数）。</li>
<li><code v-pre>-r,--root &lt;root/all&gt;</code> 指定使用哪个 root，仅对有 root 的操作（如广播或规约）有效。默认值：0。</li>
</ul>
</li>
<li>性能参数
<ul>
<li><code v-pre>-n,--iters &lt;迭代次数&gt;</code> 迭代次数。默认值：20。</li>
<li><code v-pre>-w,--warmup_iters &lt;预热迭代次数&gt;</code> 预热迭代次数（不计时）。默认值：5。</li>
<li><code v-pre>-m,--agg_iters &lt;聚合次数&gt;</code> 每次迭代中聚合在一起的操作次数。默认值：1。</li>
<li><code v-pre>-N,--run_cycles &lt;循环次数&gt;</code> 运行并打印每个循环。默认值：1；0=无限循环。</li>
<li><code v-pre>-a,--average &lt;0/1/2/3&gt;</code> 将性能报告为所有节点的平均值（仅适用于 MPI=1）。&lt;0=Rank0, 1=平均, 2=最小, 3=最大&gt;。默认值：1（平均）。</li>
</ul>
</li>
<li>测试操作
<ul>
<li><code v-pre>-p,--parallel_init &lt;0/1&gt;</code> 使用线程并行初始化 NCCL。默认值：0。</li>
<li><code v-pre>-c,--check &lt;检查迭代次数&gt;</code> 执行指定次数的迭代，每次迭代都检查结果的正确性。对于大量 GPU 来说，这可能非常慢。默认值：1。</li>
<li><code v-pre>-z,--blocking &lt;0/1&gt;</code> 使 NCCL 操作阻塞，即在每次操作后等待并同步 CPU。默认值：0。</li>
<li><code v-pre>-G,--cudagraph &lt;CUDA 图启动次数&gt;</code> 将迭代捕获为 CUDA 图，然后重复指定次数。默认值：0。</li>
<li><code v-pre>-C,--report_cputime &lt;0/1&gt;</code> 报告 CPU 时间而非延迟。默认值：0。</li>
<li><code v-pre>-R,--local_register &lt;1/0&gt;</code> 在发送/接收缓冲区上启用本地缓冲区注册。默认值：0。</li>
<li><code v-pre>-T,--timeout &lt;超时时间（秒）&gt;</code> 在指定秒数后对每个测试进行超时。默认值：禁用。</li>
</ul>
</li>
</ul>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>def get_group_rank(group: ProcessGroup, global_rank: int) -> int:</span></span>
<span class="line"><span>    """</span></span>
<span class="line"><span>    Translate a global rank into a group rank.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ``global_rank`` must be part of ``group`` otherwise this raises RuntimeError.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Args:</span></span>
<span class="line"><span>        group (ProcessGroup): ProcessGroup to find the relative rank.</span></span>
<span class="line"><span>        global_rank (int): Global rank to query.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Returns:</span></span>
<span class="line"><span>        Group rank of ``global_rank`` relative to ``group``</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    N.B. calling this function on the default process group returns identity</span></span>
<span class="line"><span>    """</span></span>
<span class="line"><span>    if group is GroupMember.WORLD:</span></span>
<span class="line"><span>        return global_rank</span></span>
<span class="line"><span>    if group not in _world.pg_group_ranks:</span></span>
<span class="line"><span>        raise ValueError(</span></span>
<span class="line"><span>            f"Group {group} is not registered, please create group with torch.distributed.new_group API"</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    group_ranks = _world.pg_group_ranks[group]</span></span>
<span class="line"><span>    if global_rank not in group_ranks:</span></span>
<span class="line"><span>        raise ValueError(f"Global rank {global_rank} is not part of group {group}")</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return group_ranks[global_rank]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的主要功能是将一个全局的 rank 转换为在某个进程组中的 rank。它实现了在分布式训练中，通过全局 rank 查询某个特定进程组内的相对 rank。如果 <code v-pre>global_rank</code> 不在给定的进程组 <code v-pre>group</code> 中，该函数会抛出 <code v-pre>ValueError</code> 异常。</p>
<h3 id="具体工作原理" tabindex="-1"><a class="header-anchor" href="#具体工作原理"><span>具体工作原理</span></a></h3>
<ol>
<li>
<p><strong>判断是否为默认进程组</strong>：</p>
<ul>
<li>如果 <code v-pre>group</code> 是默认的进程组 <code v-pre>GroupMember.WORLD</code>，则直接返回 <code v-pre>global_rank</code>，因为默认进程组中的 rank 就是全局 rank，保持不变。</li>
</ul>
</li>
<li>
<p><strong>检查组是否注册</strong>：</p>
<ul>
<li>如果 <code v-pre>group</code> 没有在 <code v-pre>_world.pg_group_ranks</code> 中找到，则抛出异常。<code v-pre>_world.pg_group_ranks</code> 存储了所有创建的进程组及其对应的 ranks。</li>
</ul>
</li>
<li>
<p><strong>检查全局 rank 是否在该组中</strong>：</p>
<ul>
<li>如果 <code v-pre>global_rank</code> 不在 <code v-pre>group_ranks</code> 列表中，抛出异常。<code v-pre>group_ranks</code> 保存了 <code v-pre>group</code> 中的全局 rank 映射。</li>
</ul>
</li>
<li>
<p><strong>返回相对 rank</strong>：</p>
<ul>
<li>最终根据 <code v-pre>group_ranks</code> 返回 <code v-pre>global_rank</code> 在 <code v-pre>group</code> 中的相对 rank。</li>
</ul>
</li>
</ol>
<h3 id="参数说明" tabindex="-1"><a class="header-anchor" href="#参数说明"><span>参数说明：</span></a></h3>
<ul>
<li><code v-pre>group (ProcessGroup)</code>：PyTorch 分布式的进程组，通常由 <code v-pre>torch.distributed.new_group</code> 创建。</li>
<li><code v-pre>global_rank (int)</code>：全局 rank 值，通常是指分布式训练中全局进程的编号。</li>
</ul>
<h3 id="返回" tabindex="-1"><a class="header-anchor" href="#返回"><span>返回：</span></a></h3>
<ul>
<li>返回值是 <code v-pre>global_rank</code> 在指定 <code v-pre>group</code> 中的 rank。</li>
</ul>
<h3 id="代码解释" tabindex="-1"><a class="header-anchor" href="#代码解释"><span>代码解释：</span></a></h3>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> group </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">is</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> GroupMember.</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">WORLD</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> global_rank</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这段代码检查传入的 <code v-pre>group</code> 是否是默认的全局进程组。如果是的话，<code v-pre>global_rank</code> 和相对 rank 是一致的，直接返回。</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> group </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">not</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD"> in</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> _world.pg_group_ranks:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">    raise</span><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF"> ValueError</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">        f</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"Group </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">group</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> is not registered, please create group with torch.distributed.new_group API"</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">    )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这里检查是否传入的 <code v-pre>group</code> 已经被注册到 <code v-pre>_world.pg_group_ranks</code> 中。如果没有注册，则抛出 <code v-pre>ValueError</code>，并提示用户需要通过 <code v-pre>torch.distributed.new_group</code> 来创建该组。</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">group_ranks </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> _world.pg_group_ranks[group]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> global_rank </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">not</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD"> in</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> group_ranks:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">    raise</span><span style="--shiki-light:#005CC5;--shiki-dark:#ABB2BF"> ValueError</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"Global rank </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">global_rank</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> is not part of group </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">group</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这段代码从 <code v-pre>_world.pg_group_ranks</code> 获取当前 <code v-pre>group</code> 的所有全局 rank。如果 <code v-pre>global_rank</code> 不在该组中，则抛出异常。</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">return</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> group_ranks[global_rank]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>最终返回 <code v-pre>global_rank</code> 在 <code v-pre>group</code> 中的相对 rank。</li>
</ul>
<h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h3>
<p>此功能非常适用于在分布式训练中处理多个进程组的情况，用户可以轻松找到某个全局 rank 在特定组内的 rank，从而进行更细粒度的进程控制或通信。</p>
<h2 id="torch-cuda-nccl-py" tabindex="-1"><a class="header-anchor" href="#torch-cuda-nccl-py"><span>torch/cuda/nccl.py</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># `output` used to be `outputs`, taking in a list of tensors. So we have two</span></span>
<span class="line"><span># arguments for BC reasons.</span></span>
<span class="line"><span>def reduce(</span></span>
<span class="line"><span>    inputs: Sequence[torch.Tensor],</span></span>
<span class="line"><span>    output: Optional[Union[torch.Tensor, Sequence[torch.Tensor]]] = None,</span></span>
<span class="line"><span>    root: int = 0,</span></span>
<span class="line"><span>    op: int = SUM,</span></span>
<span class="line"><span>    streams: Optional[Sequence[torch.cuda.Stream]] = None,</span></span>
<span class="line"><span>    comms=None,</span></span>
<span class="line"><span>    *,</span></span>
<span class="line"><span>    outputs: Optional[Sequence[torch.Tensor]] = None,</span></span>
<span class="line"><span>) -> None:</span></span>
<span class="line"><span>    _check_sequence_type(inputs)</span></span>
<span class="line"><span>    _output: torch.Tensor</span></span>
<span class="line"><span>    if outputs is not None:</span></span>
<span class="line"><span>        if output is not None:</span></span>
<span class="line"><span>            raise ValueError(</span></span>
<span class="line"><span>                "'output' and 'outputs' can not be both specified. 'outputs' is deprecated in "</span></span>
<span class="line"><span>                "favor of 'output', taking in a single output tensor. The signature of reduce is: "</span></span>
<span class="line"><span>                "reduce(inputs, output=None, root=0, op=SUM, streams=None, comms=None)."</span></span>
<span class="line"><span>            )</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            warnings.warn(</span></span>
<span class="line"><span>                "`nccl.reduce` with an output tensor list is deprecated. "</span></span>
<span class="line"><span>                "Please specify a single output tensor with argument 'output' instead instead.",</span></span>
<span class="line"><span>                FutureWarning,</span></span>
<span class="line"><span>                stacklevel=2,</span></span>
<span class="line"><span>            )</span></span>
<span class="line"><span>            _output = outputs[root]</span></span>
<span class="line"><span>    elif not isinstance(output, torch.Tensor) and isinstance(</span></span>
<span class="line"><span>        output, collections.abc.Sequence</span></span>
<span class="line"><span>    ):</span></span>
<span class="line"><span>        # User called old API with positional arguments of list of output tensors.</span></span>
<span class="line"><span>        warnings.warn(</span></span>
<span class="line"><span>            "nccl.reduce with an output tensor list is deprecated. "</span></span>
<span class="line"><span>            "Please specify a single output tensor.",</span></span>
<span class="line"><span>            FutureWarning,</span></span>
<span class="line"><span>            stacklevel=2,</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>        _output = output[root]</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        _output = inputs[root] if output is None else output</span></span>
<span class="line"><span>    torch._C._nccl_reduce(inputs, _output, root, op, streams, comms)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码实现了 <code v-pre>reduce</code> 函数的分布式操作，用于将多个 GPU 的张量根据某种操作（如求和）合并到一个目标张量中，特别是在使用 PyTorch 的 NCCL 后端时。这是常见的分布式通信操作，例如在多卡训练中汇总各个设备上的张量。</p>
<h3 id="核心功能" tabindex="-1"><a class="header-anchor" href="#核心功能"><span>核心功能</span></a></h3>
<p>该函数通过调用 <code v-pre>torch._C._nccl_reduce</code> 来实现具体的 <code v-pre>reduce</code> 操作，该函数执行 GPU 间张量的归约（如求和、乘积等操作），并将结果存储在某个 root 节点的目标张量中。</p>
<h3 id="参数解析" tabindex="-1"><a class="header-anchor" href="#参数解析"><span>参数解析</span></a></h3>
<ol>
<li>
<p><strong>inputs</strong>:</p>
<ul>
<li><code v-pre>Sequence[torch.Tensor]</code>，表示输入的张量序列，来自不同的 GPU。每个张量包含设备上局部计算的结果。</li>
</ul>
</li>
<li>
<p><strong>output</strong>:</p>
<ul>
<li><code v-pre>Optional[Union[torch.Tensor, Sequence[torch.Tensor]]]</code>，可选参数，用于存放归约操作的结果。如果没有提供，将使用 root 节点上的输入张量。</li>
</ul>
</li>
<li>
<p><strong>root</strong>:</p>
<ul>
<li><code v-pre>int</code>，表示哪个 GPU 作为 root，将接收所有 GPU 的归约结果。默认是 <code v-pre>0</code>。</li>
</ul>
</li>
<li>
<p><strong>op</strong>:</p>
<ul>
<li><code v-pre>int</code>，指定归约操作，默认为 <code v-pre>SUM</code>（加法）。其它可能的操作有 <code v-pre>PROD</code>（乘法）、<code v-pre>MIN</code>（最小值）、<code v-pre>MAX</code>（最大值）等。</li>
</ul>
</li>
<li>
<p><strong>streams</strong>:</p>
<ul>
<li><code v-pre>Optional[Sequence[torch.cuda.Stream]]</code>，可以为每个 GPU 提供 CUDA 流，方便在不同 CUDA 流上进行归约操作。默认为空，即使用默认流。</li>
</ul>
</li>
<li>
<p><strong>comms</strong>:</p>
<ul>
<li>可选的通信器对象，负责管理 GPU 间的通信。</li>
</ul>
</li>
<li>
<p><strong>outputs</strong>:</p>
<ul>
<li><code v-pre>Optional[Sequence[torch.Tensor]]</code>，这是一个过时参数，用于指定多个输出张量的列表。新的 API 只需要传入一个单一的 <code v-pre>output</code>，如果同时传入 <code v-pre>outputs</code> 和 <code v-pre>output</code>，则会报错。</li>
</ul>
</li>
</ol>
<h3 id="核心逻辑" tabindex="-1"><a class="header-anchor" href="#核心逻辑"><span>核心逻辑</span></a></h3>
<ol>
<li>
<p><strong>处理参数的兼容性</strong>:</p>
<ul>
<li>首先检查 <code v-pre>inputs</code> 的类型是否正确。接着处理参数 <code v-pre>outputs</code> 和 <code v-pre>output</code> 的兼容性，确保两者不会同时传入。如果用户使用了旧版 API (<code v-pre>outputs</code>)，会抛出警告，提醒用户该功能将被弃用。</li>
</ul>
</li>
<li>
<p><strong>处理旧 API</strong>:</p>
<ul>
<li>如果 <code v-pre>output</code> 是一个张量序列而不是单个张量，函数会继续支持这种旧的用法，但是同样会抛出警告，提示用户迁移到新的 API。</li>
</ul>
</li>
<li>
<p><strong>调用底层 NCCL 函数</strong>:</p>
<ul>
<li>最后，函数调用 <code v-pre>torch._C._nccl_reduce</code> 执行真正的张量归约操作，使用给定的 <code v-pre>inputs</code>、<code v-pre>_output</code>、<code v-pre>root</code>、<code v-pre>op</code> 和其他可选参数。</li>
</ul>
</li>
</ol>
<h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h3>
<p>假设我们在分布式训练中使用 4 个 GPU，执行 <code v-pre>reduce</code> 操作：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">inputs </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> [torch.</span><span style="--shiki-light:#24292E;--shiki-dark:#61AFEF">tensor</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">([</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">1.0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">]).</span><span style="--shiki-light:#24292E;--shiki-dark:#61AFEF">cuda</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">(i) </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">)]  </span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"># 各个 GPU 上的张量</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">output </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF"> torch.</span><span style="--shiki-light:#24292E;--shiki-dark:#61AFEF">tensor</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">([</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">0.0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">]).</span><span style="--shiki-light:#24292E;--shiki-dark:#61AFEF">cuda</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"># root GPU 上的输出张量</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#E06C75">reduce</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">(inputs, </span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">output</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">output, </span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">root</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">(output)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"># 输出归约后的结果</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码将各个 GPU 上的张量相加，并将结果存储在 root GPU（GPU 0）的 <code v-pre>output</code> 张量中。</p>
</div></template>


