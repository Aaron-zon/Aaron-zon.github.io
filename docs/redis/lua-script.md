# Lua 脚本

Lua 脚本 = 把多条 Redis 命令打包成一个原子操作，在 Redis 服务器内部一次执行完。

## 为什么需要 Lua？

假设：如果锁属于自己，就删除锁。

```java
String value = redis.get("lock");

if ("uuid123".equal(value)) {
    redis.del("lock");
}
```

这样看起来没问题，但是并发时会出现问题

A 线程：

```
GET lock
发现：
uuid123
```

此时锁过期。

B 线程：

```bash
SET lock uuid456
```

A 线程：

```
DEL lock
```

但是由于此时锁其实属于 B线程 的 `uuid456`，所以它删除的其实是 B的锁。

这就是由于 **非原子** 操作导致的问题。

## Lua 解决了什么？

把：

```
GET
判断
DEL
```

变成：

```
一次操作
```

Lua:

```Lua
if redis.call("get", KEYS[1]) == ARGV[1]
then
    return redis.call("del", KEYS[1])
else
    return 0
end
```

## Redis如何执行？

Redis:

```
收到脚本
    ↓
锁住执行
    ↓
一次执行完
    ↓
返回结果
```

期间，其他命令不能插队

所以 `GET + 判断 + DEL` 变成了 **原子操作**。

## 为什么叫 Lua？

Lua 是一种轻量级脚本语言。

Redis 内部嵌入了 Lua 解释器。

所以：

```
Redis 可以执行 Lua 代码。
```

## Java 调用

```java
DefaultRedisScript<Long> script =
        new DefaultRedisScript<>();

script.setScriptText(
        "return redis.call('get', KEYS[1])");

script.setResultType(Long.class);

redisTemplate.execute(
        script,
        Collections.singletonList("count"));
```

## 常见使用场景

**分布式锁**

判断是不是自己的锁

再删除

**秒杀**

判断库存

扣库存

生成购买资格

**限流**

一分钟只能请求10次

**抢红包**

判断金额

扣减金额

记录用户