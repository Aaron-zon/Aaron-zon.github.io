# Volume（数据卷）

Volume 处理的是数据如何持久化的问题。

因为容器中的数据在容器中，一旦容器被删除，数据也会随之消失，所以我们需要将数据持久化。

在Container中，数据一直存在 `Writable Layer（可写层）` 

例如：

```
MySQL Container

├── mysql程序
├── 配置
├── 数据库数据  ← 在这里
└── 日志
```

Container 被删除，数据自然也被一起删除。

Volume 就是解决这个问题。

数据不放到 Container 而是放到 Volume 中，于是变成了

```
MySQL Container

↓

Volume

↓

数据库数据
```

这样就算 Container 删了，Volume 只要还在数据就不会消失。

可以理解为像U盘一样的存在。

在重新创建 Container 时，挂在 Volume，就可以直接使用之前的数据。

## Volume 可以多个 Container 共用吗？

可以，但是一般数据库不会这样，因为容易冲突。

更多用于共享文件。

```
Volume

├── Container A
├── Container B
└── Container C
```

## Docker 为什么推荐"容器无状态"？

> Container 应该是无状态的（Stateless）。

例如：

```
Container

↓

只负责：

运行代码
```

数据部分应该都存在Volume里。

数据库存在：`MySql Volume`

Redis存在：`Redis Volume`

这样即使被误删也可以重新创建。

