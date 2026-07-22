# Exchange

先回顾一下架构

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

之前的章节我们知道

- Producer 不能直接发送 Queue
- Consumer 不监听 Exchange
- Exchange 不保存消息，只负责分配

Producer 把消息交给 Exchange后

> 发给谁，发几个，发那里 全部交给了 Exchange

所以

> Exchange 就是消息路由器（Router）

## Exchange 的组成

Exchange 主要有三个东西：

```
Exchange

名字(Name)

类型(Type)

绑定(Binding)
```

例如：

```
Exchange

name = order.exchange

type = direct
```

然后：

```
绑定：

Queue_A

RoutingKey=order.create

Queue_B

RoutingKey=order.pay
```

## Binding（绑定）

Binding 就是把 Exchange 和 Queue 关联起来。

```
Exchange ———— Binding ———— Queue
```

绑定时需要指定 `Binding Key`

例如：

```
Queue_Order

BindingKey

order.*
```

以后 Exchange 收到消息时，会判断消息的 `RoutingKey` 是否匹配 `BindingKey`。

```
RoutingKey

order.create
```

如上这个Routing Key

```
order.*

匹配

↓

Queue_Order
```

发现可以匹配，那么就将这个消息发送给 Queue_Order

Binding就是 **路由规则**

## Routing Key

Producer 发消息的时候会带一个 `Routing Key`

例如：

```
channel.basicPublish(
    "order.exchange",
    "order.create",
    null,
    body
);
```

这里 `order.create` 就是 `Routing Key

Exchange根据 Routing Key 和 Binding Key 决定这条消息究竟去哪个 Queue。

## 四种 Exchange

RabbitMQ 内置四种匹配机制。

```
Direct

Fanout

Topic

Headers
```

我们主要使用前三种，Headers 基本不用。

### Direct Exchange（精确匹配）

要求 **Routing Key === Binding Key**

如果 Queue_A 的 `Binding = order.create`

Producer 发送消息时 `RoutingKey = order.create`，那么它就可以进入 Queue_A。

如果 `RoutingKey = order.pay` 由于不完全匹配，所以不会进入 Queue_A。

### Fanout Exchange（广播）

不看 Routing Key，受到消息，全部发送。

受到消息后将消息发送到匹配规则为Fanout Exchange 的所有 Queue。

它适合：

- 系统通知
- 配置刷新
- 广播消息

### Topic Exchange（通配符）

这是功能性最强的匹配方式

它支持 `*` 和 `#`

其中 `*` 标识匹配一个单词。

例如：

`order.*` 可以匹配

- order.create
- order.pay

但是不可以匹配

- prder.pay.success

因为多了一级。

`#` 表示匹配多个单词。

例如：

`order.#` 可以匹配

- order.create
- order.pay
- order.pay.success
- order.xxx.yyy.zzz

### Headers Exchange

不用 Routing Key，而是根据

```
Header

color=red

type=pdf
```

匹配，性能较差，一般不用。

## 完整流程

```
Producer

      │

Message

RoutingKey

      │

      ▼

Exchange

      │

查 Binding

      │

找到 Queue

      │

投递

      ▼

Queue

      │

Consumer
```


> Exchange 是 RabbitMQ 的消息路由中心。Producer 将消息发送给 Exchange，Exchange 根据自身类型（Direct、Fanout、Topic、Headers）以及 Binding Key 和 Routing Key 的匹配关系，将消息路由到一个或多个 Queue。Exchange 自身不存储消息，只负责路由，真正存储消息的是 Queue。