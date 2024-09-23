import{_ as i,c as s,o as a,a as n}from"./app-DL18EpG1.js";const l={},t=n(`<div class="hint-container tip"><p class="hint-container-title">PyTorch c10d</p></div><p>PyTorch 的 <code>c10d</code> 通信库是用于分布式计算的核心组件，特别是在需要跨多个设备（如多个GPU或多台机器）进行并行计算时。<code>c10d</code> 提供了分布式数据并行（Distributed Data Parallel, DDP）的底层实现，支持高效的数据同步和通信操作。</p><h3 id="主要功能" tabindex="-1"><a class="header-anchor" href="#主要功能"><span>主要功能</span></a></h3><ol><li><p><strong>通信后端</strong>： <code>c10d</code> 支持多种通信后端（Backend），如：</p><ul><li><code>NCCL</code>: 适用于GPU间通信，特别是在NVIDIA硬件上。</li><li><code>GLOO</code>: 适用于CPU和GPU的跨平台通信。</li><li><code>MPI</code>: 基于Message Passing Interface，适合大规模分布式系统。</li></ul></li><li><p><strong>进程组（Process Group）</strong>： <code>c10d</code> 中的进程组是通信的基本单元，可以将多个进程组织成一个组，以便它们之间进行通信。可以在不同的进程组之间进行广播、归约、全归约等操作。</p></li><li><p><strong>广播和同步</strong>： <code>c10d</code> 提供了对数据进行广播和同步的接口，确保在多个进程或设备之间一致地传递数据。例如，在多GPU训练中，同步不同GPU上的模型参数。</p></li><li><p><strong>梯度同步</strong>： 在分布式数据并行训练中，<code>c10d</code> 自动同步各个设备计算出的梯度，从而确保在所有设备上更新后的模型参数保持一致。</p></li><li><p><strong>AllReduce操作</strong>： <code>c10d</code> 支持AllReduce操作，这是在分布式训练中非常常用的操作，能够高效地合并不同设备上的梯度并更新模型参数。</p></li></ol><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h3><ul><li><strong>分布式训练</strong>：<code>c10d</code> 被广泛应用于分布式深度学习训练中，特别是在需要处理大规模数据集或模型时，能够显著缩短训练时间。</li><li><strong>多GPU训练</strong>：通过 <code>c10d</code>，用户可以方便地将训练任务分布在多个GPU上，从而充分利用硬件资源。</li></ul><h3 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码"><span>示例代码</span></a></h3><p>以下是一个简单的使用 <code>c10d</code> 进行广播操作的示例：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> torch</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> torch.distributed </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> dist</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 初始化通信库，选择GLOO后端</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">dist.</span><span style="--shiki-light:#24292E;--shiki-dark:#61AFEF;">init_process_group</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">backend</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;gloo&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 获取当前进程的rank</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">rank </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> dist.</span><span style="--shiki-light:#24292E;--shiki-dark:#61AFEF;">get_rank</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 创建一个张量</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">tensor </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> torch.</span><span style="--shiki-light:#24292E;--shiki-dark:#61AFEF;">zeros</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> rank </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    tensor </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">+=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  # 只有rank为0的进程修改张量</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 进行广播操作，将rank 0的张量值广播到所有进程</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">dist.</span><span style="--shiki-light:#24292E;--shiki-dark:#61AFEF;">broadcast</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(tensor, </span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">src</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">f</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Rank </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">rank</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> has tensor </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">tensor[</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">]</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p><code>c10d</code> 是 PyTorch 中实现高效分布式计算的关键组件，通过提供灵活的通信后端和强大的同步机制，极大地简化了在多设备或多机器环境中进行并行计算的复杂性。</p><div class="hint-container tip"><p class="hint-container-title">SPMD 模型</p></div><p>SPMD（Single Program, Multiple Data）模型是一种并行计算模型，在这种模型中，多个处理单元同时执行相同的程序代码，但每个处理单元处理不同的数据。这种模型广泛应用于高性能计算和分布式计算领域，特别适合需要大规模并行处理的任务。</p><h3 id="spmd-模型的核心思想" tabindex="-1"><a class="header-anchor" href="#spmd-模型的核心思想"><span>SPMD 模型的核心思想</span></a></h3><ol><li><p><strong>单一程序</strong>： 在 SPMD 模型中，所有处理单元（通常是不同的CPU或GPU）执行相同的程序代码。这意味着每个处理单元的代码路径是相同的，但可以根据处理单元的ID或索引来执行不同的操作。</p></li><li><p><strong>多数据流</strong>： 尽管所有处理单元执行相同的程序代码，但每个处理单元处理的输入数据是不同的。这通常通过划分数据集来实现，每个处理单元处理其特定的数据子集。</p></li><li><p><strong>并行性</strong>： SPMD 模型通过同时在多个处理单元上执行相同的程序代码来实现并行性。这种并行性可以大幅提高计算效率，特别是在处理大规模数据集时。</p></li><li><p><strong>通信与同步</strong>： 在 SPMD 模型中，处理单元通常需要在某些阶段进行通信和同步。例如，处理单元可能需要共享部分计算结果或交换数据。为了确保数据的一致性，通常需要同步操作来协调各个处理单元的执行。</p></li></ol><h3 id="spmd-与其他并行模型的比较" tabindex="-1"><a class="header-anchor" href="#spmd-与其他并行模型的比较"><span>SPMD 与其他并行模型的比较</span></a></h3><ul><li><p><strong>SIMD（Single Instruction, Multiple Data）</strong>：与 SPMD 不同，SIMD 是在所有处理单元上执行相同的指令，并且每个处理单元处理不同的数据。在 SIMD 模型中，处理单元的操作是完全同步的。</p></li><li><p><strong>MIMD（Multiple Instruction, Multiple Data）</strong>：MIMD 模型允许每个处理单元执行不同的程序代码并处理不同的数据，与 SPMD 相比，MIMD 提供了更大的灵活性，但通常也更复杂。</p></li></ul><h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景"><span>应用场景</span></a></h3><p>SPMD 模型在许多并行计算任务中得到了广泛应用，典型的应用场景包括：</p><ul><li><p><strong>分布式深度学习</strong>：在深度学习中，SPMD 模型通常用于分布式训练，每个处理单元（如 GPU）处理一部分数据集，并在训练过程中共享模型参数。</p></li><li><p><strong>科学计算</strong>：许多科学计算任务涉及大规模矩阵或向量操作，可以通过 SPMD 模型并行化这些操作，从而显著提高计算速度。</p></li><li><p><strong>数值模拟</strong>：SPMD 模型在气候模拟、物理仿真等领域中也得到广泛应用，允许并行处理不同区域或不同时间步的计算。</p></li></ul><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h3><p>在分布式训练中，使用 SPMD 模型的一个简单示例可能是，每个 GPU 处理一个 mini-batch 的数据，然后通过通信操作将所有 GPU 的梯度进行合并并同步模型参数。</p><h3 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1"><span>总结</span></a></h3><p>SPMD 模型是一种高效的并行计算模型，通过让多个处理单元执行相同的程序代码并处理不同的数据，能够大幅提高计算效率。它的简洁性和高效性使其成为许多并行和分布式计算任务的首选模型。</p><div class="hint-container tip"><p class="hint-container-title">MPMD</p></div><p>MPMD（Multiple Program, Multiple Data）是一种并行计算模型，与 SPMD（Single Program, Multiple Data）模型相对应。在 MPMD 模型中，多个处理单元（如 CPU 核心或计算节点）可以执行不同的程序，并处理不同的数据集。这种模型适用于更复杂的并行计算任务，特别是在各个处理单元需要执行不同类型的计算时。</p><h3 id="mpmd-模型的核心思想" tabindex="-1"><a class="header-anchor" href="#mpmd-模型的核心思想"><span>MPMD 模型的核心思想</span></a></h3><ol><li><p><strong>多个程序</strong>： 与 SPMD 模型不同，在 MPMD 模型中，每个处理单元可以运行不同的程序代码。这种灵活性允许处理单元根据任务需求执行不同的操作或算法。</p></li><li><p><strong>多数据流</strong>： 与多个程序相对应，每个处理单元处理不同的数据集。数据的划分方式可以根据具体应用进行调整，以实现负载均衡和计算资源的优化利用。</p></li><li><p><strong>并行性</strong>： MPMD 模型通过允许不同的处理单元并行执行不同的任务，最大化了计算资源的利用率。每个处理单元都可以独立处理自己的任务，互不干扰。</p></li><li><p><strong>通信与同步</strong>： 尽管处理单元运行不同的程序，但它们仍可能需要在某些阶段进行通信和数据交换。MPI（Message Passing Interface）等并行计算框架通常支持 MPMD 模型，通过消息传递机制实现进程间的通信与同步。</p></li></ol><h3 id="mpmd-与-spmd-的比较" tabindex="-1"><a class="header-anchor" href="#mpmd-与-spmd-的比较"><span>MPMD 与 SPMD 的比较</span></a></h3><ul><li><p><strong>灵活性</strong>：MPMD 提供了更大的灵活性，因为每个处理单元可以执行不同的程序。相比之下，SPMD 模型中所有处理单元执行相同的程序，只是数据不同。</p></li><li><p><strong>复杂性</strong>：由于 MPMD 允许不同的程序同时运行，因此任务协调和进程管理可能更加复杂。处理单元之间的通信需求可能更高，且需要精心设计。</p></li><li><p><strong>应用场景</strong>：MPMD 更适合那些需要同时执行多种任务的复杂应用。例如，某些科学计算或仿真任务可能需要不同的计算步骤，这些步骤可以由不同的程序在不同的处理单元上并行执行。</p></li></ul><h3 id="应用场景-1" tabindex="-1"><a class="header-anchor" href="#应用场景-1"><span>应用场景</span></a></h3><ul><li><p><strong>多物理场仿真</strong>：在一些复杂的物理仿真中，可能涉及多个物理场（如流体动力学和热传导）的计算。这些场的计算方法不同，可以在不同的处理单元上并行运行各自的程序。</p></li><li><p><strong>复杂工作流处理</strong>：在需要并行处理不同任务的工作流中，如在大规模数据处理或分析任务中，不同的处理单元可以负责不同的任务或数据集，从而加快整个工作流的执行。</p></li><li><p><strong>异构计算</strong>：在涉及多种计算架构（如 CPU 和 GPU）的应用中，MPMD 模型可以将不同的程序分配给不同的架构，以充分利用各自的计算优势。</p></li></ul><h3 id="示例场景" tabindex="-1"><a class="header-anchor" href="#示例场景"><span>示例场景</span></a></h3><p>假设有一个科学模拟项目，需要同时计算两个独立的物理过程。第一个进程在 CPU 上运行大气模拟程序，而第二个进程在 GPU 上运行海洋模拟程序。这两部分模拟数据可能会在某些阶段相互依赖，因此需要通过通信机制进行数据交换。使用 MPMD 模型可以分别启动两个不同的程序，并通过 MPI 等工具进行协调和通信。</p><h3 id="实现-mpmd-的框架" tabindex="-1"><a class="header-anchor" href="#实现-mpmd-的框架"><span>实现 MPMD 的框架</span></a></h3><p>MPI 是最常用的实现 MPMD 模型的框架之一。MPI 允许用户在同一个应用程序中启动多个不同的程序实例，每个实例可以有自己的任务和数据，同时提供通信接口以在它们之间进行消息传递。</p><h3 id="总结-2" tabindex="-1"><a class="header-anchor" href="#总结-2"><span>总结</span></a></h3><p>MPMD（Multiple Program, Multiple Data）模型是一种强大的并行计算模型，允许多个处理单元并行执行不同的程序，并处理不同的数据集。它的灵活性使其非常适合处理复杂的并行任务，特别是在不同任务需要不同计算资源或算法的情况下。MPI 等并行计算框架为 MPMD 模型提供了实现途径，广泛应用于科学计算、数据分析和异构计算等领域。</p><div class="hint-container tip"><p class="hint-container-title">MPI</p></div><p>MPI（Message Passing Interface）是一种用于并行计算的标准接口，广泛应用于分布式计算和高性能计算（HPC）领域。MPI 提供了一组标准的 API，允许程序在多个处理单元（如 CPU 核心或计算节点）之间进行消息传递和协调，从而实现大规模并行计算。</p><h3 id="mpi-的核心概念" tabindex="-1"><a class="header-anchor" href="#mpi-的核心概念"><span>MPI 的核心概念</span></a></h3><ol><li><p><strong>进程模型</strong>： MPI 采用进程并行模型，即每个并行任务在一个独立的进程中运行。进程之间通过消息传递进行通信，而不是共享内存。这种设计使得 MPI 非常适合在分布式内存系统（如计算集群）上运行。</p></li><li><p><strong>通信机制</strong>：</p><ul><li><strong>点对点通信</strong>：两个进程之间直接进行消息传递，典型的函数有 <code>MPI_Send</code> 和 <code>MPI_Recv</code>，分别用于发送和接收消息。</li><li><strong>集体通信</strong>：MPI 提供了多种集体通信操作，如广播（broadcast）、归约（reduction）、散播（scatter）和聚集（gather），这些操作涉及多个进程之间的通信。</li></ul></li><li><p><strong>进程组和通信域</strong>： MPI 中的进程可以组织成进程组，每个进程组拥有一个通信域（communicator）。<code>MPI_COMM_WORLD</code> 是所有 MPI 程序默认的通信域，包含了所有进程。用户也可以定义自己的进程组和通信域，以便更灵活地管理和组织进程。</p></li><li><p><strong>同步与异步通信</strong>： MPI 支持同步和异步的消息传递模式。同步通信要求发送方等待接收方确认消息接收，确保消息传递的顺序和一致性；异步通信则允许发送方在消息发送后立即继续执行，而不必等待接收方确认。</p></li><li><p><strong>并行I/O</strong>： MPI-IO 是 MPI 的一个子集，专门用于并行文件输入输出操作。MPI-IO 允许多个进程同时读写大规模数据集，为并行计算中的数据管理提供了高效的解决方案。</p></li></ol><h3 id="mpi-的主要功能" tabindex="-1"><a class="header-anchor" href="#mpi-的主要功能"><span>MPI 的主要功能</span></a></h3><ol><li><p><strong>并行计算</strong>：MPI 允许程序在多个处理单元上并行运行，从而加速计算任务的执行。适用于数值模拟、数据处理等需要处理大量计算的场景。</p></li><li><p><strong>跨平台兼容</strong>：MPI 是一种标准接口，支持多种硬件和操作系统平台。常见的 MPI 实现包括 OpenMPI、MPICH 等，它们在不同的计算环境中均能有效运行。</p></li><li><p><strong>高效的消息传递</strong>：MPI 针对不同的通信模式进行了优化，能够在高性能计算环境中提供低延迟和高带宽的通信服务。</p></li></ol><h3 id="使用场景-1" tabindex="-1"><a class="header-anchor" href="#使用场景-1"><span>使用场景</span></a></h3><ul><li><p><strong>数值模拟</strong>：在流体力学、气象预报、天体物理等领域，MPI 常用于实现复杂的数值模拟，这些任务通常需要处理非常大的数据集和复杂的计算过程。</p></li><li><p><strong>数据分析</strong>：在大规模数据分析任务中，MPI 可以将计算任务分布到多个节点，从而提高数据处理的速度和效率。</p></li><li><p><strong>机器学习和深度学习</strong>：MPI 也可以用于分布式机器学习，尤其是在需要跨多个节点或多个 GPU 进行训练的情况下，通过 MPI 实现模型的并行训练和参数同步。</p></li></ul><h3 id="示例代码-1" tabindex="-1"><a class="header-anchor" href="#示例代码-1"><span>示例代码</span></a></h3><p>以下是一个简单的 MPI 程序示例，展示了如何使用 MPI 实现基本的点对点通信：</p><div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" data-title="c" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">#include</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &lt;mpi.h&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">#include</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &lt;stdio.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> argc</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> char**</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> argv</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    MPI_Init</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">argc, </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">argv);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> world_rank;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    MPI_Comm_rank</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(MPI_COMM_WORLD, </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">world_rank);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> world_size;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    MPI_Comm_size</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(MPI_COMM_WORLD, </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">world_size);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (world_rank </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        int</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> data </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 100</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        MPI_Send</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">data, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, MPI_INT, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, MPI_COMM_WORLD);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        printf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Process 0 sent data </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">%d</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> to process 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, data);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (world_rank </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        int</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> data;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        MPI_Recv</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">data, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, MPI_INT, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, MPI_COMM_WORLD, MPI_STATUS_IGNORE);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        printf</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Process 1 received data </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">%d</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> from process 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">, data);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">    MPI_Finalize</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结-3" tabindex="-1"><a class="header-anchor" href="#总结-3"><span>总结</span></a></h3><p>MPI 是并行计算领域的重要工具，提供了灵活且高效的消息传递机制，使得程序能够在多处理单元环境中高效运行。MPI 的标准化设计和广泛支持使其成为高性能计算、分布式计算和大规模数据处理任务中的主流选择。</p>`,51),e=[t];function h(p,r){return a(),s("div",null,e)}const k=i(l,[["render",h],["__file","pytorch.html.vue"]]),c=JSON.parse('{"path":"/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/pytorch.html","title":"PyTorch","lang":"zh-CN","frontmatter":{"date":"2024-09-04T00:00:00.000Z","title":"PyTorch","category":["分布式"],"tag":["PyTorch","c10d"],"description":"PyTorch c10d PyTorch 的 c10d 通信库是用于分布式计算的核心组件，特别是在需要跨多个设备（如多个GPU或多台机器）进行并行计算时。c10d 提供了分布式数据并行（Distributed Data Parallel, DDP）的底层实现，支持高效的数据同步和通信操作。 主要功能 通信后端： c10d 支持多种通信后端（Backen...","head":[["meta",{"property":"og:url","content":"https://mousesun846.github.io/KnowledgeBlog/KnowledgeBlog/%E6%8A%80%E6%9C%AF%E7%A7%91%E6%99%AE/pytorch.html"}],["meta",{"property":"og:site_name","content":"知识笔记"}],["meta",{"property":"og:title","content":"PyTorch"}],["meta",{"property":"og:description","content":"PyTorch c10d PyTorch 的 c10d 通信库是用于分布式计算的核心组件，特别是在需要跨多个设备（如多个GPU或多台机器）进行并行计算时。c10d 提供了分布式数据并行（Distributed Data Parallel, DDP）的底层实现，支持高效的数据同步和通信操作。 主要功能 通信后端： c10d 支持多种通信后端（Backen..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-04T09:17:57.000Z"}],["meta",{"property":"article:author","content":"MouseSun"}],["meta",{"property":"article:tag","content":"PyTorch"}],["meta",{"property":"article:tag","content":"c10d"}],["meta",{"property":"article:published_time","content":"2024-09-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-04T09:17:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PyTorch\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-09-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-09-04T09:17:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"MouseSun\\",\\"url\\":\\"https://github.com/MouseSun846\\",\\"email\\":\\"\\"}]}"]]},"headers":[{"level":3,"title":"主要功能","slug":"主要功能","link":"#主要功能","children":[]},{"level":3,"title":"使用场景","slug":"使用场景","link":"#使用场景","children":[]},{"level":3,"title":"示例代码","slug":"示例代码","link":"#示例代码","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":3,"title":"SPMD 模型的核心思想","slug":"spmd-模型的核心思想","link":"#spmd-模型的核心思想","children":[]},{"level":3,"title":"SPMD 与其他并行模型的比较","slug":"spmd-与其他并行模型的比较","link":"#spmd-与其他并行模型的比较","children":[]},{"level":3,"title":"应用场景","slug":"应用场景","link":"#应用场景","children":[]},{"level":3,"title":"示例","slug":"示例","link":"#示例","children":[]},{"level":3,"title":"总结","slug":"总结-1","link":"#总结-1","children":[]},{"level":3,"title":"MPMD 模型的核心思想","slug":"mpmd-模型的核心思想","link":"#mpmd-模型的核心思想","children":[]},{"level":3,"title":"MPMD 与 SPMD 的比较","slug":"mpmd-与-spmd-的比较","link":"#mpmd-与-spmd-的比较","children":[]},{"level":3,"title":"应用场景","slug":"应用场景-1","link":"#应用场景-1","children":[]},{"level":3,"title":"示例场景","slug":"示例场景","link":"#示例场景","children":[]},{"level":3,"title":"实现 MPMD 的框架","slug":"实现-mpmd-的框架","link":"#实现-mpmd-的框架","children":[]},{"level":3,"title":"总结","slug":"总结-2","link":"#总结-2","children":[]},{"level":3,"title":"MPI 的核心概念","slug":"mpi-的核心概念","link":"#mpi-的核心概念","children":[]},{"level":3,"title":"MPI 的主要功能","slug":"mpi-的主要功能","link":"#mpi-的主要功能","children":[]},{"level":3,"title":"使用场景","slug":"使用场景-1","link":"#使用场景-1","children":[]},{"level":3,"title":"示例代码","slug":"示例代码-1","link":"#示例代码-1","children":[]},{"level":3,"title":"总结","slug":"总结-3","link":"#总结-3","children":[]}],"git":{"createdTime":1725441477000,"updatedTime":1725441477000,"contributors":[{"name":"mousesun","email":"3026098675@qq.com","commits":1}]},"readingTime":{"minutes":12.15,"words":3645},"filePathRelative":"技术科普/pytorch.md","localizedDate":"2024年9月4日","excerpt":"<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">PyTorch c10d</p>\\n</div>\\n<p>PyTorch 的 <code>c10d</code> 通信库是用于分布式计算的核心组件，特别是在需要跨多个设备（如多个GPU或多台机器）进行并行计算时。<code>c10d</code> 提供了分布式数据并行（Distributed Data Parallel, DDP）的底层实现，支持高效的数据同步和通信操作。</p>\\n<h3>主要功能</h3>\\n<ol>\\n<li>\\n<p><strong>通信后端</strong>：\\n<code>c10d</code> 支持多种通信后端（Backend），如：</p>\\n<ul>\\n<li><code>NCCL</code>: 适用于GPU间通信，特别是在NVIDIA硬件上。</li>\\n<li><code>GLOO</code>: 适用于CPU和GPU的跨平台通信。</li>\\n<li><code>MPI</code>: 基于Message Passing Interface，适合大规模分布式系统。</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>进程组（Process Group）</strong>：\\n<code>c10d</code> 中的进程组是通信的基本单元，可以将多个进程组织成一个组，以便它们之间进行通信。可以在不同的进程组之间进行广播、归约、全归约等操作。</p>\\n</li>\\n<li>\\n<p><strong>广播和同步</strong>：\\n<code>c10d</code> 提供了对数据进行广播和同步的接口，确保在多个进程或设备之间一致地传递数据。例如，在多GPU训练中，同步不同GPU上的模型参数。</p>\\n</li>\\n<li>\\n<p><strong>梯度同步</strong>：\\n在分布式数据并行训练中，<code>c10d</code> 自动同步各个设备计算出的梯度，从而确保在所有设备上更新后的模型参数保持一致。</p>\\n</li>\\n<li>\\n<p><strong>AllReduce操作</strong>：\\n<code>c10d</code> 支持AllReduce操作，这是在分布式训练中非常常用的操作，能够高效地合并不同设备上的梯度并更新模型参数。</p>\\n</li>\\n</ol>","autoDesc":true}');export{k as comp,c as data};
