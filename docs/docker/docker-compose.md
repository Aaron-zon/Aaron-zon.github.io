# Docker Compose

假设我们要创建一个商城项目，需要：

```
Spring Boot
MySQL
Redis
RabbitMQ
Nginx
```

按照之前的学习，我们需要执行：

```
docker run ...
docker run ...
docker run ...
docker run ...
docker run ...
```

每一个服务都需要对应的执行命令，并且还要配合各种版本号、参数、端口号、路径等指令。

```
docker run \
-p 3306:3306 \
-v mysql_data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
--network shop-network \
--name mysql \
mysql:8
```

而且这些还都要牢牢记住，因为一旦服务器重装还需要重新执行一遍。

> Docker Compose 正是解决了这一问题

## Docker Compose 解决什么？

> 将多个 docker run 写成一个配置文件。

从前：

```
docker run mysql

docker run redis

docker run rabbitmq

docker run springboot
```

现在：

```
compose.yaml
```

只要执行一条命令：

```bash
docker compose up
```

就可以全部启动。

**一个compose.yaml示例**

```
services:

  mysql:
    image: mysql:8
    ports:
      - "3306:3306"

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  app:
    image: shop:v1
    ports:
      - "8080:8080"
```

有格式化的配置文件，相比于繁琐的执行命令，更加清晰。

## 关键字

### services

```
services:
```

意思是包含了哪些服务。

```
services:

  mysql:

  redis:

  app:
```

这个例子中包含三个服务，分别是 MySQL、Redis 和 Spring Boot，启动时就是三个 Container。

### image

使用的Image。

```
mysql:
    image: mysql:8
```

这里表示的就是 mysql 使用的 `mysql:8` 这个 Image
### ports

使用的端口号。

```
mysql:
    ...
    ports:
        - "3306:3306"
```

它相当于：

```
docker run -p 8080:8080
```

设置了宿主机和Container的映射。

左边是宿主机，右边是Container。

### volumes

```
mysql:
    ...
    volumes:
        - mysql_data:/var/lib/mysql
```

数据库的数据持久化的地址。

- mysql_data: 表示Docker在宿主机创建了一个目录，这个目录的名字叫 mysql_data，用于存储数据
- /var/lib/mysql: 容器内的路径

注意：即便是windows系统这么写也是正常的，因为它会存在 Docker Desktop 的 Linux VM 中。

### environment

例如：

MySQL 需要密码

以前：

```
docker run -e MYSQL_ROOT_PASSWORD=123456
```

Compose：

```
mysql:
    ...
    environment:
        MYSQL_ROOT_PASSWORD: 123456
        MYSQL_DATABASE: todos
```

- MYSQL_ROOT_PASSWORD：指定密码
- MYSQL_DATABASE：指定数据库名称

### depends_on

启动顺序

```
depends_on:
    - mysql
    - redis
```

表示先启动 MySQL 再启动 Spring Boot。

### network

Compose 默认自动创建 Network

所以 Spring Boot 可以直接连接 MySQL。

## 命令

> 用于在终端执行控制 compose.yaml 的命令

### docker compose up

> 启动所有服务

```
读取compose.yaml

↓

创建Network

↓

创建Volume

↓

下载Image

↓

创建Container

↓

全部启动
```

## docker compose down

> 停止所有服务

```
停止Container

↓

删除Container

↓

删除Network
```

注意：Volume 默认不会删除

## Java项目示例

假如：有一个Spring Boot项目，需要 MySQL 和 Redis。

MySQL 和 Redis使用Docker Hub上的镜像。

### 1.Spring Boot 打包

```
mvn clean package
```

得到：

```
target/
    mail.jar
```

### 2.编写 Dockerfile

```
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/mall.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]
```

### 3.编写 docker-compose.yml

在Spring Boot项目根目录，创建 `docker-compose.yml`

```
target
Dockerfile
pom.xml
docker-compose.yml      (+)
```

编写内容：

```
services:

  mysql:
    image: mysql:8
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: mall
    ports:
      - "3306:3306"

  redis:
    image: redis:7
    container_name: redis
    ports:
      - "6379:6379"

  app:
    build: .
    container_name: mall
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - redis
```

`build .` 表示使用当前目录下的 Dockerfile 来构建镜像。

## 执行

```
docker compose up
```

