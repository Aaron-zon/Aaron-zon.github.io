---
outline: deep
---

# Ubuntu 安装 nginx

## 下载安装

1.更新 apt

确保能下载到最新的版本

```bash
sudo apt update
```

2.安装 nginx

```bash
sudo apt install nginx -y
```

3.验证安装成功/查看版本

```bash
nginx -v
```

## 文件路径

| 类型    | 路径                | 说明                                                         |
| ----- | ----------------- | ---------------------------------------------------------- |
| 可执行文件 | `/usr/sbin/nginx` | 启动/停止 nginx 命令                                             |
| 配置文件  | `/etc/nginx/`     | 主要配置文件 `nginx.conf` 以及 `sites-available/`、`sites-enabled/` |
| 默认网页  | `/var/www/html/`  | 默认主页文件 `index.html`                                        |
| 日志    | `/var/log/nginx/` | `access.log` 和 `error.log`                                 |

**主要文件**

- 配置文件：`/etc/nginx/nginx.conf`
- 日志文件：
  - 访问日志：`/var/log/nginx/access.log`
  - 错误日志：`/var/log/nginx/error.log`

## 基础命令

### 启动/重启/停止 nginx

```bash
# 启动
sudo systemctl start nginx
# 重启
sudo systemctl restart nginx
# 停止
sudo systemctl stop nginx
```

### 查看 nginx 状态

```bash
sudo systemctl status nginx
```

### 设置开机自启动

```bash
sudo systemctl enable nginx
```

### 防火墙设置（如果开启了 ufw: Ubuntu 自带的防火墙工具）

```bash
# 允许 HTTP 和 HTTPS 流量
sudo ufw allow 'Nginx Full'
# 或
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
# 或（指定端口）
sudo ufw allow 80       # 相当于 'Nginx HTTP'
sudo ufw allow 443      # 相当于 'Nginx HTTPS'


# 查看防火墙规则
sudo ufw status
```
- 这样可以让外部访问 Nginx 的 80/443 端口。
- 如果状态是 inactive，说明防火墙未启用，端口即使不配置也可以访问。

### 测试 Nginx

1. 打开浏览器，访问服务器的 IP 地址或域名。

```bash
http://你的服务器IP/
```

2. 如果看到 “Welcome to Nginx!” 页面，就安装成功了。

### 查看可执行文件路径
```bash
which nginx
```
