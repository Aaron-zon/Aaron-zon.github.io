---
outline: deep
---

# Java 工具类

## 工具类概述

工具类是一种提供静态方法和静态常量的类，用于封装通用的业务逻辑或工具方法，方便在程序中重复使用。工具类通常具有以下特点：

- 通常包含静态方法和静态常量
- 构造方法被私有化，防止被实例化
- 类名通常以 `Util` 或 `Helper` 结尾
- 方法通常是静态的，无需创建对象即可调用
- 方法通常是无状态的，不依赖对象的状态

## 常用内置工具类

### 1. java.lang.Math

`Math` 类提供了各种数学运算方法和常量。

```java
import java.lang.Math;

public class MathExample {
    public static void main(String[] args) {
        // 常量
        System.out.println("π: " + Math.PI);
        System.out.println("自然对数的底e: " + Math.E);
        
        // 基本运算
        System.out.println("绝对值: " + Math.abs(-10));
        System.out.println("向上取整: " + Math.ceil(3.14));
        System.out.println("向下取整: " + Math.floor(3.14));
        System.out.println("四舍五入: " + Math.round(3.5));
        System.out.println("平方根: " + Math.sqrt(16));
        
        // 指数和对数
        System.out.println("e的x次方: " + Math.exp(2));
        System.out.println("自然对数: " + Math.log(Math.E));
        System.out.println("以10为底的对数: " + Math.log10(100));
        
        // 三角函数（弧度制）
        System.out.println("sin(π/2): " + Math.sin(Math.PI/2));
        System.out.println("cos(π): " + Math.cos(Math.PI));
        System.out.println("tan(π/4): " + Math.tan(Math.PI/4));
        
        // 角度转换
        System.out.println("角度转弧度: " + Math.toRadians(90));
        System.out.println("弧度转角度: " + Math.toDegrees(Math.PI/2));
        
        // 随机数（0.0到1.0之间的随机double值）
        System.out.println("随机数: " + Math.random());
    }
}
```

### 2. java.util.Arrays

`Arrays` 类提供了对数组进行操作的静态方法。

```java
import java.util.Arrays;

public class ArraysExample {
    public static void main(String[] args) {
        int[] arr = {5, 2, 8, 1, 9, 3};
        
        // 数组排序
        Arrays.sort(arr);
        System.out.println("排序后的数组: " + Arrays.toString(arr));
        
        // 数组二分查找（必须先排序）
        int index = Arrays.binarySearch(arr, 5);
        System.out.println("元素5的索引: " + index);
        
        // 数组填充
        int[] filledArr = new int[5];
        Arrays.fill(filledArr, 10);
        System.out.println("填充后的数组: " + Arrays.toString(filledArr));
        
        // 数组比较
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {1, 2, 3};
        System.out.println("数组是否相等: " + Arrays.equals(arr1, arr2));
        
        // 数组复制
        int[] copiedArr = Arrays.copyOf(arr, arr.length);
        System.out.println("复制后的数组: " + Arrays.toString(copiedArr));
        
        // 数组转列表
        java.util.List<Integer> list = Arrays.asList(1, 2, 3);
        System.out.println("数组转列表: " + list);
    }
}
```

### 3. java.util.Collections

`Collections` 类提供了对集合进行操作的静态方法。

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsExample {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(5);
        list.add(2);
        list.add(8);
        list.add(1);
        
        // 集合排序
        Collections.sort(list);
        System.out.println("排序后的集合: " + list);
        
        // 集合反转
        Collections.reverse(list);
        System.out.println("反转后的集合: " + list);
        
        // 查找最大值
        System.out.println("最大值: " + Collections.max(list));
        
        // 查找最小值
        System.out.println("最小值: " + Collections.min(list));
        
        // 集合填充
        List<String> emptyList = new ArrayList<>(5);
        Collections.fill(emptyList, "Java");
        System.out.println("填充后的集合: " + emptyList);
        
        // 打乱顺序
        Collections.shuffle(list);
        System.out.println("打乱后的集合: " + list);
        
        // 线程安全包装
        List<Integer> synchronizedList = Collections.synchronizedList(new ArrayList<>());
        
        // 不可修改集合
        List<Integer> unmodifiableList = Collections.unmodifiableList(list);
    }
}
```

### 4. java.util.Objects

`Objects` 类提供了操作对象的静态方法，主要用于空值安全的操作。

```java
import java.util.Objects;

