---
outline: deep
---

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

## 部署 Laravel

这是一个部署laravel的项目实例

### 部署
前提条件
- 已安装 Ubuntu 24.04
- 已安装 PHP 8.2 
- 已安装 Nginx 

#### Laravel 项目放入服务器

将 Laravel 项目 `lp` 放入 `/var/www/laravel/lp` 目录下。

#### 配置 .env 站点

**1.创建 .env 文件**

进入 `lp` 目录，复制 查看是否有 `.env` 文件，如果没有，复制 `.env.example` 到 `.env`。

```bash
cd /var/www/laravel/lp
cp .env.example .env
```

**2.生成 Laravel APP_KEY**

```bash
php artisan key:generate
```

**3.在配置文件中设置好数据库连接**

```ini
DB_HOST=xxx.xxx.xxx.xxx
DB_PORT=3306
DB_DATABASE=你的库名
DB_USERNAME=你的用户
DB_PASSWORD=你的密码
```


#### 主要目录设置权限

```bash
sudo chown -R www-data:www-data /var/www/laravel/lp
sudo chmod -R 755 /var/www/laravel/lp/storage
sudo chmod -R 755 /var/www/laravel/lp/bootstrap/cache
```
（www-data 是 Nginx/Apache 的默认用户）

#### 测试运行

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

#### 配置生产环境配置文件

- 这里我们创建一个 `lp` 文件作为配置文件

```bash
sudo vim /etc/nginx/sites-available/lp
```

**为什么不用直接改 nginx.conf？**

- 可维护性强：每个站点一个文件
- 方便开启/关闭站点：只需创建或删除软链接
- 多人运维更安全：不会修改全局文件

写入

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/laravel/lp/public;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```
- 这里要注意 `80` 端口是默认端口，如果你有其他服务在监听 `80` 端口，需要先关闭或修改。
- root 后的路径要到 `public`

#### 启用站点并重启Nginx

```bash
# 创建软连接
sudo ln -s /etc/nginx/sites-available/lp /etc/nginx/sites-enabled/
# 检查配置是否正常
sudo nginx -t
# 重启 Nginx
sudo systemctl restart nginx
```

#### 访问

- 访问 `http://你的服务器IP:端口`，如果一切正常，你应该能看到 Laravel 的欢迎页面。

### 问题

**1.No input file specified.**

访问 `http://你的服务器IP:端口`，出现 `No input file specified.`

对应方法:

打开 `/etc/nginx/sites-available/lp/public` 查看是否有 `.user.ini` 文件。

如果设置了 `open_basedir`，可以先注释掉。

保存后访问 `http://你的服务器IP:端口`，如果一切正常，你应该能看到 Laravel 的欢迎页面。







