---
outline: deep
---

# Python 常用内置包

Python 标准库提供了丰富的内置包，这些包无需额外安装即可使用，涵盖了文件操作、系统交互、数学运算、日期处理等多个领域。本文将介绍一些最常用的内置包及其主要功能。

## 1. os - 操作系统交互

`os` 模块提供了与操作系统交互的功能，包括文件和目录操作、环境变量管理等。

### 主要功能

- 文件和目录操作
- 路径处理
- 环境变量管理
- 系统命令执行

### 常用函数

#### 文件和目录操作

```py
import os

# 获取当前工作目录
current_dir = os.getcwd()
print(f"当前工作目录：{current_dir}")

# 改变工作目录
os.chdir("/path/to/directory")

# 列出目录内容
files = os.listdir(".")
print(f"目录内容：{files}")

# 创建目录
os.mkdir("new_dir")  # 创建单个目录
os.makedirs("parent/child", exist_ok=True)  # 创建多级目录

# 删除目录
os.rmdir("empty_dir")  # 删除空目录
# os.removedirs("parent/child")  # 删除多级空目录

# 删除文件
# os.remove("file.txt")

# 重命名文件或目录
# os.rename("old_name", "new_name")

# 判断路径是否存在
path_exists = os.path.exists("file.txt")

# 判断是否为文件
is_file = os.path.isfile("file.txt")

# 判断是否为目录
is_dir = os.path.isdir("directory")
```

#### 路径处理

```py
import os

# 拼接路径
full_path = os.path.join("parent", "child", "file.txt")
print(f"拼接路径：{full_path}")

# 获取路径的目录部分
dir_name = os.path.dirname(full_path)
print(f"目录部分：{dir_name}")

# 获取路径的文件名部分
file_name = os.path.basename(full_path)
print(f"文件名部分：{file_name}")

# 获取文件扩展名
file_ext = os.path.splitext(full_path)[1]
print(f"文件扩展名：{file_ext}")

# 规范化路径
normalized_path = os.path.normpath("/a/b/../c/d")
print(f"规范化路径：{normalized_path}")
```

#### 环境变量

```py
import os

# 获取环境变量
path_env = os.environ.get("PATH")
print(f"PATH 环境变量：{path_env}")

# 设置环境变量（临时）
os.environ["MY_VAR"] = "my_value"

# 删除环境变量
# del os.environ["MY_VAR"]
```

## 2. sys - 系统参数和功能

`sys` 模块提供了访问Python解释器使用或维护的变量，以及与解释器交互的函数。

### 主要功能

- 命令行参数获取
- 标准输入输出控制
- 模块搜索路径管理
- 解释器配置和控制

### 常用函数和变量

```py
import sys

# 命令行参数
try:
    # 第一个参数是脚本名称
    script_name = sys.argv[0]
    args = sys.argv[1:]
    print(f"脚本名称：{script_name}")
    print(f"命令行参数：{args}")
except IndexError:
    print("没有命令行参数")

# 退出程序
sys.exit(0)  # 正常退出

# 获取Python版本信息
print(f"Python版本：{sys.version}")

# 获取模块搜索路径
print(f"模块搜索路径：{sys.path}")

# 添加自定义路径到搜索路径
sys.path.append("/path/to/modules")

# 标准输入输出
# sys.stdin - 标准输入
# sys.stdout - 标准输出
# sys.stderr - 标准错误

# 重定向输出
sys.stdout.write("Hello, World!\n")
```

## 3. datetime - 日期和时间处理

`datetime` 模块提供了处理日期和时间的类和函数。

### 主要功能

- 日期和时间的创建
- 日期和时间的格式化
- 日期和时间的运算
- 时区处理

### 常用类和函数

#### 日期和时间对象

```py
from datetime import datetime, date, time, timedelta

# 获取当前日期时间
now = datetime.now()
print(f"当前日期时间：{now}")

# 创建日期对象
d = date(2023, 10, 1)
print(f"日期对象：{d}")

# 创建时间对象
t = time(14, 30, 45)
print(f"时间对象：{t}")

# 组合日期和时间
dt = datetime.combine(d, t)
print(f"组合日期时间：{dt}")
```

#### 日期时间格式化

```py
from datetime import datetime

now = datetime.now()

# 格式化输出
print(f"ISO格式：{now.isoformat()}")
print(f"自定义格式：{now.strftime('%Y-%m-%d %H:%M:%S')}")

# 解析字符串为日期时间
str_date = "2023-10-01 14:30:45"
dt = datetime.strptime(str_date, "%Y-%m-%d %H:%M:%S")
print(f"解析结果：{dt}")
```