public class ObjectsExample {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = null;
        
        // 空值检查
        System.out.println("str1是否为null: " + Objects.isNull(str1));
        System.out.println("str2是否为null: " + Objects.isNull(str2));
        System.out.println("str1是否非null: " + Objects.nonNull(str1));
        
        // 空值安全的toString
        System.out.println("str1的toString: " + Objects.toString(str1));
        System.out.println("str2的toString: " + Objects.toString(str2, "默认值"));
        
        // 空值安全的equals
        System.out.println("str1和str2是否相等: " + Objects.equals(str1, str2));
        
        // 计算哈希码
        System.out.println("str1的哈希码: " + Objects.hashCode(str1));
        System.out.println("str2的哈希码: " + Objects.hashCode(str2));
        
        // 比较大小
        System.out.println("比较1和2: " + Objects.compare(1, 2, Integer::compare));
        
        // 非空断言
        try {
            Objects.requireNonNull(str2, "str2不能为null");
        } catch (NullPointerException e) {
            System.out.println("捕获到异常: " + e.getMessage());
        }
    }
}
```

### 5. java.util.StringJoiner

`StringJoiner` 类用于拼接字符串，支持指定分隔符、前缀和后缀。

```java
import java.util.StringJoiner;
import java.util.stream.Collectors;
import java.util.Arrays;

public class StringJoinerExample {
    public static void main(String[] args) {
        // 基本用法
        StringJoiner joiner = new StringJoiner(", ", "[", "]");
        joiner.add("Java");
        joiner.add("Python");
        joiner.add("C++");
        System.out.println("拼接结果: " + joiner.toString());
        
        // 使用Stream API结合StringJoiner
        String[] languages = {"Java", "Python", "C++"};
        String result = Arrays.stream(languages)
                .collect(Collectors.joining(", ", "[", "]"));
        System.out.println("Stream拼接结果: " + result);
    }
}
```

### 6. java.util.Base64

`Base64` 类用于Base64编码和解码。

```java
import java.util.Base64;

public class Base64Example {
    public static void main(String[] args) {
        String originalInput = "Hello, Base64!";
        
        // 编码
        String encodedString = Base64.getEncoder().encodeToString(originalInput.getBytes());
        System.out.println("编码结果: " + encodedString);
        
        // 解码
        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
        String decodedString = new String(decodedBytes);
        System.out.println("解码结果: " + decodedString);
        
        // URL安全的Base64编码
        String url = "https://example.com/path?param=value&another=123";
        String urlEncoded = Base64.getUrlEncoder().encodeToString(url.getBytes());
        System.out.println("URL编码结果: " + urlEncoded);
        
        // MIME编码（多行）
        String longString = "A".repeat(100);
        String mimeEncoded = Base64.getMimeEncoder().encodeToString(longString.getBytes());
        System.out.println("MIME编码结果: " + mimeEncoded);
    }
}
```

### 7. java.time 包（日期时间工具）

Java 8引入的日期时间API，提供了丰富的日期时间处理工具类。

```java
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class DateTimeExample {
    public static void main(String[] args) {
        // 获取当前日期和时间
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        LocalDateTime currentDateTime = LocalDateTime.now();
        
        System.out.println("当前日期: " + currentDate);
        System.out.println("当前时间: " + currentTime);
        System.out.println("当前日期时间: " + currentDateTime);
        
        // 日期时间格式化
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);
        System.out.println("格式化后的日期时间: " + formattedDateTime);
        
        // 解析日期时间字符串
        LocalDateTime parsedDateTime = LocalDateTime.parse("2023-01-01 12:00:00", formatter);
        System.out.println("解析后的日期时间: " + parsedDateTime);
        
        // 日期时间加减
        LocalDate nextWeek = currentDate.plus(1, ChronoUnit.WEEKS);
        System.out.println("下周日期: " + nextWeek);
        
        LocalDate lastMonth = currentDate.minusMonths(1);
        System.out.println("上月日期: " + lastMonth);
        
        // 计算日期差
        long daysBetween = ChronoUnit.DAYS.between(parsedDateTime.toLocalDate(), currentDate);
        System.out.println("日期差: " + daysBetween + "天");
    }
}
```

## 自定义工具类

### 自定义工具类的基本结构

```java
/**
 * 字符串工具类
 */
