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
      icon: "advance",
      collapsible: true,
      prefix: "ai/sd/",
      link: "ai/sd/",
      children: "structure",
    },
  ],
  "/frontend/": [
    "",
    {
      text: "cli",
      icon: "nodeJS",
      collapsible: true,
      prefix: "cli/",
      link: "cli/",
      children: "structure",
    },
  ],
  "/backend/": [
    "",
    {
      text: "java",
      icon: "java",
      collapsible: true,
      prefix: "java/",
      children: [
        {
          text: "maven",
          icon: "Apache",
          collapsible: true,
          prefix: "maven/",
          children: "structure",
        },
        {
          text: "jvm",
          icon: "Apache",
          collapsible: true,
          prefix: "jvm/",
          children: "structure",
        }
      ],
    },
    {
      text: "c++",
      icon: "c",
      collapsible: true,
      prefix: "cpp/",
      children: "structure",
    },
    {
      text: "视频技术",
      icon: "play",
      collapsible: true,
      prefix: "video/",
      children: "structure",
    },
  ],
  "/ops/": [
    "",
    {
      text: "DevOps",
      icon: "ci",
      collapsible: true,
      prefix: "devops/",
      link: "devops/",
      children: "structure",
    },
    "git",
    "ssh",
    "grafana",
    "medusa",
    "nmap",
    "ubuntu",
  ],
});
