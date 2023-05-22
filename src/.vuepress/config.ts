import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/blog/",

  locales: {
    "/en/": {
      lang: "en-US",
      title: "Original Tech",
      description: "A personal blog for lurj",
    },
    "/": {
      lang: "zh-CN",
      title: "Original Tech",
      description: "陆仁杰的个人博客",
    },
  },

  theme,

  plugins: [
    searchProPlugin({
      // 配置选项
    }),
  ],
  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/modules/info/components/TOC": path.resolve(
      __dirname,
      "./components/TOC.ts"
    ),
  },
  // Enable it with pwa
  // shouldPrefetch: false,
});
