---
outline: deep
---

# Python 异常处理

## 什么是异常？

异常是程序在执行过程中发生的错误事件，这些事件会中断程序的正常执行流程。

在 Python 中，当发生错误时，会引发一个异常对象。如果不处理这个异常，程序会终止并显示错误信息（回溯）。

### 常见的异常类型

| 异常类型 | 描述 |
|---------|------|
| `SyntaxError` | 语法错误 |
| `NameError` | 尝试访问未定义的变量 |
| `TypeError` | 操作或函数应用于不适当类型的对象 |
| `ZeroDivisionError` | 除数为零 |
| `IndexError` | 索引超出序列范围 |
| `KeyError` | 尝试访问字典中不存在的键 |
| `ValueError` | 操作或函数收到类型正确但值不合适的参数 |
| `AttributeError` | 尝试访问对象不存在的属性 |

## 异常处理机制

Python 使用 `try-except` 语句来处理异常，允许程序捕获并处理异常，而不是终止执行。

### `try-except` 基本语法

```py
try:
    # 可能引发异常的代码
    risky_code()
except ExceptionType:
    # 处理特定类型异常的代码
    handle_exception()
```

### 示例：处理除零异常

```py
try:
    result = 10 / 0
except ZeroDivisionError:
    print("错误：除数不能为零！")
```

## 异常处理的高级用法

### 捕获多种异常

#### 方法一：分别捕获

```py
try:
    # 可能引发多种异常的代码
    value = int("abc")
    result = 10 / 0
except ValueError:
    print("错误：无效的数值转换")
except ZeroDivisionError:
    print("错误：除数不能为零")
```

#### 方法二：一次捕获多种异常

```py
try:
    # 可能引发多种异常的代码
    value = int("abc")
except (ValueError, TypeError) as e:
    print(f"错误：{e}")
```

### `try-except-else` 语句

如果 `try` 块中没有引发异常，则执行 `else` 块。

```py
try:
    result = 10 / 2
except ZeroDivisionError:
    print("错误：除数不能为零")
else:
    print(f"除法运算成功，结果为：{result}")
```

### `try-except-finally` 语句

无论是否发生异常，`finally` 块中的代码都会执行，通常用于资源清理。

```py
try:
    file = open("test.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("错误：文件未找到")
finally:
    # 无论是否发生异常，都会关闭文件
    if 'file' in locals():
        file.close()
    print("执行结束")
```

## 抛出异常

### 使用 `raise` 语句

可以使用 `raise` 语句手动抛出异常。

```py
def check_age(age):
    if age < 0:
        raise ValueError("年龄不能为负数")
    return age

try:
    check_age(-10)
except ValueError as e:
    print(f"错误：{e}")
```

### 重新抛出异常

可以在 `except` 块中使用 `raise` 语句重新抛出捕获的异常。

```py
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print("捕获到异常，准备重新抛出")
    raise  # 重新抛出异常
```

## 自定义异常

通过继承 `Exception` 类可以创建自定义异常类型。

### 自定义异常的基本结构

```py
class CustomError(Exception):
    """自定义异常类"""
    def __init__(self, message):
        super().__init__(message)
        self.message = message

# 使用自定义异常
try:
    raise CustomError("这是一个自定义异常")
except CustomError as e:
    print(f"捕获到自定义异常：{e}")
```

### 示例：验证用户输入

```py
class InvalidInputError(Exception):
    """当输入不符合要求时抛出"""
    pass

def process_input(user_input):
    if not user_input.isdigit():
        raise InvalidInputError("输入必须是数字")
    return int(user_input)

try:
    result = process_input("abc")
except InvalidInputError as e:
    print(f"错误：{e}")
```

## 异常链

在 Python 3 中，可以使用 `raise ... from ...` 语法创建异常链，保留原始异常信息。

```py
try:
    result = 10 / 0
except ZeroDivisionError as e:
    raise ValueError("计算错误") from e
```

## 上下文管理器与异常

使用 `with` 语句可以自动管理资源，无论是否发生异常，都会正确关闭资源。

### 示例：文件操作

```py
with open("test.txt", "r") as file:
    content = file.read()
    # 即使这里发生异常，文件也会自动关闭
```

### 自定义上下文管理器

```py
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()

# 使用自定义上下文管理器
with FileManager("test.txt", "r") as file:
    content = file.read()
```

## 异常处理最佳实践

1. **只捕获必要的异常**：避免使用 `except:` 捕获所有异常，这会隐藏程序中的问题。

2. **使用具体的异常类型**：明确指定要捕获的异常类型，提高代码的可读性和可维护性。

3. **提供有用的错误信息**：在异常处理中提供清晰、有用的错误信息，帮助调试和用户理解。

4. **使用 `finally` 清理资源**：确保在异常发生时也能正确清理资源，如文件、网络连接等。

5. **不要过度使用异常**：异常处理的开销比正常流程大，只在必要时使用。

6. **自定义有意义的异常**：对于特定业务场景，创建有意义的自定义异常，提高代码的表达能力。

7. **保留异常堆栈信息**：在重新抛出异常时，使用 `raise` 或 `raise ... from ...` 保留原始异常信息。

## 总结

异常处理是 Python 编程中的重要部分，它允许程序在遇到错误时优雅地处理，而不是崩溃。通过合理使用 `try-except` 语句、自定义异常和上下文管理器，可以编写更健壮、更可靠的 Python 程序。

- 使用 `try-except` 捕获和处理异常
- 使用 `raise` 语句抛出异常
- 通过继承 `Exception` 创建自定义异常
- 使用 `finally` 块确保资源清理
- 使用 `with` 语句简化资源管理
- 遵循异常处理最佳实践，编写高质量代码

