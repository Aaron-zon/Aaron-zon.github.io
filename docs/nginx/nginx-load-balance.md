# Nginx 负载均衡

负载均衡：将多个请求分配给多个服务器，从而实现高可用和高性能。是计算机横向拓展的一种方式。

客户端先到达一个 **负载均衡器**，通过 **调度算法**， 将请求分配给目标服务器。

优点：
- 通过健康检查，避免单点故障
- 当发现节点故障时，从集群中移除，保证应用的高可用性

## 负载均衡的调度算法

- 轮询：循环（从第一台服务器到最后一台服务器）依次分配请求
- 权重：轮询的基础上，可以设置权重，权重高的服务器分配的请求更多
- 最小连接：服务器的连接数在负载均衡服务器上是可以查询到的，在请求发来时，可以选择连接数最小的服务器进行分配
- ip哈希：将请求的源 IP 地址进行哈希计算，将结果作为索引，将请求分配给对应的服务器
    - 这样做的好处是，ip哈希时得到的结果是固定的，一台客户端每次请求都会访问在同一台服务器上，可以解决session问题（粘性对话）

## 负载均衡

**需求**：当访问 192.168.1.20/lb/index.html 时，通过负载均衡，让请求平均分配到 8080 和 8081 端口中。

### 轮询调度

1）分别找到两个 tomcat 的安装目录，如 `/usr/local/tomcat/webapps`
- 创建 lb 目录：mkdir lb
- 创建访问页面：cp tomcat/index.html lb
- 查看画面内容：cat lb/index.html

2）修改nginx.conf

```conf
http {
    # 配置 upstream
    upstream myserver {
        server 192.168.1.20:8080;
        server 192.168.1.20:8081;
    }

    server {
        server_name  192.168.1.20;

        # 处理负载均衡请求
        location / { 
            # 将请求映射到负载均衡器中，参数为 upstream 的名称
            proxy_pass http://myserver;
        }
    }
}
```

## 权重

如果需要额外设置权重，可以设置 `weight`，`weight` 越大权重越大，默认值是 1。

```conf
# 配置 upstream
upstream myserver {
    server 192.168.1.20:8080 weight=2;
    server 192.168.1.20:8081 weight=1;
}
```
 
## ip哈希

如果想要使用 ip哈希，可以在 **upstream** 中使用 `ip_hash`

```conf
# 配置 upstream
upstream myserver {
    server 192.168.1.20:8080;
    server 192.168.1.20:8081;
    ip_hash;
}
```