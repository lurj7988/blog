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
    {
      text: "视频技术",
      icon: "creative",
      collapsible: true,
      prefix: "video/",
      children: "structure",
    },    
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
    "grafana"
  ],  
});
