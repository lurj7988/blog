import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/blog/",

  locales: {
    "/en/": {
      lang: "en-US",
      title: "Personal Blog",
      description: "A personal blog for lurj",
    },
    "/": {
      lang: "zh-CN",
      title: "个人博客",
      description: "陆仁杰的个人博客",
    },
  },

  theme,

  plugins: [
    searchProPlugin({
      // 配置选项
    }),
  ],
  // Enable it with pwa
  // shouldPrefetch: false,
});
