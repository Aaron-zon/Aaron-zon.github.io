---
outline: deep
---

# 查询


## pwd（当前目录）

查看当前所在目录

```bash
$ pwd

/home/arron/project
```

表示当前在

```
/
└── home
    └── aaron
        └── project   ← 当前目录
```

## ls（查看）

查看当前目录下的内容，这是使用频率最高的命令

```bash
$ ls

app.jar
logs
config
README.md
```

表示当前目录有

```
project
├── app.jar
├── logs
├── config
└── README.md
```

### 常用参数

#### -l

查看详细信息

```bash
ls -l
```

输出

```bash
-rw-r--r-- 1 root root 1234 Dec 14 08:05 app.jar
drwxr-xr-x 2 root root 4096 Dec 14 08:05 logs
```

会显示：

- 权限
- 所有人
- 大小
- 修改时间

#### -a

显示隐藏文件

```bash
ls -a
```

Linux 中

- .git
- .bashrc
- .profile

这些都是隐藏文件，-a 参数可以显示它们。

#### -la

这是最常用的。

相当于 `-l + -a`，输出详细信息和隐藏文件。

## cd（进入目录）

进入目录

```
project
├── logs
├── config
└── app.jar
```

当我们想要进入 `logs` 目录时，可以使用

```bash
cd logs
```

### 返回上一级

```bash
cd ..
```

会回到 `project`

### 返回用户目录

```bash
cd ~
```

会回到

```
/home/用户名
```

### 返回刚刚所在目录

```
cd -
```

## cat（查看文件）

查看文件

例如：

```
config.yml
```

内容：

```yaml
server:
    port: 8080
```

执行：

```bash
cat config.yml
```

输出

```
server:
    port: 8080
```

cat 不适合大文件，通常适合查看配置一类的小文件。

如果有一个500MB的log文件使用cat进行查看，内容将会直接刷满整个终端，因此 **日志不要用cat**。

### 查看多个文件

```bash
cat a.txt b.txt
```

连续输出。

## less（分页查看）

分页查看。

开发查看日志比较常用的命令。

```bash
less app.log
```

打开以后会显示第一屏，可以通过

```
↓
↑
PageDown
PageUp
```

控制翻页

使用 `q` 进行 **退出**。

### 搜索

在 less 中输入：

```bash
/Exception
```

回车后，会自动跳转到第一个匹配项。

继续找可以使用 `n`，反向搜索可以使用 `Shift + n`。

## tail（查看尾页）

查看最后几行

同样是开发常用的命令。

例如：

```
app.log
```

我们想查看日志的最后 10 行：

```bash
tail app.log
```

查看最后一百行：

```bash
tail -100 app.log
```

### 实时监控

```bash
tail -f app.log
```

当程序正在运行时，可以实时监控程序的运行：

```
10:01 启动
10:02 登录
10:03 下单
10:04 支付
```

新的日志会不断输出。

停止：

```bash
Ctrl + C
```

## grep（文件内容搜索）

对文件里面的内容进行搜索。

例如有一个日志 `app.log`：

```
app.log

2026-06-30 INFO  Server Start
2026-06-30 INFO  Login Success
2026-06-30 ERROR NullPointerException
2026-06-30 INFO  Order Success
2026-06-30 ERROR Timeout
```

如果想找所有的 `ERROR` 日志，可以使用：

```bash
grep ERROR app.log
```

输出：

```
2026-06-30 ERROR NullPointerException
2026-06-30 ERROR Timeout
```

### 关键字搜索

```
grep ERROR app.log
```

### 忽略大小写

我想搜索

```
error
ERROR
Error
```

可以使用 `-i`:

```bash
grep -i ERROR app.log
```

### 显示行号

```bash
grep -n ERROR app.log
```

输出：

```
3: ERROR NullPointerException
5: ERROR Timeout
```

第 3 行、第 5 行。

### 递归搜索

`-r` 在整个目录下进行搜索。

```bash
grep -r "Redis" .
```

表示搜索当前目录所有文件中包含 `Redis` 的行。

### tail + grep

`tail -f` 可以实时查看日志，但当日志太多

```
INFO
INFO
INFO
INFO
ERROR
INFO
```

而只想查看ERROR时，可以使用 grep 进行过滤

```bash
tail -f app.log | grep ERROR
```

监听时只会输出 ERROR 的日志。

## |（管道）

管道符，用于连接两个命令，将前一个命令的输出作为后一个命令的输入。

这有点类似链式调用。

```bash
tail -f app.log | grep ERROR
```

## find（搜索文件）

`find` 和 `grep` 的区别是，`find` 是搜索文件，而 `grep` 是搜索文件中的内容。

```
project
├── logs
│      app.log
├── config
│      application.yml
└── test.java
```

当我们想要找到 `application.yml` 文件时，可以使用：

```bash
find . -name "applicaion.yml"
```

输出：

```
./config/application.yml
```

这里的 `.` 表示当前目录。也可以使用绝对路径。

```bash
find /home/project -name "application.yml"
```

### 查找所有日志

```bash
find . -name "*.log"
```

输出

```
./logs/app.log
./logs/error.log
```

### 查找目录

```
find . -name logs
```

文件目录都会找出来。

如果只找目录

```bash
find . -type d -name logs
```

如果只找文件

```bash
find . -type f -name logs

find . -type f -name "*.logs"
```








