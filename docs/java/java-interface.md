---
outline: deep
---

# 接口

接口是对功能的抽象，是一种规范，而不是具体实现。

```java
public interface Flyable {
  void fly();
}
```

- 接口之定义 **做什么**
- 不关心 **怎么做**

在没有接口时，我们通常会这么写：

```java
class Bird {
  public void fly() {}
}
```

问题：
- 强依赖具体类
- 不利于扩展
- 不利于测试

接口的目标：

- 解耦
- 扩展
- 规范

## 接口与类的区别

| 对比项     | 接口（interface） | 类（class） |
| ------- | ------------- | -------- |
| 是否能实例化  | ❌             | ✅        |
| 是否有实现   | ❌（Java8前）     | ✅        |
| 是否支持多继承 | ✅             | ❌        |
| 关注点     | 能力            | 实体       |

## 接口的基本语法

**1.定义接口**

```java
public interface PayService {
    void pay(int amount);
}
```

**2.实现接口**

```java
public class AlipayService implements PayService {
    @Override
    public void pay(int amount) {
        System.out.println("支付宝支付：" + amount);
    }
}
```

**3.使用接口**

主义这里创建的类是 **PayService**，而new的是实现PayService的 **AlipayService**

```java
PayService payService = new AlipayService();
payService.pay(100);
```

如此一来，依赖抽象，而不依赖具体实现。解耦同时也方便扩展。

在遇到因为业务需求做替换时，也不需要大规模更改仅需替换掉 new 部分的实现类即可。

## 接口的多实现

```java
public class AlipayService implements PayService {
    @Override
    public void pay(int amount) {
        System.out.println("支付宝支付：" + amount);
    }
}

public class WechatPayService implements PayService {
    @Override
    public void pay(int amount) {
        System.out.println("微信支付");
    }
}
```

使用时视情况

```java
PayService payService = new AlipayService();
payService.pay(100);
// 或
payService = new WechatPayService();
payService.pay(100);
```
- ✔ 同一接口
- ✔ 不同实现
- ✔ 运行时切换

## 接口支持多实现（类无法多继承）

```java
public interface Flyable {
  void fly();
}

public interface Swimble {
  void swit();
}

public class Duck implements Flyable, Swimble {
  @Override
  public void fly() {
    System.out.println("鸭子会飞");
  }

  @Override
  public void swit() {
    System.out.println("鸭子会游泳");
  }
}
```
接口是解决Java单继承限制的方案

## 接口中的成员

### 1.接口中的字段

```java
int SUCCESS = 0;
```

等价于

```java
public static final int SUCCESS = 0;
```

接口中定义字段等价于 **常量**，无法修改

### 2.defalut 方法

default 方法是 Java8 引入的，用于在接口中定义默认实现。

实现此接口的类可以自行实现，也可以使用默认的实现。

```java
public interface LogService {
  default void log(String msg) {
    System.out.println(msg);
  }
}
```

### 3.static 方法

静态方法在接口中定义，实现此接口的类无法调用。

```java
public interface MathUtil {
    static int add(int a, int b) {
        return a + b;
    }
}
```

调用

```java
MathUtil.add(1, 2);
```

### 4.private 方法（Java 9+）

private 方法在接口中定义，实现此接口的类无法调用。

但如果实现类调用默认的方法，默认方法可以调用 private 方法。

```java
public interface LogService {

  default void info(String msg) {
      log(msg);
  }

  private void log(String msg) {
      System.out.println(msg);
  }
}
```

## 接口 VS 抽象类

| 对比点  | 接口     | 抽象类       |
| ---- | ------ | --------- |
| 多继承  | ✅      | ❌         |
| 成员变量 | 常量     | 任意        |
| 方法实现 | Java8+ | 一直支持      |
| 构造方法 | ❌      | ✅         |
| 适用场景 | 能力规范   | 模板 / 继承体系 |

## 使用场景

### 1.Service 层 单实现

```java
public interface ShiftService {
    void arrangeShift();
}
```

```
@Service
public class ShiftServiceImpl implements ShiftService {
}
```

### 2.Service 层 多实现（@Qualifier）

> 使用 @Qualifier 注解确认使用哪个实现

**接口**
```java
public interface PayService {
    void pay();
}
```
**实现**
```java
@Service("alipay")
public class AlipayPayServiceImpl implements PayService {
    public void pay() {
        System.out.println("支付宝支付");
    }
}
```
```java
@Service("wechat")
public class WechatPayServiceImpl implements PayService {
    public void pay() {
        System.out.println("微信支付");
    }
}
```

**Controller**

```java
@RestController
public class PayController {

    @Autowired
    @Qualifier("alipay")
    private PayService payService;

    @PostMapping("/pay")
    public void pay() {
        payService.pay();
    }
}
```

### 3.Service 层 多实现（Map注入）

> Spring 会自动把所有 PayService 实现注入到 Map 中

**Controller写法**
```java
@RestController
public class PayController {

    private final Map<String, PayService> payServiceMap;

    public PayController(Map<String, PayService> payServiceMap) {
        this.payServiceMap = payServiceMap;
    }

    @PostMapping("/pay")
    public void pay(@RequestParam String payType) {
        PayService payService = payServiceMap.get(payType);
        if (payService == null) {
            throw new IllegalArgumentException("不支持的支付方式");
        }
        payService.pay();
    }
}

**Bean 名称决定 key**
```java
@Service("ALIPAY")
public class AlipayPayServiceImpl implements PayService {}
```
```java
@Service("WECHAT")
public class WechatPayServiceImpl implements PayService {}
```

### 4.Service 层 多实现（策略工厂）

> 和Map注入很像，Controller 更干净

**工厂类**
```java
@Component
public class PayServiceFactory {

    private final Map<String, PayService> payServiceMap;

    public PayServiceFactory(Map<String, PayService> payServiceMap) {
        this.payServiceMap = payServiceMap;
    }

    public PayService get(String type) {
        PayService service = payServiceMap.get(type);
        if (service == null) {
            throw new BizException("不支持的支付方式");
        }
        return service;
    }
}
```

**Controller**
```java
@RestController
public class PayController {

    private final PayServiceFactory factory;

    public PayController(PayServiceFactory factory) {
        this.factory = factory;
    }

    @PostMapping("/pay")
    public void pay(String type) {
        factory.get(type).pay();
    }
}
```


