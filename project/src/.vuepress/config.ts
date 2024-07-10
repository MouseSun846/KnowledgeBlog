import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
export default defineUserConfig({
  base: "/KnowledgeBlog",

  lang: "zh-CN",
  title: "知识笔记",
  description: "MouseSun846的知识笔记",

  theme,
  plugins: [
    searchProPlugin({
      // 配置选项
      indexContent: true,
      autoSuggestions: false
    }),
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
