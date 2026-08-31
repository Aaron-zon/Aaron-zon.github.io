# java

## `==` 和 eques() 有什么区别？

== 对基本类型比较的是值，对引用类型比较的是对象地址是否相同。

equals() 是方法，默认也是比较地址，但很多类会重写它来比较对象内容，比如 String。

## equals() 和 hashCode() 有什么关系。

equals() 用来判断两个值是否相等，hashCode() 用来计算对象的哈希值。

如果两个对象的 equals() 相等，那么他们的 hashCode() 必须相等。

但反过来，hashCode相等，两个值不一定相等。

## 为什么重写 equals() 的时候通常也要重写 hashCode()?

因为 HashMap、HashSet 等集合会先通过 hashCode() 定位，再通过 equals() 判断是否相等。

如果只重写 equals() 不重写 hashCode()，两个逻辑上相等的对象可能得到不同的 hashCode，导致集合无法正确判断

## String 为什么是不可变的？

String 内部的数据创建后不能修改，任何修改操作都会创建新的 String 对象。

它本质上是被 final 修饰的 Char 数组

不可变使它：

- 线程安全
- 可以使用字符串常量池
- hashCode 可以缓存
- 安全性，例如作为类加载、网络连接等参数时不能被随意修改

## String、StringBuilder、StringBuffer有什么区别？

String 不可变，每次修改都会创建新对象。

StringBuilder 和 StringBuffer 都是可变字符串，适合频繁拼接。

StringBuilder 不保证线程安全，性能更好；StringBuffer 的方法大多使用 synchronized，线程安全但性能相对低。

## String s = "hello" 和 new String("hello") 有什么区别？

```java
String s1 = "hello";
String s2 = "hello";

String s3 = new String("hello");
```

"hello" 是字符串字面量，会优先使用字符串常量池中的对象。

new String("hello") 会在堆中创建一个新的 String 对象。

```java
s1 == s2       // true
s1 == s3       // false
s1.equals(s3)  // true
```

## Java的值传递和引用传递怎么理解

Java 只有值传递，没有引用传递。传递的是对象引用的副本。

```java
void test(User user) {
    user.name = "Tom";
}
```

可以修改原对象，因为复制出来的引用仍然指向同一个对象。

但是：

```java
void test(User user) {
    user = new User();
}
```

不会改变外部变量的指向，因为修改的是引用的副本。

## Java 中 `final` 有什么用？

`final` 表示“不可改变”，具体作用取决于修饰对象。

- 变量: 不能重新赋值
- 方法：不能被子类重写
- 类：不能被继承

## `static` 有什么作用？

`static` 用来定义属于类本身而不是某个对象的成员。

## `static` 方法为什么不能直接访问非 static 成员？

因为 static 方法属于类，可以在没有创建对象的情况下调用；而非 static 成员属于具体对象。

在没有对象的情况下，static 方法不知道应该访问哪个对象的成员。

## Java 的访问修饰符

- public
- protected
- default
- private

| 修饰符         | 同类 | 同包 | 子类 | 其他包 |
| ----------- | -- | -- | -- | --- |
| `public`    | ✅  | ✅  | ✅  | ✅   |
| `protected` | ✅  | ✅  | ✅  | ❌   |
| `default`   | ✅  | ✅  | ❌  | ❌   |
| `private`   | ✅  | ❌  | ❌  | ❌   |

## 抽象类和接口有什么区别

|      | 抽象类         | 接口                           |
| ---- | ----------- | ---------------------------- |
| 继承   | 单继承         | 多实现                          |
| 成员变量 | 可以有普通变量     | 默认是 `public static final`    |
| 构造方法 | 有           | 没有                           |
| 普通方法 | 可以          | Java 8 后可以有 `default/static` |
| 使用场景 | 代码复用、抽象公共行为 | 定义规范和能力                      |

## ArrayList 和 LinkedList 有什么区别？

ArrayList 底层是动态数组，随机访问速度快，查询适合；

LinkedList 底层是双向链表，中间插入删除在已经找到节点的情况下效率较高，但随机访问慢。

|        | ArrayList | LinkedList |
| ------ | --------- | ---------- |
| 底层         | 动态数组     | 双向链表       |
| 随机访问     | 快           | 慢          |
| 查找         | 快           | 慢          |
| 中间插入删除  | 一般         | 节点定位后较快    |
| 内存占用     | 较低          | 较高         |

