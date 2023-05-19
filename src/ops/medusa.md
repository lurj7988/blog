---
title: medusa
icon: markdown
order: 3
date: 2023-05-19
category:
  - 测试运维
tag:
  - hack
---

[Github](https://github.com/jmk-foofus/medusa.git)

## medusa编译

```sh
./configure --build=x86-pc-linux-gnu # 需要加上参数否则会报下面的错
make -j 4 && make install
```

::: warning
checking build system type... config.sub: too many arguments

Try `config.sub --help' for more information.

configure: error: /bin/sh ./config.sub x86_64-unknown-linux-gnu
:::

## medusa暴力破解ssh

[usage](http://foofus.net/goons/jmk/medusa/medusa.html)

```sh
medusa -M ssh -H host.txt -U users.txt -p password
medusa -M ssh -h 192.168.109.235 -u root -p 'Epoint123!@#'
medusa -M ssh -h 192.168.109.235 -u root -P passwords.txt
medusa -M ssh -H host.txt -U users.txt -p password
```

## medusa命令详解

```sh
medusa -h #目标IP地址
medusa -H #包含目标IP地址的文件
medusa -u #指定测试的用户名
medusa -U #指定测试的用户名字典
medusa -p #指定测试的密码
medusa -P #指定测试的密码字典
medusa -C #指定测试格式为user:password的字典
medusa -O #将输出结果保存在指定的文件
medusa -e #[n/s/ns] 额外的密码检测(n:空密码 s:用户名=密码)
medusa -M #制定执行的模块(不带.mod扩展名)
medusa -m #指定传递给模块的参数
medusa -d #查看支持破解的模块
medusa -s #启动SSL
medusa -g #设置连接超时时间(默认值3)
medusa -r #设置重试的次数(默认值3)
medusa -t #设置同时测试的登陆总数
medusa -T #设置同时测试的主机总数
medusa -f #在破解得到第一个用户名或者密码后停止扫描主机
medusa -F #在任何竹主机上面破解得到第一个用户名或面后停止扫描
medusa -b #不显示软件启动时候的版本信息
medusa -q #显示模块的使用信息
medusa -v #详细等级(0-6)
medusa -w #错误调试等级(0-10)
medusa -V #显示版本信息
medusa -Z #恢复之前终端的扫描
```
