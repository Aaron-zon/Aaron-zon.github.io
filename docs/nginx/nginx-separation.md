# Nginx 动静分离

动态资源和静态资源分开，请求来时通过判断请求的资源类型，如果请求的是静态资源，则访问静态资源目录，如果是请求动态资源则通过负载均衡分配服务器。

## 实现方式

- （推荐）单独将静态文件放在单独的服务器及独立的域名下
- 将动态资源和静态资源混合在一起，通过 nginx 来分开。

**需求**：访问图片等静态资源时，可以直接从 nginx 中获取，访问 jsp 等动态资源时，通过 tomcat 返回结果

**处理流程**

1） 准备动态资源，在 `/usr/local/tomcat/webapps` 中 创建动态资源 index.jsp

2) 准备静态资源，创建 `/usr/local/nginx/image`，存放静态资源 test.png

3） nginx.conf 中配置动静分离

```conf
server {
    upstream myserver {
        server 192.168.1.20:8080;
        server 192.168.1.20:8081;
    }

    # 动态资源配置
    location ~.*.jsp$ {
        proxy_pass http://myserver;
    }

    # 静态资源配置
    location ~.*\.(git|jpg|png|css)$ {
        root /usr/local/nginx/image;
        # 缓存时间 
        # 3d：表示三天之内从浏览器缓存中直接读取，不会从服务器上获取
        expires 3d
    }
}

```