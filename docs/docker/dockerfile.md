
# Dockerfile

> 把自己的项目制作成 Image

我们之前写的例子，Image 都是下载自 Docker Hub，我们自己也可以制作 Image 并上传到 Docker Hub。

Dockerfile 就是制作 Image 的说明书。

## Dockerfile 长什么样？

以一个 Spring Boot 项目为例：

```
demo
│
├── Dockerfile
├── pom.xml
├── target
│      demo.jar
```

Dockerfile 通常就放在项目根目录

Dockerfile 内容如下：

```dockerfile
FROM eclipse-temurin:17-jre

COPY target/demo.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

三行代码足以做出一个 Image。

**第一行：FROM**

```
FROM eclipse-temurin:17-jre
```

> 选择一个基础镜像

可以理解成：

```
Image

↓

继承
```

通过关键字 `FROM` 继承已经存在的 JDK17 Image。

**第二行：COPY**

```
COPY target/demo.jar app.jar
```

将 `target/demo.jar` 复制到 Image 里面（app.jar 是 Image 里的命名）。

**第三行：ENTRYPOINT**

```
ENTRYPOINT ["java","-jar","/app.jar"]
```

启动以后自动执行：

```bash
java -jar app.jar
```

**执行Docker build命令**

```bash
docker build -t demo:v1 .
```

流程：

```
Dockerfile

↓

读取FROM

↓

下载基础Image

↓

COPY

↓

ENTRYPOINT

↓

生成新的Image
```

最后得到 `demo:v1`，之后就可以：

```bash
docker run demo:v1
```

运行容器了。

## 常用指令

### FROM

选择基础镜像

例如：

```
FROM eclipse-temurin:17-jre
```

### COPY

复制文件

例如：

```
COPY target/demo.jar app.jar
```

### WORKDIR

设置工作目录

例如：

```
WORKDIR /app
```

之后所有的命令都在 `/app` 目录下执行

### EXPOSE

声明端口

例如：

```
EXPOSE 8080
```

注意：这不是开放端口，只是告诉别人这个程序默认使用 8080 端口。

### ENTRYPOINT

启动命令

```
ENTRYPOINT ["java","-jar","app.jar"]
```

启动时自动执行。

## 一个比较完整的 Spring Boot Dockerfile

```
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY target/demo.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
```

java 项目可以直接使用这个模板，只是需要更改 `COPY` 部分，将：

```
COPY target/xxx.jar
```

改成自己的 jar 文件名。

## Dockerfile 和 Image 的关系

```
Dockerfile
      │
docker build
      ▼
Image
      │
docker run
      ▼
Container
```







