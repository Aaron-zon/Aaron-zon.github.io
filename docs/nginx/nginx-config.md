# Nginx 配置

配置文件路径：/usr/local/nginx/conf/nginx.conf

文件内容分为三部分：
- 全局块
- events块
- http块

## 全局块

配置全局指令，如运行时用户组、进程ID存放位置、日志存放位置、worker_process数量

```conf
# 配置用户或用户组
#user  nobody;

# 允许生成的进程数
worker_processes  1;

# 配置log文件位置 可配置级别：debug | info | notice |warn | error | crit | alert | emerg

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

# 配置进程ID存放位置
#pid        logs/nginx.pid;
```

## events块

影响nginx服务器和用户网络连接的配置，如每个进程的最大连接数、选取哪种事件驱动模型，在网络连接过程中是否开启多个，是否开启序列化

```conf
events {
    # 每个进程的最大连接数 最大 1024
    worker_connections  1024;
    # ...
}
```


## http块

配置代理、缓存、日志等绝大部分功能的地方

可以嵌套不同的 server 块，这些 server 块可以对应不同的域名（在一个nginx服务器上可以支持多个域名），这种方式叫做 **虚拟主机**

**虚拟主机**：同一台 nginx 服务器，可以支持多个网站的运行，每个虚拟主机之间都相互独立



```conf
http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    # 对应虚拟主机配置
    server {
        # 监听端口
        listen       80;
        # 域名地址
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # 定位路径或文件地址
        location / {
            # 默认路径
            root   html;
            # 默认首页地址
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```

## 内网自定义域名映射

1.创建一个文件夹，并写入一个html文件

```shell
# /usr/local/nginx/
# 随便创建个文件夹
mkdir aaron

# 创建html文件

vim index.html

# 写入内容

```

2.修改配置文件

```conf
http {
    server {
        listen       80;
        # 起一个域名
        server_name  aaron4899.com;

        location / {
            root   aaron; # 指定文件夹，如果找不到可以用绝对路径 /usr/local/nginx/aaron
            index  index.html; # 访问的默认文件
        }
    }
}
```

3.检查配置文件并启动

```shell
# /usr/local/nginx/sbin/
# 检查配置文件
./nginx -t

# 重载配置
./nginx -s reload

```

4.修改客户端 `hosts` 文件

Windows：C:\Windows\System32\drivers\etc\hosts

```
# 服务器IP 域名
192.168.1.xxx aaron4899.com
```

5. 访问测试

在浏览器访问 `aaron4899.com` (注意如果客户端开了代理可能不成功)