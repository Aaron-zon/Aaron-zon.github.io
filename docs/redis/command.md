# 常用命令

- Set [key] [value]: 存字符串
- Get [key]: 取字符串
- Del [key]: 删除字符串

- HSET [key] [field] [value]: 存hash
- HGET [key] [field]: 取hash
- HDEL [key] [field]: 删除hash
- HGETALL [key]: 取所有hash

- LPUSH [key] [value]: 存list
- LRANGE [key] [start] [end]: 取list
- LPOP [key]: 取list第一个元素
- RPOP [key]: 取list最后一个元素

- SADD [key] [value]: 存set
- SMEMBERS [key]: 取set
- SREM [key] [value]: 删除set
- SISMBERS [key] [value]: 判断是否在set中

- ZADD [key] [score] [member]: 存zset
- ZRANGE [key] [start] [end]: 取zset
- ZRANGE [key] [start] [end] WITHSCORES: 取zset, WITHSCORES 表示同时返回分数
- ZREM [key] [member]: 删除zset
- ZREVRANGE [key] [start] [end] WITHSCORES: 取start 到 end 位置的值

- KEYS * : 查看所有key
- KEYS user:*: 查看user开头的key（模糊查询）
- EXISTS [key]: 判断key是否存在
- EXPIRE [key] [seconds]: 设置过期时间
- TTL [key]: 查看剩余过期时间


- MULTI: 开启事务
- EXEC: 提交事务
- DISCARD: 取消事务

- SUBSCRIBE [channel]: 订阅频道
- PUBLISH [channel] [message]: 发布消息

- INFO memory : 查看内存信息
- INFO keyspace : 查看数据库信息
- CLIENT LIST : 查看客户端连接信息

- PING : 测试连接，正常会返回 `PONG`
- SELECT [index]: 切换数据库，默认是0号库
- FLUSHDB : 清空当前数据库
- FLUSHALL : 清空所有数据库，**生产环境极其危险**。

## Java 开发中需要掌握的命令

如果是 Spring Boot 项目，应优先掌握

```
SET
GET
DEL

EXPIRE
TTL

HSET
HGET
HGETALL

LPUSH
RPOP

SADD
SISMEMBER

ZADD
ZREVRANGE
WITHSCORES

INCR

EXISTS
```

这十几个命令基本已经覆盖：

- 登录 Token
- 验证码
- 用户缓存
- 商品缓存
- 在线用户
- 点赞功能
- 排行榜
- 消息队列
- 分布式锁
- 计数器

等绝大多数实际业务场景。