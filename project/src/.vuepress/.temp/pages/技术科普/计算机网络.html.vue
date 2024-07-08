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
</div></template>


