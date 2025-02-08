---
outline: deep
---

# 流程控制

流程控制主要包括 `条件控制`、`循环控制` 和 `异常控制`。

## 条件控制

### `if` 语句

根据条件执行不同的代码块。

```py
x = 10
if x > 0:
  print("x 是正数")
elif x == 0:
  print("x 是零")
else
  print("x 是负数")
```

### 三元运算符

简化 `if-else` 语句。

```py
x = 10
result = "正数" if x > 0 else "非正数"
print(result)
```

### `match-case` 语句（Python 3.10+）

类似于 `switch-case` 结构

```py
status = 404
match status:
  case 200:
    print("成功")
  case 404:
    print("未找到")
  case _:
    print("未知状态")
```

## 循环控制

### `for` 循环

用于遍历序列（如：列表、字符串等）

```py
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
  print(fruit)
```

1. range() 函数生成整数序列。

```py
for i in range(5): # 0, 1, 2, 3, 4
  print(i)
```

2. enumerate() 函数返回一个索引序列。

```py
fruits = ["apple", "banana", "cherry"]
for index, value in enumerate(fruits):
  print(index, value)
```

### `while` 循环

根据条件重复执行代码块。

```py
count = 0
while count < 5:
  print(count)
  count += 1
```

### 循环控制语句

1. `break`：立即退出循环

```py
for i in range(10):
  if 1 == 5:
    break
  print(i)
```

2. `continue`：跳过当前迭代，继续下一次循环

```py
for i in range(10):
  if i % 2 == 0:
    continue
  print(i)
```

3. `else`：在循环正常结束后执行（前提是未触发 `break`）

```py
for i in range(5):
  print(i)
else:
  print("循环结果")
```

## 异常处理

### `try-exept` 语句

捕获并处理异常。

```py
try:
  result = 1 / 0
except ZeroDivisionError:
  print("除数不能为0")
```

### `try-except-else` 语句

未发生异常时执行 `else` 块。

```py
try:
  result = 10 / 2
except ZeroDivisionError:
  print("除数不能为0")
else:
  print("除法运算结果为：", result)
```


### `try-except-finally` 语句

无论是否发生异常，`finally` 块都会执行。

```py
try:
  result = 10 / 0
except ZeroDivisionError:
    print("除数不能为零")
finally:
  print("执行结束")
```

### 自定义异常

通过继承 `Exception` 类创建自定义异常。

```py
class MyError(Exception):
  pass

try:
  raise MyError("这是一个自定义错误")
except MyError as e:
  print(e)
```

## 上下文管理（`witch` 语句）

用于简化资源管理（如文件操作）

```py
with open("file.txt", "r") as file:
  content = file.read()
# 文件会自动关闭
```