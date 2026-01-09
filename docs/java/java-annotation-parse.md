---
outline: deep
---

# 注解解析

注解本身并不执行任何逻辑，只是一个标记，真正让注解有作用的是 **解析注解** 的代码

```java
@Transactional
public void save() {...}
```

`@Transactional`是一个用于声明事务的注解，但是我们发现它并没有 begin/commit，没有任何和数据库交互的代码，那它为什么会生效呢？

答案是：事务逻辑并不在这个注解中，而是Spring框架对应的注解解析力，这个注解只是告诉Spring的注解解析，这个位置需要事务。

## 注解的工作过程

```text
你写注解
   ↓
框架扫描注解
   ↓
框架解析注解
   ↓
框架根据注解“插入/改变行为”
```

## 举个例子

**1.定义一个注解**

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface PrintLog {
}
```

**2.使用注解**

```java
public class UserService {
    @PrintLog
    public void save() {
        System.out.println("保存用户");
    }
}
```

到此位置，注解都是无用的。

**3.注解解析**

这是真正让注解有功能的地方

```java
public class AnotationParser {
  public static void main(String[] args) throws Exception {
    UserService userService = new UserService();
    Method method = service.getClass().getMethod("save");

    if (method.isAnnotationPresent(PrintLog.class)) {
      // 开始执行方法
      
      // 执行方法
      method.invoke(userService);

      // 方法执行结束
    }
  }
}
```
这一步让注解真正有了功能，我们可以在方法执行前，和执行后添加自己想要的处理。

## Spring 是如何 **联合解析注解** 的

### @Transactional 是怎么生效的

以下并不是Spring的注解解析，仅是便于理解的表达方式

```java
@Transactional
public void saveOrder() {}
```

Spring 干的事情：

```java
if (method.hasAnnotation(Transactional.class)) {
  // 开启事务
  openTransaction();
  try {
    // 执行方法
    invokeMethod();
    // 方法执行结束，提交事务
    commit();
  } catch (Exception e) {
    // 方法执行异常，回滚事务
    rollback();
  }
}
```

这和我们之前写的代码有些不同，因为Spring使用了AOP

## AOP

### 传统方式

```java
if (method.isAnnotationPresent(...)) {
    // 做事
}
```

每个方法都要写，入侵性强，不通用。

### Spring AOP的方式

```java
@Around("@annotation(PrintLog)")
public Object log(ProceedingJoinPoint pjp) {
    System.out.println("开始");
    Object result = pjp.proceed();
    System.out.println("结束");
    return result;
}
```

- @Around: 拦截所有被 @PrintLog 标记的方法，在执行前后插入逻辑。
- ProceedingJoinPoint: 封装了被拦截的方法信息。
- pjp.proceed(): 执行被拦截的方法。
- return result: 返回方法执行结果。

**AOP 的作用**：使用这种AOP的方法，不必在每个方法中写重复的代码。而是通过注解，为每一个使用该注解的方法，进行统一处理。

## 完整例子

定义一个注解 `@TimeLog` , 用于记录方法执行耗时。

**1.定义注解**

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface TimeLog {
}
```

**2.使用注解**

```java
@TimeLog
public void pay() {
    // 支付逻辑
}
```

**3.解析注解**

```java
@Aspect
@Component
public class TimeLogAspect {
    /**
     * 拦截所有被 @TimeLog 标记的方法，在执行前后插入逻辑。
     */
    @Around("@annotation(TimeLog)")
    public Object record(ProceedingJoinPoint pjp) throws Throwable {
        // 开始执行方法前，获取时间戳
        long start = System.currentTimeMillis();
        // 执行方法
        Object result = pjp.proceed();
        // 方法执行结束，获取时间戳
        long end = System.currentTimeMillis();
        // 打印方法执行耗时
        System.out.println(
            pjp.getSignature().getName() + " 耗时：" + (end - start)
        );
        return result;
    }
}
```

## 用于注解解析的注解

### @Around 拦截目标注解

> 这段代码的作用是：
> **拦截所有被 目标注解 标记的方法，在执行前后插入逻辑。**

**@Around**: 这是AOP的一种通知类型

AOP共有5种通知类型：

| 类型              | 说明             |
| --------------- | -------------- |
| @Before         | 方法执行前          |
| @After          | 方法执行后          |
| @AfterReturning | 正常返回后          |
| @AfterThrowing  | 抛异常后           |
| ⭐ @Around       | **包裹整个方法** |

@Around = 控制整个执行过程

**情况1：正常运行**
```java
@PrintLog
public void test() {
    System.out.println("业务逻辑");
}
```

执行顺序：

```
进入 @Around
↓
打印：开始
↓
执行 test()
↓
打印：业务逻辑
↓
返回到 @Around
↓
打印：结束
↓
返回调用方
```

**情况2：异常**

```java
@PrintLog
public void test() {
    throw new RuntimeException("炸了");
}
```

执行顺序：

```text
进入 @Around
↓
打印：开始
↓
执行 test()
↓
抛异常 ❌
↓
直接跳出 @Around（不会执行后面的代码）
```

### @Aspect

> @Aspect: 表示这个类是一个切面类。
> Spring 启动时会扫描它

### @Component

> @Component: 表示这个类是一个组件类。
> Spring 启动时会扫描它，将其注册为一个 Bean。