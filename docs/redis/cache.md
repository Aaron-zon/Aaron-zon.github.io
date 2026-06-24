---
outline: deep
---

# 缓存

## 什么是缓存？

假设员工信息查询：

```
浏览器
    ↓
Spring Boot
    ↓
Oracle
```

数据库查询一次需要：

```
20ms ~ 100ms
```

如果同时 1000 人查询：

```
数据库压力非常大
```

于是假如 Redis：

```
浏览器
    ↓
Spring Boot
    ↓
Redis
    ↓（没有）
Oracle
```

**查询流程**

第一次

```
Redis 没有
    ↓
查询数据库
    ↓
放入 Redis
    ↓
返回结果
```

第二次：

```
Redis 有
    ↓
直接返回
```

## 缓存代码

```java
public User getUser(Long id) {

    String key = "user:" + id;

    User user = (User) redisTemplate.opsForValue().get(key);

    if (user != null) {
        return user;
    }

    user = userMapper.selectById(id);

    redisTemplate.opsForValue().set(
            key,
            user,
            30,
            TimeUnit.MINUTES);

    return user;
}
```

流程：

`先查Redis - 没有 - 查数据库 - 写Redis - 返回`

这个模式叫：

> Cache Aside Pattern（旁路缓存）

是最常见的一种模式。

## 什么时候用缓存？

适合于：
- 用户信息
- 员工信息
- 店铺信息
- 系统配置
- 字典数据
- 商品信息

不适合于：

> 实时变化的数据

- 银行余额
- 股票价格
- 实时库存

## 缓存更新策略

### 方案1：更新数据库后删除缓存（推荐）

更新数据时：

```
更新数据库
    ↓
删除Redis
```

下次查询时：

```
Redis没有
    ↓
查数据库
    ↓
重新缓存
```

**代码**

```java
userMapper.update(user);

redisTemplate.delete("user:" + user.getId());
```

### 方案2：同时更新缓存

```
更新数据库
    ↓
更新Redis
```

问题：容易数据不一致。

## 缓存命中率

假设：

10000 次请求：

```
9500次 Redis
500次 数据库
```

那么：

`命中率 = 95%`

命中率越高：

- 数据库压力越小
- 系统越快




