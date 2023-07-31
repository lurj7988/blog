---
title: conda
icon: markdown
order: 1
date: 2023-07-20
category:
  - 前沿科技
tag:
  - conda
---

## Installing on Linux

1. Download the installer:

- [Miniconda installer for Linux.](https://docs.conda.io/en/latest/miniconda.html#linux-installers)
- [Miniconda installer for Linux.](https://www.anaconda.com/download/)

1. [Verify your installer hashes.](https://conda.io/projects/conda/en/stable/user-guide/install/download.html#hash-verification)
1. In your terminal window, run:

- Miniconda:

```bash
bash Miniconda3-latest-Linux-x86_64.sh
```

- Anaconda:

```bash
bash Anaconda3-latest-Linux-x86_64.sh
```

## 常用命令

If you'd prefer that conda's base environment not be activated on startup,set the auto_activate_base parameter to false:

```bash
conda config --set auto_activate_base false
```

列出所有环境

```bash
conda env list
```

创建环境

```bash
conda create --name myenv
```

创建指定版本的环境

```bash
conda create -n myenv python=3.6
```

创建指定版本的环境并安装指定包

```bash
conda create -n myenv python=3.6 numpy
```

进入环境

```bash
conda activate myenv
```

退出环境

```bash
conda deactivate
```

删除环境

```bash
conda remove -n myenv --all
```

配置清华源

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
```

## 参考连接

- <https://conda.io/projects/conda/en/stable/user-guide/install/linux.html#install-linux-silent>