## ArrayList 底层是什么？

ArrayList 底层是一个动态数组，本质上是 Object[]。

## ArrayList 扩容机制是什么？

当元素数量超过当前数组容量时，ArrayList 会创建一个更大的数组，然后把原来的元素复制过去。

默认扩容大约为原容量的 1.5 倍。

## HashMap 底层数据结构是什么？

JDK 8 中，HashMap 底层主要是数组 + 链表 + 红黑树。

## HashMap 为什么使用红黑树？

当大量 Hash 冲突导致链表过长时，查询效率会从 O(1) 接近 O(n)。

转换成红黑树后，查询可以降低到 O(log n)，提高极端情况下的查询效率。

## HashMap 的 put() 流程是什么？

首先计算 key 的 hash，然后根据 hash 定位数组位置；如果位置为空，直接插入；如果发生冲突，则通过 equals() 判断 key 是否相同，相同则覆盖 value，不同则加入链表或者红黑树。超过阈值后会扩容。

## HashMap 的 get() 流程是什么？

先根据 key 计算 hash，定位数组下标；然后比较节点的 hash 和 key，找到对应节点后返回 value。如果存在哈希冲突，则继续遍历链表或者红黑树。

## HashMap 的 key 可以是 null 吗？

可以。


## HashMap、TreeMap、Hashtable、ConcurrentHashMap 有什么区别？

|            | HashMap | TreeMap  | Hashtable | ConcurrentHashMap |
| ---------- | ------- | -------- | --------- | ----------------- |
| 线程安全       | ❌       | ❌        | ✅         | ✅                 |
| 顺序         | 无序      | 按 key 排序 | 无序        | 无保证               |
| null key   | ✅       | 通常不允许    | ❌         | ❌                 |
| null value | ✅       | 通常允许     | ❌         | ❌                 |
| 典型场景       | 普通 Map  | 需要排序     | 老代码       | 并发场景              |

普通场景用 HashMap，需要排序用 TreeMap，多线程并发场景一般使用 ConcurrentHashMap，Hashtable 属于比较老的线程安全实现，现在使用较少。


## List、Set、Map 有什么区别？

- List：有序、允许重复，通过索引访问。
- Set：通常用于存储不重复的数据，不保证元素一定有序。
- Map：保存 key-value 键值对，key 通常不能重复。

## Error 和 Exception 有什么区别？

Error 表示 JVM 或系统层面的严重错误，通常程序无法恢复，比如 OutOfMemoryError。

Exception 表示程序运行过程中可以处理的异常，比如 IO 异常、空指针异常等。

> Error 不应该由业务代码主动处理，Exception 可以根据业务进行处理。

## RuntimeException 和普通 Exception 有什么区别？

RuntimeException 是运行时异常，属于非受检异常，编译器不强制要求处理。

普通 Exception 通常指 Checked Exception，编译器要求必须处理或者声明抛出。

运行时异常：

- RuntimeException
- NullPointerException
- IndexOutOfBoundsException
- ...

Checked Exception：

- IOException
- SQLException

## throw 和 throws 有什么区别？

throw 用来主动抛出一个异常对象；

```java
throw new RuntimeException("error");
```

throws 用来声明此方法可能抛出的异常。

```java
public void test() throws IOException {
}
```

## Lambda 表达式是什么？

Lambda 是 Java 8 引入的一种简洁表示函数式接口实现的语法，可以把一个函数作为参数传递。

```java
list.forEach(item -> System.out.println(item));
```

## 什么是函数式接口？

只包含一个抽象方法的接口叫函数式接口，可以使用 Lambda 实现。

## Stream 是什么？

Stream 是 Java 8 提供的一种处理集合数据的 API，可以通过声明式的方式进行过滤、转换、排序、聚合等操作。

Stream 本身不会直接修改原集合，除非你在 Lambda 中主动修改外部对象。

Stream 中间操作是惰性的，只有遇到终止操作时才会真正执行。

## synchronized 是什么？

synchronized 是 Java 提供的内置锁机制，用于保证多个线程访问共享资源时的线程安全，同时能够保证锁范围内操作的可见性和原子性。

> 简单来说：**同一时刻只能有一个线程执行被同一把锁保护的代码。**

## synchronized 可以修饰什么？

主要有三种：

