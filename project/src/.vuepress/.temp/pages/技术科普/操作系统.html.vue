<template><div><div class="hint-container tip">
<p class="hint-container-title">strace命令</p>
</div>
<p><code v-pre>strace</code> 是一个用于跟踪系统调用和信号的工具，它可以帮助你诊断程序的行为或调试程序。<code v-pre>-p</code> 选项用于附加到一个正在运行的进程上，并实时显示它的系统调用。</p>
<h3 id="解释命令" tabindex="-1"><a class="header-anchor" href="#解释命令"><span>解释命令：</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">strace</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> 871</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong><code v-pre>strace</code></strong>：调用 <code v-pre>strace</code> 工具。</li>
<li><strong><code v-pre>-p 871</code></strong>：指定进程ID（PID）为 871 的进程。<code v-pre>strace</code> 会附加到这个进程，并跟踪它的系统调用。</li>
</ul>
<h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景：</span></a></h3>
<ol>
<li>
<p><strong>实时跟踪系统调用</strong>：你可以看到进程 871 进行的每个系统调用，这有助于了解程序在做什么。</p>
</li>
<li>
<p><strong>调试和排错</strong>：如果某个进程表现异常，比如挂起、资源消耗过高等，通过 <code v-pre>strace</code> 可以查看它在调用哪些系统调用，以便分析问题的根本原因。</p>
</li>
</ol>
<h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项：</span></a></h3>
<ul>
<li>
<p><strong>权限</strong>：如果目标进程由另一个用户（比如 root）启动，可能需要相应的权限（例如通过 <code v-pre>sudo</code>）来使用 <code v-pre>strace</code>。</p>
</li>
<li>
<p><strong>性能影响</strong>：<code v-pre>strace</code> 会对被跟踪的进程产生一定的性能开销，尤其是在处理大量系统调用时，所以应在必要时使用。</p>
</li>
</ul>
<p>运行该命令后，你会看到进程871的系统调用输出，直到你停止 <code v-pre>strace</code> (通常通过 <code v-pre>Ctrl+C</code>)。</p>
</div></template>


