---
title: cmake
icon: markdown
order: 2
date: 2023-06-07
category:
  - 后端技术
tag:
  - c++
---

## 一、准备知识

### 1.1 C++的编译过程

使用`g++`等编译工具，从源码生成最终的可执行文件一般有这几步：预处理（Preprocess）、编译（Compile）、汇编（assemble）、链接（link）。

![imgcompile.jpg](./assets/images/imgcompile.jpg)

> 输入`g++ --help`可以看到对应命令：
>
> ```bash
> -E                       Preprocess only; do not compile, assemble or link.
> -S                       Compile only; do not assemble or link.
> -c                       Compile and assemble, but do not link.
> -o <file>                Place the output into <file>.
> ```

以下面程序为例：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World!" << std::endl;
    return 0;
}
```

* 第一步：预处理
  C++中预处理指令以 `#` 开头。在预处理阶段，会对`#define`进行宏展开，处理`#if，#else`等条件编译指令，递归处理`#include`。这一步需要我们添加所有头文件的引用路径。

```bash
# 将xx.cpp源文件预处理成xx.i文件（文本文件）
g++ -E main.cpp -o main.i
```

* 第二步：编译

  检查代码的规范性和语法错误等，检查完毕后把代码翻译成汇编语言文件。

```bash
# 将xx.i文件编译为xx.s的汇编文件（文本文件）
g++ -S main.i -o main.s
```

* 第三步：汇编
  基于汇编语言文件生成二进制格式的目标文件。

```bash
# 将xx.s文件汇编成xx.o的二进制目标文件
g++ -c main.s -o main.o
```

* 第四步：链接

  将目标代码与所依赖的库文件进行关联或者组装，合成一个可执行文件

```bash
# 将xx.o二进制文件进行链接，最终生成可执行程序
g++ main.o -o main
```

### 1.2 静态链接库和动态链接库

所谓静态和动态，其区别是链接的阶段不一样。

* 静态链接库名称一般是`lib库名称.a`（`.a`代表`archive library`），其链接发生在编译环节。一个工程如果依赖一个静态链接库，其输出的库或可执行文件会将静态链接库`*.a`打包到该工程的输出文件中（可执行文件或库），因此生成的文件比较大，但在运行时也就不再需要库文件了。

* 而动态链接库的链接发生在程序的执行过程中，其在编译环节仅执行链接检查，而不进行真正的链接，这样可以节省系统的开销。动态库一般后缀名为`*.so`（`.so`代表`shared object`，Linux：`lib库名称.so` ，macOS：`lib库名称.dylib`）。动态链接库加载后，在内存中仅保存一份拷贝，多个程序依赖它时，不会重复加载和拷贝，这样也节省了内存的空间。

* 以下图为例

  * 工程`A`和`B`依赖静态链接库 `static library`，`A`和`B`在运行时，内存中会有多份`static library`；

  * 工程`A`和`B`依赖动态链接库 `shared library`，`A`和`B`在运行时，内存中只有一份 `shared library`（shared：共享）。

