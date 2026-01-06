---
outline: deep
---

# 异常处理

Java 中，异常（Exception）是程序运行过程中出现的不正常情况，用来通知程序发生了错误活特殊情况。异常可以分为两类 受检异常（Checked Exception）和非受检异常（Unchecked Exception）。

| 类型                             | 说明              | 示例                                                      |
| ------------------------------ | --------------- | ------------------------------------------------------- |
| **受检异常（Checked Exception）**    | 编译时必须处理，否则编译不通过 | `IOException`、`SQLException`                            |
| **非受检异常（Unchecked Exception）** | 运行时异常，不强制处理     | `NullPointerException`、`ArrayIndexOutOfBoundsException` |
| **错误（Error）**                  | JVM 层面问题，不用处理   | `OutOfMemoryError`、`StackOverflowError`                 |

## 异常产生的方式

### 1.Java系统自动抛出

```java
int[] arr = new int[3];
System.out.println(arr[5]); // ArrayIndexOutOfBoundsException
```

### 2.程序手动抛出

```java
throw new IllegalArgumentException("参数不合法");
```

## 异常如何处理

### 1.捕获异常

Java 提供了 `try-catch-finally` 的语法来捕获异常

```java
try {
    int result = 10 / 0; // 可能抛出异常
} catch (ArithmeticException e) {
    System.out.println("捕获异常：" + e.getMessage());
} finally {
    System.out.println("无论是否异常都会执行");
}
```

- try: 放置可能出现异常的代码
- catch: 捕获异常并处理
- finally: 可选，用于资源释放，如关闭文件，数据库连接等

### 2.抛出异常

另外还可以通过 `throws` 把异常抛给上层处理

```java
public void readFile(String file) throws IOException {
    FileReader fr = new FileReader(file); // 可能抛出 IOException
}
```

## 自定义异常

当系统自带的异常无法表达业务逻辑时，可以自定义异常：

```java
// 继承 Exception 或 RuntimeException
public class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}

// 使用自定义异常
public void withdraw(double amount) throws InsufficientBalanceException {
    double balance = 100;
    if(amount > balance){
        throw new InsufficientBalanceException("余额不足！");
    }
}
```
- 继承 Exception，受检异常，调用者必须处理
- 继承 RuntimeException，非受检异常，调用者不需要处理

## 异常的使用场景

| 场景     | 说明            |
| ------ | ------------- |
| 文件操作   | 文件不存在、读取失败    |
| 数据库操作  | SQL 执行异常、连接异常 |
| 网络通信   | 连接超时、请求失败     |
| 业务逻辑校验 | 用户余额不足、库存不足   |
| 程序健壮性  | 避免程序因单个异常崩溃   |

## 异常捕获的使用场景

> 异常捕获 ！= 到处 try-catch

**推荐做法（Spring/Web项目）**

| 层级           | 是否捕获             | 正确姿势           |
| ------------ | ---------------- | -------------- |
| Controller   | ❌ 不直接 try-catch  | 交给 **全局异常处理器** |
| Service      | ⚠️ 只捕获“有业务意义的异常” | 包装 / 转换异常      |
| DAO / Mapper | ❌ 不捕获            | 直接抛出     |

## 项目中异常应用示例

以"轮班考勤管理系统"为例:

### 1.全局异常处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ShiftConflictException.class)
    public ResponseEntity<String> handleShiftConflict(ShiftConflictException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
```

### 2.业务逻辑异常

```java
public void approveShift(Shift shift) throws ShiftConflictException {
    if(conflictCheck(shift)) {
        throw new ShiftConflictException("轮班冲突，无法批准");
    }
}
```

### 3.异常抛出

```java
try {
    shiftDao.insertShift(shift);
} catch (SQLException e) {
    log.error("插入轮班数据失败", e);
    throw new RuntimeException("系统繁忙，请稍后重试");
}
```