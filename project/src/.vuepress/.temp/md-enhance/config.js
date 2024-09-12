import { defineClientConfig } from "vuepress/client";
import CodeTabs from "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { hasGlobalComponent } from "D:/Code/knowledgeblob/project/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.34_vuepress@2.0.0-rc.13/node_modules/@vuepress/helper/lib/client/index.js";
import { CodeGroup, CodeGroupItem } from "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import CodeDemo from "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import { useHintContainers } from "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/composables/useHintContainers.js";
import "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/styles/hint/index.scss";
import "D:/Code/knowledgeblob/project/node_modules/.pnpm/katex@0.16.11/node_modules/katex/dist/katex.min.css";
import "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/styles/katex.scss";
import MarkMap from "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/components/MarkMap.js";
import Tabs from "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";
import "D:/Code/knowledgeblob/project/node_modules/.pnpm/@mdit+plugin-spoiler@0.12.0_markdown-it@14.1.0/node_modules/@mdit/plugin-spoiler/spoiler.css";
import "D:/Code/knowledgeblob/project/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.48_katex@0.16.11_markdown-it@14.1.0_markmap-lib@0.17.0_ma_dmdurrdzr6dmxi7fpd75ujaj2q/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tasklist.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);
    if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("MarkMap", MarkMap);
    app.component("Tabs", Tabs);
  },
  setup: () => {
useHintContainers();
  }
});
