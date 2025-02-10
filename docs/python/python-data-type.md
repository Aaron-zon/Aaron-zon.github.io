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

## 类型转换

在 Python 中，类型转换是一种将一个数据类型转换为另一个数据类型的过程。

### 基本类型转换

#### 转换为整数（`int`）

- `int(x)`：将 `x` 转换为整数。

```py
int(3.14)   # 3
int("10")   # 10
int(True)   # 1
```

- `int(x, base)`：将 `x` 转换为整数，其中 `base` 是进制。

```py
int("1010", 2)  # 10
int("A", 16)    # 10
```

#### 转换为浮点数（`float`）

- `float(x)`：将 `x` 转换为浮点数。

```py
float(10)       # 10.0
float("3.14")   # 3.14
float(True)     # 1.0
```

#### 转换为字符串（`str`）

- `str(x)`：将 `x` 转换为字符串。

```py
str(10)     # "10"
str(3.14)   # "3.14"
str(True)   # "True"
```

#### 转换为布尔值（`bool`）

- `bool(x)`：将 `x` 转换为布尔值。（0、""、None、空集合、空序列将被转换为 False，其他值将被转换为 True）

```py
bool(0)         # False
bool(1)         # True
bool("")        # False
bool("Hello")   # True
bool([])        # False
bool(None)      # False
```

### 序列类型转换

#### 转换为列表（`list`）

- list(x)：将 `x` 转换为列表。

```py
list("abc")       # ['a', 'b', 'c'] # 字符串转换为列表
list((1, 2, 3))   # [1, 2, 3]       # 元组转换为列表
list({1, 2, 3})   # [1, 2, 3]       # 集合转换为列表
```

#### 转换为元组（`tuple`）

- tuple(x)：将 `x` 转换为元组。

```py
tuple("abc")      # ('a', 'b', 'c') # 字符串转换为元组
tuple([1, 2, 3])  # (1, 2, 3)       # 列表转换为元组
tuple({1, 2, 3})  # (1, 2, 3)       # 集合转换为元组
```

#### 转换为集合（`set`）

```py
set("aabbcc")             # {'a', 'b', 'c'}   # 字符串转换为集合
set([1, 2, 2, 3, 3, 3])   # {1, 2, 3}         # 列表转换为集合
set({1, 2, 2, 3, 3, 3})   # {1, 2, 3}         # 集合转换为集合
```

#### 转换为字典（`dict`）

- dict(x)：将 `x` 转换为字典（`x` 必须是键值对形式的序列）

```py
dict([(1, "a"), (2, "b")])      # {1: "a", 2: "b"}
dict(zip([1, 2], ["a", "b"]))   # {1: "a", 2: "b"}
```

### 其他类型转换

#### 转换为子节（`bytes`）

```by
bytes("abc", "utf-8")     # b'abc'
```

#### 转换为字节数组（`bytearray`）

```by
bytearray("abc", "utf-8")   # bytearray(b"abc")
```

#### 转换为 ASCII 码（`ord` 和 `chr`）

```py
# 返回字符对应的 ASCII 码
ord("A")    # 65

# 返回 ASCII 码对应的字符
chr(65)     # 'A'

```
