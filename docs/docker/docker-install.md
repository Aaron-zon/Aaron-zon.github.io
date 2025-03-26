---
outline: deep
---
# docker 安装

Docker 可以运行在 Mac、Windows 和绝大多数 Linux （CentOS、Ubuntu）系统上。

## Windows 安装 Docker

> 网址：https://www.docker.com/

### 1.下载 Docker

![alt text](image.png)

### 2.开启Hyper-V

> 选择虚拟机平台
![alt text](image-7.png)

> 选择 Hyper-V
![alt text](image-8.png)

> 选择适用于 Linux 的 Windows 子系统
![alt text](image-9.png)

### 3.安装 Docker

![alt text](image-10.png)

安装成功后重启 Windows，再启动安装好的 Docker Desktop

![alt text](image-11.png)

![alt text](image-12.png)

可以暂时先不登录

![alt text](image-13.png)

如果出现WSL2 的错误可以再下面 **常见问题** 部分找到应对 WSL2 的说明

![alt text](image-14.png)

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

## Linux 安装 Docker