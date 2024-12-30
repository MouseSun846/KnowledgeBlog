<template><div><table>
<thead>
<tr>
<th style="text-align:center"><strong>开发步骤</strong></th>
<th style="text-align:center"><strong>开发工具</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">数据处理</td>
<td style="text-align:center">MinerU、LabelU、LabelLLM</td>
</tr>
<tr>
<td style="text-align:center">预训练</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">微调</td>
<td style="text-align:center"><font style="color:rgb(77, 77, 77);">XTuner、</font><font style="color:rgb(25, 27, 31);">SWIFT、</font><font style="color:rgb(77, 77, 77);">LLaMA-Factory、Unsloth、Hugging Face Transformers</font></td>
</tr>
<tr>
<td style="text-align:center">RAG</td>
<td style="text-align:center">LlamaIndex、LangChain、AnythingLLM、Dify、RAGFlow</td>
</tr>
<tr>
<td style="text-align:center">部署</td>
<td style="text-align:center">LMDeploy、vLLM、Ollma</td>
</tr>
<tr>
<td style="text-align:center">评测</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">智能体</td>
<td style="text-align:center"></td>
</tr>
</tbody>
</table>
<h1 id="_1-数据处理" tabindex="-1"><a class="header-anchor" href="#_1-数据处理"><span><strong>1 数据处理</strong></span></a></h1>
<figure><img src="https://cdn.nlark.com/yuque/0/2024/png/40898394/1734938734557-4d045600-7db1-4b48-8e4f-70e2e8667798.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_1-1-数据提取" tabindex="-1"><a class="header-anchor" href="#_1-1-数据提取"><span>1.1 数据提取</span></a></h2>
<h3 id="mineru" tabindex="-1"><a class="header-anchor" href="#mineru"><span>MinerU</span></a></h3>
<p><strong>PDF文档提取工具</strong></p>
<p>Github地址：<a href="https://github.com/opendatalab/MinerU" target="_blank" rel="noopener noreferrer">https://github.com/opendatalab/MinerU</a></p>
<p>在线体验地址：<a href="https://opendatalab.com/OpenSourceTools/Extractor" target="_blank" rel="noopener noreferrer">https://opendatalab.com/OpenSourceTools/Extractor</a></p>
<p><a href="https://mineru.readthedocs.io/zh-cn/latest/index.html" target="_blank" rel="noopener noreferrer">MinerU</a>是一款将PDF转化为机器可读格式的工具（如markdown、json），可以很方便地抽取为任意格式。</p>
<h2 id="_1-2-数据标注" tabindex="-1"><a class="header-anchor" href="#_1-2-数据标注"><span>1.2 数据标注</span></a></h2>
<h3 id="labelu" tabindex="-1"><a class="header-anchor" href="#labelu"><span>LabelU</span></a></h3>
<p>Github地址：<a href="https://github.com/opendatalab/labelU/tree/main" target="_blank" rel="noopener noreferrer">https://github.com/opendatalab/labelU/tree/main</a></p>
<p>在线体验地址：<a href="https://labelu.shlab.tech/tasks/" target="_blank" rel="noopener noreferrer">https://labelu.shlab.tech/tasks/</a></p>
<p><a href="https://github.com/opendatalab/labelU/blob/main/README_zh-CN.md" target="_blank" rel="noopener noreferrer">LabelU</a>是一款综合性的数据标注平台，专为处理多模态数据而设计。该平台旨在通过提供丰富的标注工具和高效的工作流程，帮助用户更轻松地处理图像、视频和音频数据的标注任务，满足各种复杂的数据分析和模型训练需求。</p>
<h3 id="labelllm" tabindex="-1"><a class="header-anchor" href="#labelllm"><span>LabelLLM</span></a></h3>
<p>Github地址：<a href="https://github.com/opendatalab/LabelLLM" target="_blank" rel="noopener noreferrer">https://github.com/opendatalab/LabelLLM</a></p>
<p>LabelLLM是一个开源的数据标注平台，致力于优化对于大型语言模型（LLM）开发不可或缺的数据标注过程。LabelLLM的设计理念旨在成为独立开发者和中小型研究团队提高标注效率的有力工具。它的核心在于通过提供全面的任务管理解决方案和多样化的多模态数据支持，简化并增强模型训练的数据注释过程的效率。</p>
<h1 id="_2-模型微调" tabindex="-1"><a class="header-anchor" href="#_2-模型微调"><span>2 模型微调</span></a></h1>
<h3 id="xtuner-4-1k" tabindex="-1"><a class="header-anchor" href="#xtuner-4-1k"><span>XTuner(4.1k)</span></a></h3>
<p>Github地址：<a href="https://github.com/InternLM/xtuner" target="_blank" rel="noopener noreferrer">https://github.com/InternLM/xtuner</a></p>
<p>说明文档：<a href="https://xtuner.readthedocs.io/zh-cn/latest/index.html" target="_blank" rel="noopener noreferrer">https://xtuner.readthedocs.io/zh-cn/latest/index.html</a></p>
<p><code v-pre>XTuner</code>是上海人工智能实验室开发的一个高效、灵活、全能的轻量化大模型微调工具库。支持多种大语言模型 LLM、多模态图文模型 VLM 的预训练及轻量级微调。</p>
<p>支持的模型：</p>
<figure><img src="https://cdn.nlark.com/yuque/0/2024/png/40898394/1734941210093-b53d92a7-3420-4d39-8ad9-b12dd5a96edb.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="✔️swift-4-8k" tabindex="-1"><a class="header-anchor" href="#✔️swift-4-8k"><span>✔️<font style="color:rgb(25, 27, 31);">SWIFT(4.8k)</font></span></a></h3>
<p>Github地址：<a href="https://github.com/modelscope/ms-swift/tree/main" target="_blank" rel="noopener noreferrer">https://github.com/modelscope/ms-swift/tree/main</a></p>
<p>说明文档：<a href="https://swift.readthedocs.io/zh-cn/latest/index.html" target="_blank" rel="noopener noreferrer">https://swift.readthedocs.io/zh-cn/latest/index.html</a></p>
<p><code v-pre>[ms-swift](https://github.com/modelscope/ms-swift/tree/main)</code>(Scalable lightWeight Infrastructure for Fine-Tuning)是魔搭社区提供的大模型与多模态大模型微调部署框架，现已支持400+大模型与100+多模态大模型的训练（预训练、微调、人类对齐）、推理、评测、量化与部署。</p>
<p>支持的模型：</p>
<p><a href="https://swift.readthedocs.io/zh-cn/latest/Instruction/%E6%94%AF%E6%8C%81%E7%9A%84%E6%A8%A1%E5%9E%8B%E5%92%8C%E6%95%B0%E6%8D%AE%E9%9B%86.html" target="_blank" rel="noopener noreferrer">支持的模型和数据集 — swift 3.0.0.dev0 文档</a></p>
<h3 id="llama-factory-36-8k" tabindex="-1"><a class="header-anchor" href="#llama-factory-36-8k"><span>LLaMA-Factory(36.8k)</span></a></h3>
<p><strong>模块化与易用性的完美融合</strong></p>
<p>Github地址：<a href="https://github.com/hiyouga/LLaMA-Factory/tree/main" target="_blank" rel="noopener noreferrer">https://github.com/hiyouga/LLaMA-Factory/tree/main</a></p>
<p>说明文档：<a href="https://llamafactory.readthedocs.io/zh-cn/latest/index.html" target="_blank" rel="noopener noreferrer">https://llamafactory.readthedocs.io/zh-cn/latest/index.html</a></p>
<p><code v-pre>LLaMA Factory</code>是一个简单易用且高效的大型语言模型（Large Language Model）训练与微调平台。通过<code v-pre>LLaMA Factory</code>，可以在无需编写任何代码的前提下，在本地完成上百种预训练模型的微调。</p>
<h3 id="unsloth-19-7k" tabindex="-1"><a class="header-anchor" href="#unsloth-19-7k"><span><font style="color:rgb(77, 77, 77);">Unsloth(19.7k)</font></span></a></h3>
<p><strong>性能与效率的革命性突破</strong></p>
<p>Github地址：<a href="https://github.com/unslothai/unsloth" target="_blank" rel="noopener noreferrer">https://github.com/unslothai/unsloth</a></p>
<p>说明文档：<a href="https://docs.unsloth.ai/" target="_blank" rel="noopener noreferrer">https://docs.unsloth.ai/</a></p>
<p>支持的模型：<a href="https://docs.unsloth.ai/get-started/all-our-models" target="_blank" rel="noopener noreferrer">https://docs.unsloth.ai/get-started/all-our-models</a></p>
<h3 id="hugging-face-transformers" tabindex="-1"><a class="header-anchor" href="#hugging-face-transformers"><span><font style="color:rgb(77, 77, 77);">Hugging Face Transformers</font></span></a></h3>
<p><strong>社区与生态的丰富</strong></p>
<p>说明文档：<a href="https://hugging-face.cn/docs/transformers/index" target="_blank" rel="noopener noreferrer">https://hugging-face.cn/docs/transformers/index</a></p>
<p><code v-pre>Transformers</code>是基于PyTorch, TensorFlow和JAX打造的领先的机器学习工具。</p>
<p>🤗Transformers 提供了可以轻松地下载并且训练先进的预训练模型的API和工具. 使用预训练模型可以减少计算消耗和碳排放, 并且节省从头训练所需要的时间和资源. 这些模型支持不同模态中的常见任务，比如:</p>
<p>📝 自然语言处理: 文本分类, 命名实体识别, 问答, 语言建模, 摘要, 翻译, 多项选择和文本生成.</p>
<p>🖼️ 机器视觉: 图像分类, 目标检测和语义分割.</p>
<p>🗣️ 音频: 自动语音识别和音频分类.</p>
<p>🐙 多模态: 表格问答, 光学字符识别, 从扫描文档提取信息, 视频分类和视觉问答.</p>
<p>🤗Transformers支持在PyTorch, TensorFlow和JAX上的互操作性. 这给在模型的每个阶段使用不同的框架带来了灵活性; 在一个框架中使用几行代码训练一个模型, 然后在另一个框架中加载它并进行推理. 模型也可以被导出为ONNX和TorchScript格式, 用于在生产环境中部署.</p>
<h1 id="_3-检索增强rag" tabindex="-1"><a class="header-anchor" href="#_3-检索增强rag"><span>3 检索增强RAG</span></a></h1>
<p>参考文档：<a href="https://zhuanlan.zhihu.com/p/697282510" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/697282510</a></p>
<h3 id="✔️llamaindex-37-6k" tabindex="-1"><a class="header-anchor" href="#✔️llamaindex-37-6k"><span>✔️LlamaIndex(37.6k)</span></a></h3>
<p>Github地址：<a href="https://github.com/jerryjliu/llama_index" target="_blank" rel="noopener noreferrer">https://github.com/jerryjliu/llama_index</a></p>
<p>说明文档：<a href="https://llama-index.readthedocs.io/zh/latest/index.html" target="_blank" rel="noopener noreferrer">https://llama-index.readthedocs.io/zh/latest/index.html</a></p>
<pre><code>[https://docs.llamaindex.ai/en/stable/](https://docs.llamaindex.ai/en/stable/)
</code></pre>
<p><code v-pre>LlamaIndex</code>（GPT Index)是一个用于您的LLM应用程序的数据框架。</p>
<p><code v-pre>LlamaIndex</code>是一个“数据框架”，可帮助您构建LLM应用程序。它提供以下工具：</p>
<ul>
<li>提供<strong>数据连接器</strong>以摄取您现有的数据源和数据格式（API，PDF，文档，SQL等)</li>
<li>提供结构化您的数据（索引，图)的方法，以便可以轻松地与LLMs一起使用此数据。</li>
<li>提供<strong>高级检索/查询界面</strong>：输入任何LLM输入提示，返回检索的上下文和知识增强的输出。</li>
<li>允许与外部应用程序框架（例如LangChain，Flask，Docker，ChatGPT等)轻松集成。</li>
</ul>
<h3 id="langchain-96-9k" tabindex="-1"><a class="header-anchor" href="#langchain-96-9k"><span>LangChain(96.9k)</span></a></h3>
<p>Github地址：<a href="https://github.com/langchain-ai/langchain" target="_blank" rel="noopener noreferrer">https://github.com/langchain-ai/langchain</a></p>
<p>说明文档：<a href="https://python.langchain.com/docs/introduction/" target="_blank" rel="noopener noreferrer">https://python.langchain.com/docs/introduction/</a></p>
<pre><code>[https://www.langchain.com.cn/](https://www.langchain.com.cn/)
</code></pre>
<p><code v-pre>LangChain</code> 是一个开源工具，它提供了一种强化大型语言模型（LLM）以实现检索增强型生成的方法。该工具通过在对话模型中加入检索步骤来提升LLM的回应质量。这样的集成使得模型能够动态地从数据库或文档集合中检索信息，从而使其回应不仅更准确，而且与上下文更加相关。它将模块化和可扩展的架构与高级界面结合在一起，特别适用于构建检索增强生成（RAG）系统。</p>
<p>利用<code v-pre>LangChain</code>的功能，开发者能够开发出更智能的对话代理，这些代理能够接入并使用广泛的外部信息资源。</p>
<h3 id="anythingllm-29-2k" tabindex="-1"><a class="header-anchor" href="#anythingllm-29-2k"><span>AnythingLLM(29.2k)</span></a></h3>
<p>Github地址：<a href="https://github.com/Mintplex-Labs/anything-llm/tree/master" target="_blank" rel="noopener noreferrer">https://github.com/Mintplex-Labs/anything-llm/tree/master</a></p>
<p>说明文档：<a href="https://docs.anythingllm.com/" target="_blank" rel="noopener noreferrer">https://docs.anythingllm.com/</a></p>
<p><code v-pre>AnythingLLM</code>是一个全栈应用程序，您可以使用现成的商业大语言模型或流行的开源大语言模型，再结合向量数据库解决方案构建一个私有ChatGPT，不再受制于人：您可以本地运行，也可以远程托管，并能够与您提供的任何文档智能聊天。</p>
<h3 id="✔️dify-29-2k" tabindex="-1"><a class="header-anchor" href="#✔️dify-29-2k"><span>✔️Dify(29.2k)</span></a></h3>
<p>Github地址：<a href="https://github.com/Mintplex-Labs/anything-llm/tree/master" target="_blank" rel="noopener noreferrer">https://github.com/Mintplex-Labs/anything-llm/tree/master</a></p>
<p>说明文档：<a href="https://docs.dify.ai/zh-hans" target="_blank" rel="noopener noreferrer">https://docs.dify.ai/zh-hans</a></p>
<p><code v-pre>Dify</code>是一款开源的大语言模型(LLM) 应用开发平台。它融合了<u>后端即服务（Backend as Service）</u>和 <u>LLMOps</u> 的理念，使开发者可以快速搭建生产级的生成式 AI 应用。即使你是非技术人员，也能参与到 AI 应用的定义和数据运营过程中。</p>
<p><code v-pre>Dify</code>内置了构建 LLM 应用所需的关键技术栈，包括对数百个模型的支持、直观的Prompt编排界面、高质量的 RAG引擎、稳健的Agent框架、灵活的流程编排，并同时提供了一套易用的界面和API。</p>
<h3 id="ragflow-26-3k" tabindex="-1"><a class="header-anchor" href="#ragflow-26-3k"><span><strong><font style="color:rgb(77, 77, 77);">RAGFlow(26.3k)</font></strong></span></a></h3>
<p>Github地址：<a href="https://github.com/Mintplex-Labs/anything-llm/tree/master" target="_blank" rel="noopener noreferrer">https://github.com/Mintplex-Labs/anything-llm/tree/master</a></p>
<p>说明文档：<a href="https://ragflow.io/docs/dev/" target="_blank" rel="noopener noreferrer">https://ragflow.io/docs/dev/</a></p>
<p><code v-pre>RAGFlow</code>作为一款端到端的RAG解决方案，旨在通过深度文档理解技术，解决现有RAG技术在数据处理和生成答案方面的挑战。它不仅能够处理多种格式的文档，还能够智能地识别文档中的结构和内容，从而确保数据的高质量输入。</p>
<p><code v-pre>RAGFlow</code>的设计哲学是“高质量输入，高质量输出”，它通过提供可解释性和可控性的生成结果，让用户能够信任并依赖于系统提供的答案。</p>
</div></template>