public final class StringUtil {
    
    // 私有构造方法，防止实例化
    private StringUtil() {
        throw new AssertionError("工具类不允许实例化");
    }
    
    /**
     * 判断字符串是否为空
     * @param str 要判断的字符串
     * @return 是否为空
     */
    public static boolean isEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
    
    /**
     * 判断字符串是否不为空
     * @param str 要判断的字符串
     * @return 是否不为空
     */
    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }
    
    /**
     * 将首字母转换为大写
     * @param str 要转换的字符串
     * @return 转换后的字符串
     */
    public static String capitalizeFirstLetter(String str) {
        if (isEmpty(str)) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
    
    /**
     * 将首字母转换为小写
     * @param str 要转换的字符串
     * @return 转换后的字符串
     */
    public static String lowercaseFirstLetter(String str) {
        if (isEmpty(str)) {
            return str;
        }
        return str.substring(0, 1).toLowerCase() + str.substring(1);
    }
}
```

### 使用自定义工具类

```java
public class StringUtilExample {
    public static void main(String[] args) {
        String str1 = "hello";
        String str2 = "";
        String str3 = null;
        
        System.out.println("str1是否为空: " + StringUtil.isEmpty(str1));
        System.out.println("str2是否为空: " + StringUtil.isEmpty(str2));
        System.out.println("str3是否为空: " + StringUtil.isEmpty(str3));
        
        System.out.println("str1首字母大写: " + StringUtil.capitalizeFirstLetter(str1));
        System.out.println("str1首字母小写: " + StringUtil.lowercaseFirstLetter(str1));
    }
}
```

## 工具类的最佳实践

### 1. 私有构造方法

工具类应该有一个私有构造方法，防止被实例化：

```java
private UtilityClass() {
    throw new AssertionError("工具类不允许实例化");
}
```

### 2. 使用final关键字

工具类应该被声明为final，防止被继承：

```java
public final class UtilityClass {
    // ...
}
```

### 3. 静态方法和静态常量

工具类的方法和常量应该是静态的，无需创建对象即可使用：

```java
public static final String CONSTANT = "value";

public static void utilityMethod() {
    // ...
}
```

### 4. 命名规范

- 类名通常以 `Util` 或 `Helper` 结尾，如 `StringUtil`、`DateHelper`
- 方法名应该清晰表达其功能，如 `isEmpty()`、`capitalizeFirstLetter()`

### 5. 异常处理

工具类方法应该适当处理异常，或者将异常向上抛出，让调用者处理：

```java
public static String readFile(String filePath) throws IOException {
    // 读取文件内容
    return new String(Files.readAllBytes(Paths.get(filePath)));
}
```

### 6. 线程安全

工具类应该是线程安全的，避免使用静态变量存储状态信息：

```java
// 不安全的写法
private static int count = 0;

// 安全的写法
public static int increment(int value) {
    return value + 1;
}
```

### 7. 文档注释

为工具类和方法添加详细的文档注释，说明其功能、参数和返回值：

```java
/**
 * 将字符串转换为驼峰命名
 * @param str 要转换的字符串
 * @param delimiter 分隔符
 * @return 驼峰命名的字符串
 */
public static String toCamelCase(String str, String delimiter) {
    // 实现逻辑
}
```

### 8. 避免过度设计

工具类应该专注于特定领域的功能，避免过于庞大和复杂。如果功能太多，可以考虑拆分为多个工具类。

## 总结

Java工具类是Java编程中的重要组成部分，提供了丰富的功能和便捷的方法。本文介绍了：

1. 工具类的概念和特点
2. 常用的Java内置工具类，包括：
   - Math：数学运算
   - Arrays：数组操作
   - Collections：集合操作
   - Objects：对象操作
   - StringJoiner：字符串拼接
   - Base64：Base64编码解码
   - java.time：日期时间处理

3. 自定义工具类的编写方法
4. 工具类的最佳实践

通过合理使用和设计工具类，可以提高代码的复用性、可读性和可维护性，减少重复代码，提高开发效率。

工具类的设计应该遵循单一职责原则，专注于特定领域的功能，同时保持线程安全和良好的文档注释。