---
title: nmap
icon: markdown
order: 4
date: 2023-05-19
category:
  - 测试运维
tag:
  - hack
---

[Github](https://github.com/nmap/nmap.git)

## nmap 编译

[下载地址](https://nmap.org/dist/nmap-7.91.tar.bz2)

```sh
yum -y install bzip2
tar -xvf nmap-7.91.tar.bz2
./configure --build=x86-pc-linux-gnu
yum -y install gcc+ gcc-c++
make -j 4 && make install
nmap --version
```
