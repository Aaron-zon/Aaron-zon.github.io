# 分布式锁

在分布式系统中，保证 **同一时刻只有一个线程/服务在执行某段代码**。

## 为什么需要分布式锁？

以购物为例，单机时代没有问题，因为每次售卖都可以锁住之后再扣库存。

```java
synchronized (obj) {
    扣库存
}
```

但是分布式时，就变成了多个服务同时访问一个商品库存。

```
服务A
服务B
服务C
```

```
商品1001库存 = 1
```

当这些服务同时访问一个商品库存。

```
A: 扣库存
B: 扣库存
C: 扣库存
```

如果没有锁，就会产生超卖问题。

## Redis 分布式的核心思想

在 Redis 中，使用 `Key 是否存在` 来控制并发

### 最常见的实现（注意这个虽然常见但是是错误的）

在Redis添加一个锁：

```
SET lock:order 1
```

判断：
- 有锁：不执行
- 无锁：执行

但因因为 `非原子` 操作，所以会问题。

> 非原子: 这一步操作不是一次性完成的，中间可能被插队。

### 正确实现

加锁（原子操作）

```bash
SET lock:order 123 NX EX 30
```

| 参数    | 含义     |
| ----- | ------ |
| NX    | 不存在才设置 |
| EX 30 | 30秒过期  |
| 123   | 当前线程标识 |

返回结果：

- OK     → 抢锁成功
- nil    → 抢锁失败


**java**

```java
Boolean success = redisTemplate.opsForValue().setIfAbsent("lock:order:1001", "uuid-123", 30, TimeUnit.SECONDS);

if (success) {
    try {
        reduceStock();
    } finally {
        redisTemplate.delete("lock:order:1001");
    }

}
```