#### 日期时间运算

```py
from datetime import datetime, timedelta

now = datetime.now()

# 增加一天
next_day = now + timedelta(days=1)
print(f"明天此时：{next_day}")

# 增加一小时
next_hour = now + timedelta(hours=1)
print(f"一小时后：{next_hour}")

# 计算时间差
diff = next_day - now
print(f"时间差：{diff}")
print(f"时间差（天数）：{diff.days}")
print(f"时间差（秒数）：{diff.total_seconds()}")
```

## 4. math - 数学运算

`math` 模块提供了各种数学运算函数和常量。

### 主要功能

- 基本数学运算
- 三角函数
- 指数和对数运算
- 数学常量

### 常用函数和常量

```py
import math

# 数学常量
print(f"π：{math.pi}")
print(f"e：{math.e}")

# 基本运算
print(f"绝对值：{math.fabs(-10)}")
print(f"向上取整：{math.ceil(3.14)}")
print(f"向下取整：{math.floor(3.14)}")
print(f"四舍五入：{round(3.14159, 2)}")
print(f"平方根：{math.sqrt(16)}")

# 指数和对数
print(f"e的x次方：{math.exp(2)}")
print(f"自然对数：{math.log(math.e)}")
print(f"以10为底的对数：{math.log10(100)}")

# 三角函数（弧度制）
print(f"sin(π/2)：{math.sin(math.pi/2)}")
print(f"cos(π)：{math.cos(math.pi)}")
print(f"tan(π/4)：{math.tan(math.pi/4)}")

# 角度转换
print(f"角度转弧度：{math.radians(90)}")
print(f"弧度转角度：{math.degrees(math.pi/2)}")
```

## 5. random - 随机数生成

`random` 模块提供了生成随机数的功能。

### 主要功能

- 随机数生成
- 随机选择
- 随机打乱

### 常用函数

```py
import random

# 生成0到1之间的随机浮点数
random_float = random.random()
print(f"随机浮点数：{random_float}")

# 生成指定范围内的随机整数
random_int = random.randint(1, 100)
print(f"1到100之间的随机整数：{random_int}")

# 生成指定范围内的随机浮点数
random_uniform = random.uniform(1, 10)
print(f"1到10之间的随机浮点数：{random_uniform}")

# 从序列中随机选择一个元素
my_list = [1, 2, 3, 4, 5]
random_choice = random.choice(my_list)
print(f"随机选择：{random_choice}")

# 从序列中随机选择多个不重复元素
sample = random.sample(my_list, 3)
print(f"随机采样（不重复）：{sample}")

# 随机打乱序列（原地修改）
random.shuffle(my_list)
print(f"打乱后的列表：{my_list}")

# 生成高斯分布的随机数
gaussian = random.gauss(0, 1)  # 均值为0，标准差为1
print(f"高斯分布随机数：{gaussian}")
```

## 6. collections - 容器数据类型

`collections` 模块提供了额外的容器数据类型，扩展了Python内置的列表、字典、元组和集合。

### 主要容器类型

#### 1. defaultdict - 默认值字典

```py
from collections import defaultdict

# 创建默认值为列表的字典
d = defaultdict(list)
d["key1"].append(1)
d["key1"].append(2)
d["key2"].append(3)
print(f"defaultdict：{dict(d)}")

# 创建默认值为int的字典（常用于计数）
count_dict = defaultdict(int)
words = ["apple", "banana", "apple", "orange", "banana", "apple"]
for word in words:
    count_dict[word] += 1
print(f"单词计数：{dict(count_dict)}")
```

#### 2. Counter - 计数器

```py
from collections import Counter

words = ["apple", "banana", "apple", "orange", "banana", "apple"]

# 创建计数器
counter = Counter(words)
print(f"计数器：{counter}")
print(f"apple出现次数：{counter['apple']}")

# 获取出现次数最多的前2个元素
top_2 = counter.most_common(2)
print(f"出现次数最多的前2个元素：{top_2}")
```

#### 3. OrderedDict - 有序字典

```py
from collections import OrderedDict

# 创建有序字典（Python 3.7+普通字典也保持插入顺序）
od = OrderedDict()
od["a"] = 1
od["b"] = 2
od["c"] = 3
print(f"OrderedDict：{od}")

# 移动元素到末尾
od.move_to_end("a")
print(f"移动'a'到末尾：{od}")
```

#### 4. deque - 双端队列

