---
outline: deep
---

# 注解

注解（Annotation）是 Java 5.0 引入的，用于为 Java 代码进行注释。

它不是代码逻辑，而是元数据。是用来描述代码的代码。

```java
@Override
public String toString() {...}
```

- @Override 不会改变程序内的逻辑
- 它只是告诉 **编译器 / 框架/ 工具** 这个方法是重写父类的


**📌注解本身不执行代码**

**📌注解 + 解释机制 才有意义**

## 注解解决了什么问题

| 没有注解        | 有注解    |
| ----------- | ------ |
| XML / 配置文件多 | 配置贴近代码 |
| 硬编码、if-else | 声明式编程  |
| 不易维护        | 可读性强   |
| 框架侵入高       | 低侵入    |

Spring 能流行，注解是核心原因之一

在最初版本中Spring需要在xml文件中做大量配置，而现在我们只需要在对应类上加上注解。

## 注解的基本语法

**1.定义一个注解**

```java
public @interface MyAnnotation {
}
```

注解本质上：
- 注解 是一个特殊的接口
- 编译后是 `.class`

**2.注解使用的位置**

```java
@MyAnnotation
public class UserService {
  @MyAnnotation
  private String name;

  @MyAnnotation
  public void addUser() {
    // 业务逻辑
  }
}
```

## 元注解

元注解是用来 **修饰其他注解的注解。**

以下是常见的元注解。

### @Target（作用位置）

@Target 用于指定注解可以应用的位置。

```java
@Target(ElementType.TYPE)
public @interface MyAnnotation {
}
```

**常见值：**

| ElementType | 作用     |
| ----------- | ------ |
| TYPE        | 类 / 接口 |
| METHOD      | 方法     |
| FIELD       | 成员变量   |
| PARAMETER   | 参数     |
| CONSTRUCTOR | 构造方法   |

**📌如果不加 @Target, 那么注解可以应用在所有位置。**

### @Retention（生命周期）

@Retention 用于指定注解的生命周期，即它被修饰注解在何时生效。

```java
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
}
```

| 生命周期    | 说明               |
| ------- | ---------------- |
| SOURCE  | 只在源码中（@Override） |
| CLASS   | 编译期，JVM 不加载      |
| RUNTIME | **运行期（反射可读）**    |

**📌 Spring 注解几乎都是 RUNTIME**

### @Documented（是否生成文档）

@Documented 用于指定注解是否包含在 JavaDoc 中。

```java
@Documented
public @interface MyAnnotation {
}
```

### @Inherited（是否可继承）

@Inherited 用于指定注解是否可以被继承（仅对类有效）。

```java
@Inherited
public @interface MyAnnotation {
}
```

## 注解的属性（参数）

### 简单示例

**1.定义属性**

在注解中定义属性，就像在接口中定义方法一样。

```java
public @interface RoleCheck  {
  String role();
}
```

**2.使用属性**

```java
@RoleCheck(role = "admin")
public void addUser() {
  // 业务逻辑
}
```

### value的特殊写法

**📌如果注解只有一个属性，且属性名是 value，那么在使用时可以省略属性名。**

```java
public @interface MyAnno {
    String value();
}
```

使用时

```java
@MyAnno("admin")
public void addUser() {
  // 业务逻辑
}
```

### 默认值

**📌可以在定义属性时指定默认值。**

```java
public @interface MyAnno {
    String value() default "";
}
```

## Java 自带的常见注解

### @Override

- 编译期校验
- 放置方法名写错

### @Deprecated

```java
@Deprecated
public void oldMethod() {}
```

- 标记已过时
- IDE 会警告，提醒使用新的方法或类

### @SuppressWarnings

```java
@SuppressWarnings("unchecked")
```

- 抑制编译器警告
- 常用值：
  - `unchecked`：抑制未检查的类型转换警告
  - `rawtypes`：抑制使用原始类型警告
  - `deprecation`：抑制已过时方法警告
  - `fallthrough`：抑制 switch 语句中缺失 break 语句警告
  - `path`：抑制路径不存在警告
  - `serial`：抑制序列化警告
  - `finally`：抑制 finally 子句警告
  - `all`：抑制所有警告

















