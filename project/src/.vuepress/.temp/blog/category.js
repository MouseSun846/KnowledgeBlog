export const categoriesMap = {"category":{"/":{"path":"/category/","map":{"云原生":{"path":"/category/%E4%BA%91%E5%8E%9F%E7%94%9F/","indexes":[0]},"个人介绍":{"path":"/category/%E4%B8%AA%E4%BA%BA%E4%BB%8B%E7%BB%8D/","indexes":[1]}}}},"tag":{"/":{"path":"/tag/","map":{"Kubeflow":{"path":"/tag/kubeflow/","indexes":[0]},"个人":{"path":"/tag/%E4%B8%AA%E4%BA%BA/","indexes":[1]}}}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

