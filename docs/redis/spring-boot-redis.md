---
outline: deep
---

# spring-boot-redis

[MVN REPOSITORY](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-redis)

## 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

如果使用连接池，再加：

```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

Spring Boot 3 默认使用 `Lettuce` 作为 Redis 客户端。

## 配置 Redis

application.yml

```yaml
spring:
  data:
    redis:
      host: localhost
      port: 6379
      password: 123456
      database: 0
      timeout: 3000ms
```

## 注入 RedisTemplate

```java
@Service
public class UserService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
}
```

## 操作 String

> 存

```java
redisTemplate.opsForValue().set("name", "张三");
```

> 取

```java
String name = (String) redisTemplate.opsForValue().get("name");
```

> 删除

```java
redisTemplate.delete("name");
```

> 设置过期

```java
redisTemplate.opsForValue().set("code", "123456", 5, TimeUnit.MINUTES);
```

## 操作 Hash

> 存

```java
redisTemplate.opsForHash().put("user:1", "name", "张三");

redisTemplate.opsForHash().put("user:1", "age", 20);
```

> 取

```java
// 获取 name 的值
Object name = redisTemplate.opsForHash().get("user:1", "name");

// 获取整个 user:1
Map<Object, Object> user = redisTemplate.opsForHash().entries("user:1");
```

## 操作 List

> 存

```java
redisTemplate.opsForList().leftPush("queue", "A");

redisTemplate.opsForList().leftPush("queue", "B");
```

> 弹出（弹出后会从数据中删除）

```java
Object value = redisTemplate.opsForList().rightPop("queue");
```

> 查看

```java
List<Object> list = redisTemplate.opsForList().range("queue", 0, -1);
```

## 操作 Set

> 添加

```java
redisTemplate.opsForSet().add("users", "1001");
```

> 判断

```java
Boolean exists = redisTemplate.opsForSet().isMember("users", "1001");
```

> 获取

```java
Set<Object> users = redisTemplate.opsForSet().members("users");
```

## 操作 ZSet

> 添加

```java
redisTemplate.opsForZSet().add("rank", "张三", 100);
```

> 排行榜

```java
// 获取前 10 名
Set<Object> rank = redisTemplate.opsForZSet().reverseRange("rank", 0, 10);

// 获取全部
Set<Object> rankAll = redisTemplate.opsForZSet().reverseRange("rank", 0, -1);
```

> 获取分数

```java
Double score = redisTemplate.opsForZSet().score("rank", "张三");
```

## 设置过期时间

```java
// 设置5分钟过期
redisTemplate.expire("user:1", 5, TimeUnit.MINUTES);
```

## 判断 Key 是否存在

```java
// 判断 user:1 是否存在
Boolean exists = redisTemplate.hasKey("user:1");
```

## 项目缓存

例如现在要查询员工，Redis 中有直接返回，没有的话就从数据库查询并保存到 Redis 并设置过期时间

```java

public Employee getEmpById(Long id) {
    // 制作用于查询的 Key
    String key = "employee:" + id;

    // 从 Redis 中获取数据
    Employee employee = (Employee) redisTemplate.opsForValue().get(key);

    if (employee != null) {
        return employee;
    }

    // 从数据库中获取数据
    employee = employeeMapper.selectById(id);

    // 保存到 Redis
    redisTemplate.opsForValue().set(key, employee, 5, TimeUnit.MINUTES);

    return employee;
}

```