![img20230122221807.jpg](./assets//images/img20230122221807.jpg)

以上只是非常简单的一个解释以区分动态链接库和静态链接库。更多底层的知识需要单独进行深入讲解。

### 1.3 为什么需要CMake

#### 1.3.1 g++ 命令行编译

当我们编译附件中`1.hello_world`时，我们可以运行

```bash
g++ main.cpp -o main
```

当我们需要引入外部库时，如附件中的`2.external_libs`，需要引入`gflags`（Google开源的命令行参数处理库），我们则需要运行：

```bash
# 安装gflags
sudo apt-get install libgflags-dev libgflags2.2 

// -lgflags表示链接gflags库，-o main表示输出文件名为main
g++ main.cpp -lgflags -o main 

# 或者：

# 安装pkg-config
sudo apt-get install pkg-config

// pkg-config是一个工具，用于查找和管理安装在系统上的库文件，--cflags --libs gflags表示查找gflags库的头文件和库文件的路径，-o main表示输出文件名为main

g++ main.cpp `pkg-config --cflags --libs gflags`  -o main 


# 测试输出
./main --age 31 --name alice
```

有些时候有一些常用库我们也不用手动添加头文件或链接库路径，通常g++能在默认查询路径中找到他们。当我们的项目文件变得多起来，引入的外部库也多起来时，命令行编译这种方式就会变得十分臃肿，也不方便调试和编辑。通常在测试单个文件时会使用命令行进行编译，但不推荐在一个实际项目中使用命令行编译。

#### 1.3.2 CMake简介

在实际工作中推荐使用CMake构建C++项目，CMake是用于**构建、测试**和软件**打包**的开源**跨平台**工具；

特性：

* 自动搜索可能需要的程序、库和头文件的能力；
* 独立的构建目录（如`build`），可以安全清理
* 支持复杂的自定义命令（下载、生成各种文件）
* 自定义配置可选组件
* 从简单的文本文件（`CMakeLists.txt`）自动生成工作区和项目的能力
* 在主流平台上自动生成文件依赖项并支持并行构建
* 几乎支持所有的IDE

## 二、CMake基础知识

### 2.1 安装

ubuntu上请执行

```shell
sudo apt install cmake -y
```

或者编译安装：

```shell
# 以v3.25.1版本为例
git clone -b v3.25.1 https://github.com/Kitware/CMake.git 
cd CMake
# 你使用`--prefix`来指定安装路径，或者去掉`--prefix`,安装在默认路径。
./bootstrap --prefix=<安装路径> && make && sudo make install

# 验证
cmake --version
```

### 2.2 第一个CMake例子

附件位置：`3.first_cmake`

```bash
# 第一步：配置，-S 指定源码目录，-B 指定构建目录
cmake -S . -B build 
# 第二步：生成，--build 指定构建目录
cmake --build build
# 运行
./build/first_cmake
```

vs code插件：

* 安装`twxs.cmake`做代码提示；
* 安装`ms-vscode.cmake-tools`界面操作。

### 2.3 语法基础

#### 2.3.1 指定版本

以附件：`3.first_cmake/CMakeLists.txt`为例：

```cmake
# CMake 最低版本号要求
cmake_minimum_required(VERSION 3.10)

# first_cmake是项目名称，VERSION是版本号，DESCRIPTION是项目描述，LANGUAGES是项目语言
project(first_cmake 
        VERSION 1.0.0 
        DESCRIPTION "项目描述"
        LANGUAGES CXX) 

# 添加一个可执行程序，first_cmake是可执行程序名称，main.cpp是源文件
add_executable(first_cmake main.cpp)
```

命令[`cmake_minimum_required`](https://cmake.org/cmake/help/latest/command/cmake_minimum_required.html?highlight=cmake_minimum_required)来指定当前工程所使用的CMake版本，不区分大小写的，通常用小写。`VERSION`是这个函数的一个特殊关键字，版本的值在关键字之后。CMake中的命令大多和`cmake_minimum_required`相似，不区分大小写，并有很多关键字来引导命令的参数输入（类似函数传参）。

#### 2.3.2 设置项目

以附件：`3.first_cmake/CMakeLists.txt`为例：

```cmake
project(ProjectName 
        VERSION 1.0.0 
        DESCRIPTION "项目描述"
        LANGUAGES CXX) 
```

在`CMakeLists.txt`的开头，都会使用[`project`](https://cmake.org/cmake/help/latest/command/project.html)来指定本项目的名称、版本、介绍、与使用的语言。在`project`中，第一个`ProjectName`（例子中用的是`first_cmake`）不需要参数，其他关键字都有参数。

#### 2.3.3 添加可执行文件目标

以附件：`3.first_cmake/CMakeLists.txt`为例：

```cmake
add_executable(first_cmake main.cpp)
```

这里我们用到[`add_executable`](https://cmake.org/cmake/help/latest/command/add_executable.html)，其中第一个参数是最终生成的可执行文件名以及在CMake中定义的`Target`名。我们可以在CMake中继续使用`Target`的名字为`Target`的编译设置新的属性和行为。命令中第一个参数后面的参数都是编译目标所使用到的源文件。

#### 2.3.4 生成静态库并链接

附件位置：`4.static_lib_test`

> **A.生成静态库**

```cmake
#account_dir/CMakeLists.txt

# 最低版本要求
cmake_minimum_required(VERSION 3.10)

# 项目信息
project(Account)

# 添加静态库，Linux下会生成libAccount.a
add_library(Account STATIC Account.cpp Account.h)
```

```shell
# 编译静态库后，会在build下生成 build/libAccount.a 静态库文件
account_dir/
├── Account.cpp
├── Account.h
├── build
│   └── libAccount.a
└── CMakeLists.txt
```

这里我们用到[`add_library`](https://cmake.org/cmake/help/latest/command/add_library.html), 和`add_executable`一样，`Account`为最终生成的库文件名（`lib库名称.a`），第二个参数是用于指定链接库为动态链接库（`SHARED`）还是静态链接库（`STATIC`），后面的参数是需要用到的源文件。

> **B.链接**

```cmake
# test_account/CMakeLists.txt

# 最低版本要求
cmake_minimum_required(VERSION 3.10)

# 项目名称
project(test_account)

# 添加执行文件
add_executable(test_account test_account.cpp)

# 添加头文件目录，如果不添加，找不到头文件
target_include_directories(test_account PUBLIC "../account_dir")
# 添加库文件目录，如果不添加，找不到库文件
target_link_directories(test_account PUBLIC "../account_dir/build")
# 添加目标链接库
target_link_libraries(test_account PRIVATE Account)
```

```shell
# 编译后目录如下
4.static_lib_test/
├── account_dir
│   ├── Account.cpp
│   ├── Account.h
│   ├── build
│   │   └── libAccount.a
│   └── CMakeLists.txt
└── test_account 
    ├── build
    │   └── test_account
    ├── CMakeLists.txt
    └── test_account.cpp
```

我们通过`add_library`和`add_executable`定义了`Target`，我们可以通过`Target`的名称为其添加属性，例如：

```cmake
# 指定目标包含的头文件目录
target_include_directories(test_account PUBLIC "../account_dir")
# 添加库文件目录，如果不添加，找不到库文件
target_link_directories(test_account PUBLIC "../account_dir/build")
# 指定目标链接的库
target_link_libraries(test_account PRIVATE Account)
```

* 通过[`target_include_directories`](https://cmake.org/cmake/help/latest/command/target_include_directories.html)，我们给`test_account`添加了头文件引用路径`"../account_dir"`。上面的关键词`PUBLIC`,`PRIVATE`用于说明目标属性的作用范围，更多介绍参考下节。
* 通过[`target_link_libraries`](https://cmake.org/cmake/help/latest/command/target_link_libraries.html)，将前面生成的静态库`libAccount.a`链接给对象`test_account`，但此时还没指定库文件的目录，CMake无法定位库文件
* 再通过[`target_link_directories`](https://cmake.org/cmake/help/latest/command/target_link_directories.html)，添加库文件的目录即可。

#### 2.3.5 生成动态库并连接

附件位置：`5.dynamic_lib_test`

> **A.生成动态库**

```cmake
#account_dir/CMakeLists.txt

# 添加动态库，Linux下会生成libAccount.so
add_library(Account SHARED Account.cpp Account.h)
```

```shell
# 编译动态库后，会在build下生成 build/libAccount.so 动态库文件
account_dir/
├── Account.cpp
├── Account.h
├── build
│   └── libAccount.so
└── CMakeLists.txt
```

> **B.链接**

操作不变。

```shell
# ldd查看依赖的动态库
ldd ./build/test_account
libAccount.so => /home/enpei/Documents/course_cpp_tensorrt/course_5/src/5.dynamic_lib_test/test_account/../account_dir/build/libAccount.so (0x00007fb692cf1000)
```

当然，也可以用一个`CMakeLists.txt`来一次性编译，参考附件`6.build_together`

```cmake
#6.build_together/CMakeLists.txt`

# 最低版本要求
cmake_minimum_required(VERSION 3.10)

# 项目信息
project(test_account)

# 添加动态库
add_library(Account SHARED "./account_dir/Account.cpp" "./account_dir/Account.h")

# 添加可执行文件
add_executable(test_account "./test_account/test_account.cpp")

# 添加头文件
target_include_directories(test_account PUBLIC "./account_dir")
# 添加链接库
target_link_libraries(test_account Account)
```

#### 2.3.6 CMake 中的 PUBLIC、PRIVATE、INTERFACE

CMake中经常使用`target_...()`类似的命令，一般这样的命令支持通过`PUBLIC`、`PRIVATE`、`INTERFACE`关键字来控制传播。

以`target_link_libraries(A B)`为例，从理解的角度来看

* `PRIVATE` ：依赖项`B`仅链接到目标`A`，如果有`C` 链接了`A`，`C`不会链接`B`
* `INTERFACE` ：依赖项`B`并不链接到目标`A`，如果有`C` 链接了`A`，`C`会链接`B`
* `PUBLIC`  ：依赖项`B`链接到目标`A`，如果有`C` 链接了`A`，`C`也会链接`B`

其实就是对象属性的传递，打个散烟的比方：

* `PRIVATE`： 就是自己抽，不给别人抽
* `INTERFACE` ：就是自己不抽，给别人抽
* `PUBLIC` ：就是自己抽，也给别人抽

从使用的角度来说，如果有`C`链接了目标`A`

* 如果`B`仅用于`A`的实现，且不在头文件中提供给`C`使用，使用`PRIVATE`
* 如果`B`不用于`A`的实现，仅在头文件中作为借口给`C`使用，使用`INTERFACE`
* 如果`B`既用于`A`的实现，也在头文件中提供给`C`使用，使用`PUBLIC`

举例：

```cmake
# 创建库
add_library(C c.cpp)
add_library(D d.cpp)
add_library(B b.cpp)

# C是B的PUBLIC依赖项
target_link_libraries(B PUBLIC C)
# D是B的PRIVATE依赖项
target_link_libraries(B PRIVATE D)

# 添加可执行文件
add_executable(A a.cpp)

# 将B链接到A
target_link_libraries(A B)
```

* 因为`C`是`B`的`PUBLIC`依赖项，所以`C`会传播到`A`
* 因为`D`是`B`的`PRIVATE`依赖性，所以`D`不会传播到`A`

#### 2.3.7 变量

附件位置：`7.message_var_demo`

像其他编程语言一样，我们应该将CMake理解为一门编程语言。我们也需要设定变量来储存我们的选项，信息。有时候我们通过变量来判断我们在什么平台上，通过变量来判断我们需要编译哪些`Target`，也通过变量来决定添加哪些依赖。

#### 2.3.8 include引入其他代码

附件位置：`8.include_demo`

#### 2.3.9 条件控制

附件位置：`9.if_demo`

正如前面所讲，应该把CMake当成编程语言，除了可以设置变量以外，CMake还可以写条件控制。

```cmake
if(variable)
    # 为true的常量：ON、YES、TRUE、Y、1、非0数字
else()
    # 为false的常量：OFF、NO、FALSE、N、0、空字符串、NOTFOUND
endif()
```

可以和条件一起使用的关键词有

```cmake
NOT, TARGET, EXISTS (file), DEFINED等
STREQUAL, AND, OR, MATCHES (regular expression), VERSION_LESS, VERSION_LESS_EQUAL等
```

#### 2.3.10 CMake分步编译

附件位置：`10.steps_demo`

```bash
# 查看所有目标
$ cmake -S . -B build
$ cd build
$ cmake --build . --target help

The following are some of the valid targets for this Makefile:
... all (the default if no target is provided)
... clean
... depend
... rebuild_cache
... edit_cache
... steps_demo
... main.o
... main.i
... main.s



# 1.预处理
$ cmake --build . --target main.i
# 输出：Preprocessing CXX source to CMakeFiles/steps_demo.dir/main.cpp.i
# 可以打开滑到底部

# 2.编译
$ cmake --build . --target main.s
# 输出汇编代码：Compiling CXX source to assembly CMakeFiles/steps_demo.dir/main.cpp.s

# 3.汇编
$ cmake --build . --target main.o
# 输出二进制文件：Building CXX object CMakeFiles/steps_demo.dir/main.cpp.o

# 链接
$ cmake --build .
Scanning dependencies of target steps_demo
[ 50%] Linking CXX executable steps_demo
[100%] Built target steps_demo

# 运行
./steps_demo
```

#### 2.3.11 生成器表达式

附件位置：`11.generator_expression`

生成器表达式简单来说就是在CMake生成构建系统的时候根据不同配置动态生成特定的内容。有时用它可以让代码更加精简，我们介绍几种常用的。

> 需要注意的是，生成表达式被展开是在生成构建系统的时候，所以不能通过解析配置`CMakeLists.txt`阶段的`message`命令打印，可以用类似`file(GENERATE OUTPUT "./generator_test.txt" CONTENT "$<$<BOOL:TRUE>:TEST>")`生成文件的方式间接测试。

在其最一般的形式中，生成器表达式是`$<...>`，尖括号中间可以是如下几种类型：

* 条件表达式
* 变量查询（Variable-Query）
* 目标查询（Target-Query）
* 输出相关的表达式

```cmake
# 1.条件表达式：$<condition:true_string>，当condition为真时，返回true_string，否则返回空字符串
$<0:TEST>  
$<1:TEST>  
$<$<BOOL:TRUE>:TEST>

# 2.变量查询（Variable-Query）
$<TARGET_EXISTS:target>：判断目标是否存在
$<CONFIG:Debug>：判断当前构建类型是否为Debug

# 3.目标查询（Target-Query）
$<TARGET_FILE:target>：获取编译目标的文件路径
$<TARGET_FILE_NAME:target>：获取编译目标的文件名
```

4.输出相关表达式：用于在不同的环节使用不同参数，比如需要在`install`和`build`环节分别用不同的参数，我们可以这样写：

```cmake
add_library(Foo ...)
target_include_directories(Foo
    PUBLIC
        $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
        $<INSTALL_INTERFACE:${CMAKE_INSTALL_INCLUDEDIR}>
)
```

其中`$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>`仅在`build`环节生效;而`$<INSTALL_INTERFACE:${CMAKE_INSTALL_INCLUDEDIR}>`仅在`install`环节生效。通过设定不同阶段不同的参数，我们可以避免路径混乱的问题。

#### 2.3.12 函数和宏

附件位置：`12.function_macro`

```cmake
# 定义一个宏，宏名为my_macro，没有参数
macro(my_macro)
    message("宏内部的信息")
    set(macro_var "宏内部变量test")
endmacro(my_macro)

# 定义一个函数，函数名为second_func，有两个参数
function(second_func arg1 arg2)
    message("第一个参数：${arg1}, 第二个参数：${arg2}")
endfunction(second_func)
```

#### 2.3.13 设置安装

附件位置：`13.install_demo`

当需要发布项目时你需要指定项目文件的安装路径。下面的代码片段中，使用`install`安装`demo_test`，并分别将可执行文件安装在`bin`中，动态链接库和静态链接库都安装在`lib`，公共头文件安装在`include`。这里的路径都将添加`${CMAKE_INSTALL_PREFIX}`作为前缀（如果不设置`CMAKE_INSTALL_PREFIX`，则会安装到`/usr/local` 目录下）。实现安装的功能在你需要发布你项目给其他人使用时，非常有用。

```cmake
# 设置安装
install(TARGETS demo_test
        RUNTIME DESTINATION bin # 可执行文件
        LIBRARY DESTINATION lib # 动态库
        ARCHIVE DESTINATION lib # 静态库
        PUBLIC_HEADER DESTINATION include # 公共头文件
)
```

#### 2.3.14 寻找依赖 find_package

对于大部分支持了CMake的项目来说，均可以通过`find_package`找到对应的依赖库，参考附件：`14.find_demo`

```shell
# 使用find_package寻找<LibaryName>库，如果找到，一般都会有以下变量（库作者设置）
<LibaryName>_FOUND：表示是否找到
<LibaryName>_INCLUDE_DIR：表示头文件目录
<LibaryName>_LIBRARIES：表示库文件目录
```

假设我们编写了一个新的函数库，我们希望别的项目可以通过`find_package`对它进行引用，我们有两种办法：

* 编写一个`Find<LibraryName>.cmake`，适用于导入非cmake安装的项目，参考附件：`15.custom_find`
* 使用`install`安装，生成`<LibraryName>Config.cmake`文件，适用于导入自己开发的cmake项目，参考附件：`16.custom_install_demo`

## 三、opencv CMake示例

附件位置：`17.demo_opencv/`

安装OpenCV：`sudo apt install libopencv-dev`

依赖和链接OpenCV与常规的添加依赖并没有太多不同，同时OpenCV提供了`cmake find package`的功能，因此我们可以通过`find_package`方便的定位opencv在系统中的位置和需要添加的依赖。

```cmake
find_package(OpenCV REQUIRED)

message("OPENCV INCLUDE DIRS: ${OpenCV_INCLUDE_DIRS}")
message("OPENCV LINK LIBRARIES: ${OpenCV_LIBS}")
```

如果cmake找到了OpenCV，配置cmake后，命令行会有如下输出：

```shell
OPENCV INCLUDE DIRS: /usr/include/opencv4
OPENCV LINK LIBRARIES: opencv_calib3d;opencv_core;opencv_dnn;opencv_features2d;opencv_flann;opencv_highgui;opencv_imgcodecs;opencv_imgproc;opencv_ml;opencv_objdetect;opencv_photo;opencv_stitching;opencv_video;opencv_videoio;opencv_aruco;opencv_bgsegm;opencv_bioinspired;opencv_ccalib;opencv_datasets;opencv_dnn_objdetect;opencv_dnn_superres;opencv_dpm;opencv_face;opencv_freetype;opencv_fuzzy;opencv_hdf;opencv_hfs;opencv_img_hash;opencv_line_descriptor;opencv_optflow;opencv_phase_unwrapping;opencv_plot;opencv_quality;opencv_reg;opencv_rgbd;opencv_saliency;opencv_shape;opencv_stereo;opencv_structured_light;opencv_superres;opencv_surface_matching;opencv_text;opencv_tracking;opencv_videostab;opencv_viz;opencv_ximgproc;opencv_xobjdetect;opencv_xphoto
```
