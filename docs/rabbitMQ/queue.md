# Queue

```
Producer
    │
    ▼
Exchange
    │
    ▼
Queue
    │
    ▼
Consumer
```

## 什么是 Queue？

> Queue 的职责只有一个就是 **存储消息**，等待 Consummer 消费

它像是一个快递仓库

```
京东仓库

──────────────

📦 包裹1

📦 包裹2

📦 包裹3

📦 包裹4

──────────────
```

快递员不断放入包裹

配送员不断把包裹拿走

RabbitMQ 的 Queue 也是如此：

```
Producer
    │
    ▼
Queue

Message1

Message2

Message3

Message4

    │

Consumer
```

## Queue 是先进先出吗？

理论上是的，Queue 默认情况下是先进先出，但是也有

- 优先级队列（Priority Queue）
- 多 Consumer
- 重新入队（Requeue）

## Queue 内部结构

```
Head（队头）
↓
Message1
↓
Message2
↓
Message3
↓
Tail（队尾）
```

Producer永远尾部插入，Consumer永远头部取出

## Queue保存什么？

Queue 保存的是 Message，而一个Message不只是正文。

```
Message

├── Body（消息内容）

├── Properties（属性）

└── Headers（头）
```

创建 Queue：

```java
channel.queueDeclare(
    "order.queue", //  队列名字
    true, // durable
    false, // exclusive
    false, // autoDelete
    null // arguments
);
```

这些都是 Queue 的属性
- 队列名字
- durable
- exclusive
- autoDelete
- arguments

### Durable（持久化）

这时最重要的属性，当它为 `true` 时，表示 RabbitMQ 重启后 Queue 仍然存在。

如果为 `false`，那么当 RabbitMQ 重启后 Queue 也会消失。

在开发环境 `durable` 可以设置为 `false`，但是生产环境基本为 `true`。

注意：

Queue 持久化不代表消息就不会丢，Queue 持久化只是 Queue 这个仓库不会丢，但是里面的Message可能在重启前还在内存中，该丢还是会丢。

durable不会让消息也持久化，消息是否持久化还要看 `deliveryMode = 2`

### Exclusive（独占）

`Exclusive = true`时，这个 Queue只能被创建它的 Connection 使用。

例如：

Connection A 创建了 Queue_Test，Connection B进行访问时会被拒绝

而且当 Connection A 关闭时，Queue 会自动删除，一般用于：

- 临时 Queue
- RPC

平时开发基本为 false。

### AutoDelete（自动删除）

`autoDelete = true`时，表示当最后一个 Consumer 取消订阅后，这个 Queue 会自动删除。

## 一个 Queue 能绑定多个 Exchange 吗？

可以，例如：

```
         Direct Exchange
               │
               │
         Queue_Order
               │
               │
         Topic Exchange
```

同一个Queue可以绑定多个Exchange，只要Binding建立即可，所以Queue不是属于某一个Exchange的，而是可以同时接受多个 Exchange 消息的。


## 多个 Consumer 消费一个 Queue

一个 Queue 可以有多个 Consumer，但一个 Message 不会被多个 Consumer 拿到。

RabbitMQ 采用竞争消费，一条消息指挥投递给 Consumer。

如果想让多个消费者同时受到一条消息，正确得做法是：

```
Producer
    │
    ▼
Fanout Exchange
   ├────► Queue_A ───► Consumer_A
   ├────► Queue_B ───► Consumer_B
   └────► Queue_C ───► Consumer_C
```

不是多个 Consumer 监听同一个 Queue，而是多个 Queue 分别接收同一条消息。








