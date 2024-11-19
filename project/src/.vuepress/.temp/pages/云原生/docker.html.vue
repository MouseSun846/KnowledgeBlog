<template><div><div class="hint-container tip">
<p class="hint-container-title">docker 笔记总结</p>
</div>
<h2 id="docker-buildx-安装架构" tabindex="-1"><a class="header-anchor" href="#docker-buildx-安装架构"><span>docker buildx 安装架构</span></a></h2>
<p>参考：<a href="https://github.com/moby/buildkit/blob/master/docs/multi-platform.md" target="_blank" rel="noopener noreferrer">https://github.com/moby/buildkit/blob/master/docs/multi-platform.md</a></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>docker run --privileged --rm tonistiigi/binfmt --install all</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>执行结果如下</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>(base) root@DESKTOP-P54EAF3:~# docker buildx ls</span></span>
<span class="line"><span>NAME/NODE DRIVER/ENDPOINT STATUS  BUILDKIT                              PLATFORMS</span></span>
<span class="line"><span>default * docker</span></span>
<span class="line"><span>  default default         running v0.11.7-0.20230525183624-798ad6b0ce9f linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/386, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="构建镜像" tabindex="-1"><a class="header-anchor" href="#构建镜像"><span>构建镜像</span></a></h4>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>最好先拉取镜像对应 dockerfile 基础镜像， 默认builder只支持一种架构指定</span></span>
<span class="line"><span></span></span>
<span class="line"><span> docker buildx build --platform linux/arm64 -t vnet:arch_more .</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