- 修饰实例方法
- 修饰静态方法
- 修饰代码块

**修饰实例方法**

```
public synchronized void test() {
}
```

锁的是：当前对象的 this

**修饰静态方法**

```java
public static synchronized void test() {
}
```

锁的是：当前 Class 对象

**修饰代码块**
```java
synchronized (obj) {
    // ...
}
```

锁的是：obj

## synchronized 和 Lock 有什么区别？

synchronized 是 Java 的内置锁，使用简单，自动加锁和释放锁；

Lock 是 Java 并发包提供的显式锁，需要手动 lock() 和 unlock()，但提供了更多功能。

## 什么是Ioc

Inversion of Control，控制反转。

是一种设计思想，把对象的创建和依赖关系管理交给 Spring 容器，而不是由程序自己 new 对象。

## 什么是DI

Dependency Injection，依赖注入。

Spring 容器负责把一个对象所需要的依赖对象注入进去。

## IOC和DI的关系

IoC 是思想，DI 是 IoC 的一种具体实现方式。

```
IoC
 ↓
控制反转
 ↓
对象不自己管理依赖
 ↓
DI
 ↓
Spring把依赖注入进来
```

## Spring Bean是什么

Bean 是由 Spring IoC 容器负责创建、管理和维护生命周期的对象。

## Spring Bean的生命周期是什么

```
实例化
 ↓
属性注入
 ↓
Aware接口
 ↓
BeanPostProcessor 前置处理
 ↓
初始化
 ↓
BeanPostProcessor 后置处理
 ↓
Bean正常使用
 ↓
销毁
```

可以简单记：

```
创建
 ↓
注入
 ↓
初始化
 ↓
使用
 ↓
销毁
```
## Spring 如何创建 Bean

Spring 启动时会扫描配置和组件，找到需要管理的 Bean 定义，然后通过反射等方式实例化 Bean，进行依赖注入，再执行初始化流程，最后放入 IoC 容器中供其他对象使用。


## @Component、@Service、@Repository、@Controller 有什么区别？

本质上都是 Spring 管理 Bean 的组件注解。

区别主要是语义不同：

```
@Component
通用组件

@Service
业务逻辑层

@Repository
数据访问层

@Controller
Web控制层
```

## @Autowired 和 @Resource 有什么区别？

@Autowired 是 Spring 提供的，默认按照类型注入；

@Resource 是 Java 标准注解体系中的注解，通常优先按照名称查找，也可以结合类型。


## Spring 为什么推荐构造器注入？

- 依赖关系明确
- 可以保证依赖不为空
- 方便单元测试
- 可以使用 final
- 有助于发现循环依赖问题

构造器注入能够明确表达 Bean 的必需依赖，并且更利于不可变设计和测试。

## 什么是 Bean 的单例？

单例 Bean 指的是在同一个 Spring IoC 容器中，一个 Bean 定义通常只创建一个 Bean 实例。

## Spring 默认 Bean 是单例的吗？

是。

一个 Bean 定义在一个 Spring IoC 容器中通常只有一个实例。

## 什么是 AOP？

Aspect-Oriented Programming，面向切面编程。

它主要用于把一些与核心业务无关、但很多地方都需要的功能统一抽取出来。

如：

```
业务代码
 +
日志
 +
事务
 +
权限
 +
监控
```

可以理解成：

```
核心业务
    ↑
    │
 ┌──┴───────┐
 │   AOP    │
 └──────────┘
日志 / 事务 / 权限
```

> AOP 用于将横切关注点从业务代码中抽离出来，实现统一处理。

## AOP有哪些应用场景？

- 事务管理
- 日志记录
- 权限校验
- 接口监控
- 性能统计
- 异常处理
- 审计


## Spring AOP 是如何实现的

主要有两种：

- JDK动态代理
- CGLIB代理

简单理解：

```
调用目标方法
     ↓
代理对象
     ↓
执行前置逻辑
     ↓
目标方法
     ↓
执行后置逻辑
```

例如：

```
Controller
   ↓
Proxy
   ↓
事务
   ↓
Service
```

## 什么是代理对象？

代理对象是目标对象的一个代理，可以在不修改目标对象代码的情况下，在目标方法执行前后增加额外逻辑。

例如：

```
原来的：

Service
 ↓
method()

使用代理：

Proxy
 ↓
权限检查
 ↓
事务
 ↓
Service.method()
 ↓
日志
```

