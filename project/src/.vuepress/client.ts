import { defineClientConfig } from "vuepress/client";
import 'element-plus/dist/index.css'
import ClashToV2ray from "./component/ClashToV2ray.vue";


export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("ClashToV2ray", ClashToV2ray);

      },
});
