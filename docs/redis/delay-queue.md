---
outline: deep
---

# 延迟队列

任务现在不能执行，要等一段时间之后再执行。

## 什么是延迟队列？

普通队列：

```
生产者
   ↓
队列
   ↓
消费者立即消费
```

延迟队列

```
生产者
   ↓
延迟队列
   ↓（等待）
到时间
   ↓
消费者执行
```

### 实际业务场景

**1.订单超时取消**

淘宝下单：`16:00 下单`

要求：`30分钟未支付就自动取消`

流程：

```
订单创建
    ↓
放入延迟队列
    ↓
30分钟后
    ↓
检查支付状态
    ↓
取消订单
```

**2.优惠卷过期**

领取优惠卷，7天后自动失效

**3.会议提醒**

会议时间 `10:00`，在 `9:50` 发送通知提醒

**4.验证码失效**

验证码5分钟后删除。

但实际上这个很多直接设置过期时间，不一定用队列。

## 实现方式

Redis 通常利用 `ZSet` 来实现延迟队列。

例如：

> ZADD [key] [score] [member]

```bash
ZADD order_delay 1750755600 order:1001
```

- score: 时间戳
- member: 任务

这里我们已经设置好了时间和任务，接下来Java端会有一个消费者进程一直在读秒。

每隔一段时间会读取当前 `时间戳`，然后和Redis中的 `时间戳` 做比对，小于等于当前 `时间戳` 就会执行对应的 `任务`。

注意，这里还有一个重要命令

> ZRANGEBYSCORE key min max

这个命令的意思是

> 查询 ZSet 中 score 在 min ~ max 范围内的成员

这使消费者可以快速地找到需要执行的任务。


在 java 中获取当前时间

```java
long now = System.currentTimeMillis();
```

然后查询：

```
ZRANGEBYSCORE delay_queue 0 now
```

这样就会找到从 0 ~ 当前时间的所有的任务。

例如：

```
order:1001
order:1002
```

然后

```
ZREM delay_queue order:1001
```

取消订单。

### 流程图

```
创建订单
     ↓
ZADD
     ↓
Redis ZSet

后台线程
     ↓
ZRANGEBYSCORE
     ↓
到期任务
     ↓
处理任务
     ↓
ZREM
```

### Java 示例

> 加入

```java
long executeTime = System.currentTimeMillis() + 30 * 60 * 1000;

redisTemplate.opsForZSet().add("delay_queue", "order:1001", executeTime)
```

> 消费

```java
// 获取当前时刻要执行的任务
Set<Object> tasks = redisTemplate.opsForZSet().rangeByScore("delay_queue", 0, System.currentTimeMillis());

...

// 删除Redis中要清除的订单
for (Object task : tasks) {
    redisTemplate.opsForZSet().remove("delay_queue", task);
}
```

## 延迟队列的缺点

**1.需要轮询**

```java
while(true) {
    Thread.sleep(1000);
}
```

每秒检查一次。

**2.大量任务效率一般**

百万任务，Redis压力增大

**3.不能保证绝对实时**

可能：

```
16:30:00到期
16:30:01执行
```

## 更专业的方案

大型系统可能使用：

- RabbitMQ 延迟队列
- RocketMQ 延迟消息
- Kafka 延迟消息

## 什么时候适合使用 Redis

适合 几千、几万、十几万条数据时，这种数据不是特别大的时候。

例如：

- 超时订单
- 自动取消
- 定时通知
- 自动审核

不适合
- 几千万条数据
- 高精度定时
- 复杂调度