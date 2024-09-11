<template><div><div class="hint-container tip">
<p class="hint-container-title">MPress: Democratizing Billion-Scale Model Training on Multi-GPU Servers via Memory-Saving Inter-Operator Parallelism</p>
<p>地址：<a href="https://www.usenix.org/system/files/osdi24-lin-zhiqi.pdf" target="_blank" rel="noopener noreferrer">https://www.usenix.org/system/files/osdi24-lin-zhiqi.pdf</a></p>
<p>中文解读：<a href="https://mp.weixin.qq.com/s/GV_CF9fPpxsPBNbEsvhS5g" target="_blank" rel="noopener noreferrer">https://mp.weixin.qq.com/s/GV_CF9fPpxsPBNbEsvhS5g</a></p>
</div>
<h3 id="摘要" tabindex="-1"><a class="header-anchor" href="#摘要"><span>摘要</span></a></h3>
<p>随着深度神经网络（DNN）模型规模的增长，深度学习训练越来越依赖手工设计的搜索空间来找到高效的并行执行计划。然而，我们的研究表明，现有的搜索空间忽略了一些重要的计划配置，这些配置在某些设置下（如处理大型嵌入表时）对著名DNN模型（例如AlphaFold2）的训练性能有显著影响。</p>
<p>为了解决这个问题，我们提出了nnScaler，这是一个用于生成深度学习训练并行化计划的框架。nnScaler不依赖现有的搜索空间，而是通过三个原语（op-trans、op-assign和op-order），让领域专家能够构建自己的搜索空间。这些原语能够捕捉模型的转换以及任何并行化计划中转化模型的时空调度。为了避免搜索空间爆炸，nnScaler允许在构建空间时对这些原语应用约束。通过这些原语和约束，nnScaler不仅可以构建现有的搜索空间，还可以创建新的空间。实验表明，nnScaler能够在新的搜索空间中找到并行化计划，与DeepSpeed、Megatron-LM和Alpa等解决方案相比，对一些流行的DNN模型（如Swin-Transformer和AlphaFold2）实现了最高3.5倍的加速。</p>
<h3 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h3>
<p>近年来，深度神经网络（DNN）模型的规模迅速增长，训练这些模型的计算需求也随之大幅增加。为了满足这一需求，分布式训练成为了主流。分布式训练通过将计算任务分配到多个设备（通常是GPU）上来加速训练过程。这种并行化的效果依赖于如何将模型的计算操作有效地分配给多个设备，合理的分配计划可以显著提高训练性能。</p>
<p>然而，设计高效的并行训练计划并非易事。现有的方法通常依赖于手工设计的搜索空间，这些搜索空间定义了并行化的各种配置。然而，我们的研究表明，这些搜索空间通常不够全面，忽略了许多潜在的计划配置。这些遗漏的配置在某些情况下对训练性能有很大的影响，尤其是在处理大型嵌入表或复杂模型（如AlphaFold2）时。</p>
<p>为了填补这一空白，我们提出了nnScaler，一个新的框架，用于生成深度学习训练的并行化计划。nnScaler的核心思想是通过三个基本原语（op-trans、op-assign、op-order）让领域专家能够定义和构建自己的搜索空间。这些原语可以捕捉模型转换以及任何并行化计划中对模型的时空调度，从而避免了现有方法中过于狭窄的搜索空间。</p>
<p>nnScaler不仅可以重现现有的搜索空间，还可以创建新的搜索空间，从而探索更多潜在的并行化配置。通过在构建空间时引入约束条件，nnScaler有效地避免了搜索空间爆炸的问题。</p>
<p>我们的实验结果表明，nnScaler能够在这些新的搜索空间中找到高效的并行化计划，并在多个流行的DNN模型（如Swin-Transformer和AlphaFold2）上取得了显著的性能提升，最高加速达到3.5倍，优于现有的主流解决方案（如DeepSpeed、Megatron-LM和Alpa）。</p>
<h3 id="_2-背景与动机" tabindex="-1"><a class="header-anchor" href="#_2-背景与动机"><span>2. 背景与动机</span></a></h3>
<p>并行化计划的搜索空间。并行化计划是指一种训练执行计划，它指定了在给定的 GPU 集合上模型的分区和相应的时空调度方案。训练一个拥有数百亿参数的大型模型需要数千个 GPU。一个大型模型可能由大约 100 层组成，每一层代表一个子神经架构（例如，注意力机制），其中包含处理具有数万维度大小的张量的多个操作符（例如，隐藏维度）。对于大型模型而言，广泛的分区选择和大量的时空调度选择结合在一起，形成了一个极其庞大且组合复杂的并行化计划搜索空间。</p>
<p>现有的方法依赖于经过充分研究的手工并行化计划或搜索空间来解决这个问题。例如，数据并行性是一种特殊的并行化计划，它沿着与其相关的张量的批次维度对操作符进行分区。这些分区后的操作符随后在多个设备（GPU）上复制，并共享相同的模型参数（权重），以实现并发模型训练。张量并行性是一类更一般的计划，允许在不限于批次维度的维度上进行分区。这种方法允许将分区后的操作符分布在不同的设备上，以适应无法在单个设备上容纳的模型。</p>
<p>由于大型深度神经网络（DNN）模型通常由多个层组成，因此也可以将模型分为多个阶段，每个阶段包含一个或多个层。各个阶段被放置在不同的设备上并以流水线方式执行，因此称为流水线并行性。为了提高流水线效率，训练样本的批次进一步被划分为微批次，并按照精心设计的时间顺序执行。</p>
<p>上述并行化方案可以组合成一种新的方案，称为 3D 并行性，以进一步提高训练效率。Megatron-LM 集成了 3D 并行性，这种方法以参数化的方式结合了数据、张量和流水线并行性，以支持类似 GPT 的模型。给定 N 个设备，Megatron-LM 将模型分为 K 个阶段，每个阶段再分为 M 个分区。模型使用 K 阶段流水线并行性和 M 路张量并行性进行执行。对于足够大的 N，Megatron-LM 还可以采用 (N / (M * K))-路数据并行性，以进一步提高训练性能。3D 并行性代表了在大型搜索空间内几类经过充分研究的并行化计划。</p>
<p>Alpa 进一步将这些并行化方案进行概括，手工构建了一个两级层次化搜索空间。这个层次结构使得可以使用动态规划等高效搜索技术。由于其更大的搜索空间，即 SPMD（广义张量并行空间）和流水线并行性的结合，Alpa 被证明能够产生更优的并行化计划。</p>
<h4 id="_2-1-现有搜索空间的局限性" tabindex="-1"><a class="header-anchor" href="#_2-1-现有搜索空间的局限性"><span>2.1 现有搜索空间的局限性</span></a></h4>
<p>尽管现有的手工并行化搜索空间在具有相似模型架构的主流模型中显示出有效性，但它依赖于简化搜索和构建并行化计划的假设。然而，这些简化可能会排除一些有前景的计划。</p>
<p>在张量并行性中，假设分区后的操作符及其对应的分割张量分布在不相交的设备上。例如，为了训练具有高保真图像的视觉模型，张量并行性将与大图像相关的大型张量进行分割，并将分割后的张量分配给不相交的设备。这排除了将分割操作符放置在较少设备上的情况，即多个操作符共享一个设备，并以流线化的方式计算，以同时减少内存消耗和设备间通信成本。</p>
<p>流水线并行性假设训练涉及一次前向传播和一次反向传播。然而，像 AlphaFold2 这样的模型需要三次前向传播和一次反向传播。这种非常规的训练方法使得现有的流水线并行性无法适用。</p>
<p>流水线并行性还假设不同的流水线阶段分布在不相交的设备上，并禁止任何两个阶段通过时间复用共享相同的设备集。例如，多语言大型语言模型（LLMs）通常在模型的早期计算阶段使用一个大型嵌入表。这导致显著的 GPU 内存消耗（超过 40%），但计算利用率却很低（不到 5%）。鉴于流水线并行性（以及张量并行性）中的不相交设备分配，硬件利用率的不平衡是不可避免的。</p>
<p>后来的手工搜索空间（例如，结合张量和流水线并行性等的方案）继承了这些假设，因此也遭受了相同的局限性。这促使我们设计一种更灵活的空间构建方法，使领域专家能够为他们的模型找到更有效的训练计划。</p>
<h4 id="_2-2-由于灵活性带来的新挑战" tabindex="-1"><a class="header-anchor" href="#_2-2-由于灵活性带来的新挑战"><span>2.2 由于灵活性带来的新挑战</span></a></h4>
<p>引入一种更灵活的方式来构建并行化计划空间带来了新的挑战。现有的框架，如 Megatron-LM、Alpa 和 DeepSpeed，仅实现了一些经过充分研究的分区、调度和通信方案，这些方案支持在已知的并行化空间内的并行化计划。然而，新的空间可能会揭示操作符分区的新方法，以及具有非常规通信模式的新操作符调度。此外，更灵活的并行化计划研究较少，因此可能容易出错。</p>
<p>为了解决上述挑战，我们设计了一个编译过程，以检测和防止并行化计划中的潜在错误（例如，转换后的数据流图中的循环），并为发现的并行化计划生成具有高效通信操作的运行时代码。</p>
<h3 id="_3-并行化搜索空间构建" tabindex="-1"><a class="header-anchor" href="#_3-并行化搜索空间构建"><span>3. 并行化搜索空间构建</span></a></h3>
<p>并行化计划可以自然地通过模型分区和分区模型的时空调度来表达。因此，nnScaler 提出了三个原语：op-trans、op-assign 和 op-order（见表 1），以捕捉并行化计划的三个方面。将这些原语结合起来，可以为任意模型和加速器设备构建任何并行化计划的搜索空间。</p>
<h4 id="op-trans" tabindex="-1"><a class="header-anchor" href="#op-trans"><span>op-trans</span></a></h4>
<p>op-trans(op, algo, n) 根据选定的转换算法 algo 将操作符 op 转换为 n 个子操作符，该算法从与 op 类型相对应的算法集中选择。例如，矩阵乘法操作符 matmul(Ai,k,Bk,j) 可以沿着张量 A 的维度 i 将其分区为两个 matmul 操作符，同时复制张量 B。实际上，大多数操作符可以沿着其相关张量的某个维度（例如 A 或 B 的 i 或 k）进行分区，并且分区后的（子）操作符的计算与原始操作符的计算保持一致。</p>
<p>基于这一观察，nnScaler 实现了大多数深度神经网络（DNN）模型中主要操作符的分区算法。领域专家可以通过 algos() 接口重用所需的算法。nnScaler 还可以集成自定义转换算法，例如由领域专家开发的算法，适用于任何给定的操作符。需要注意的是，转换算法不仅限于操作符分区。例如，可以通过增加一个额外的重新计算操作符或内存交换操作符来增强操作符，以节省内存。在本文中，我们将“转换”和“分区”这两个术语互换使用。</p>
<h4 id="op-assign" tabindex="-1"><a class="header-anchor" href="#op-assign"><span>op-assign</span></a></h4>
<p>给定一组设备 D 和一个操作符 op，op-assign(op, d) 表示操作符 op 将在 D 中的第 d 个设备上执行。</p>
<h4 id="op-order" tabindex="-1"><a class="header-anchor" href="#op-order"><span>op-order</span></a></h4>
<p>当非依赖操作符（例如 op1 和 op2）被分配到同一设备时，op-order(op1, op2) 确保op1 必须在 op2 之前执行。非依赖操作符的执行顺序在训练性能中可以发挥至关重要的作用。例如，在流水线并行性中，流水线阶段中的一个操作符可以沿着批次维度分区成多个微批次。我们把这些（子）操作符表示为 op.mb1、op.mb2 等，其中 mbi 表示相应的微批次 ID。这些操作符 op.mbi 可以在任意顺序下相对于 op.mbj（i ≠ j）执行。</p>
<p>然而，各种研究表明，一旦这些操作符在时间维度上被精心编排，就有可能最小化流水线“气泡” [24, 54]，从而显著提高训练效率。</p>
<p>使用上述提到的三个原语，领域专家可以编写 Python 代码来为任何深度神经网络（DNN）模型构建任意并行化计划的搜索空间。这些代码不一定与特定的 DNN 模型绑定。因此，nnScaler 将模型代码与搜索空间和搜索策略相关的代码分离。请注意，为了简化编程工作，原语中的 op 可以代表一个子图，其中原语适用于子图中的每个操作符。</p>
<p>由于原语的灵活性和大型 DNN 模型的规模，构建的并行化搜索空间通常包含数百甚至数千个操作符，具有组合搜索复杂性。为了解决这个问题，nnScaler 允许领域专家在应用这些原语时施加约束。这些约束可以显著减少搜索空间（第 4 节），从而使得有效的搜索方法（第 5 节）成为可能。</p>
<h3 id="_4-在搜索空间中应用约束" tabindex="-1"><a class="header-anchor" href="#_4-在搜索空间中应用约束"><span>4. 在搜索空间中应用约束</span></a></h3>
<p>在 nnScaler 中，约束被表达为表 1 中原语的参数化参数。当所有参数都变为具体值时，整个空间就缩减为一个具体的并行化计划。以下，我们将说明如何使用三个原语和约束（第 4.1 节）来表达像数据、张量和流水线并行性这样的经过充分研究的并行化计划。第 4.2 节讨论了导致新颖并行化计划的一些新约束。</p>
<h4 id="_4-1-现有搜索空间的约束" tabindex="-1"><a class="header-anchor" href="#_4-1-现有搜索空间的约束"><span>4.1 现有搜索空间的约束</span></a></h4>
<p>数据并行和张量并行的约束。表2显示了数据并行和张量并行相关的基本操作和约束。数据并行和张量并行都将算子均匀地分成n个部分。该分割沿某一维度进行，由<code v-pre>algo</code>描述，每个被分割的子算子被分配到不同的设备上并发执行，即表2中的约束2和3。注意，数据并行始终沿着批次维度进行分割，因此<code v-pre>algo</code>的选择比张量并行更为受限。</p>
<p>Table 2: Constraints for data and tensor parallelisms.</p>
<table>
<thead>
<tr>
<th>Primitives</th>
<th>Constraints</th>
</tr>
</thead>
<tbody>
<tr>
<td>1 sub-ops = op-trans(op,algo,n)</td>
<td>n =| D |</td>
</tr>
<tr>
<td>2 op-assign(sub-opi,di)</td>
<td>di,dj ∈ D</td>
</tr>
<tr>
<td>3 op-assign(sub-opj,dj)</td>
<td>di ̸= dj</td>
</tr>
</tbody>
</table>
<p>管道并行的约束。给定一组设备D，管道并行将模型G划分为子图<code v-pre>Gi</code> (0 ≤ i &lt; |D|)，其中<code v-pre>i</code>表示第i个管道阶段。子图将被分配到不同的设备上，如表3所示。</p>
<p>Table 3: Constraints for dividing a model G into |D| stages</p>
<table>
<thead>
<tr>
<th>Primitives</th>
<th>Constraints</th>
</tr>
</thead>
<tbody>
<tr>
<td>1 op-assign(Gi, di)</td>
<td>di,dj ∈ D,</td>
</tr>
<tr>
<td>2 op-assign(Gj, dj)</td>
<td>di ̸= dj</td>
</tr>
</tbody>
</table>
<p>为了最小化“气泡”，管道并行将一批样本划分为多个微批次。子图<code v-pre>(Gi,n)</code>处理第n个微批次。我们进一步将正向子图表示为<code v-pre>fGi</code>，反向子图表示为<code v-pre>bGi</code>，著名的1F1B【24】管道并行的约束总结在表4中。</p>
<p>Table 4: Constraints for 1F1B schedule.</p>
<table>
<thead>
<tr>
<th>Primitives</th>
<th>Constraints</th>
</tr>
</thead>
<tbody>
<tr>
<td>1 op-order((fGi,m),(fGi,n)) <br/> 2 op-order((bGi,m),(bGi,n))</td>
<td>m &lt; n</td>
</tr>
<tr>
<td>3 op-order((fGi,m+ofst),(bGi,m)) <br/> 4 op-order((bGi,m),(fGi,m+ofst+1))</td>
<td>ofst=|D| −i,m ≥ 0</td>
</tr>
</tbody>
</table>
<p>如图 1 所示，表 4 中的约束 1 和 2 确保了以下内容：在阶段 i 中，微批次的前向和反向传播的执行顺序必须相同。也就是说，对于任何两个微批次 m 和 n，其中 m &lt; n，fGm 应该在 fGn 之前执行（1）。同样的规则也适用于反向传播中的 bGm 和 bGn（2）。</p>
<p>表 4 中的约束 3 和 4 指定了 1F1B 的微妙调度顺序。它们定义了 ofst，即相对于当前阶段的偏移量。在流水线中越早的阶段，偏移量越大。因此，对于 Gi，较早的微批次的反向传播应该相对于前向传播执行得晚（3）。而较晚的微批次的前向传播应该在较早微批次的反向传播之后紧接着执行（4）。</p>
<h4 id="_4-2-新的约束" tabindex="-1"><a class="header-anchor" href="#_4-2-新的约束"><span>4.2 新的约束</span></a></h4>
<p>除了现有的搜索空间之外，领域专家可以应用新的约束来构建自定义的搜索空间，以便为各种模型搜索新的、更高效的并行化方案，具体说明如下。</p>
<h5 id="_4-2-1-swin-transformer-的约束" tabindex="-1"><a class="header-anchor" href="#_4-2-1-swin-transformer-的约束"><span>4.2.1 Swin-Transformer 的约束</span></a></h5>
<p>为了提升视觉任务的能力，越来越多的人选择采用更高分辨率的图像来训练大型视觉模型，例如 Swin Transformer。使用更大的图像会在训练过程中生成更大的中间张量，尤其是在注意力 (Attn) 和前馈 (FF) 算子中。这要求比单个 GPU 更大的内存才能容纳这些数据。</p>
<p>张量并行是解决此问题的标准做法。对于一个流水线来说，Attn 和 FF 中的算子被分割并分配到 <code v-pre>|Mi|</code> 台设备上，<code v-pre>Mi</code> 是设备集，用于容纳第 <code v-pre>i</code> 阶段中的算子。张量并行分割的算子被放置在不同的设备上，因此每个设备只持有一个分割后的算子。然而，我们观察到，有时多个分割后的算子可以共享一个设备，从而以流水线方式进行计算，减少每个阶段所需的设备数量并降低内存消耗。尽管多个分割算子的流水线计算可能会减慢计算过程，但减少设备间的通信可以降低成本并加快整体过程。</p>
<p>在阶段 <code v-pre>i</code> 中的任意 Attn 和 FF 算子 <code v-pre>op</code> 中，设 <code v-pre>sub_op</code> 为 <code v-pre>op</code> 任何一个经过转换的子算子。假设允许 <code v-pre>C</code> 个子算子共享一个设备，从而导致一个设备集 <code v-pre>Di</code> 被分配给第 <code v-pre>i</code> 阶段的算子，其中 <code v-pre>|Di| &lt; |Mi|</code>。这些约束如表 5 所示。其他算子可以通过现有的搜索空间来描述，即文献 [65] 中定义的搜索空间。注意，<code v-pre>C</code> 是一个超参数，其值可以通过策略搜索确定（详见第 5 节）。</p>
<h5 id="_4-2-2-t5-的约束" tabindex="-1"><a class="header-anchor" href="#_4-2-2-t5-的约束"><span>4.2.2 T5 的约束</span></a></h5>
<p>多语言模型如 T5 通常使用一个大型嵌入表 <code v-pre>E</code>，其中包含来自多种语言的词汇嵌入。<code v-pre>E</code> 只在 LLM 的第一个和最后一个层中使用，但它消耗了大量内存，计算成本却很低。管道并行会优先考虑分配设备以容纳 <code v-pre>E</code>，并将其余设备留给其他算子。这种安排会导致硬件利用率不平衡，包含 <code v-pre>E</code> 的设备 GPU 周期使用率很低，而内存使用率却很高。</p>
<p>通过 nnScaler 提供的三个原语和约束，我们可以将 <code v-pre>E</code> 拆分到整个设备集 <code v-pre>D</code> 上。然后通过构建遵循常规搜索空间的搜索空间，其他算子可以共享 <code v-pre>D</code> 中剩余的资源。这些约束在表 6 中有突出体现，它打破了不同流水线阶段中的算子不能共享同一设备集的常规假设。类似的解决方案也适用于图神经网络的训练。</p>
<h5 id="_4-2-3-alphafold2-的约束" tabindex="-1"><a class="header-anchor" href="#_4-2-3-alphafold2-的约束"><span>4.2.3 AlphaFold2 的约束</span></a></h5>
<p>在 AlphaFold2 中，每个微批次的训练需要三个前向传播和一个反向传播（即 3F1B）。传统的 1F1B 流水线并行无法支持这种模式。图 2 左侧显示了训练一个微批次后再训练另一个的朴素方法，这种方法由于流水线气泡和中间结果的积累效率低下。因此，我们决定在不同微批次中交错前向和反向传播，同时保持时间顺序上的约束。设 <code v-pre>fpGi</code> 表示第 <code v-pre>i</code> 个流水线阶段中的第 <code v-pre>p</code> 次前向传播子图，<code v-pre>ofst</code> 为 <code v-pre>S-i</code>，其中 <code v-pre>S</code> 表示流水线阶段的总数。表 7 中列出了 3F1B 的约束条件。</p>
<p>表 7 中的约束 1 和 2 交错了连续微批次的三个前向传播，顺序为递减。约束 3 规定，在最后执行的前向传播完成后，对应的反向传播子图应该在具有相对当前阶段的偏移量（ofst）的微批次ID上执行。</p>
<h4 id="_4-3-讨论" tabindex="-1"><a class="header-anchor" href="#_4-3-讨论"><span>4.3 讨论</span></a></h4>
<p>约束是定制各种并行化计划并定义其搜索空间的强大抽象工具。为了设计有效的约束，nnScaler 假设其用户，通常是领域专家，对模型架构和并行训练具有深入了解。有了这些知识，使用三个原语构建搜索空间就变得直观了。根据我们的经验，可以通过识别训练中的性能瓶颈（例如，过高的 GPU 内存使用、计算/通信不平衡）来推导出有效的约束。然后可以定义这些约束以缓解瓶颈。此外，随着约束调整后瓶颈的变化，约束可以迭代地细化。通过对约束的细化，nnScaler 使并行化计划的生成比以前的方法更加简单。</p>
<h3 id="_5-计划搜索策略" tabindex="-1"><a class="header-anchor" href="#_5-计划搜索策略"><span>5. 计划搜索策略</span></a></h3>
<p>有了新的用户定义搜索空间后，nnScaler 引入了一个通用的策略框架来搜索高效的并行化计划。如算法1所示，策略将模型图 <code v-pre>G</code> 和用户指定的搜索空间作为输入。我们将搜索空间表示为 <code v-pre>Ctrans</code>、<code v-pre>Cassign</code> 和 <code v-pre>Corder</code>，它们分别对应三个原语：op-trans、op-assign 和 op-order，并带有与约束相关的增强。策略通过逐渐收紧约束来缩小空间，最终将其减少到唯一的并行化计划，即 <code v-pre>Cfinal_trans</code>、<code v-pre>Cfinal_assign</code> 和 <code v-pre>Cfinal_order</code>。</p>
<p>策略框架的一个关键特点是，它允许开发者从新的搜索空间中“切割”出一个子空间，在这个子空间中可以应用现有的搜索策略。具体来说，搜索过程包括两个阶段：算子划分与放置搜索，以及时间顺序搜索。</p>
<h4 id="_5-1-算子划分与放置搜索" tabindex="-1"><a class="header-anchor" href="#_5-1-算子划分与放置搜索"><span>5.1 算子划分与放置搜索</span></a></h4>
<p>这一阶段的目标是将计算均匀分配到多个设备上，同时最小化通信成本。一个算子的不同划分选项会带来不同的通信成本。例如，划分批次维度需要对参数执行全归约操作，而划分参数则需要在设备间复制输入激活张量。算子的不同放置选项也会导致各设备执行时间不同。因此，一个设备 <code v-pre>d</code> 上的执行时间为其分配的算子的计算时间 <code v-pre>Compd</code> 与相关通信时间 <code v-pre>Commd</code> 之和。整体运行时间由最慢的设备决定。</p>
<div class="language-math line-numbers-mode" data-highlighter="shiki" data-ext="math" data-title="math" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>minimize max {Compd + Commd}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>通过将划分和放置选项表示为整数，这个优化问题可以被看作是一个 NP 困难的整数线性规划问题。应用约束后，公式中的搜索空间可以大大缩小，从而加快搜索过程。</p>
<h4 id="_5-2-时间顺序搜索" tabindex="-1"><a class="header-anchor" href="#_5-2-时间顺序搜索"><span>5.2 时间顺序搜索</span></a></h4>
<p>在算子变换与分配完成后，某些算子的时间顺序已由转换后的图中的数据依赖关系确定。然而，同一设备上的两个没有直接依赖关系的算子可以以任意顺序执行。此外，对于流水线并行，同一批次中的不同微批次上执行的同一算子的顺序未被指定。nnScaler 利用 Tessel，一个最先进的搜索策略来确定这些算子的执行顺序。</p>
<h3 id="_6-并行化计划的编译" tabindex="-1"><a class="header-anchor" href="#_6-并行化计划的编译"><span>6. 并行化计划的编译</span></a></h3>
<figure><img src="/assets/images/nnscaler_overview.jpg" alt="Figure 3: System overview of nnScaler" tabindex="0" loading="lazy"><figcaption>Figure 3: System overview of nnScaler</figcaption></figure>
<p>nnScaler 会将模型和生成的并行化计划编译为可执行代码，遵循图 3 中展示的端到端流程。系统首先将深度学习模型转换为数据流图（Graph IR）。通过原语和相关约束定义搜索空间，nnScaler 利用搜索策略生成并行化计划。计划编译接着将该计划定义的原语和约束应用于 Graph IR。在此步骤中，nnScaler 通过 vTensor 和 pTensor 抽象进行数据依赖追踪。生成的新数据依赖关系以及由于算子分布到多个设备而产生的额外通信操作会被反映到 Graph IR 中，最终这些内容会被物化为并行执行的可执行代码。</p>
<h5 id="张量抽象-vtensor-和-ptensor" tabindex="-1"><a class="header-anchor" href="#张量抽象-vtensor-和-ptensor"><span>张量抽象 vTensor 和 pTensor</span></a></h5>
<p>vTensor 和 pTensor 被引入以追踪应用三个原语时数据依赖关系的变化。如图 4 所示，pTensor 表示逻辑模型中的张量，而 vTensor 则表示应用原语后产生的结果张量。vTensor 连接到 pTensor，并维护一个掩码，指示该 vTensor 所代表的 pTensor 部分。一个 pTensor 可以与多个算子相关联。在图 4 的顶部，算子 A 的输出作为算子 B 的输入，两个算子通过各自的 vTensor 连接到同一个 pTensor。</p>
<p>通过 vTensor，每个算子都可以独立地进行变换、分配和排序。当应用 <code v-pre>op-trans</code> 时，nnScaler 通过 vTensor 的“掩码”划分 vTensor，而 pTensor 保持不变。例如，在图 4 中，算子 A 只会拆分自身及其输出的 vTensor，而算子 B 的 vTensor 不受影响。对于其他类型的原语，vTensor 的掩码保持不变。因此，nnScaler 可以通过计算生产者和消费者 vTensor 的掩码交集来检测它们之间是否存在数据依赖关系。运行时执行过程中，只有 vTensor 会被实例化为实际的 GPU 张量实例。</p>
<p>借助 vTensor-pTensor 抽象进行数据流图转换时的依赖追踪，nnScaler 能够检测到新生成的图中的循环依赖，从而避免出现死锁，确保计划的有效性。</p>
<h4 id="数据依赖的物化" tabindex="-1"><a class="header-anchor" href="#数据依赖的物化"><span>数据依赖的物化</span></a></h4>
<p>在应用了原语和约束后，nnScaler 将通过 vTensor-pTensor 物化新的数据依赖关系为具体的数据操作和通信操作。对于消费者 vTensor（如图 4 中的 B1），nnScaler 会识别出依赖的生产者 vTensor（如 A1 和 A2），并在物化过程中插入张量操作（例如 <code v-pre>torch.split</code> 或 <code v-pre>torch.chunk</code>）以提取相应的张量片段。当生产者和消费者位于不同设备上时（由于 <code v-pre>op-assign</code> 的作用），nnScaler 会在物化过程中插入点对点的发送-接收通信操作。</p>
<p>为了提高通信效率，位于同一 pTensor 下的 vTensor 之间的某些通信模式可以通过集体通信原语（如 <code v-pre>allgather</code>、<code v-pre>allreduce</code> 或 <code v-pre>alltoall</code>）来实现。例如，图 4 中，A 的 vTensor3 和 vTensor4 与 B 的 vTensor5 和 vTensor6 之间的通信可以通过更高效的 <code v-pre>alltoall</code> 原语来物化。nnScaler 使用简单的模式匹配来识别每个 pTensor 及其相关 vTensor 的适当集体通信原语。</p>
</div></template>