## 什么是切点 Pointcut？

Pointcut（切点）用于定义哪些方法需要被 AOP 增强。

## 什么是通知 Advice？

Advice（通知）就是具体要执行的增强逻辑。

## 什么是连接点 JoinPoint？

什么是连接点 JoinPoint？

## @Transactional 是怎么实现的？

@Transactional 本质上是通过 Spring AOP + 动态代理 实现的。

调用被 @Transactional 修饰的方法时：

```
调用 Service 方法
      ↓
代理对象
      ↓
开启事务
      ↓
执行目标方法
      ↓
正常 → 提交事务
异常 → 回滚事务
```

> Spring 通过 AOP 创建代理对象，在目标方法执行前开启事务，执行结束后根据结果提交或回滚。

## Spring 事务传播机制有哪些？

事务传播机制主要是定义：一个事务方法调用另一个事务方法时，两个方法之间如何处理事务关系。

Spring 有 7 种：
- REQUIRED
- REQUIRES_NEW
- SUPPORTS
- NOT_SUPPORTED
- MANDATORY
- NEVER
- NESTED

| 传播行为          | 含义                 |
| ------------- | ------------------ |
| REQUIRED*      | 有事务就加入，没有就创建       |
| REQUIRES_NEW*  | 不管有没有，都创建新事务       |
| SUPPORTS      | 有事务就加入，没有就非事务执行    |
| NOT_SUPPORTED | 有事务就挂起，以非事务执行      |
| MANDATORY     | 必须存在事务，否则异常        |
| NEVER         | 必须不存在事务，否则异常       |
| NESTED*        | 有事务则创建嵌套事务，没有则创建事务 |


## REQUIRED 和 REQUIRES_NEW 有什么区别？

**REQUIRED**：如果当前已经存在事务，就加入当前事务；如果不存在，就创建一个新事务。

```
A()
 ↓
事务A
 ↓
B()
 ↓
加入事务A
```

如果 B 出异常：事务A → 一起回滚

**REQUIRES_NEW**：无论当前有没有事务，都创建一个新的事务；如果外层存在事务，会先将外层事务挂起。

```
A()
 ↓
事务A
 ↓
B()
 ↓
挂起事务A
 ↓
创建事务B
```

如果 B 回滚：

```
事务B → 回滚

事务A → 可以继续执行
```

所以最重要的区别：

```
REQUIRED
→ 加入原事务

REQUIRES_NEW
→ 创建新事务
```

## @Transactional 为什么有时候会失效？

常见原因：

- **方法不是 public**：Spring AOP 默认无法正常通过这种方式进行事务代理。
- **同一个类内部调用**：没有经过 Spring 生成的代理对象，所以 AOP 不会生效。
- **异常被自己捕获了**：Spring 没有感知到异常，就可能正常提交事务。
- **异常类型不匹配**：Spring 对 RuntimeException 和 Error 回滚，对受检异常 Exception 默认不回滚。
- **方法不是 Spring Bean 管理的**

## Spring Boot 自动配置是什么？

Spring Boot 自动配置就是根据项目的依赖、配置和环境，自动创建和配置相应的 Spring Bean，减少手动配置。

> 自动配置的核心目的就是根据当前项目环境自动完成常用配置。

## @SpringBootApplication 包含哪些注解？

@SpringBootApplication 是一个组合注解，主要包含 @SpringBootConfiguration、@EnableAutoConfiguration 和 @ComponentScan。

## Spring Boot 为什么不需要大量 XML 配置？

因为 Spring Boot 大量使用了注解配置、Java Config 和自动配置机制，可以根据项目依赖自动完成大量配置。

Spring Boot 并不是完全不需要配置，而是把大量重复、固定的配置自动化了。

## Spring Boot 启动过程是什么？

```
main()
 ↓
SpringApplication.run()
 ↓
创建 SpringApplication
 ↓
准备 Environment
 ↓
创建 ApplicationContext
 ↓
加载 BeanDefinition
 ↓
自动配置
 ↓
扫描并创建 Bean
 ↓
刷新 ApplicationContext
 ↓
启动完成
```

SpringApplication.run() 启动 Spring Boot，创建并准备 ApplicationContext，然后加载配置、扫描 Bean、执行自动配置并创建 Bean，最后启动应用。



