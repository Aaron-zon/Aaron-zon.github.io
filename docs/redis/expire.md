# 过期时间

过期时间的命令是 `EXPIRE`。


## 设置过期时间

Redis 设置过期时间主要有三种方式

### 先设 Key，再设过期时间

```bash
SET code 123456
EXPIRE code 300
```

先设置 code = 123456，再为 code 设置过期时间 300 秒。300秒后自动删除。

其他类型同理

```bash
# Hash
HSET user:1 name 张三
HSET user:1 age 20

EXPIRE user:1 300

# List

LPUSH queue A
LPUSH queue B
LPUSH queue C

EXPIRE queue 60

# Set

SADD onlineUsers 1001
SADD onlineUsers 1002

EXPIRE onlineUsers 1800
```

**查看剩余时间**

```bash
TTL code
```

例如返回：

```bash
(integer) 280
```

表示还有 280 秒过期。

### 创建时直接设置过期时间（最常用）

```bash
SET code 123456 EX 300
```

含义：

- EX: 秒
- 300：300秒

**验证码、Token、登陆状态** 通常都可以这么写。

例如：

```
SET sms:1380000000 654321 EX 300
```

5分钟后验证码自动失效。

### 按毫秒设置

```bash
SET token abc PX 60000
```
含义：

- PX：毫秒
- 60000：60000毫秒，即 60s

## 取消过期时间

```bash
PERSIST key
```

例如

```bash
SET code 123 EX 60
PERSIST code
```

从时

```bash
TTL code

# 返回：-1
```
这说明已经变成永久的了。

## 修改过期时间

```bash
EXPIRE key seconds
```

```bash
EXPIRE code 600
```

重新设置为 600 秒。

## 实际应用

### 验证码

```bash
SET sms:13800138000 123456 EX 300
```

5 分钟失效。

### 登录 Token

```bash
SET token:abc user1001 EX 7200
```

2 小时失效。

### 防重复提交

```bash
SET order:lock:1001 1 EX 10 NX
```
10 秒后自动释放。

## 常见问题

### 1.Redis Key 到时间一定立即删除吗？

> 不一定

Redis采用两种机制

- 惰性删除：用户访问 Key 时发现已经过期，再删除
- 定期删除：Redis 后台线程周期性扫描过期 Key

