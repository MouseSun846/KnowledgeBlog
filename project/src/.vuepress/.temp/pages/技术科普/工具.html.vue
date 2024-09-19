<template><div><h2 id="ubuntu" tabindex="-1"><a class="header-anchor" href="#ubuntu"><span>ubuntu</span></a></h2>
<h3 id="ping-安装" tabindex="-1"><a class="header-anchor" href="#ping-安装"><span>ping 安装</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>apt install iputils-ping</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="获取公网ip" tabindex="-1"><a class="header-anchor" href="#获取公网ip"><span>获取公网ip</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>curl ip.sb</span></span>
<span class="line"><span></span></span>
<span class="line"><span>curl ipinfo.io</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ffmpeg" tabindex="-1"><a class="header-anchor" href="#ffmpeg"><span>ffmpeg</span></a></h2>
<h3 id="视频抽帧转图片" tabindex="-1"><a class="header-anchor" href="#视频抽帧转图片"><span>视频抽帧转图片</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>ffmpeg.exe -i C:\Users\Administrator\Downloads\分析.mp4 -r 5  -f image2 C:\Users\Administrator\Pictures\bg\image-%03d.jpg</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


