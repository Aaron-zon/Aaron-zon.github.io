---
outline: deep
---
# docker 安装

Docker 可以运行在 Mac、Windows 和绝大多数 Linux （CentOS、Ubuntu）系统上。

## Windows 安装 Docker

> 网址：https://www.docker.com/

windows 的安装很简单，在官网下载安装用的 exe 文件然后一直下一步下一步的安装就可以了。

![alt text](image.png)

### 问题

有的可能会提示一些异常错误，下面来介绍几种常见的问题和解决办法

#### window10 版本不兼容

window10 版本不兼容的问题，可以使用 winver 命令查看当前系统的版本，如果确实低于 Docker 支持的版本那么就需要升级了。

![alt text](image-1.png)

![alt text](image-2.png)

升级window系统：

1.打开开始菜单-选择设置

![alt text](image-3.png)

2.在 **设置** 的最下面找到 **更新和安全**

![alt text](image-4.png)

3.在 **Windows 更新** 中选择 **检查更新**，如果有可更近的版本就会推送更新

![alt text](image-6.png)

#### WSL2功能

## Linux 安装 Docker