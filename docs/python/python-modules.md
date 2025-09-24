---
outline: deep
---

# Python 模块化

Python 模块化是指将一个大程序拆分成多个小的模块，每个模块都包含一些功能，然后通过导入的方式来使用这些模块。

## 导入模块

```python
import 模块名
```
通过 `import` 语句导入模块，导入后，就可以使用模块内的所有功能。

例子：
```python
import math

print(math.sqrt(16)) # sqrt 是开平方函数，输出 4.0
```

### 导入模块中特定函数

```python
from 模块名 import 函数名
```

使用 `from import` 可以导入模块中指定函数, 使用函数时也可以不写模块名。

例子：

```python
form math import sqrt

# 这里因为导入指定函数因此不用写 math.sqrt，可以直接使用sqrt
print(sqrt(16)) # 输出 4.0
```

### 导入模块中所有函数

```python
from 模块名 import *
```

把目标模块中所有函数导入到当前空间，可以直接使用模块内的认以函数，不用写模块名。但是这种方式也极易导致命名冲突。

例子：

```python
from math import *

# 调用math中的sin和cos函数
print(sin(0))
print(cos(0))
```

### 为导入的模块设置别名

```python
import 模块名 as 别名
```

给模块起一个简短的名字，方便使用，适合在模块名过长时使用

例子：

```python
import math as m

print(m.sqrt(16)) # 输出 4.0
```