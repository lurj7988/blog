import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "creative",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    // {
    //   text: "文章",
    //   icon: "note",
    //   prefix: "posts/",
    //   children: "structure",
    // },
    "intro",
    "slides",
  ],
  "/advanced/": [
    "",
    {
      text: "Stable Diffusion",
      icon: "creative",
      collapsible: true,
      prefix: "ai/sd/",
      link: "ai/sd/",
      children: "structure",
    },
  ],
  "/frontend/": [
    "",
  ],
  "/backend/": [
    "",
  ],  
  "/ops/": [
    "",
    {
      text: "DevOps",
      icon: "creative",
      collapsible: true,
      prefix: "devops/",
      link: "devops/",
      children: "structure",
    },
  ],  
});
