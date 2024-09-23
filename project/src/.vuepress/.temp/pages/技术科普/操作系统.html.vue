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
<div class="hint-container tip">
<p class="hint-container-title">top命令解释</p>
</div>
<figure><img src="/assets/images/038be2db-9a5c-4678-9cf4-e0a6f5018d9e.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>我们可以用上面这张图，把这些值挨个解释一下。</p>
<p>假设一个用户程序开始运行了，那么就对应着第一个&quot;us&quot;框，&quot;us&quot;是&quot;user&quot;的缩写，代表 Linux 的用户态 CPU Usage。普通用户程序代码中，只要不是调用系统调用（System Call），这些代码的指令消耗的 CPU 就都属于&quot;us&quot;。</p>
<p>当这个用户程序代码中调用了系统调用，比如说 read() 去读取一个文件，这时候这个用户进程就会从用户态切换到内核态。</p>
<p>内核态 read() 系统调用在读到真正 disk 上的文件前，就会进行一些文件系统层的操作。那么这些代码指令的消耗就属于&quot;sy&quot;，这里就对应上面图里的第二个框。&quot;sy&quot;是 &quot;system&quot;的缩写，代表内核态 CPU 使用。</p>
<p>接下来，这个 read() 系统调用会向 Linux 的 Block Layer 发出一个 I/O Request，触发一个真正的磁盘读取操作。</p>
<p>这时候，这个进程一般会被置为 TASK_UNINTERRUPTIBLE。而 Linux 会把这段时间标示成&quot;wa&quot;，对应图中的第三个框。&quot;wa&quot;是&quot;iowait&quot;的缩写，代表等待 I/O 的时间，这里的 I/O 是指 Disk I/O。</p>
<p>紧接着，当磁盘返回数据时，进程在内核态拿到数据，这里仍旧是内核态的 CPU 使用中的&quot;sy&quot;，也就是图中的第四个框。</p>
<p>然后，进程再从内核态切换回用户态，在用户态得到文件数据，这里进程又回到用户态的 CPU 使用，&quot;us&quot;，对应图中第五个框。</p>
<p>好，这里我们假设一下，这个用户进程在读取数据之后，没事可做就休眠了。并且我们可以进一步假设，这时在这个 CPU 上也没有其他需要运行的进程了，那么系统就会进入&quot;id&quot;这个步骤，也就是第六个框。&quot;id&quot;是&quot;idle&quot;的缩写，代表系统处于空闲状态。</p>
<p>如果这时这台机器在网络收到一个网络数据包，网卡就会发出一个中断（interrupt）。相应地，CPU 会响应中断，然后进入中断服务程序。</p>
<p>这时，CPU 就会进入&quot;hi&quot;，也就是第七个框。&quot;hi&quot;是&quot;hardware irq&quot;的缩写，代表 CPU 处理硬中断的开销。由于我们的中断服务处理需要关闭中断，所以这个硬中断的时间不能太长。</p>
<p>但是，发生中断后的工作是必须要完成的，如果这些工作比较耗时那怎么办呢？Linux 中有一个软中断的概念（softirq），它可以完成这些耗时比较长的工作。</p>
<p>你可以这样理解这个软中断，从网卡收到数据包的大部分工作，都是通过软中断来处理的。那么，CPU 就会进入到第八个框，&quot;si&quot;。这里&quot;si&quot;是&quot;softirq&quot;的缩写，代表 CPU 处理软中断的开销。</p>
<p>这里你要注意，无论是&quot;hi&quot;还是&quot;si&quot;，它们的 CPU 时间都不会计入进程的 CPU 时间。这是因为本身它们在处理的时候就不属于任何一个进程。</p>
<p>好了，通过这个场景假设，我们介绍了大部分的 Linux CPU 使用。</p>
<p>不过，我们还剩两个类型的 CPU 使用没讲到，我想给你做个补充，一次性带你做个全面了解。这样以后你解决相关问题时，就不会再犹豫，这些值到底影不影响 CPU Cgroup 中的限制了。下面我给你具体讲一下。</p>
<p>一个是&quot;ni&quot;，是&quot;nice&quot;的缩写，这里表示如果进程的 nice 值是正值（1-19），代表优先级比较低的进程运行时所占用的 CPU。</p>
<p>另外一个是&quot;st&quot;，&quot;st&quot;是&quot;steal&quot;的缩写，是在虚拟机里用的一个 CPU 使用类型，表示有多少时间是被同一个宿主机上的其他虚拟机抢走的。</p>
<figure><img src="/assets/images/262bfb6c-3622-47a4-8bcf-4ff4efc3131d.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="扩容磁盘" tabindex="-1"><a class="header-anchor" href="#扩容磁盘"><span>扩容磁盘</span></a></h2>
<p>要将 <code v-pre>nvme0n1p1</code> 的空间扩展到 <code v-pre>/dev/mapper/centos-root</code>，你需要执行以下步骤。这包括删除 <code v-pre>nvme0n1p1</code> 分区，重新分配空间，并将其添加到现有的 LVM 逻辑卷中。</p>
<h3 id="_1-卸载并删除-nvme0n1p1-分区" tabindex="-1"><a class="header-anchor" href="#_1-卸载并删除-nvme0n1p1-分区"><span>1. 卸载并删除 <code v-pre>nvme0n1p1</code> 分区</span></a></h3>
<p>首先，你需要确保 <code v-pre>nvme0n1p1</code> 上没有重要数据，并且它未被挂载。如果已经挂载，请先卸载：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> umount</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /dev/nvme0n1p1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>然后，使用 <code v-pre>fdisk</code> 删除 <code v-pre>nvme0n1p1</code> 分区：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> fdisk</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /dev/nvme0n1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>进入 <code v-pre>fdisk</code> 命令行后：</p>
<ul>
<li>输入 <code v-pre>d</code> 选择删除分区，然后输入分区号 <code v-pre>1</code> 删除 <code v-pre>nvme0n1p1</code>。</li>
<li>输入 <code v-pre>w</code> 写入更改并退出 <code v-pre>fdisk</code>。</li>
</ul>
<h3 id="_2-创建新的分区并标记为-lvm" tabindex="-1"><a class="header-anchor" href="#_2-创建新的分区并标记为-lvm"><span>2. 创建新的分区并标记为 LVM</span></a></h3>
<p>在释放 <code v-pre>nvme0n1p1</code> 的空间后，你需要重新创建一个新的分区，覆盖以前的分区空间，并将其类型设置为 <code v-pre>Linux LVM</code>。</p>
<p>仍然使用 <code v-pre>fdisk</code> 来创建新分区：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> fdisk</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /dev/nvme0n1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>进入 <code v-pre>fdisk</code> 命令行后：</p>
<ul>
<li>输入 <code v-pre>n</code> 创建一个新的分区。</li>
<li>使用默认的开始和结束扇区，覆盖以前的 <code v-pre>nvme0n1p1</code> 分区空间。</li>
<li>输入 <code v-pre>t</code> 设置新分区的类型为 <code v-pre>8e</code>（Linux LVM）。</li>
<li>输入 <code v-pre>w</code> 写入更改并退出 <code v-pre>fdisk</code>。</li>
</ul>
<h3 id="_3-将新分区添加到-lvm-物理卷" tabindex="-1"><a class="header-anchor" href="#_3-将新分区添加到-lvm-物理卷"><span>3. 将新分区添加到 LVM 物理卷</span></a></h3>
<p>新分区创建并标记为 LVM 后，将其添加到 LVM 的物理卷中：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> pvcreate</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /dev/nvme0n1p1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> vgextend</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> centos</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /dev/nvme0n1p1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-扩展逻辑卷-centos-root" tabindex="-1"><a class="header-anchor" href="#_4-扩展逻辑卷-centos-root"><span>4. 扩展逻辑卷 <code v-pre>centos-root</code></span></a></h3>
<p>现在，你可以将新的空间分配给逻辑卷 <code v-pre>centos-root</code>：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> lvextend</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -l</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> +100%FREE</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /dev/mapper/centos-root</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_5-扩展-xfs-文件系统" tabindex="-1"><a class="header-anchor" href="#_5-扩展-xfs-文件系统"><span>5. 扩展 <code v-pre>XFS</code> 文件系统</span></a></h3>
<p>最后，使用 <code v-pre>xfs_growfs</code> 来扩展文件系统，使其利用新增的空间：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> xfs_growfs</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /dev/mapper/centos-root</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_6-验证扩展结果" tabindex="-1"><a class="header-anchor" href="#_6-验证扩展结果"><span>6. 验证扩展结果</span></a></h3>
<p>扩展完成后，使用 <code v-pre>df -h /</code> 来检查根文件系统的大小：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF">df</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66"> -h</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379"> /</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这个命令将显示根文件系统的更新后的容量，确认 <code v-pre>nvme0n1p1</code> 的空间已经成功分配给 <code v-pre>/dev/mapper/centos-root</code>。</p>
<h2 id="wsl-启用systemd" tabindex="-1"><a class="header-anchor" href="#wsl-启用systemd"><span>wsl 启用systemd</span></a></h2>
<p>若要启用 systemd，请使用sudo管理员权限在文本编辑器中打开文件wsl.conf，并将以下行添加到/etc/wsl.conf</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>[boot]</span></span>
<span class="line"><span>systemd=true</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，需要使用 PowerShell 关闭 WSL 分发 wsl.exe --shutdown 版来重启 WSL 实例。分发重启后，系统应运行。可以使用以下命令进行确认：systemctl list-unit-files --type=service这将显示服务的状态。</p>
<h2 id="wsl2迁移至其他目录" tabindex="-1"><a class="header-anchor" href="#wsl2迁移至其他目录"><span>WSL2迁移至其他目录</span></a></h2>
<p>1） 停止正在运行的wsl</p>
<p>wsl --shutdown</p>
<p>2）将需要迁移的Linux，进行导出</p>
<p>wsl --export Ubuntu D:/ubuntu22.04.tar</p>
<p>3）导出完成之后，将原有的Linux卸载</p>
<p>wsl --unregister Ubuntu</p>
<p>4） 然后将导出的文件放到需要保存的地方，进行导入即可</p>
<p>wsl --import Ubuntu-20.04 D:\ubuntu\ D:/ubuntu/ubuntu22.04.tar --version 2</p>
</div></template>


