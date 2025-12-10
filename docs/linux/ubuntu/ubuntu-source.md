---
outline: deep
---

# Ubuntu 换源

Ubuntu 24.04LTS后，apt 源的位置替换到了 `/etc/apt/sources.list.d/ubuntu.sources` 中。

这里可以存放多个 `.sources` 文件，每一个文件都是独立的软件源配置，文件内容种格式为 `DEB822格式`。

这也是官方推荐的方式，尤其适合：

- 添加新的第三方源
- 不想修改系统默认源
- 分类管理源（官方源、国内镜像、PPA等）

## 创建一个 .sources 文件

假设你想添加 清华源（参考）：https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/

1.新建文件

```bash
sudo nano /etc/apt/sources.list.d/tsinghua.sources
# 或
sudo vim /etc/apt/sources.list.d/tsinghua.sources
```

2.添加清华源内容，可参考文档中 `DEB822格式` 部分

```bash
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

3.保存文件后，更新软件源

```bash
# 清除缓存
sudo apt clean
# 更新软件源
sudo apt update
```

## 常见问题

### 1.之前使用无法工作的源进行下载，导致对下载地址有缓存

如之前使用无法工作的源下载了 nginx，导致对下载地址有缓存，即便添加了新的源也继续以缓存的源下载。

1.查看缓存中的 nginx 的候选源

```bash
apt-cache policy nginx
```

输出示例

```bash
nginx:
  Installed: (none)
  Candidate: 1.24.0-2ubuntu7.4
  Version table:
     1.24.0-2ubuntu7.4 500
        500 http://cn.archive.ubuntu.com/ubuntu noble-updates/main amd64 Packages
     1.24.0-2ubuntu7.4 500
        500 https://mirrors.tuna.tsinghua.edu.cn/ubuntu noble-updates/main amd64 Packages
```

出现这种状况可以先将 `.sources` 中废源先注释掉。

或指定某个源安装

```bash
sudo apt install -t noble-updates nginx
```

- -t noble-updates 告诉 apt 从 noble-updates 版本查找软件
- 如果清华源的版本可用，就会直接从清华源下载

### 2.noble-updates 的含义

在 `.sources` 或传统 `sources.list` 中，每行除了源地址，还要指定：
- 版本/套件（Suite）
- 组件（Components）

例如:清华源 .sources 文件：

```bash
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu/
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
```

这里：

- noble → Ubuntu 24.04 的基础版本包
- noble-updates → 官方“常规更新”包（bug 修复、功能小升级）
- noble-backports → 回移版本包（从新版本 backport 过来的功能）

所以 “从 noble-updates 版本中查找软件” 就是告诉 apt：在这个套件里找软件包，而不是只看基础 noble 套件。

### 时间错误导致的下载失败

报错信息：

```bash
Certificate verification failed
The certificate chain uses not yet valid certificate
Could not handshake
```
含义：

- APT 尝试访问清华源 HTTPS 时，发现证书不受信任或尚未生效
- not yet valid certificate → 证书的生效日期还没到，或者系统时间不对
- 因此 TLS 握手失败，无法下载索引

解决办法

1.检查系统时间

```bash
date
```

确保系统时间是正确的。

2.如果时间错误，手动设置时间

```bash
sudo timedatectl set-timezone Asia/Shanghai     # 设置时区
sudo timedatectl set-ntp true                   # 启用网络时间同步
sudo timedatectl status                         # 查看同步状态

# 如果无法同步时间，手动设置时间
sudo timedatectl set-ntp false                  # 禁用网络时间同步
sudo timedatectl set-time "2024-04-01 12:00:00" # 设置时间
```

3.更新 apt 缓存

```bash
sudo apt update
```

