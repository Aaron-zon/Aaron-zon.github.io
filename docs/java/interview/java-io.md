---
outline: deep
---

# IO

## 什么是IO？

IO是计算机与外部设备交换数据地过程，例如读取文件、网络通信、数据库访问等。其本质是数据在不同存储介质之间传输。

Java IO 最终会通过 JVM 调用操作系统的系统调用（如 Linux 的 read/write），数据通常先进入内核缓冲区，再复制到用户空间，最后由 JVM 转换为 Java 对象。因此 IO 的本质是用户态、内核态以及硬件设备之间的数据传输。

### 用户态和内核态

假设没有权限控制，你的Java程序可以直接

```
删除硬盘
关闭网卡
修改内存
杀死操作系统进程
```

那系统早就崩了，所以操作系统把 CPU 的运行权限分为了两个级别：

- 用户态（User Mode）
- 内核态（Kernel Mode）

#### 用户态

普通应用程序运行的模式。

- Java
- Chrome
- 微信
- VSCode

都在用户态。

用户态的权限很低不能直接：

- 访问磁盘
- 访问网卡
- 访问硬盘
- 读取内核数据

例如：

```java
FileInputStream fis = new FileInputStream("a.txt");
```
你以为Java在读取文件，实际上：

```
Java 程序
|
请求操作系统
|
操作系统帮你读
```

Java 自己没有权限直接操作SSD（硬盘）

#### 内核态

操作系统核心代码运行的模式。

- Linux Kernel
- Windows Kernel

运行在内核态

权限最高，可以：

- 访问所有内存
- 控制CPU
- 控制磁盘
- 控制网卡
- 控制进程
- 控制线程

```java
Files.readString(path);
```

它的运行过程时：

```
Java
(用户态)
    ↓
系统调用
（System Call）
    ↓
Linux Kernel
(内核态)
    ↓
读SSD
    ↓
返回数据
    ↓
Java
(用户态)
```

## 常见的IO类有哪些？

### 字节流（Byte Stream）

- InputStream
- OutputStream

**子类**

- FileInputStream
- FileOutputStream
- BufferedInputStream
- BufferedOutputStream

**单位**：

```
1 Byte = 8 bit
```

**读取出来的是**：

```java
byte[]
```

如：

```java
FileInputStream fis = new FileInputStream("a.txt");
byte[] data = fis.readAllBytes();
```

**适用于**：

- 图片
- 视频
- 音频
- 压缩包
- PDF
- 网络数据

即：任何二进制数据

### 字符流

- Reader
- Writer

**子类**

- FileReader
- FileWriter
- BufferedReader
- BufferedWriter

**单位**：

```java
char
```

**读取出来是**：

```
String
char[]
```

如：

```java
FileReader reader = new FileReader("a.txt");
```

**适用于**

- 文本文件
- 日志文件
- 配置文件
- JSON
- XML
- CSV

### NIO

- Channel
- Buffer
- Selector

## 为什么会有字符流？

因为字节流只能处理二进制数据，而文本文件是字符组成的，所以需要字符流来处理。

例如：

```
中
```

UTF-8

```
E4 88 AD
```

实际上是三个字节，如果用字符流可能读取到 `E4`，根本不是完整的字符。

而字符流会自动：

```
字节
↓
解码
↓
字符
```

例如 `InputStreamReader`，内部会自动进行解码。

```
byte[]
↓
Charset
↓
char[]
```

## BIO、NIO、AIO 的区别？

| 模型  | 特点               |
| --- | ---------------- |
| BIO | 同步阻塞，一个连接一个线程    |
| NIO | 同步非阻塞，一个线程管理多个连接 |
| AIO | 异步非阻塞，完成后回调通知    |


## IO为什么慢？

在每次读取文件时，需要从用户态切换到内核态，再从内核态切换到用户态

一次读取就涉及2次切换，而读取大文件时我们往往用的是循环的方式。

```java
for (;;) {
    read();
}
```

这样频繁的IO，就会不停的切换态，产生大量的开销

**Netty、Redis为何那么快，就是因为他们尽量减少态切换。**

以减少 `内核缓冲区 ↔ 用户缓冲区` 的拷贝。


## 什么是阻塞IO，什么是非阻塞IO

> 阻塞和非阻塞，描述的是“线程在等待数据时的状态”。

### 阻塞IO（Blocking-IO）

假设你在等外卖。

```
下单
 ↓
一直站门口等
 ↓
外卖到了
 ↓
继续干别的
```

这就是阻塞。

对应代码如下：

```java
InputStream in = socket.getInputStream();

int len = in.read();
```

假设客户端还没有发数据，那么 `in.read` 会卡住，线程会一直处于 **等待** 状态，直到客户端发送数据。

流程：

```
线程
 ↓
read()
 ↓
没有数据
 ↓
阻塞
 ↓
收到数据
 ↓
继续执行
```

这就是 **BIO(Blocking IO)**

#### 阻塞IO的问题

假设 1000 个客户端连接服务器，在BIO模式下

```
客户端1 → 线程1

客户端2 → 线程2

客户端3 → 线程3

```

10000 客户端 = 10000个线程

而实际上运行过程中这10000个线程 99%的时间都在等待数据，一直在摸鱼，极大的浪费资源。

### 非阻塞IO（Non-Blocking-IO）

同样是等外卖，但这次的流程是：

```
下单
 ↓
问到了吗？
 ↓
没有
 ↓
继续打游戏
 ↓
过会再问
 ↓
没有
 ↓
继续打游戏
```

线程不会一直卡住。

对应代码如下：

```java
channel.read(buffer);
```

如果没有数据，会立即返回，线程不会阻塞。

线程可以继续，处理别的连接，执行别的人物。

```
read()
 ↓
没数据
 ↓
立即返回
 ↓
继续工作
```

#### 为什么非阻塞还不够


假设有 10000个连接。

你需要不停的文：

```
连接1有数据吗？

连接2有数据吗？

连接3有数据吗？

...
```

这叫就是轮询。CPU一定会疯掉的。

而Selector就解决了这个问题。

### Selector 解决方案

这也是一种 `NIO`，它的思想是: 

> 我不主动问，操作系统通知我

```java
selector.select();
```

系统会告诉你连接几有数据了，线程只处理有数据的连接。


## 同步IO和异步IO的区别？

很多人误以为 `非阻塞IO == 异步IO`，这是部队的。

非阻塞IO：你主动问，有没有数据？

异步IO：有数据时，系统主动通知你

区别：

```
非阻塞
=
主动轮询

异步
=
事件通知
```

## Unix支持的5种IO模型

## 同步非阻塞NIO

## NIO网络通信与IO多路复用模型

## AIO以及异步IO模型