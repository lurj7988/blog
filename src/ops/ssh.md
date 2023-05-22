---
title: ssh
icon: link
order: 5
date: 2023-05-22
category:
  - 测试运维
tag:
  - linux
---

## ssh免密登录

### 在本地Windows上生成公钥私钥对

生产目录位于`C:\Users\naulu\.ssh`，其中`id_rsa`为私钥，`id_rsa.pub`为公钥

```sh
ssh-keygen
```

### 将公钥放入linux服务器

将公钥中的内容添加到`linux`用户目录下的`.ssh`目录下的`authorized_keys`文件中。

```sh
cd ~/.ssh
touch authorized_keys
vim authorized_keys
```

### vscode远程插件指定私钥

```txt
Host 192.168.188.128
  HostName 192.168.188.128
  User lurj
  IdentityFile C:/Users/naulu/.ssh/id_rsa
```
