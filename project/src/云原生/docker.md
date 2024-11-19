---
date: 2024-11-19
title: docker知识点
category:
  - docker
tag:
  - 笔记
---
::: tip docker 笔记总结
:::


## docker buildx 安装架构

参考：[https://github.com/moby/buildkit/blob/master/docs/multi-platform.md](https://github.com/moby/buildkit/blob/master/docs/multi-platform.md)
```
docker run --privileged --rm tonistiigi/binfmt --install all
```

执行结果如下

```
(base) root@DESKTOP-P54EAF3:~# docker buildx ls
NAME/NODE DRIVER/ENDPOINT STATUS  BUILDKIT                              PLATFORMS
default * docker
  default default         running v0.11.7-0.20230525183624-798ad6b0ce9f linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/386, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6
```

#### 构建镜像
```
最好先拉取镜像对应 dockerfile 基础镜像， 默认builder只支持一种架构指定

 docker buildx build --platform linux/arm64 -t vnet:arch_more .
```            
