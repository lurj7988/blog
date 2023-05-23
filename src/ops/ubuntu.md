---
title: ubuntu
icon: markdown
order: 5
date: 2023-05-23
category:
  - 测试运维
tag:
  - linux
---

## 磁盘分区与挂载

[参考链接](https://blog.csdn.net/make_progress/article/details/118571375)

### 查看空闲磁盘空间

进入以后，m表示帮助，F表示查看空闲的磁盘，q表示退出，d表示删除分区，n表示新建分区，w表示保存配置等

```sh
lurj@lurj:~$ sudo fdisk /dev/sda

Welcome to fdisk (util-linux 2.37.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

GPT PMBR size mismatch (41943039 != 167772159) will be corrected by write.
This disk is currently in use - repartitioning is probably a bad idea.
It's recommended to umount all file systems, and swapoff all swap
partitions on this disk.


Command (m for help): F

Unpartitioned space /dev/sda: 60 GiB, 64425541120 bytes, 125831135 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes

   Start       End   Sectors Size
41940992 167772126 125831135  60G

Command (m for help):
All unwritten changes will be lost, do you really want to quit? y
```

### 新建分区

选择`n`指令进去新建分区模式，选择默认分区号，根据指令设置磁盘大小，选择`p`指令查看分区是否添加成功，选择`w`指令保存配置，选择`q`指令退出不保存配置。

```sh
lurj@lurj:~$ sudo fdisk /dev/sda

Welcome to fdisk (util-linux 2.37.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

GPT PMBR size mismatch (41943039 != 167772159) will be corrected by write.
This disk is currently in use - repartitioning is probably a bad idea.
It's recommended to umount all file systems, and swapoff all swap
partitions on this disk.

Command (m for help): n
Partition number (4-128, default 4):
First sector (41940992-167772126, default 41940992):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (41940992-167772126, default 167772126):

Created a new partition 4 of type 'Linux filesystem' and of size 60 GiB.

Command (m for help): p
Disk /dev/sda: 80 GiB, 85899345920 bytes, 167772160 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 209A5215-C303-4C38-802F-FADB733C53A6

Device        Start       End   Sectors  Size Type
/dev/sda1      2048      4095      2048    1M BIOS boot
/dev/sda2      4096   3719167   3715072  1.8G Linux filesystem
/dev/sda3   3719168  41940991  38221824 18.2G Linux filesystem
/dev/sda4  41940992 167772126 125831135   60G Linux filesystem

Command (m for help): w
The partition table has been altered.
Syncing disks.
```

### 格式化分区

对新分区`/dev/sda4`进行格式化，注意，不格式化不能对分区进行挂载

```sh
lurj@lurj:~$ sudo mkfs -t ext4 /dev/sda4
mke2fs 1.46.5 (30-Dec-2021)
Creating filesystem with 15728640 4k blocks and 3939840 inodes
Filesystem UUID: 71fe7d8e-63cf-42c1-abe3-686063d202ce
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
        4096000, 7962624, 11239424

Allocating group tables: done
Writing inode tables: done
Creating journal (65536 blocks): done
Writing superblocks and filesystem accounting information: done
```

### 检测分区

```sh
lurj@lurj:~$ sudo e2fsck -f /dev/sda4
e2fsck 1.46.5 (30-Dec-2021)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
/dev/sda4: 11/3939840 files (0.0% non-contiguous), 326171/15728640 blocks
```

### 移动文件

将需要挂载的目录中的文件先移动出去

```sh
cd /home/lurj
# 查看隐藏文件
ls -a
# 移动文件包含隐藏文件
sudo mv *.[^.]* /opt/ 
```

### 磁盘挂载

```sh
# 此方法只能临时挂载，系统重启后就失效
sudo mount /dev/sda4 /home/lurj
# 设置开机自动挂载，编辑/etc/fstab文件，添加如下内容
sudo vim /etc/fstab
# /dev/sda4       /home/lurj     ext4    defaults        0 0
# 取消挂载
sudo umount /home/lurj
```

### 查看挂载

```sh
lurj@lurj:~$ df -h
Filesystem                         Size  Used Avail Use% Mounted on
tmpfs                              1.6G  1.6M  1.6G   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv  9.8G  3.9G  5.5G  42% /
tmpfs                              7.8G     0  7.8G   0% /dev/shm
tmpfs                              5.0M     0  5.0M   0% /run/lock
/dev/sda2                          1.8G  253M  1.4G  16% /boot
tmpfs                              1.6G  4.0K  1.6G   1% /run/user/1000
/dev/sda4                           59G  5.4G   51G  10% /home/lurj
```
