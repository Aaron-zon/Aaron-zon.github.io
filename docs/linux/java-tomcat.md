# Linux 安装java/tomcat/maven/git/Mysql/Nginx

## 安装java

```shell
# 安装java
yum install java -y

java -version
```

## 安装tomcat

```shell
# 安装tomcat
yum install tomcat -y

```

程序会安装在 `usr` 目录下（usr/share/tomcat）

### 启动与关闭

启动tomcat：`service tomcat start`

关闭tomcat：`service tomcat stop`

### 修改端口号

在`tomcat`文件夹下进入 `conf` 目录，修改`server.xml` 文件。

将`<Connector port="8080" protocol="HTTP/1.1"... />` 中的 `port` 进行修改，随后重启服务即可

```
cd /conf
```

## 安装 maven

`yum install maven`

`mvn -v`

## 安装 git

`yum install git`

## 安装 Mysql

yum 的中央仓库中没有 mysql 因此想要安装，需要先下载一个安装包（.rpm）

```shell
# 先安装 wget
yum install wget

# 下载 mysql 安装包（文件会下载到执行命令的当前目录）
# 注意这里是实验因此下载的版本可能不是你想要的，按照你想要的版本自行找链接
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm

# 加载到内存中
rpm -ivh mysql-community-release-el7-5.noarch.rpm

# 下载 mysql 服务端
yum install mysql-server

# 下载 mysql 开发包
yum install mysql-devel

# 安装 mysql 客户端
yum install mysql

# 可能会提示这个表示已经安装过了，可以忽略
# Package mysql-community-client-5.6.51-2.el7.x86_64 already installed and latest version
# Nothing to do


```

### 配置文件

进入配置文件

> vim /etc/my.cnf

```shell
# 在 [mysqld] 区块加一行编码格式
character-set-server=utf8
```

### mysql 命令

启动：`service mysql start`

停止：`service mysql stop`

重启：`service mysql restart`

进入mysql：`mysql -u root -p`

第一次进入密码为空，直接回车就可以进入

```shell
# 修改密码（这是 5.6.51 版本修改密码的方式，8版本以上有所不同）
mysql> UPDATE mysql.user SET password=PASSWORD('你的新密码') WHERE user='root';

# 刷新内存让新密码生效
mysql> FLUSH PRIVILEGES;

# 退出
mysql> quit;
```

## 安装 Nginx

```shell
yum install gcc-c++

vim /etc/yum.repos.d/nginx.repo

# 编辑模式添加内容
# 这里baseurl是下载地址，https://nginx.org/packages/ 根据系统选择（如果时RedHad则将centos改为rhel）
[nginx-stable]
name=nginx stable repo
naseurl=https://nginx.org/packages/centos/9/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
# 保存退出

# 加载创建的文件
yum install epel-release

# yum 下载 nginx
yum install nginx

# 配置文件位置在
# /etc/nginx

# 启动 nginx
service nginx start

# 配置防火墙
firewall-cmd --permanent --zone=public -add-service=http
firewall-cmd --permanent --zone=public -add-service=https
firewall-cmd --reload

# 验证（默认端口是 80）
# http://ip:80


```

## 注册为系统服务

有一些软件由于是手动编译安装，无法直接使用 `service [软件名] start` 启动，需要将软件注册为系统服务。

这里以 nginx 为例，如果是以手动编译安装那么将无法使用 `service nginx start` 启动，需要将 nginx 注册为系统服务。

1. 手动创建 Systemd 服务文件

```shell
# 创建服务文件
vim /etc/systemd/system/nginx.service

# 进入编辑模式
[Unit]
Description=The NGINX HTTP and revers proxy server
After=network.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
Restart=on-failure
RestartSec=5s
[Install]
WantedBy=multi-user.target
# 参数说明 
# PIDFile：Nginx 的进程 ID 文件路径（通常在 logs/nginx.pid）。
# ExecStart：Nginx 启动命令。
# ExecReload：Nginx 重载配置命令。
# ExecStop：Nginx 停止命令。
# 保存退出

# 重新加载Systemctl
systemctl daemon-reload

# 启动 Nginx 并设置开机自启
sudo systemctl start nginx          # 启动
sudo systemctl enable nginx         # 开机自启
sudo systemctl status nginx         # 查看状态

# 如果成功，你应该会看到：
# nginx.service - The NGINX HTTP and reverse proxy server
# Loaded: loaded (/etc/systemd/system/nginx.service; enabled; vendor preset: disabled)
# Active: active (running) since ...

# 检查 Nginx 是否正常运行
curl http://localhost

```

如果在配置前通过 ./nginx 手动启动过nginx，那么很可能在使用 systemctl 启动时失败，需要先关闭之前 nginx 所占用的进程

```shell
# 排查端口是否被占用
sudo lsof -i :80

# 输出结果
# COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
# nginx   31080   root    6u  IPv4  42489      0t0  TCP *:http (LISTEN)
# nginx   31081 nobody    3u  IPv4  54336      0t0  TCP 192.168.1.36:http->192.168.1.227:65005 (ESTABLISHED)
# nginx   31081 nobody    6u  IPv4  42489      0t0  TCP *:http (LISTEN)
# nginx   31081 nobody   10u  IPv4  54337      0t0  TCP 192.168.1.36:http->192.168.1.227:65006 (ESTABLISHED)

# 这里有两个进程 31080 和 31081
# 关闭这两个进程
sudo kill -9 31080 31081

# 启动nginx
sudo systemctl start nginx

```