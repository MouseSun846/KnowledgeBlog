<template><div><p>k8s 笔记总结</p>
<h1 id="pv" tabindex="-1"><a class="header-anchor" href="#pv"><span>pv</span></a></h1>
<h2 id="访问模式-access-modes" tabindex="-1"><a class="header-anchor" href="#访问模式-access-modes"><span>访问模式（Access Modes）</span></a></h2>
<p>Kubernetes支持的访问模式如下。</p>
<ul>
<li>
<p>ReadWriteOnce（RWO）：读写权限，并且只能被单个Node挂
载。</p>
</li>
<li>
<p>ReadOnlyMany（ROX）：只读权限，允许被多个Node挂载。</p>
</li>
<li>
<p>ReadWriteMany（RWX）：读写权限，允许被多个Node挂载。</p>
</li>
</ul>
<p>某些PV可能支持多种访问模式，但PV在挂载时只能使用一种访问模式，多种访问模式不能同时生效。</p>
<h2 id="回收策略-reclaim-policy" tabindex="-1"><a class="header-anchor" href="#回收策略-reclaim-policy"><span>回收策略（Reclaim Policy）</span></a></h2>
<p>Kubernetes支持的回收策略如下。</p>
<ul>
<li>Retain：保留数据，需要手工处理。</li>
<li>Recycle：简单清除文件的操作。</li>
<li>Delete：与PV相连的后端存储完成Volume的删除操作。</li>
</ul>
<p>目前只有NFS和HostPath两种类型的PV支持Recycle策略；
AWSElasticBlockStore、GCEPersistentDisk、AzureDisk和Cinder类型的PV支持Delete策略。</p>
<h2 id="pv-status" tabindex="-1"><a class="header-anchor" href="#pv-status"><span>PV (STATUS)</span></a></h2>
<p>在 Kubernetes 中，PersistentVolume (PV) 是一个集群级别的资源，用于表示集群中持久化存储的详细信息和状态。PV 的状态由其 <code v-pre>STATUS</code> 字段来表示，它反映了存储卷的当前状态。了解这些状态有助于掌握 PV 在生命周期中的位置，以及它是否能够被持久卷声明 (PersistentVolumeClaim, PVC) 使用。</p>
<p>以下是 Kubernetes 中 PV 的几种可能的状态：</p>
<h3 id="_1-available" tabindex="-1"><a class="header-anchor" href="#_1-available"><span>1. <code v-pre>Available</code></span></a></h3>
<ul>
<li><strong>描述</strong>: 该状态表示 PV 可以被绑定到 PVC。PV 处于 <code v-pre>Available</code> 状态时，它未被任何 PVC 使用，可以供新的 PVC 绑定。</li>
<li><strong>特点</strong>:
<ul>
<li>PV 还未与任何 PVC 绑定。</li>
<li>准备好用于新的 PVC 绑定。</li>
</ul>
</li>
</ul>
<h3 id="_2-bound" tabindex="-1"><a class="header-anchor" href="#_2-bound"><span>2. <code v-pre>Bound</code></span></a></h3>
<ul>
<li><strong>描述</strong>: 该状态表示 PV 已经被绑定到一个 PVC，且正被 PVC 使用。</li>
<li><strong>特点</strong>:
<ul>
<li>PV 已经与一个 PVC 绑定。</li>
<li>它不能再被其他 PVC 绑定，直到被释放。</li>
</ul>
</li>
</ul>
<h3 id="_3-released" tabindex="-1"><a class="header-anchor" href="#_3-released"><span>3. <code v-pre>Released</code></span></a></h3>
<ul>
<li><strong>描述</strong>: 该状态表示 PV 之前已经绑定的 PVC 已经被删除，但是 PV 本身还没有被集群中的任何新 PVC 再次使用。</li>
<li><strong>特点</strong>:
<ul>
<li>PVC 已被删除。</li>
<li>数据可能仍然存在于 PV 上，但它还未被新的 PVC 重新绑定。</li>
</ul>
</li>
</ul>
<h3 id="_4-failed" tabindex="-1"><a class="header-anchor" href="#_4-failed"><span>4. <code v-pre>Failed</code></span></a></h3>
<ul>
<li><strong>描述</strong>: 该状态表示 PV 由于某种原因无法使用，通常是因为与 PV 相关的存储设备出现了错误或问题。</li>
<li><strong>特点</strong>:
<ul>
<li>PV 在操作过程中遇到错误，无法正常使用。</li>
<li>可能需要管理员干预以修复问题。</li>
</ul>
</li>
</ul>
<h2 id="状态转换" tabindex="-1"><a class="header-anchor" href="#状态转换"><span>状态转换</span></a></h2>
<p>PV 的状态转换通常遵循以下过程：</p>
<ol>
<li><strong>初始状态</strong>: PV 被创建后，处于 <code v-pre>Available</code> 状态。</li>
<li><strong>绑定</strong>: 一个 PVC 请求匹配 PV，PV 被绑定到 PVC 后，状态变为 <code v-pre>Bound</code>。</li>
<li><strong>释放</strong>: PVC 被删除后，PV 状态变为 <code v-pre>Released</code>。</li>
<li><strong>再利用或删除</strong>:
<ul>
<li>如果允许再利用，管理员可以手动将 PV 状态重置为 <code v-pre>Available</code>，使其可以绑定到新的 PVC。</li>
<li>如果 PV 被认为不再需要，可能会被删除。</li>
</ul>
</li>
</ol>
<h3 id="状态图示" tabindex="-1"><a class="header-anchor" href="#状态图示"><span>状态图示</span></a></h3>
<p>以下是状态转换的示意图：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>Available</span></span>
<span class="line"><span>    |</span></span>
<span class="line"><span>    |  PVC 绑定</span></span>
<span class="line"><span>    V</span></span>
<span class="line"><span>Bound</span></span>
<span class="line"><span>    |</span></span>
<span class="line"><span>    |  PVC 删除</span></span>
<span class="line"><span>    V</span></span>
<span class="line"><span>Released</span></span>
<span class="line"><span>    |</span></span>
<span class="line"><span>    |  删除或再利用</span></span>
<span class="line"><span>    V</span></span>
<span class="line"><span>Failed (或) Available</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="resourcequotas与limitranges" tabindex="-1"><a class="header-anchor" href="#resourcequotas与limitranges"><span>resourcequotas与limitranges</span></a></h1>
<p>在 Kubernetes（K8s）集群中，<strong>ResourceQuotas</strong> 和 <strong>LimitRanges</strong> 是两种用于资源管理和控制的机制。它们帮助管理员确保资源的公平分配和高效利用。以下是对这两者的详细介绍：</p>
<h2 id="resourcequotas" tabindex="-1"><a class="header-anchor" href="#resourcequotas"><span>ResourceQuotas</span></a></h2>
<p><strong>ResourceQuotas</strong> 是一种在 Kubernetes 中用来限制命名空间（Namespace）内资源总量的机制。它们用于防止某个命名空间消耗过多的集群资源，从而影响其他命名空间的正常运行。</p>
<h3 id="作用" tabindex="-1"><a class="header-anchor" href="#作用"><span>作用</span></a></h3>
<ul>
<li><strong>限制命名空间资源使用</strong>: ResourceQuotas 确保每个命名空间不会消耗超过指定的资源限额。</li>
<li><strong>控制资源分配</strong>: 它们帮助管理员公平分配集群资源，防止资源耗尽。</li>
<li><strong>提升资源管理能力</strong>: 通过设置资源限额，管理员可以更好地管理和监控资源使用情况。</li>
</ul>
<h3 id="配置示例" tabindex="-1"><a class="header-anchor" href="#配置示例"><span>配置示例</span></a></h3>
<p>以下是一个 ResourceQuota 的 YAML 配置示例，它限制了某个命名空间内的 CPU 和内存总量，以及对象数量（如 Pod 和 Service）：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">ResourceQuota</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">example-quota</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">  namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">example-namespace</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">  hard</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    pods</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"10"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">                  # 限制 Pod 的总数量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    services</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"5"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">               # 限制 Service 的总数量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    requests.cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"4"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">           # 限制 CPU 请求总量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    requests.memory</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"8Gi"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">      # 限制内存请求总量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    limits.cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"10"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">            # 限制 CPU 使用总量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    limits.memory</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"16Gi"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">       # 限制内存使用总量</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主要字段" tabindex="-1"><a class="header-anchor" href="#主要字段"><span>主要字段</span></a></h3>
<ul>
<li><strong>hard</strong>: 定义了资源的硬性限制，包括 CPU、内存、存储和对象数量等。</li>
<li><strong>scopes</strong>: 可选字段，指定了 ResourceQuota 适用的对象范围（如仅应用于某些特定的资源类型）。</li>
</ul>
<h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h3>
<ul>
<li><strong>开发环境</strong>: 限制资源以确保测试环境不会占用过多的生产资源。</li>
<li><strong>多租户环境</strong>: 在共享集群中，控制不同租户（命名空间）之间的资源使用。</li>
<li><strong>成本管理</strong>: 控制资源使用来管理和控制成本。</li>
</ul>
<h2 id="limitranges" tabindex="-1"><a class="header-anchor" href="#limitranges"><span>LimitRanges</span></a></h2>
<p><strong>LimitRanges</strong> 是一种在 Kubernetes 中用于限制命名空间内单个 Pod 或容器资源使用的机制。与 ResourceQuotas 的整体限制不同，LimitRanges 主要控制单个 Pod 或容器的资源使用范围。</p>
<h3 id="作用-1" tabindex="-1"><a class="header-anchor" href="#作用-1"><span>作用</span></a></h3>
<ul>
<li><strong>设置默认资源限制</strong>: 如果 Pod 或容器没有指定资源请求和限制，LimitRanges 可以提供默认值。</li>
<li><strong>防止资源过度消耗</strong>: 通过限制单个容器或 Pod 的资源使用，防止过多的资源消耗影响整个集群的性能。</li>
<li><strong>鼓励合理的资源分配</strong>: 鼓励开发人员在部署 Pod 时合理设置资源请求和限制。</li>
</ul>
<h3 id="配置示例-1" tabindex="-1"><a class="header-anchor" href="#配置示例-1"><span>配置示例</span></a></h3>
<p>以下是一个 LimitRange 的 YAML 配置示例，它为容器设置了 CPU 和内存的默认值和最大/最小值：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">LimitRange</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">example-limits</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">  namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">example-namespace</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">  limits</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">  - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">max</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">      cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"1"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">             # 容器的最大 CPU 使用量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">      memory</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"1Gi"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">        # 容器的最大内存使用量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    min</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">      cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"100m"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">          # 容器的最小 CPU 使用量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">      memory</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"128Mi"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">      # 容器的最小内存使用量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    default</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">      cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"500m"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">          # 容器的默认 CPU 请求量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">      memory</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"512Mi"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">      # 容器的默认内存请求量</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    defaultRequest</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">      cpu</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"250m"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">          # 容器的默认 CPU 请求</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">      memory</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">"256Mi"</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">      # 容器的默认内存请求</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75">    type</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">Container</span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">        # 应用类型</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主要字段-1" tabindex="-1"><a class="header-anchor" href="#主要字段-1"><span>主要字段</span></a></h3>
<ul>
<li><strong>max</strong>: 定义了单个容器可以请求的最大资源量。</li>
<li><strong>min</strong>: 定义了单个容器必须请求的最小资源量。</li>
<li><strong>default</strong>: 定义了容器没有指定资源请求和限制时的默认值。</li>
<li><strong>defaultRequest</strong>: 定义了容器没有指定资源请求时的默认请求值。</li>
<li><strong>type</strong>: 指定了限制适用于 Pod 还是容器。</li>
</ul>
<h3 id="使用场景-1" tabindex="-1"><a class="header-anchor" href="#使用场景-1"><span>使用场景</span></a></h3>
<ul>
<li><strong>应用程序标准化</strong>: 在命名空间内强制执行资源使用标准，确保所有容器符合预期的资源使用模式。</li>
<li><strong>资源优化</strong>: 防止资源过度配置或资源不足，从而优化集群性能和资源利用率。</li>
<li><strong>开发与测试环境</strong>: 在不同环境中设置不同的限制，确保资源的合理分配和使用。</li>
</ul>
<h2 id="比较与总结" tabindex="-1"><a class="header-anchor" href="#比较与总结"><span>比较与总结</span></a></h2>
<ul>
<li>
<p><strong>ResourceQuotas</strong>:</p>
<ul>
<li><strong>范围</strong>: 适用于整个命名空间的资源总量。</li>
<li><strong>目的</strong>: 控制命名空间内的资源使用上限，确保集群资源的公平分配和高效利用。</li>
<li><strong>典型场景</strong>: 多租户环境、开发环境中的资源限制。</li>
</ul>
</li>
<li>
<p><strong>LimitRanges</strong>:</p>
<ul>
<li><strong>范围</strong>: 适用于单个 Pod 或容器的资源使用。</li>
<li><strong>目的</strong>: 设置资源使用的默认值和最大/最小限制，防止个体资源过度消耗。</li>
<li><strong>典型场景</strong>: 应用程序的资源标准化和资源优化。</li>
</ul>
</li>
</ul>
<p>两者结合使用，可以在 Kubernetes 集群中提供强大的资源管理能力，确保资源的公平分配和高效使用。</p>
</div></template>


