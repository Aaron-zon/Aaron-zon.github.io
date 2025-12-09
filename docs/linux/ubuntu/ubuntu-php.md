# 安装/使用 php

这里以安装 php8.2 为例。
- php8.2: 基础 PHP 包，PHP 核心运行环境
- php8.2-fpm: PHP-FPM（FastCGI Process Manager），用于 Nginx 或其他 Web 服务器
- php8.2-mysql: MySQL 数据库扩展
- php8.2-xml: XML 扩展
- php8.2-mbstring: 多字节字符串处理扩展
- php8.2-curl: cURL 扩展
- php8.2-zip: ZIP 压缩扩展
- php8.2-bcmath: 高精度数学计算扩展
- php8.2-cli: 命令行使用 PHP
## 安装

Ubuntu 24 默认源可能还没有 PHP 8.2 包。
我们可以通过 添加第三方源（PPA） 或使用 Ubuntu 官方源可用的 PHP 版本 来解决。

### 安装 software-properties-common

```bash
sudo apt update
sudo apt install software-properties-common -y
```
这个工具可以方便我们添加PPA

### 添加 PHP 官方 PPA

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt update
```

- `ondrej/php` 是 Ubuntu 社区最常用的PHP PPA，支持 PHP 7.4 ~ 8.3
- 添加之后就可以安装 PHP8.2 了

### 安装 PHP 8.2 以及常用扩展

· 安装 PHP 8.2 以及常用扩展
```bash
sudo apt install php8.2 php8.2-fpm php8.2-cli php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl php8.2-zip php8.2-bcmath -y
```

### 检查安装

```bash
php -v
php-fpm8.2 -v
```
- 显示 PHP 版本信息，确认安装成功。