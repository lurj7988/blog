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

## ubuntu开启SSH远程登录

```sh
sudo apt install -y openssh-server
```

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

### 禁止ssh用户名密码登录

修改 /etc/ssh/sshd_config

```sh
$ sudo vim /etc/ssh/sshd_config
...
# To disable tunneled clear text passwords, change to no here!
#PasswordAuthentication yes
#PermitEmptyPasswords no
PasswordAuthentication no

# Change to no to disable s/key passwords
#ChallengeResponseAuthentication yes
ChallengeResponseAuthentication no
...
```

把`PasswordAuthentication`改成no，则ssh再发起登录的时候就会提示如下错误：

```sh
ssh : Permission denied (publickey,gssapi-with-mic)
```

通常禁止了用户名密码登录之后，需要配置public/private key pair进行登录，即ssh使用-i参数指定private key文件登录。

反之如果ssh使用用户名密码登录遇到上述错误，则需要把 /etc/ssh/sshd_config配置文件里的配置项`PasswordAuthentication`改成`yes`。