## application.yml 和 application.properties 有什么区别？

两者都是 Spring Boot 的配置文件，功能基本相同，主要区别是配置格式不同。

## 什么是索引？

索引是数据库为了提高查询效率而建立的一种数据结构，可以快速定位表中的数据。

可以理解成书的目录，没有时一页一页查，有了就可以快速定位数据位置。

## 为什么索引可以提高查询速度？

因为索引建立了额外的数据结构，可以避免每次查询都扫描整张表，而是通过索引快速定位数据。

本质上是通过额外的存储空间，换取查询速度。

## 最左匹配原则是什么？

最左匹配原则是针对联合索引而言的，查询条件会从联合索引的最左列开始匹配，不能跳过最左边的列。

例如建立：

```sql
CREATE INDEX idx_user
ON user(name, age, gender);
```

联合索引：

```
(name, age, gender)
   ↑     ↑     ↑
  最左
```

可以使用索引

```sql
WHERE name = 'Tom'

-- 或

WHERE name = 'Tom'
AND age = 20

-- 或

WHERE name = 'Tom'
AND age = 20
AND gender = 1
```

也可以

```sql
WHERE name = 'Tom'
AND gender = 1
```

这种情况下通常可以利用 name，但 gender 不能直接跳过 age 后完整利用索引。

**不能充分利用这个联合索引**

```sql
WHERE age = 20
```

因为跳过了最左边的：`name`

> 联合索引遵循从最左列开始匹配的原则，不能直接跳过最左边的列。

## 数据库隔离级别有哪些？

数据库事务有 4 种标准隔离级别：

- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

从低到高：

```
隔离性越来越强
      ↑
READ UNCOMMITTED
      ↓
READ COMMITTED
      ↓
REPEATABLE READ
      ↓
SERIALIZABLE
```


| 隔离级别             | 脏读 | 不可重复读 | 幻读 |
| ---------------- | -- | ----- | -- |
| READ UNCOMMITTED | ❌  | ❌     | ❌  |
| READ COMMITTED   | ✅  | ❌     | ❌  |
| REPEATABLE READ  | ✅  | ✅     | ❌  |
| SERIALIZABLE     | ✅  | ✅     | ✅  |

- ❌ = 可能发生
- ✅ = 可以避免

## 脏读、不可重复读、幻读是什么？

- 脏读：一个事务读取到了另一个事务尚未提交的数据。
- 不可重复读：同一个事务中，两次读取同一条数据，结果不一样。
- 幻读：同一个事务中，两次按照相同条件查询，第二次查询发现了第一次不存在的新数据。

快速区分：

```
脏读
↓
读到别人没提交的数据

不可重复读
↓
同一条数据
前后两次读取结果不同

幻读
↓
同一个查询条件
前后两次查询
记录数量发生变化
```

## Redis 为什么快？

Redis 快主要是因为它是基于内存操作，避免了大量磁盘 IO；

同时 Redis 的数据结构简单高效，大部分操作时间复杂度较低，并且采用单线程执行核心命令，避免了线程切换和锁竞争。

四个重要点：
```
内存操作
+
高效数据结构
+
单线程执行命令
+
IO 多路复用
```

## Redis 有哪些数据类型？

常见类型：

| 类型     | 常见用途      |
| ------ | --------- |
| String | 缓存、计数器    |
| List   | 消息队列、列表   |
| Set    | 去重、集合运算   |
| Hash   | 对象存储      |
| ZSet   | 排行榜、按分数排序 |

## Redis 常见应用场景？

常见场景：

- 缓存
- Session
- 分布式锁
- 计数器
- 排行榜
- 限流
- 消息队列
- 分布式 ID

> Redis 最常见的是作为缓存，也可以用于分布式锁、Session、计数器、排行榜和限流等场景。

## Redis 缓存穿透是什么？

缓存穿透是查询一个缓存和数据库中都不存在的数据，导致请求每次都绕过 Redis 直接访问数据库。

> 解决办法：缓存穿透是查不存在的数据导致请求直接打到数据库，可以通过缓存空值、布隆过滤器等方式解决。

## Redis 缓存击穿是什么？

缓存击穿是某一个热点数据突然过期，在大量并发请求同时访问这个数据时，所有请求都去访问数据库。

> 解决办法：互斥锁 / 逻辑过期 / 热点数据不过期

