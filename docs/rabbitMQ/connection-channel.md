# Connection 与 Channel

## 为什么RabbitMQ不建议每发送一条消息都建立一个TCP连接？

这其实是连接池的道理。

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

## 有了 Connection 为什么还需要 Channel？