```py
from collections import deque

# 创建双端队列
d = deque([1, 2, 3])

# 从右侧添加元素
d.append(4)

# 从左侧添加元素
d.appendleft(0)

print(f"双端队列：{d}")

# 从右侧移除元素
right_pop = d.pop()
print(f"右侧移除：{right_pop}")

# 从左侧移除元素
left_pop = d.popleft()
print(f"左侧移除：{left_pop}")

print(f"剩余队列：{d}")

# 限制队列大小
d = deque(maxlen=3)
d.append(1)
d.append(2)
d.append(3)
d.append(4)  # 自动移除最左侧元素
print(f"有限制的队列：{d}")
```

## 7. itertools - 迭代器工具

`itertools` 模块提供了用于创建高效迭代器的函数，这些函数可以用于各种循环结构。

### 主要功能

- 无限迭代器
- 迭代器组合
- 迭代器过滤

### 常用函数

#### 无限迭代器

```py
import itertools

# 无限计数
try:
    count = itertools.count(10, 2)  # 从10开始，步长为2
    # 只取前5个元素
    for i in range(5):
        print(next(count))
except Exception as e:
    print(f"Error: {e}")

# 无限循环
cycle = itertools.cycle([1, 2, 3])
for i in range(5):
    print(next(cycle))

# 无限重复
repeat = itertools.repeat("Hello", 3)  # 重复3次
for item in repeat:
    print(item)
```

#### 迭代器组合

```py
import itertools

# 链式组合多个迭代器
chain = itertools.chain([1, 2, 3], [4, 5, 6])
print(f"链式组合：{list(chain)}")

# 笛卡尔积
product = itertools.product([1, 2], ["a", "b"])
print(f"笛卡尔积：{list(product)}")

# 排列组合
permutations = itertools.permutations([1, 2, 3], 2)  # 2个元素的排列
print(f"排列：{list(permutations)}")

combinations = itertools.combinations([1, 2, 3], 2)  # 2个元素的组合
print(f"组合：{list(combinations)}")
```

## 8. functools - 高阶函数工具

`functools` 模块提供了用于处理函数或可调用对象的高阶函数。

### 主要功能

- 函数装饰器
- 函数缓存
- 偏函数

### 常用函数

#### 1. lru_cache - 函数缓存

```py
from functools import lru_cache

# 斐波那契数列（带缓存）
@lru_cache(maxsize=None)  # maxsize=None 表示无限制缓存
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

# 第一次计算，会缓存结果
print(f"fib(30)：{fib(30)}")

# 第二次计算，直接使用缓存结果，速度更快
print(f"fib(30)：{fib(30)}")

# 查看缓存信息
print(f"缓存信息：{fib.cache_info()}")
```

#### 2. partial - 偏函数

```py
from functools import partial

# 原函数
def power(base, exponent):
    return base ** exponent

# 创建偏函数，固定指数为2（平方）
square = partial(power, exponent=2)
print(f"平方函数：{square(5)}")  # 5^2 = 25

# 创建偏函数，固定基数为2
power_of_two = partial(power, 2)
print(f"2的幂函数：{power_of_two(3)}")  # 2^3 = 8
```

#### 3. reduce - 归约函数

```py
from functools import reduce

# 计算列表元素的和
numbers = [1, 2, 3, 4, 5]
sum_result = reduce(lambda x, y: x + y, numbers)
print(f"列表和：{sum_result}")

# 计算列表元素的乘积
product_result = reduce(lambda x, y: x * y, numbers)
print(f"列表乘积：{product_result}")
```

## 9. json - JSON 数据处理

`json` 模块提供了 JSON 数据的序列化和反序列化功能。

### 主要功能

- 将 Python 对象转换为 JSON 字符串
- 将 JSON 字符串转换为 Python 对象

### 常用函数

```py
import json

# Python 字典
person = {
    "name": "张三",
    "age": 30,
    "is_student": False,
    "courses": ["Python", "JavaScript"]
}

# 序列化：Python 对象 → JSON 字符串
json_str = json.dumps(person, indent=4, ensure_ascii=False)
print(f"JSON 字符串：{json_str}")

# 反序列化：JSON 字符串 → Python 对象
person_dict = json.loads(json_str)
print(f"Python 字典：{person_dict}")

# 读写 JSON 文件
with open("person.json", "w", encoding="utf-8") as f:
    json.dump(person, f, indent=4, ensure_ascii=False)

with open("person.json", "r", encoding="utf-8") as f:
    person_from_file = json.load(f)
    print(f"从文件读取：{person_from_file}")
```

## 10. re - 正则表达式

`re` 模块提供了正则表达式的支持，用于字符串的匹配、搜索和替换。

### 主要功能

- 字符串匹配
- 字符串搜索
- 字符串替换
- 字符串分割

### 常用函数

