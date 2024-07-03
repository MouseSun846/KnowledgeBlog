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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


