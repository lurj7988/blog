---
title: gitlab runner 介绍
icon: gitlab
order: 1
date: 2023-05-18
category:
  - 测试运维
tag:
  - DevOps
---


## 注册

```shell
sudo gitlab-runner register --url http://192.168.0.200/ --registration-token $REGISTRATION_TOKEN
```

## 查看runner命令

```shell
gitlab-runner list
```

## 查看runner配置文件

```shell
cat /etc/gitlab-runner/config.toml
```

## 客户端构建路径

```shell
cd /home/gitlab-runner/builds
```
