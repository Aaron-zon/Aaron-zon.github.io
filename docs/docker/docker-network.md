# Network 网络

> Network（网络）解决的是容器之前的通信问题。

假设我们有两个容器：

```
Spring Boot
Node.js
```

在没有 Docker 时，它是这样运行的：

```
Spring Boot
     │
localhost:3306
     │
MySQL
```

因为他们都运行在一台机器上，所以 java 在访问 MySql 时没有问题。

```
spring.datasource.url=jdbc:mysql://localhost:3306/demo
```

但是在使用 Docker 后

```
Container A

Spring Boot
```

```
Container B

MySQL
```

现在两个服务在不同的 Container 中，那么显然就无法直接连接了。

因为在单个 ContainerA 中，localhost 不是宿主机、不是MySQL，而是 ContainerA 本身，它无法超出自身。

所以

```
jdbc:mysql://localhost:3306/demo
```

连接的是 ContainerA 自己，而它自己又没有数据库，因此导致失败。

针对上述问题，Docker提供了Network来解决。

## Network 连接

创建一个网络 `demo-network`，然后把两个 Container 放进去。

```
demo-network

├── springboot
└── mysql
```

这时候 Docker 自动提供 DNS，于是Spring Boot 可以直接连接 Mysql。

以前：

```
spring.datasource.url=jdbc:mysql://localhost:3306/demo
```

现在：

```
spring.datasource.url=jdbc:mysql://mysql:3306/demo
```

这里 mysql 就是 Container 的名字（Container B）。

Docker 将自动解析 IP。

## 为什么不用IP？

因为IP可能会改变，为了不每次都要检查IP，所以才使用自动解析的方式。

## 宿主机如何访问 Container 中的服务？

```bash
docker run -p 3307:3306 mysql
```

以MySQL为例，通过 `-p` 命令可以映射端口，从而让宿主机访问到 MySQL。

- 3307：宿主机的端口
- 3306：容器的端口

因为要防止端口冲突，所以采用这种方式进行映射。

在宿主机可以直接通过 `localhost:3307` 访问到 MySQL。
