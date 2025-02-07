---
outline: deep
---

# Python 数据类型

## 基本内置类型

### 数字类型

- `int` ：整数

```py
a = 10
```

- `float` ：浮点数

```py
b = 3.14
```

- `complex`：复数

```py
c = 1 + 2j
```

- `bool` ：布尔值

```py
d = True  # 等价于 1
e = False # 等价于 0
```

（它不是传统的数字类型，但在需要时可以和其他数字类型进行交互）

```
x = True  
y = 2  
result = x + y  # 这里True被当作1来处理，所以结果是3  
print(result)  # 输出: 3
```

### 序列类型

- ``str`：字符串（不可变）

```py
s = "Hello"
```

- ``list`：列表（可变）

```py
lst = [1, "a", True]
```

- ``tuple`：元组（不可变）

```py
tup = (1, "a", Ture)
```

- ``bytes`：字节序列（不可变）

```py
data = b"binary"
```

- ``bytearray`：字节数组（可变子节序列）

```py
byte_arr = bytearray(b"binary")
```

### 集合类型

- `set`：集合（可变）

```py
s = {1, 2, 3}
```

- `frozenset`：不可变集合

```py
fs = frozenset({1, 2, 3})
```

### 映射类型

- `dict`：字典（键值对，可变）

```py
d = {"name": "John", "age": 25}

print(d["name"])
```

### 其他内置类型

- `NoneType`：空值类型

```py
n = None
```

## 高级或特殊类型

### 模块和函数

- `module`：模块

```py
import math
print(type(math))  # <class 'module'>
```

- `function`：函数

```py
def func():
    pass
print(type(func))  # <class 'function'>
```

### 迭代器和生成器

- `range`：生成整数序列

```py
r = range(5)  # 0,1,2,3,4
```

- `generator`：生成器

```py
def gen():
    yield 1
```

### 特殊容器

- `enumerate`：带索引的迭代器

```py
e = enumerate(["a", "b"])
```

- `zip`：多序列并行迭代器

```py
z = zip([1, 2], ["a", "b"])
```

### 异常
- `Exception`：异常基类

```py
try:
    1 / 0
except ZeroDivisionError as e:
    print(type(e))  # <class 'ZeroDivisionError'>
```