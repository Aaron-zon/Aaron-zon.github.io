
---
outline: deep
---

# scp 文件传输

scp 是 secure copy 的缩写，用于在本地和远程服务器之间安全地传输文件。

## 1. SCP 是什么？

SCP = Secure Copy Protocol（安全复制协议）

它通过 SSH 加密通道 在两台机器之间传输文件。

你可以理解为：

> “基于 SSH 登录，用命令行复制文件”

他是 Linux 之间比较常用的文件传输方式。

常用于：

- 本地文件  ->   上传到服务器
- 服务器    ->   下载文件到本地
- 服务器1   ->   服务器2之间传文件
- 虚拟机    <->  主机之间传文件

## 2.SCP 常用命令

### Windows 上传文件到 Ubuntu

在 Windows 上，你可以使用 PowerShell 或 CMD 来执行 SCP 命令。

例如，要将本地文件 `C:\path\to\file.txt` 上传到 Ubuntu 服务器的 `/home/ubuntu/` 目录下，你可以使用以下命令：

> scp 本地文件 用户名@服务器IP:目标目录

```bash
scp C:\path\to\file.txt ubuntu@your-ubuntu-server-ip:/home/ubuntu/
```

- `C:\path\to\file.txt` 是本地文件的路径
- `ubuntu@your-ubuntu-server-ip` 是 Ubuntu 服务器的用户名和 IP 地址
- `/home/ubuntu/` 是 Ubuntu 服务器上接收文件的目录

### Ubuntu 下载文件到 Windows

```bash
scp ubuntu@虚拟机IP:/home/ubuntu/test.txt C:\Users\你的名字\Desktop\
```

### 上传整个文件夹（加 -r）

```bash
scp -r C:\项目目录 ubuntu@虚拟机IP:/home/ubuntu/
```

## 常见问题

### 使用SCP需要开启SSH

```
# 检查SSH服务是否已启用
sudo systemctl status ssh

# 启用并启动SSH服务
sudo systemctl start ssh
sudo systemctl enable ssh
```