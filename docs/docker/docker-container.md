# Container 容器

Container 是 Image 的运行实例。

> 一个 Image 可以创建多个 Container 实例。

```
redis Image

├── Container1
├── Container2
├── Container3
└── Container4
```

## Container 生命周期

```
创建

↓

运行(Running)

↓

停止(Stopped)

↓

删除(Removed)
```

以 nginx 为例：

运行：

```bash
docker run nginx
```

停止：

```bash
docker stop nginx
```

继续：

```bash
docker start nginx
```

删除：

```bash
docker rm nginx
```

