<template><div><div class="hint-container tip">
<p class="hint-container-title">http2与http1区别?</p>
</div>
<p>HTTP/2 是对 HTTP/1.x 协议的重大升级，旨在提高网络性能和效率。以下是 HTTP/2 相对于 HTTP/1 的一些关键区别和改进：</p>
<h3 id="_1-协议基础" tabindex="-1"><a class="header-anchor" href="#_1-协议基础"><span>1. 协议基础</span></a></h3>
<ul>
<li><strong>HTTP/1.x</strong>: 基于纯文本的协议，使用新行符分隔的文本消息进行通信。</li>
<li><strong>HTTP/2</strong>: 基于二进制的协议，使用二进制帧传输数据，更高效地解析和传输数据。</li>
</ul>
<h3 id="_2-连接管理" tabindex="-1"><a class="header-anchor" href="#_2-连接管理"><span>2. 连接管理</span></a></h3>
<ul>
<li>
<p><strong>HTTP/1.x</strong>:</p>
<ul>
<li>每个请求/响应对通常需要一个单独的TCP连接（HTTP/1.0）。</li>
<li>HTTP/1.1 引入了连接保持（Keep-Alive），允许在同一个TCP连接上复用多个请求，但在同一时刻只能处理一个请求（串行化处理）。</li>
</ul>
</li>
<li>
<p><strong>HTTP/2</strong>:</p>
<ul>
<li>单个TCP连接上可以处理多个并发的请求/响应对。</li>
<li>使用流的概念，每个请求/响应对在一个单独的流中，流之间可以独立并行处理。</li>
</ul>
</li>
</ul>
<h3 id="_3-多路复用" tabindex="-1"><a class="header-anchor" href="#_3-多路复用"><span>3. 多路复用</span></a></h3>
<ul>
<li><strong>HTTP/1.x</strong>: 在一个连接上，只有一个请求/响应对可以被处理（头部阻塞问题），需要等待当前请求完成后，才能开始下一个请求。</li>
<li><strong>HTTP/2</strong>: 允许多个请求/响应对在同一连接上的多个流中并发传输，不同的流可以独立处理，不会相互阻塞。</li>
</ul>
<h3 id="_4-头部压缩" tabindex="-1"><a class="header-anchor" href="#_4-头部压缩"><span>4. 头部压缩</span></a></h3>
<ul>
<li><strong>HTTP/1.x</strong>: HTTP头部是以纯文本格式传输的，每个请求都需要发送完整的头部信息，导致冗余和带宽浪费。</li>
<li><strong>HTTP/2</strong>: 使用 HPACK 算法对头部进行压缩，减少了传输数据量。头部信息仅在第一次请求时完整传输，后续请求只需发送差异部分。</li>
</ul>
<h3 id="_5-服务器推送" tabindex="-1"><a class="header-anchor" href="#_5-服务器推送"><span>5. 服务器推送</span></a></h3>
<ul>
<li><strong>HTTP/1.x</strong>: 客户端必须明确请求每个资源，服务器只能响应客户端的请求。</li>
<li><strong>HTTP/2</strong>: 支持服务器推送功能，服务器可以在客户端请求之前主动发送资源，这有助于减少延迟和提升性能。例如，当客户端请求HTML页面时，服务器可以主动推送相关的CSS和JavaScript文件。</li>
</ul>
<h3 id="_6-优先级和流控制" tabindex="-1"><a class="header-anchor" href="#_6-优先级和流控制"><span>6. 优先级和流控制</span></a></h3>
<ul>
<li><strong>HTTP/1.x</strong>: 没有内建的优先级控制机制，所有请求被平等对待。</li>
<li><strong>HTTP/2</strong>: 支持流的优先级，客户端可以指定不同流的优先级，允许更重要的请求先行处理。同时，HTTP/2 提供流量控制机制，确保没有流会独占带宽。</li>
</ul>
<h3 id="_7-加密和安全" tabindex="-1"><a class="header-anchor" href="#_7-加密和安全"><span>7. 加密和安全</span></a></h3>
<ul>
<li><strong>HTTP/1.x</strong>: 加密是可选的（通过HTTP或HTTPS），但非加密的HTTP请求仍然普遍存在。</li>
<li><strong>HTTP/2</strong>: 大多数实现强制要求使用加密（通过HTTPS），尽管协议本身不强制这一点。现代浏览器和服务器在实际应用中通常要求 HTTP/2 使用 TLS。</li>
</ul>
<h3 id="_8-协议扩展性" tabindex="-1"><a class="header-anchor" href="#_8-协议扩展性"><span>8. 协议扩展性</span></a></h3>
<ul>
<li><strong>HTTP/1.x</strong>: 由于是文本协议，扩展和添加新功能变得复杂。</li>
<li><strong>HTTP/2</strong>: 作为二进制协议，HTTP/2 更容易扩展，添加新功能可以通过新帧类型和更复杂的协议操作来实现，而不影响现有的功能。</li>
</ul>
<h3 id="_9-性能改进" tabindex="-1"><a class="header-anchor" href="#_9-性能改进"><span>9. 性能改进</span></a></h3>
<ul>
<li><strong>HTTP/1.x</strong>: 多个小的请求可能会因为串行化处理导致较高的延迟和低效的带宽利用。</li>
<li><strong>HTTP/2</strong>: 通过多路复用、头部压缩和服务器推送等功能，HTTP/2 显著降低了延迟，改善了带宽利用，提升了整体性能。</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<table>
<thead>
<tr>
<th>特性</th>
<th>HTTP/1.x</th>
<th>HTTP/2</th>
</tr>
</thead>
<tbody>
<tr>
<td>协议类型</td>
<td>基于纯文本</td>
<td>基于二进制</td>
</tr>
<tr>
<td>连接管理</td>
<td>每个请求通常需要一个TCP连接</td>
<td>单个连接处理多个并发请求</td>
</tr>
<tr>
<td>多路复用</td>
<td>不支持（有头部阻塞问题）</td>
<td>支持</td>
</tr>
<tr>
<td>头部压缩</td>
<td>不支持</td>
<td>使用HPACK算法进行压缩</td>
</tr>
<tr>
<td>服务器推送</td>
<td>不支持</td>
<td>支持</td>
</tr>
<tr>
<td>优先级和流控制</td>
<td>不支持</td>
<td>支持</td>
</tr>
<tr>
<td>加密和安全</td>
<td>可选（但非强制）</td>
<td>大多数实现要求加密（HTTPS）</td>
</tr>
<tr>
<td>协议扩展性</td>
<td>扩展复杂</td>
<td>更容易扩展</td>
</tr>
<tr>
<td>性能</td>
<td>受限于串行化处理和头部阻塞</td>
<td>显著提升（多路复用、压缩、推送）</td>
</tr>
</tbody>
</table>
<p>HTTP/2 带来了显著的改进和优化，使得网络应用能够更高效地传输数据，提升了用户体验和网络性能。</p>
<h2 id="查看系统中已有的veth设备对或确认已创建的veth设备对-可以使用以下几种方法" tabindex="-1"><a class="header-anchor" href="#查看系统中已有的veth设备对或确认已创建的veth设备对-可以使用以下几种方法"><span>查看系统中已有的veth设备对或确认已创建的veth设备对，可以使用以下几种方法：</span></a></h2>
<h3 id="使用-ip-命令" tabindex="-1"><a class="header-anchor" href="#使用-ip-命令"><span>使用 <code v-pre>ip</code> 命令</span></a></h3>
<p><code v-pre>ip</code> 命令是查看和管理网络设备的主要工具：</p>
<ol>
<li>
<p><strong>列出所有网络接口</strong>：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> show</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>该命令会列出系统中所有的网络接口，包括veth设备对。</p>
</li>
<li>
<p><strong>过滤veth设备</strong>：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> show</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>通过<code v-pre>grep</code>过滤出veth设备。</p>
</li>
</ol>
<h3 id="使用-ifconfig-命令" tabindex="-1"><a class="header-anchor" href="#使用-ifconfig-命令"><span>使用 <code v-pre>ifconfig</code> 命令</span></a></h3>
<p><code v-pre>ifconfig</code>命令也可以用于查看网络接口：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ifconfig</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>同样，可以使用<code v-pre>grep</code>过滤出veth设备：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ifconfig</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="查看具体veth设备对的详细信息" tabindex="-1"><a class="header-anchor" href="#查看具体veth设备对的详细信息"><span>查看具体veth设备对的详细信息</span></a></h3>
<p>可以使用以下命令查看某个veth设备对的详细信息：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> show</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h3>
<p>假设创建了一个veth设备对：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth0</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> type</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> peer</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> name</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>然后，可以使用以下命令查看：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> show</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>输出可能类似于：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>10: veth0@veth1: &#x3C;BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000</span></span>
<span class="line"><span>11: veth1@veth0: &#x3C;BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>这表明<code v-pre>veth0</code>和<code v-pre>veth1</code>是一对互相连接的虚拟以太网设备。</p>
<h3 id="检查命名空间中的veth设备" tabindex="-1"><a class="header-anchor" href="#检查命名空间中的veth设备"><span>检查命名空间中的veth设备</span></a></h3>
<p>如果将veth设备移动到不同的命名空间，可以使用以下命令查看特定命名空间中的网络接口：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> netns</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> exec</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> ns1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> show</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> netns</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> exec</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> ns1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> show</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">1:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> lo:</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">LOOPBAC</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">K</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> mtu</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 65536</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> qdisc</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> noop</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> state</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> DOWN</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> mode</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> DEFAULT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> group</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> default</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> qlen</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 1000</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">    link/loopback</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 00:00:00:00:00:00</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> brd</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 00:00:00:00:00:00</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">28:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth1@if29:</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">BROADCAST,MULTICAST,UP,LOWER_U</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">P</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> mtu</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 1500</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> qdisc</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> noqueue</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> state</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> UP</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> mode</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> DEFAULT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> group</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> default</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> qlen</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 1000</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">    link/ether</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 52:7e:e0:b6:47:d2</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> brd</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> ff:ff:ff:ff:ff:ff</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link-netnsid</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> netns</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> exec</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> ns1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> ip</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> a</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">1:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> lo:</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">LOOPBAC</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">K</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> mtu</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 65536</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> qdisc</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> noop</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> state</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> DOWN</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> group</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> default</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> qlen</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 1000</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">    link/loopback</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 00:00:00:00:00:00</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> brd</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 00:00:00:00:00:00</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">28:</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth1@if29:</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379">BROADCAST,MULTICAST,UP,LOWER_U</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF">P</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> mtu</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 1500</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> qdisc</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> noqueue</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> state</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> UP</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> group</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> default</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> qlen</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 1000</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">    link/ether</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 52:7e:e0:b6:47:d2</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> brd</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> ff:ff:ff:ff:ff:ff</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link-netnsid</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">    inet</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> 192.168.1.2/24</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> scope</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> global</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> veth1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">       valid_lft</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> forever</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> preferred_lft</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> forever</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">    inet6</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> fe80::507e:e0ff:feb6:47d2/64</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> scope</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> link</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">       valid_lft</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> forever</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> preferred_lft</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> forever</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设<code v-pre>veth1</code>被移动到命名空间<code v-pre>ns1</code>，可以在<code v-pre>ns1</code>命名空间中看到它。</p>
<p>通过这些命令，可以方便地查看和管理系统中的veth设备对。</p>
<h2 id="vlan-与vxlan" tabindex="-1"><a class="header-anchor" href="#vlan-与vxlan"><span>VLAN 与VXLAN</span></a></h2>
<p>VLAN（Virtual Local Area Network）和VXLAN（Virtual Extensible LAN）是两种用于网络分段和虚拟化的技术，它们各自有不同的应用场景和特点。以下是对它们的解析：</p>
<h3 id="vlan-virtual-local-area-network" tabindex="-1"><a class="header-anchor" href="#vlan-virtual-local-area-network"><span>VLAN（Virtual Local Area Network）</span></a></h3>
<p>VLAN是一种用于在同一物理网络上创建多个逻辑网络的技术。它的主要特点和用途如下：</p>
<ol>
<li>
<p><strong>网络分段</strong>：通过VLAN，可以将一个物理网络分割成多个逻辑网络，使得不同VLAN之间的通信受到限制，从而提高网络的安全性和性能。</p>
</li>
<li>
<p><strong>标记帧</strong>：VLAN使用IEEE 802.1Q标准，在以太网帧中添加一个4字节的标签，标记帧属于哪个VLAN。</p>
</li>
<li>
<p><strong>VLAN ID</strong>：每个VLAN都有一个唯一的VLAN ID，范围是1到4094。网络设备根据这个ID来区分不同的VLAN。</p>
</li>
<li>
<p><strong>配置简单</strong>：VLAN的配置相对简单，只需要在交换机上配置相关的端口或接口即可。</p>
</li>
<li>
<p><strong>常见用途</strong>：</p>
<ul>
<li>提高网络安全性，通过分割网络减少广播域。</li>
<li>提高网络性能，通过减少广播流量和冲突域。</li>
<li>提供灵活的网络管理和用户分组。</li>
</ul>
</li>
</ol>
<h3 id="vxlan-virtual-extensible-lan" tabindex="-1"><a class="header-anchor" href="#vxlan-virtual-extensible-lan"><span>VXLAN（Virtual Extensible LAN）</span></a></h3>
<p>VXLAN是一种用于在大规模数据中心和云环境中创建虚拟网络的技术。它的主要特点和用途如下：</p>
<ol>
<li>
<p><strong>扩展性</strong>：VXLAN使用24位的VNI（VXLAN Network Identifier），理论上支持多达1600万个虚拟网络，大大超过了VLAN的4094个限制。</p>
</li>
<li>
<p><strong>基于隧道</strong>：VXLAN通过UDP隧道封装，将二层以太网帧封装在三层IP包中，从而可以跨越传统的二层边界在IP网络上传输。</p>
</li>
<li>
<p><strong>分布式架构</strong>：VXLAN适用于大规模的分布式数据中心环境，支持跨多个物理位置的虚拟机迁移和负载均衡。</p>
</li>
<li>
<p><strong>网络虚拟化</strong>：VXLAN可以在现有的IP网络基础上创建虚拟网络，使得虚拟机和容器之间的通信更加灵活和高效。</p>
</li>
<li>
<p><strong>常见用途</strong>：</p>
<ul>
<li>数据中心和云环境中的大规模虚拟化网络。</li>
<li>跨多个数据中心的虚拟机迁移和高可用性。</li>
<li>支持多租户环境，每个租户可以有独立的虚拟网络。</li>
</ul>
</li>
</ol>
<h3 id="对比" tabindex="-1"><a class="header-anchor" href="#对比"><span>对比</span></a></h3>
<table>
<thead>
<tr>
<th>特点</th>
<th>VLAN</th>
<th>VXLAN</th>
</tr>
</thead>
<tbody>
<tr>
<td>标识符</td>
<td>12位VLAN ID（最多4094个）</td>
<td>24位VNI（最多1600万个）</td>
</tr>
<tr>
<td>封装层</td>
<td>二层以太网（IEEE 802.1Q）</td>
<td>三层IP（UDP隧道封装）</td>
</tr>
<tr>
<td>应用场景</td>
<td>小规模网络、局域网</td>
<td>大规模数据中心、云环境、跨数据中心</td>
</tr>
<tr>
<td>配置复杂度</td>
<td>简单</td>
<td>较复杂，需要配置隧道端点（VTEP）</td>
</tr>
<tr>
<td>扩展性</td>
<td>有限，最多4094个VLAN</td>
<td>高扩展性，支持多达1600万个虚拟网络</td>
</tr>
</tbody>
</table>
<h3 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1"><span>总结</span></a></h3>
<p>VLAN适用于较小规模的网络分段和隔离，而VXLAN适用于大规模数据中心和云环境中的网络虚拟化和扩展。它们各自有不同的优缺点和应用场景，根据具体需求选择合适的技术可以提高网络的性能、安全性和管理灵活性。</p>
<h2 id="vxlan与vtep" tabindex="-1"><a class="header-anchor" href="#vxlan与vtep"><span>VXLAN与VTEP</span></a></h2>
<h3 id="vxlan-virtual-extensible-lan-1" tabindex="-1"><a class="header-anchor" href="#vxlan-virtual-extensible-lan-1"><span>VXLAN（Virtual Extensible LAN）</span></a></h3>
<p>VXLAN是一种用于扩展二层网络的技术，特别适合在大型数据中心和云环境中使用。其主要特性包括：</p>
<ol>
<li><strong>扩展性</strong>：VXLAN使用24位的VNI（VXLAN Network Identifier），支持多达1600万个虚拟网络，远远超过传统VLAN的4094个限制。</li>
<li><strong>隧道封装</strong>：VXLAN通过UDP隧道封装将二层以太网帧封装在三层IP包中，从而可以在三层IP网络上进行传输。这种方式允许二层流量跨越不同的三层网络，使得虚拟机可以在不同的物理位置之间自由迁移。</li>
<li><strong>多租户支持</strong>：VXLAN允许在同一个物理网络基础设施上运行多个独立的虚拟网络，每个虚拟网络可以有自己的VNI，从而支持多租户环境。</li>
<li><strong>弹性和高可用性</strong>：VXLAN可以在现有的IP网络上实现二层网络的扩展和弹性，支持负载均衡和高可用性。</li>
</ol>
<h3 id="vtep-vxlan-tunnel-endpoint" tabindex="-1"><a class="header-anchor" href="#vtep-vxlan-tunnel-endpoint"><span>VTEP（VXLAN Tunnel Endpoint）</span></a></h3>
<p>VTEP是VXLAN架构中的关键组件，负责VXLAN隧道的端点操作。其主要功能包括：</p>
<ol>
<li><strong>隧道端点</strong>：VTEP是VXLAN隧道的起点和终点，负责VXLAN包的封装和解封装。每个VTEP有两个主要接口：一个是连接到传统二层网络的接口，另一个是连接到IP网络的接口。</li>
<li><strong>封装和解封装</strong>：当VTEP接收到来自二层网络的以太网帧时，它将帧封装在UDP包中，附加上VNI，然后通过IP网络发送到目标VTEP。目标VTEP解封装UDP包，并将以太网帧发送到其二层网络接口。</li>
<li><strong>VNI映射</strong>：VTEP负责将二层网络中的VLAN ID映射到VXLAN的VNI，从而在VXLAN隧道中维护虚拟网络的隔离和标识。</li>
<li><strong>MAC地址学习</strong>：VTEP通过监听网络流量和ARP（Address Resolution Protocol）请求，学习和维护虚拟网络中MAC地址到VTEP的映射关系。这类似于传统二层交换机的MAC地址表。</li>
</ol>
<h3 id="vxlan-和-vtep-的工作流程" tabindex="-1"><a class="header-anchor" href="#vxlan-和-vtep-的工作流程"><span>VXLAN 和 VTEP 的工作流程</span></a></h3>
<ol>
<li><strong>帧封装</strong>：当主机A发送一个以太网帧给主机B时，该帧首先被发送到本地的VTEP。</li>
<li><strong>VXLAN包封装</strong>：VTEP将该帧封装到一个UDP包中，并附加上对应的VNI。UDP包的源IP和目的IP是VTEP的IP地址。</li>
<li><strong>通过IP网络传输</strong>：封装好的VXLAN包通过三层IP网络传输到目的VTEP。</li>
<li><strong>帧解封装</strong>：目的VTEP接收到VXLAN包后，解封装出原始的以太网帧。</li>
<li><strong>帧传递</strong>：解封装的以太网帧被发送到目标主机B所在的二层网络。</li>
</ol>
<h3 id="总结-2" tabindex="-1"><a class="header-anchor" href="#总结-2"><span>总结</span></a></h3>
<p>VXLAN通过在现有的三层IP网络上创建虚拟二层网络，实现了大规模的数据中心和云环境中的网络虚拟化和扩展。VTEP作为VXLAN架构中的关键组件，负责隧道的端点操作，完成VXLAN包的封装和解封装。VXLAN和VTEP的结合，使得跨越不同物理位置的虚拟机能够像在同一个二层网络中一样进行通信，从而实现了高效、灵活和可扩展的网络架构。</p>
<h2 id="ip-neigh-show" tabindex="-1"><a class="header-anchor" href="#ip-neigh-show"><span>ip neigh show</span></a></h2>
<p><code v-pre>ip neigh show dev flannel.1</code>命令用于显示指定网络设备（在这里是<code v-pre>flannel.1</code>）的邻居表项。邻居表存储了网络设备的邻居节点的信息，包括其IP地址和MAC地址。</p>
<p>在使用<code v-pre>flannel</code>的Kubernetes集群中，<code v-pre>flannel.1</code>通常是用于Overlay网络的设备接口。运行这个命令会列出该接口的所有邻居节点的信息。每个邻居节点条目通常包含以下信息：</p>
<ul>
<li><strong>IP地址</strong>：邻居节点的IP地址。</li>
<li><strong>MAC地址</strong>：邻居节点的MAC地址。</li>
<li><strong>状态</strong>：邻居节点的状态，例如<code v-pre>REACHABLE</code>（可达）、<code v-pre>STALE</code>（陈旧）、<code v-pre>DELAY</code>（延迟）、<code v-pre>PROBE</code>（探测）等。</li>
</ul>
<p>例如，运行<code v-pre>ip neigh show dev flannel.1</code>可能得到以下输出：</p>
<div class="language-plaintext line-numbers-mode" data-highlighter="shiki" data-ext="plaintext" data-title="plaintext" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>10.244.2.1 dev flannel.1 lladdr 0a:58:0a:f4:02:01 REACHABLE</span></span>
<span class="line"><span>10.244.2.2 dev flannel.1 lladdr 0a:58:0a:f4:02:02 STALE</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中：</p>
<ul>
<li><strong>10.244.2.1</strong> 是一个邻居节点的IP地址，<strong>0a:58:0a:f4:02:01</strong> 是其MAC地址，状态是<strong>REACHABLE</strong>。</li>
<li><strong>10.244.2.2</strong> 是另一个邻居节点的IP地址，<strong>0a:58:0a:f4:02:02</strong> 是其MAC地址，状态是<strong>STALE</strong>。</li>
</ul>
<h3 id="总结-3" tabindex="-1"><a class="header-anchor" href="#总结-3"><span>总结</span></a></h3>
<p><code v-pre>ip neigh show dev flannel.1</code>命令用于查看指定设备（如<code v-pre>flannel.1</code>）的邻居节点信息，帮助管理员了解当前网络设备与其他节点的连接状态和MAC地址映射情况。这对于排查网络问题和管理网络连接非常有用。</p>
<h2 id="bridge-fdb-show" tabindex="-1"><a class="header-anchor" href="#bridge-fdb-show"><span>bridge fdb show</span></a></h2>
<p><code v-pre>bridge fdb show</code>命令用于显示Linux桥接设备的前向数据库（Forwarding Database，FDB）。FDB记录了MAC地址与网络接口的映射关系，帮助桥接设备确定数据帧的转发路径。通过这个命令，可以查看桥接设备当前的MAC地址表，了解哪些MAC地址通过哪些接口连接。</p>
<h3 id="示例输出" tabindex="-1"><a class="header-anchor" href="#示例输出"><span>示例输出</span></a></h3>
<p>运行<code v-pre>bridge fdb show</code>命令的示例输出可能如下所示：</p>
<div class="language-plaintext line-numbers-mode" data-highlighter="shiki" data-ext="plaintext" data-title="plaintext" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>33:33:00:00:00:01 dev ens3 self permanent</span></span>
<span class="line"><span>01:00:5e:00:00:01 dev ens3 self permanent</span></span>
<span class="line"><span>02:42:ac:11:00:02 dev docker0 vlan 1 master docker0</span></span>
<span class="line"><span>02:42:ac:11:00:03 dev docker0 vlan 1 master docker0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="输出字段解释" tabindex="-1"><a class="header-anchor" href="#输出字段解释"><span>输出字段解释</span></a></h3>
<ul>
<li><strong>MAC地址</strong>：如<code v-pre>33:33:00:00:00:01</code>，这是设备的MAC地址。</li>
<li><strong>dev</strong>：后面跟随的是设备名，如<code v-pre>ens3</code>或<code v-pre>docker0</code>，表示该MAC地址对应的设备。</li>
<li><strong>self</strong>：表示该条目是本地接口的MAC地址。</li>
<li><strong>permanent</strong>：表示该条目是永久性的，而不是动态学习到的。</li>
<li><strong>vlan</strong>：VLAN ID，表示该条目所属的VLAN。</li>
<li><strong>master</strong>：表示该设备所属的主设备。</li>
</ul>
<h3 id="常用选项" tabindex="-1"><a class="header-anchor" href="#常用选项"><span>常用选项</span></a></h3>
<ul>
<li><code v-pre>bridge fdb show [dev DEVICE]</code>：显示特定设备的FDB条目。例如，<code v-pre>bridge fdb show dev br0</code>显示设备<code v-pre>br0</code>的FDB。</li>
<li><code v-pre>bridge fdb show [br BRIDGE]</code>：显示特定桥接设备的FDB条目。</li>
</ul>
<h3 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例"><span>使用示例</span></a></h3>
<ol>
<li>
<p><strong>显示所有桥接设备的FDB条目</strong>：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">bridge</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> fdb</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> show</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>显示特定设备的FDB条目</strong>：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">bridge</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> fdb</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> show</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> dev</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> br0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>显示特定桥接设备的FDB条目</strong>：</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">bridge</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> fdb</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> show</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> br</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> br0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ol>
<h3 id="总结-4" tabindex="-1"><a class="header-anchor" href="#总结-4"><span>总结</span></a></h3>
<p><code v-pre>bridge fdb show</code>命令用于查看Linux桥接设备的前向数据库，帮助管理员了解网络中MAC地址的分布情况和转发路径。这对于网络故障排查和性能优化非常有用。</p>
</div></template>


