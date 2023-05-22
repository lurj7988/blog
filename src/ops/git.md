---
title: git
icon: git
order: 1
date: 2023-05-19
category:
  - 测试运维
tag:
  - git
---

## git常用命令

```sh
git remote -v # 显示所有远程仓库
git remote rm newOrigin # 删除远程仓库
git remote add origin main # 新增远程仓库
git remote set-url origin https://github.com/lurj7988/blog.git # 设置远程仓库地址
git checkout # 显示所有本地仓库
git branch -a # 查看所有分支
git branch main # 创建一个名为main的新分支
git branch -d master # 删除分支
git checkout main # 切换到新的分支
git push origin main --force # 强制将本地仓库覆盖到远程仓库
git push --set-upstream origin main # fatal: The current branch main has no upstream branch. To push the current branch and set the remote as upstream
```

## git配置

`proxy`配置代理了`clash`的7890端口，实现通过`vpn`访问`github`

```text
[user]
        name = lurj
        email = naulurenjie@outlook.com
[credential "http://192.168.0.200"]
        provider = generic
[credential "https://gitee.com"]
        provider = generic
[credential "http://192.168.217.8"]
        provider = generic
[http]
        proxy = 192.168.188.1:7890
[https]
        proxy = 192.168.188.1:7890
[credential]
        helper = store
```
