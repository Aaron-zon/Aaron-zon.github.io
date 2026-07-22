# Connection 与 Channel

## 为什么RabbitMQ不建议每发送一条消息都建立一个TCP连接？

这其实和连接池一个道理。

每次发送消息都 `创建TCP链接 - 发送消息 - 关闭TCP连接`，请求很多时，大量的时间花在了创建TCP和关闭TCP上。

而建立TCP连接其实时很贵的，TCP不是一句话就能连的，创建它需要三次握手，关闭时需要四次挥手。

所以发送消息最耗时的可能不是数据的传输，而是创建和关闭TCP连接。

我们完全可以只连接一次：`Spring Boot - 连接RabbitMQ`

之后：

```
消息1
↓
消息2
↓
消息3
↓

……

一直复用
```

当程序关闭后，再关闭连接，这就是 **Connection**。

## 什么是Connection？

> Connection 就是一条 TCP 长连接。

```
Spring Boot
      │
      │ TCP
      ▼
RabbitMQ
```

这个连接会一直存在，不会随着一条消息发送完毕而断开，而是一直保持。

## 什么是 Channel？

> Connection 上开辟出的一个逻辑通信通道

举个栗子：

```
应用程序
     │
 TCP连接（Connection）
═══════════════════════
│   │   │   │   │
Ch1 Ch2 Ch3 Ch4 Ch5
```

程序和RabbitMQ通信时，可以理解为：

- Connection 就像一条高速公路
- Channel 就是这条高速公路上的车道

如果每次发送消息都重新建立TCP连接，代价太大，所以我们可以使用Channel来发送消息。

```
建立一次TCP连接

Connection
   │
 ├── Channel1
 ├── Channel2
 ├── Channel3
 └── Channel4

一直复用
```

所以真正传输消息的是 Channel。

类比高速公路

- Connection 是这条高速
- Channel 是车辆行走的车道
- Message 是运输的货物
- Producer/Consumer 是开车的四级或运输公司

生产者：

```
Producer

↓

Channel

↓

RabbitMQ
```

消费者：

```
RabbitMQ

↓

Channel

↓

Consumer
```

都要经由 Channel，可以说几乎所有的操作都在 Channel 上完成。

## 为什么要有多个 Channel？

假设有一个订单系统，里面有三个线程，

```
线程A

线程B

线程C
```

如果公用一个 Channel，可能就会发生下面这种情况：

```
线程A：发送订单

线程B：发送短信

线程C：发送邮件
```

大家一起争抢同一个 Channel 容易出现竞争问题，所以通常每个线程都有一个属于自己的 Channel。

## Connection 与 Channel 的关系

```
            Spring Boot

                 │

           Connection（TCP）

        ┌────────┼────────┐

        ▼        ▼        ▼

     Channel1 Channel2 Channel3

        │        │        │

        ▼        ▼        ▼

    发消息    收消息    发消息
```

## Spring Boot

我们平时使用 Spring Boot 开发时并不需要关注 `Connection`，因为Spring Boot 已经帮我们做好了。

启动时：

```
ConnectionFactory

↓

建立 Connection
```

发送消息：

```
从连接池拿一个 Channel

↓

发送

↓

归还
```

所以开发者几乎感觉不到 Connection 的存在。

这也是为什么我们日常开发中几乎只会操作 `RabbitTemplate` 和 `@RabbitListener`，而很少直接操作底层 Connection。