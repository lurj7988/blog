---
title: filebrowser
icon: markdown
order: 7
date: 2023-08-18
category:
  - 测试运维
tag:
  - tool
---

[filebrowser](https://github.com/filebrowser/filebrowser) provides a file managing interface within a specified directory and it can be used to upload, delete, preview, rename and edit your files. It allows the creation of multiple users and each user can have its own directory. It can be used as a standalone app.

## Features

Please refer to our docs at <https://filebrowser.org/features>

## Install

For installation instructions please refer to our docs at <https://filebrowser.org/installation>.

## docker

init `filebrowser.db` in `/home/lurj/filebrowser/database`, you best copy from other place.

create `settings.json` in `/home/lurj/filebrowser/config`

```json
{
  "port": 80,
  "baseURL": "",
  "address": "",
  "log": "stdout",
  "database": "/database/filebrowser.db",
  "root": "/srv"
}
```

```sh
sudo docker run \
     -d --name filebrowser \
     -v /home/lurj:/srv \
     -v /home/lurj/filebrowser/database:/database \
     -v /home/lurj/filebrowser/config:/config \
     -e PUID=$(id -u) \
     -e PGID=$(id -g) \
     -p 8080:80 \
     filebrowser/filebrowser:s6
```

## linux automatic start

create file `/etc/systemd/system/filebrowser.service`

```sh
[Unit]
Description=File Browser
After=network.target

[Service]
ExecStart=/usr/local/bin/filebrowser -d /etc/filebrowser.db

[Install]
WantedBy=multi-user.target
```

```sh
# 运行
systemctl start filebrowser.service
# 停止运行
systemctl stop filebrowser.service
# 开机启动
systemctl enable filebrowser.service
# 取消开机启动
systemctl disable filebrowser.service
# 查看运行状态
systemctl status filebrowser.service
```
