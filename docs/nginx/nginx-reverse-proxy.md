# Nginx 反向代理

前提：系统中已经安装好 jdk 和 tomcat，并配置好环境变量。

假设以下为安装地址：
- jdk路径：/usr/local/java/
- tomcat路径：/usr/local/tomcat/
    - 启动方式：/usr/local/tomcat/bin -> ./startup.sh
    - 停止方式：/usr/local/tomcat/bin -> ./shutdown.sh

原场景：访问 aaron4899.com 显示 /usr/local/nginx/aaron/index.html
现需求：访问 aaron4899.com 显示 tomcat 页面

步骤：

1. 打开 nginx 配置文件

```shell
cd /usr/local/nginx/conf
vim nginx.conf
```

2.修改配置文件

```conf
http {
    server {
        location / {
            # tomcat 网址路径
            # 将域名请求跳转发送到 8008 端口上
            proxy_pass http://127.0.0.1:8080;

            #...
        }
    }
}
```

3. 重启 nginx

```shell
cd /usr/local/nginx/sbin

./nginx -s reload
```

## 多tomcat分发

**进阶需求**：一台 nginx 连接多个 tomcat，当域名下对应路径不同时，分发给不同的 tomcat


- tomcat1路径：/usr/local/tomcat1/
    - 启动端口：8080
    - 关闭端口：8005
    - 其他端口：8009
- tomcat2路径：/usr/local/tomcat2/
    - 启动端口：8081
    - 关闭端口：8015
    - 其他端口：8019

以上端口通过修改 tomcat 的 server.xml 文件来配置

**修改 Nginx 配置文件**：

```conf
http {
    server {
        server_name  aaron4899.com;
        # 这里添加正则匹配 ~/tomcat1/
        # 表示访问 aaron4899.com/tomcat1/ 的时候，将请求转发给 tomcat1
        location ~/tomcat1/ {
            # 端口使用 tomcat1 的启动端口
            proxy_pass http://127.0.0.1:8080;
        }
        # 这里添加正则匹配 ~/tomcat2/
        # 表示访问 aaron4899.com/tomcat2/ 的时候，将请求转发给 tomcat2
        location ~/tomcat2/ {
            # 端口使用 tomcat2 的启动端口
            proxy_pass http://127.0.0.1:8081;
        }
    }
}
```

**重载配置**：

```shell
cd /usr/local/nginx/sbin

./nginx -s reload
```

**访问**:
- aaron4899.com/tomcat1 -> tomcat1
- aaron4899.com/tomcat2 -> tomcat2