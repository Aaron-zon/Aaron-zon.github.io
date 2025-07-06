# Nginx 介绍

Nginx 是一个高性能的 HTTP 和反向代理服务器，并且支持邮件代理（IMAP/POP3/SMTP）。

## 正向代理和反向代理

### 正向代理

正向代理（Forward Proxy），客户端（client）通过设置通过代理服务器（proxy）去访问远程的目标服务器（server）

| client - proxy | - server

特点：
- 可以访问原来无法访问的资源（因为有的目标服务器可能是不对外开放，只对特定服务器开放）
- 做缓存加快访问速度
- 给客户端授权或记录访问信息等

## 反向代理

反向代理（Reverse Proxy）：服务器通过代理服务接收连接请求，然后再转发给内部网络的服务器，将服务器的结果返回客户端。

client - | proxy - server |

特点：
- 保证内网安全，阻止web攻击
- 负载均衡，提高服务器性能

一句话概况：代理服务器站在客户端（客户能够感知），就是正向代理；代理服务器站在服务端一边（客户不感知）就是反向代理
 
## 手动安装Nginx

设备：Centos 7

准备安装包：
- nginx：[nginx.org](https://nginx.org/)
- openssl：[openssl-library.org](https://www.openssl-library.org/)
- pcre：[pcre.org](https://www.pcre.org/)
- zlib：[zlib.net](https://www.zlib.net/)

1. 进行解压缩

```shell
tar -xvf nginx-xxx.tar.gz
tar -xvf openssl-xxx.tar.gz
tar -xvf pcre-xxx.tar.gz
tar -xvf zlib-xxx.tar.gz
```

2.下载相关依赖库

```shell
# 下载 perl 相关依赖
yum install perl perl-IPC-Cmd perl-core

# 下载  C 编译器
yum groupinstall "Development Tools" 
# 或
yum install gcc-c++

```

2.对 `openssl` 配置检查以及进行编译（其他的包也同理）

```shell
cd openssl-3.5.1

# 检查 （pcre 使用 ./configure）
./config

# 编译
make && make install

```

对应路径
- nginx: /usr/local/nginx/
    - 启动文件：/usr/local/nginx/sbin/nginx
    - 配置文件：/usr/local/nginx/conf/nginx.conf
    - 日志文件：/usr/local/nginx/logs/access.log
    - 错误日志：/usr/local/nginx/logs/error.log
    - 运行文件：/usr/local/nginx/logs/nginx.pid （存放进程ID）
    - 缓存文件：/usr/local/nginx/cache/
    - 模块文件：/usr/local/nginx/modules/
    - 临时文件：/usr/local/nginx/temp/
    - 静态文件：/usr/local/nginx/html/
