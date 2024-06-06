import comp from "D:/Code/knowledgeblob/project/src/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"博客主页\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"layout\":\"BlogHome\",\"icon\":\"home\",\"title\":\"博客主页\",\"heroImage\":\"https://theme-hope-assets.vuejs.press/logo.svg\",\"heroText\":\"MouseSun\",\"heroFullScreen\":true,\"tagline\":\"路漫漫其修远兮，吾将上下而求索。\",\"footer\":\"MouseSun博客\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/KnowledgeBlog/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"博客演示\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"博客主页\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"MouseSun\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"博客主页\\\"}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.13,\"words\":39},\"filePathRelative\":\"README.md\",\"excerpt\":\"\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
