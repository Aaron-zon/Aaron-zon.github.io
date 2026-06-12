---
outline: deep
---

# 数据类型

Redis 本事上是 `Key - Value`

Value 的类型有：

- **String**
- **Hash**
- **List**
- **Set**
- **Sorted Set**
- Stream
- ...

其中前五个是必须要掌握的

## String（最常用）

类似于 `Map<String, String>`

存储：
> Set [key] [value]

```
Set name zhangsan
```

读取：
> Get [key]

```
Get name
```

### 场景

**验证码**：

```
SET sms:13800138000 123456
EXPIRE sms:13800138000 300
```

**Token**

```
SET token:abc user1001
```

**计数器**

```
INCR login_count
```

## Hash（开发常用）

类似于 `Map<String, Object>`

例如用户：

```java
User {
    id=1
    name="张三"
    age=20
}
```

可以存：

```
HSET user:1 id 1
HSET user:1 name 张三
HSET user:1 age 20
```

查看：

```
HGETALL user:1
```

结果：

```
id=1
name=张三
age=20
```

**为什么这里不用String呢？**

```
SET user:1 "{id:1,name:'张三',age:20}"
```

似乎也能达到一样的效果。

但是进行查找和修改时就麻烦了，需要进行序列化和反序列化。

修改：

```
取出来
 ↓
反序列化
 ↓
修改
 ↓
重新存
```

而Hash可以直接 `HSET user:1 age 21`

### 场景

项目中常用的如 `用户信息`、`商品信息`、`配置项` 等都可以用Hash来存储。

**用户信息**

```bash
HSET user:1 id 1
HSET user:1 name 张三
HSET user:1 age 20
```

**产品信息**

```bash
HSET goods id 1001
HSET goods name 电脑
HSET goods price 1000
```

**配置项**

```bash
HSET config:system name redis
HSET config:system version 6.2.6
HSET config:system port 6379
```

## List

类似 `List<Object>`

从左边插入：

```
LPUSH queue A
LPUSH queue B
LPUSH queue C
```

查询：
> LRANGE [key] [start] [end]

```bash
# 查询全部
LRANGE queue 0 -1       # C B A


# 查询前两个
LRANGE queue 0 1        # C B

# 查询最后两个
LRANGE queue -2 -1      # B A
```

从右侧取：
> RPOP [key]

注意这里取得后，值会从列表中删除

```bash
RPOP queue

# 结果 A

LRANGE 0 -1

# 结果 C B
```

还有一个从右侧插入得命令，但是由于List一般做消息队列因此很少用

> RPUSH [key] [value]

```bash
RPUSH queue A  

# 结果 (integer) 3

LRANGE 0 -1

# 结果 B C A
```

### 场景

**消息队列**

```
生产者
 ↓
Redis List
 ↓
消费者
```

虽然现在更多使用：

- Redis Stream
- RabbitMQ
- Kafka

但List还是要会。

## Set

类似 `HashSet`

特点：

- 不重复
- 无顺序

添加：
> SADD [key] [value]

```bash
SADD users 1001
SADD users 1002
SADD users 1001

# 结果
# 1001
# 1002
```

自动取重。

查询：
> SMEMBERS [key]
> SISMBER [key] [value]

```bash
# 查询全部数据
SMEMBERS users

# 判断是否存在 1001
SISMBER users 1001

# 返回 1 表示存在 0 表示不存在
```

### 场景

**在线用户**

```
SADD onlineUsers user1
SADD onlineUsers user2
```

**点赞用户**

```bash
# 添加点在用户
SADD article:1:likes user1001

# 判断用户是否点赞
SISMEMBER article:1:likes user1001

# 返回 1 表示点赞 0 表示未点赞
```

## Sorted Set

简称 `ZSet`

特点：自动排序

存储：
> ZADD [key] [score] [value]

```bash
ZADD rank 100 Tom
ZADD rank 200 Jack
ZADD rank 150 Lucy
```

Redis自动排序：

```
Tom 100
Lucy 150
Jack 200
```

查询：
> ZREVRANGE [key] [start] [end] [WITHSCORES]

WITHSCORES 表示同时返回分数

```bash
# 查询前三个 同时返回分数
ZREVRANGE rank 0 2 WITHSCORES

# 结果：
# Jack 
# 200
# Lucy 
# 150
# Tom 
# 100

# 查询前三个
ZREVRANGE rank 0 2

# 结果：
# Jack 
# Lucy 
# Tom 
```

### 场景

**游戏排行榜**

`玩家 -> 分数`

**直播排行榜**

`主播 -> 热度`

**积分排行榜**

`用户 -> 积分`

