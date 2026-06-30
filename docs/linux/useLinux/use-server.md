# 服务器资源

## df（查看磁盘）

java项目运行一段时间后，日志会越来越多

例如：

```bash
logs/
    app.log
    error.log
    access.log
```

长此以往logs可能会高达几百G，从而导致服务器出现 `No space left on device` 空间不足。

使用 df 可以查看磁盘信息，来确认问题原因。

```bash
df -h
```

查看磁盘空间：

```
Filesystem      Size  Used Avail Use%

/dev/sda1        80G   65G   15G   82%

/dev/sda2       200G  150G   50G   75%
```

- size: 总大小
- used: 已经使用的大小
- avail: 可用大小
- use%: 使用率

Use% 超过 80% 就需要考虑清理磁盘了。

### 为什么加 -h？

不加 -h 输出的计量单位是 Byte，查看不便。

使用 -h 后，输出的单位是 GB、MB、KB 等高可读的单位。

## du（查看目录大小）

`df` 告诉你磁盘满了，但是不知道哪个目录占用了这么多空间。

而 `du` 解决了这个问题。

```bash
du
```

### 查看当前目录大小

```bash
du -sh .
```

输出示例：

```
13G .
```

### 查看 logs

```bash
du -sh logs
```

输出示例

```
8.2G logs
```

### 查看所有目录

```bash
du -h --max-depth=1
```

```
2G logs

500M upload

30M config

100K tmp
```

## free（查看内存）

```bash
free -h
```

查看服务器还有多少内存。

```
               total        used        free      shared  buff/cache   available
Mem:           3.6Gi       1.7Gi       599Mi       1.8Mi       1.6Gi       1.9Gi
```

Mem（物理内存）:

> 表示真实的内存条

- total: 总内存
- used: 已使用
- free: 完全空闲（真正什么都没放的内存）
- shared: 共享内存（多个程序共享同一块内存）
- buff/cache: 缓存和缓冲区（空着的内存拿来作为缓存）
- available: 可用内存（包括完全空闲的和本该空着但是拿去做缓存的）

## chmod（权限）

> chmod 权限 文件名

```bash
chmod 777 start.sh
```

将 start.sh 的权限设置为 777，即所有人都有读写执行权限。

- read: 4（读）
- write: 2（写）
- execute: 1（执行）

### 加执行权限

```bash
chomd +x start.sh
```

## tar（压缩、解压）


**压缩**

```bash
tar -czvf logs.tar.gz logs
```

含义：将 `logs` 压缩成 `logs.tar.gz`

**解释**

```bash
tar -zxvf logs.tar.gz
```

得到：

```
logs/
```

### 参数

- c: create 创建压缩包
- z: gzip 压缩
- v: 显示过程
- f: 指定文件名


