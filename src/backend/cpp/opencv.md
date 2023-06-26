---
title: opencv
icon: pic
order: 1
date: 2023-05-22
category:
  - 后端技术
tag:
  - c++
---

OpenCV (Open Source Computer Vision Library: <http://opencv.org>) is an open-source library that includes several hundreds of computer vision algorithms.

See the [OpenCV website](http://opencv.org) for the latest news, downloads, documentation, and [tutorials](https://docs.opencv.org/4.x/index.html).

## Quick start

### Build with ffmpeg support

```sh
sudo apt install -y ffmpeg
```

### Build core modules

```sh
# Install minimal prerequisites (Ubuntu 18.04 as reference)
sudo apt update && sudo apt install -y cmake g++ wget unzip
# Download and unpack sources
wget -O opencv.zip https://github.com/opencv/opencv/archive/4.x.zip
unzip opencv.zip
# Create build directory
mkdir -p build && cd build
# Configure
cmake ../opencv-4.x
# Build
cmake --build .
```

### Install

::: warning Warning

The installation process only copies files to predefined locations and does minor patching. Installing using this method does not integrate opencv into the system package registry and thus, for example, opencv can not be uninstalled automatically. We do not recommend system-wide installation to regular users due to possible conflicts with system packages.

:::

By default OpenCV will be installed to the `/usr/local` directory, all files will be copied to following locations:

- `/usr/local/bin` - executable files
- `/usr/local/lib` - libraries (.so)
- `/usr/local/cmake/opencv4` - cmake package
- `/usr/local/include/opencv4` - headers
- `/usr/local/share/opencv4` - other files (e.g. trained cascades in XML format)

Since `/usr/local` is owned by the root user, the installation should be performed with elevated privileges (`sudo`):

```sh
sudo make install
```

or

```sh
sudo ninja install
```

Installation root directory can be changed with `CMAKE_INSTALL_PREFIX` configuration parameter, e.g. `-DCMAKE_INSTALL_PREFIX=$HOME/.local` to install to current user's local directory. Installation layout can be changed with `OPENCV_*_INSTALL_PATH` parameters. See [OpenCV configuration options reference](https://docs.opencv.org/4.7.0/db/d05/tutorial_config_reference.html) for details.
