import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
export default defineUserConfig({
  base: "/KnowledgeBlog",
  head: [
    ['script', {type: "text/javascript", src: "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"}],
  ],
  lang: "zh-CN",
  title: "知识笔记",
  description: "MouseSun846的知识笔记",

  theme,
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
