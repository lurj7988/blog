---
title: springboot远程调试
icon: markdown
order: 4
date: 2023-10-18
category:
  - 后端技术
tag:
  - spring
---

## 启动命令

启动参数增加`-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005`

```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -jar .\xxx.jar
```

## IDEA配置

![remoteDebug.png](./assets/images/remoteDebug.png)
