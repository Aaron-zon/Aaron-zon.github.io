# 整体架构

```
                RabbitMQ Broker
┌──────────────────────────────────────────────┐
│                                              │
│ Producer（生产者）                            │
│                                              │
│    ↓                                         │
│                                              │
│ Exchange（交换机）                            │
│                                              │
│    ↓                                         │
│                                              │
│ Queue（队列）                                 │
│                                              │
│    ↓                                         │
│                                              │
│ Consumer（消费者）                            │
└──────────────────────────────────────────────┘
```
> RabbitMQ 的所有内容都是围绕这五个角色。

- Producer
- Exchange
- Queue
- Consumer
- Broker

## Producer（生产者）

> 发消息的人（程序）

例如：

一个电商系统，用户点击下单。

```java
rabbitTemplate.convertAndSend(
    "order.exchange",
    "order.create",
    order
);
```

Producer做了两件事情

```
发送消息

告诉 RabbitMQ：

Exchange 是谁？

RoutingKey 是什么？
```

## Exchange（交换机）

> 决定消息应该进入哪个 Queue。

它是 RabbitMQ的大脑，它负责：

```
收到消息

↓

根据规则判断

↓

转发给 Queue

↓

自己结束工作
```

例如：

当他收到

```
routingKey = order.create
```

Exchange:

```
查看绑定规则

↓

应该去

Queue A

↓

转发过去
```

他像一个领导者，决定消息应该去哪。

## Queue（队列）

> 消息仓库，存储消息的地方。

```
Queue

-------------------
订单1
订单2
订单3
订单4
订单5
-------------------
```

进入 Queue 后，即使 Consumer 不在线，消息也可以继续待在 Queue 中。

例如：

Producer发来了10000条消息，但是 Consumer 还在忙或没启动，这时这10000条数据就会先保存在 Queue。

等到 Consumer 可以正常工作了，再开始将 Queue 中的消息取出，一个一个的交给 Consumer 处理。

Queue的主要作用就是存储消息。

## Consumer（消费者）

> 处理消息的程序

例如：

订单服务收到了创建订单的请求，接下来的工作是

```
写数据库

↓

扣库存

↓

发短信

↓

结束
```

Consumer 会一直监听 Queue，只要 Queue 有消息就会：

```
Queue

↓

Consumer

↓

处理

↓

ACK（消费者告诉 RabbitMQ："这条消息我已经成功处理了，你可以把它删掉了。"）
```

## 为什么一定要 Exchange？

很多人第一次都会想：

```
Producer
↓
Queue
↓
Consumer
```

不是更简单吗？

RabbitMQ 之所以设计 Exchange，是为了 **解耦**。

假设有三个系统：订单、库存、短信

用户下单需要：创建订单、口库存、发短信

如果没有Exchange：

```
Producer

├── Queue1

├── Queue2

└── Queue3
```

Producer 必须知道：

```
三个 Queue

三个名字

三个地址
```

以后如果增加了 `积分系统`，Producer 又要修改代码。增加 `物流系统` 也要修改 Producer 的代码。

这样就形成了 **强耦合**。

有了 Exchange 后

```
Producer

↓

Exchange

├── Queue1

├── Queue2

├── Queue3

└── Queue4
```

Producer 永远只需要发送给 Exchange。

以后新增 Queue 不需要修改 Producer，Exchange 增加绑定即可。

这就是 Exchange 最大的价值：

> 发送方和接收方完全解耦，系统扩展性大大增强。

## Broker

Broker 就是整个 RabbitMQ 服务（RabbitMQ Server）



