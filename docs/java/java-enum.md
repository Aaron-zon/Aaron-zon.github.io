# 枚举

**枚举** 是一种特殊的类，用来表示 **一组固定、优先、可枚举的常量**

```java
public enum Color {
  RED, GREEN, BLUE
}
```

## 枚举解决了什么问题？

在没有 enum 之前，常见的写法是：

```java
public static final int STATUS_INIT = 0;
public static final int STATUS_SUCCESS = 1;
public static final int STATUS_FAIL = 2;
```

问题：
- 可读性差（0、1、2 看不出具体意思）
- 不安全（因为可以随便传值）
- 无法约束取值范围

枚举的优势：
- 语义清晰
- 类型安全
- 编译期约束
- 易维护
- 更加规范

## 枚举的基本用法

### 1.定义枚举

```java
public enum OrderStatus {
  CREATED,
  PAID,
  SHIPPED,
  FINISHED
}
```

### 2.使用枚举

```java
OrderStatus status = OrderStatus.CREATED;
if (status == OrderStatus.PAID) {
  // 已支付逻辑
}
```

**枚举用** `==` **比较，安全且高效**

## 枚举的本质

### 1.枚举的本质是一个类

```java
public enum OrderStatus { CREATED }
```

编译后：

```java
public final class OrderStatus extends Enum<OrderStatus>
```

- 枚举是 `final`
- 枚举继承 `java.lang.Enum`
- 枚举实例时 JVM 保证的单例

### 2.枚举不能 new

```java
new OrderStatus(); // ❌ 编译错误
```

👉 枚举实例在类加载时就创建好了

## 带属性的枚举

### 1.定义带属性的枚举

```java
public enum OrderStatus {

    CREATED(0, "已创建"),
    PAID(1, "已支付"),
    SHIPPED(2, "已发货"),
    FINISHED(3, "已完成");

    private final int code;
    private final String desc;

    OrderStatus(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public int getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }
}
```

### 2.使用

```java
OrderStatus status = OrderStatus.PAID;
System.out.println(status.getCode()); // 1
System.out.println(status.getDesc()); // 已支付
```

## 枚举常用的方法

| 方法          | 说明      | 返回值类型 |
| ----------- | ------- | ---------- |
| `name()`    | 枚举名     | `String`   |
| `ordinal()` | 下标（不推荐） | `int`      |
| `values()`  | 所有枚举值   | `OrderStatus[]` |
| `valueOf()` | 根据名称获取  | `OrderStatus` |

```java
for (OrderStatus s : OrderStatus.values()) {
    System.out.println(s.name());
}
```
⚠️ 不推荐使用 `ordinal()`
👉 顺序变了会出大问题

## 枚举与 switch 结合

```java
switch (status) {
    case CREATED:
        break;
    case PAID:
        break;
    case SHIPPED:
        break;
}
```

## 枚举的高级用法

### 1.枚举 + 静态方法（根据 code 查询）
> 需求：用户传入枚举的code，返回对应的枚举

在枚举中添加 `fromCode()` 方法
```java
public static OrderStatus fromCode(int code) {
    for (OrderStatus s : values()) {
        if (s.code == code) {
            return s;
        }
    }
    throw new IllegalArgumentException("无效状态码：" + code);
}
```

使用：

```java
OrderStatus status = OrderStatus.fromCode(1);
```

### 2.枚举中定义行为（策略枚举）

```java
public enum PayType {
  ALIPAY {
    @Override
    public void pay() {
      System.out.println("支付宝支付");
    }
  },
  WECHAT {
    @Override
    public void pay() {
      System.out.println("微信支付");
    }
  };

  public abstract void pay();
}
```