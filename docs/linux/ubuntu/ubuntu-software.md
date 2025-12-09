---
outline: deep
---

# Ubuntu 软件安装

在 Ubuntu 上安装软件有很多种方式，最常见的有以下几种。

## apt（最常用方式，命令行）

Ubuntu 提供的元件仓库可以直接安装大多数软件。

1.更新软件园（建议先执行）

```bash
sudo apt update
# 或
sudo apt update -y
```

2.安装软件

```bash
sudo apt install <软件名>
```

示例：

```bash
# 安装 nginx
sudo apt install nginx

# 安装 git
sudo apt install git

# 安装 php
sudo apt install php
```

## .deb 包安装（类似 Windows 的 .exe 安装包）

如果是从官网或第三方下载的 `.deb` 文件，用以下方式安装：

### 方法一

**1.使用 dpkg 安装**

```bash
sudo dpkg -i <软件包.deb>
```

示例：

```bash
sudo dpkg -i nginx_1.18.0-0ubuntu1_amd64.deb
```

**2.修复依赖问题**

如果安装后提示依赖问题，执行以下命令修复：

```bash
sudo apt install -f
```
### 方法二

**使用 apt 安装本地包**

```bash
sudo apt install ./<软件包.deb>
```

示例：

```bash
sudo apt install ./nginx_1.18.0-0ubuntu1_amd64.deb
```

## 使用 snap 安装软件（Ubuntu自带）

Snap 是 Ubuntu 推的通用包系统

格式：
```bash
sudo snap install <软件名>
```

示例：

```bash
# 安装 snapd
sudo apt install snapd

# 安装 nginx
sudo snap install nginx
```

## Ubuntu软件中心（图形界面）

如果使用桌面版 Ubuntu：

1. 打开 Ubuntu Software （橙色购物袋图标）
2. 搜索软件
3. 点击 `Install` 按钮安装

## 常见问题

### 如何查找软件包名称

如果不确定软件包名称，可以使用以下命令搜索：

```bash
apt search <关键词>
```

示例：

```bash
apt search nginx
```

### 如何卸载软件

**方法一：卸载软件本体**

```bash
sudo apt remove <软件名>
```

示例：

```bash
# 卸载 nginx
sudo apt remove nginx
```

**方法二：彻底卸载**

```bash
sudo apt purge <软件名>
```

示例：

```bash
# 彻底删除 nginx 配置
sudo apt purge nginx
```

| 命令                    | 删除程序     | 删除配置文件           | 备注   |
| --------------------- | -------- | ---------------- | ---- |
| `sudo apt remove 软件名` | ✔ 删除程序本体 | ❌ 保留配置文件（/etc 等） | 普通卸载 |
| `sudo apt purge 软件名`  | ✔ 删除程序本体 | ✔ 删除所有配置文件       | 彻底卸载 |


### 如何查看已安装的软件

```bash
# 查看已安装的软件包
apt list --installed
```

示例：

```bash
# 查看已安装的软件包
apt list --installed
```