## Redis 缓存雪崩是什么？

缓存雪崩是大量缓存 Key 在同一时间失效，导致大量请求同时访问数据库，从而造成数据库压力过大。

> 解决办法：设置不同的过期时间(随机过期时间) / 缓存预热 / 热点数据不过期 / 限流 / 熔断降级 / 高可用 Redis

## Redis 如何实现分布式锁？

最简单的方式是使用：

```
SET key value NX EX
```

例如：

```
SET lock:order 123456 NX EX 30
```

含义：

```
NX
↓
只有Key不存在时才能设置

EX 30
↓
30秒自动过期
```

## Redis 为什么需要持久化？

因为 Redis 数据主要存储在内存中，如果 Redis 进程宕机或服务器断电，内存中的数据可能丢失，所以需要通过持久化将数据保存到磁盘。

Redis 常见两种持久化方式：

- RDB: 定期把某个时间点的内存数据生成快照保存到磁盘。
- AOF: 把 Redis 执行过的写命令记录下来，重启时重新执行这些命令恢复数据。


## 为什么需要消息队列？

消息队列主要用于异步处理、解耦、削峰填谷，让系统之间不需要直接同步调用。

```
用户下单
   ↓
订单服务
   ↓
消息队列
   ↓
┌─────────┬─────────┐
↓         ↓         ↓
库存      积分      通知
```

## RabbitMQ 和 Kafka 有什么区别？

RabbitMQ 更偏向于传统消息队列和业务消息处理，Kafka 更偏向于高吞吐量的消息流和日志处理。

|      | RabbitMQ         | Kafka             |
| ---- | ---------------- | ----------------- |
| 定位   | 消息队列             | 分布式消息流平台          |
| 吞吐量  | 较高               | 非常高               |
| 消息模型 | Exchange + Queue | Topic + Partition |
| 消费方式 | Broker 推送为主      | Consumer 主动拉取     |
| 消息顺序 | 队列内可保证           | Partition 内保证     |
| 典型场景 | 业务异步、任务队列        | 日志、数据流、大数据        |
| 消息回溯 | 能力相对弱            | 支持按 offset 回溯     |

## 什么是消息重复消费？

同一条消息被消费者处理了多次。

## 如何保证消息不重复处理？

严格来说，很难保证消息“绝对不重复投递”，实际系统通常采用“至少一次投递 + 消费端幂等”来保证业务结果不重复。

常见方法：

- 唯一业务 ID：消息携带唯一的 messageId
- 数据库唯一约束
- Redis / 数据库记录消费状态

> 消息队列通常无法保证绝对不重复消费，因此一般通过消息 ID、幂等接口、数据库唯一约束等方式保证消费端幂等。

## 什么是消息丢失？

消息已经产生，但最终没有被消费者正确处理，导致消息数据丢失。

一般可能发生在三个阶段：

```
生产者
  ↓
① MQ
  ↓
② MQ存储
  ↓
③ 消费者
```

**生产者 → MQ 丢失**

```
Producer
 ↓
MQ
```

发送失败，但生产者不知道。

**MQ → 消费者丢失**

消费者拿到消息：

```
消费消息
 ↓
还没处理成功
 ↓
直接确认 ACK
 ↓
消费者宕机
```

消息已经被确认，MQ 不会再次发送。

**MQ 自身丢失**

```
消息还在内存
 ↓
MQ服务器突然宕机
 ↓
消息没有持久化
 ↓
消息丢失
```

## 如何保证消息不丢失？

核心就是保证三个环节：

```
生产者
 ↓
可靠发送
 ↓
MQ
 ↓
持久化
 ↓
消费者
 ↓
处理成功后 ACK
```

**① 生产者**

使用：

> 发送确认机制

确保消息真正到达 MQ。

**② MQ**

开启：

> 消息持久化

防止 MQ 宕机导致消息丢失。

**③ 消费者**

> 业务处理成功之后再 ACK。

**保证消息不丢失，需要保证生产端可靠发送、MQ 持久化，以及消费者处理成功后再确认消息。**

## 什么是消息积压？

消息生产速度长期超过消费者处理速度，导致大量消息堆积在消息队列中。

常见解决方法：

- 增加消费者数量
- 提高消费者处理速度
- 增加分区/队列
- 优化业务逻辑
- 临时扩容