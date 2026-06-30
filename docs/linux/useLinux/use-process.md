# 进程管理

这里列举一些做线上排查经常会用到的一些命令。

## 什么是进程（Process）？

在开始前要先了解什么是进程。

当你执行：

```bash
java -jar app.jar
```

Linux会创建一个：

```
Java进程（Process）
```

其他程序也是如此：

```
Linux

├── nginx
├── mysql
├── redis
├── java ← Spring Boot
└── ssh
```

每运行一个程序，就是一个进程。

所以，Spring Boot 项目的本质就是一个 Java 进程。

## ps（查看进程）

**查看所有进程**

```bash
ps -ef
```

输出案例：

```bash
UID   PID   PPID CMD

root  1001     1 java -jar app.jar
root  1002     1 nginx
root  1003     1 redis-server
```

这里最重要的是 PID（进程编号）。

这相当于这个进程的身份编码，后需要杀死进程时也是用这个编号。

### 查看java进程

```bash
ps -ef | grep java
```

```bash
root 1001 java -jar app.jar
```

### 查看Spring Boot是否启动

例如：

```bash
java -jar demo.jar
```

不知道是否成功启动

执行：

```bash
ps -ef | grep demo
```

如果看到

```bash
java -jar demo.jar
```

说明已经启动，否则说明没有成功启动。

## top（查看资源）

如果服务器卡了，不知道哪里占用资源，可以用 top 命令查看。

```bash
top
```

输出案例:

```
PID   CPU%   MEM%

1001   95    20
1002    2     3
1003    1     5
```

> CPU% 代表CPU占有率，MEM% 代表内存占有率

占用最高的进程是 `1001`，上面的案例中这个进程是 `java` 进程，那么代表 Java 很可能出现了问题。

退出：`q`

## kill（结束进程）

java卡死了，怎么结束呢？

上面的案例中 Java 的 PID 是 1001，那么就可以用 `kill` 命令结束进程。

```bash
kill 1001
```

如果没结束，可以使用 `kill -9` 强制结束。

```bash
kill -9 1001
```

### 工作流程

例如：现在有一个 Spring Boot 项目卡死了。

**第一步：查看PID**

```bash
ps -ef | grep java
```

得到：

```
PID=1001
```

**第二部：杀死进程**

```bash
kill -9 1001
```

**第三步：重启项目**

```bash
java -jar app.jar
```

### kill 和 kill -9 有什么区别？

`kill` 是正常结束进程，`kill -9` 是强制结束进程。

```
kill

↓

通知程序：

"请退出"
```

kill 在正式退出前会进行询问。程序可以保存数据，关闭资源，也可以拒绝退出。


`kill -9` 是强制结束进程，不会询问，直接结束。

```
kill -9

↓

操作系统直接杀掉
```

所以一般先 `kill`，不行再 `kill -9`

## ss（查看端口）

以前使用 `netstat` 命令查看端口，但是现在推荐使用 `ss` 命令。


**查看监听端口**

```bash
ss -lnt
```

输出案例：

```bash
State      Recv-Q     Send-Q         Local Address:Port           Peer Address:Port     Process  

...
LISTEN     0          511                127.0.0.1:6379                0.0.0.0:*
LISTEN     0          150                        *:3306                      *:*                    
LISTEN     0          100                        *:8080                      *:*  
...
```

一般来说：

```
8080: Spring Boot
3306: MySQL
6379: Redis
```

### 查看哪个程序占用了端口

```bash
ss -lntp
```

输出案例

```bash
State      Recv-Q     Send-Q         Local Address:Port           Peer Address:Port     Process 

...
LISTEN     0          100                        *:8080                      *:*         users:(("java",pid=3977831,fd=20))
...
```

重要内容：

```
8080 users:(("java",pid=3977831,fd=20))
```

它代表的含义是：

```
8080端口

↓

Java

↓

PID

1001
```

## 运行环境案例

### Java项目启动失败

报错：

```
Port 8080 already in use
```

8080端口已经被占用。

**第一步：查看进程**

```
ss -lntp
```

查看哪个程序占用了端口

```
8080

↓

PID

1001
```

**第二步: 结束进程**

如果确认此程序可以被关闭，可以使用 kill 命令结束进程，为 Java 程序让出位置。

```bash
kill 1001
```

重新运行 Java 程序。

### CPU100%

服务器 CPU 占用率 100%时。

**第一步：top查看占用情况**

```bash
top
```

```
PID   CPU%   MEM%

1001   95    20
1002    2     3
1003    1     5
```

发现 1001 占用了95%

**第二步：查看进程所代表的程序**

```bash
ps -ef | grep 1001
```

发现是 `Java` 程序。

再结合 `jstack` 分析线程。

### Java 没启动

```bash
ps -ef | grep java
```

没有任何结果，说明程序没有运行。