```py
import re

# 编译正则表达式模式
pattern = re.compile(r'\d+')  # 匹配一个或多个数字

# 匹配字符串
text = "abc123def456ghi"

# 搜索第一个匹配项
match = pattern.search(text)
if match:
    print(f"第一个匹配：{match.group()}")
    print(f"匹配位置：{match.span()}")

# 查找所有匹配项
matches = pattern.findall(text)
print(f"所有匹配：{matches}")

# 替换匹配项
replaced = pattern.sub("#", text)
print(f"替换后：{replaced}")

# 分割字符串
split_result = pattern.split(text)
print(f"分割后：{split_result}")

# 匹配整个字符串
full_match = re.fullmatch(r'[a-z]+', "abc")
if full_match:
    print(f"完全匹配：{full_match.group()}")
```

## 11. pickle - 对象序列化

`pickle` 模块提供了 Python 对象的序列化和反序列化功能，用于将 Python 对象保存到文件或在网络上传输。

### 主要功能

- 将 Python 对象转换为二进制数据流（序列化）
- 将二进制数据流转换为 Python 对象（反序列化）

### 常用函数

```py
import pickle

# 定义一个类
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Person(name={self.name}, age={self.age})"

# 创建对象
person = Person("张三", 30)

# 序列化：对象 → 二进制数据流
with open("person.pkl", "wb") as f:
    pickle.dump(person, f)

# 反序列化：二进制数据流 → 对象
with open("person.pkl", "rb") as f:
    loaded_person = pickle.load(f)
    print(f"加载的对象：{loaded_person}")
    print(f"对象类型：{type(loaded_person)}")
```

## 12. logging - 日志记录

`logging` 模块提供了灵活的日志记录功能，用于记录程序运行时的信息、警告和错误。

### 主要功能

- 多级别日志记录（DEBUG, INFO, WARNING, ERROR, CRITICAL）
- 日志格式化
- 日志输出到文件或控制台
- 日志轮转

### 基本配置

```py
import logging

# 基本配置
logging.basicConfig(
    level=logging.INFO,  # 日志级别
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',  # 日志格式
    filename='app.log',  # 日志文件名
    filemode='a'  # 追加模式
)

# 创建日志记录器
logger = logging.getLogger(__name__)

# 记录不同级别的日志
logger.debug("调试信息")  # 不会输出，因为级别设置为INFO
logger.info("普通信息")
logger.warning("警告信息")
logger.error("错误信息")
logger.critical("严重错误信息")
```

## 最佳实践

1. **按需导入**：只导入需要的模块或函数，避免导入整个模块
   ```py
   # 推荐
   from os import path
   from datetime import datetime
   
   # 不推荐（除非需要使用多个函数）
   import os
   import datetime
   ```

2. **使用 `__name__` 作为模块名**：在创建日志记录器或调试信息时
   ```py
   import logging
   logger = logging.getLogger(__name__)
   ```

3. **异常处理**：在使用内置包时，注意捕获和处理可能的异常
   ```py
   import os
   
try:
    os.remove("non_existent_file.txt")
except FileNotFoundError:
    print("文件不存在")
   ```

4. **使用上下文管理器**：处理文件和资源时，使用 `with` 语句确保资源正确关闭
   ```py
   import json
   
   with open("data.json", "r") as f:
       data = json.load(f)
   ```

5. **注意性能**：对于频繁调用的函数，考虑使用缓存（如 `lru_cache`）
   ```py
   from functools import lru_cache
   
   @lru_cache(maxsize=None)
   def expensive_function(arg):
       # 复杂计算
       return result
   ```

## 总结

Python 内置包提供了丰富的功能，涵盖了编程中的各个方面。本文介绍了一些最常用的内置包，包括：

- `os`：操作系统交互
- `sys`：系统参数和功能
- `datetime`：日期和时间处理
- `math`：数学运算
- `random`：随机数生成
- `collections`：容器数据类型
- `itertools`：迭代器工具
- `functools`：高阶函数工具
- `json`：JSON 数据处理
- `re`：正则表达式
- `pickle`：对象序列化
- `logging`：日志记录

掌握这些内置包的使用，可以提高编程效率，减少重复代码，编写更简洁、高效的 Python 程序。

## 练习

1. 使用 `os` 模块遍历一个目录，打印所有文件名和目录名。
2. 使用 `datetime` 模块计算两个日期之间的天数差。
3. 使用 `collections.Counter` 统计一个文本文件中单词出现的频率。
4. 使用 `random` 模块生成一个包含10个随机整数的列表，并排序。
5. 使用 `functools.lru_cache` 优化递归函数的性能。
6. 使用 `json` 模块读取一个JSON文件，修改其中的数据，然后写回文件。