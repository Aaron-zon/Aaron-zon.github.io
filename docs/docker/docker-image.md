# Image 镜像

```
docker pull redis
```

这个命令的含义是从 Docker Hub 上拉取名为 Redis 的 Image。

很多人第一次救出会感到很奇怪，为什么只下载一个 Image，就能运行Redis？

因为 Image 本身就是一个完整的运行环境，它不是传统意义上的安装包 `redis.exe`

而是：

```
Redis

+
Linux运行环境

+
Redis配置

+
启动命令

+
依赖库
```

内部已经全部打包好了，只需要运行即可。

## docker pull

> docker pull 是从 Docker Hub 上拉取 Image

```bash
docker pull redis
```

运行流程：

```
Docker Hub
↓
下载
↓
redis Image
↓
保存在本地
```

这时只是下载并没有运行。

## docker run

> docker run 是运行通过 Image 创建 Container 并运行 Container。

```
Image
↓
创建Container
↓
创建可写层
↓
启动Redis
↓
Container Running
```

## 版本控制

在下载 Image 是可以选择版本

如：

```bash
docker pull redis:6.2.5
```

其中 `:` 后面叫 Tag，表示版本。

## 存放位置

Linux默认：

```
/var/lib/docker
```

不过一般不用进去 Docker 自己管理。

## Image 生命周期

```
Docker Hub
↓
docker pull
↓
Image（本地）
↓
docker run
↓
Container
↓
docker stop
↓
docker start
↓
docker rm
↓
Container删除
↓
Image仍然存在
```

