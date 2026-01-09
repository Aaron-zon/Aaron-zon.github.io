---
outline: deep
---

# Python JSON 处理

## 什么是 JSON？

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式，具有以下特点：

- 基于 JavaScript 对象语法，但独立于编程语言
- 易于人类阅读和编写
- 易于机器解析和生成
- 支持多种数据类型：字符串、数字、布尔值、数组、对象、null

### JSON 数据格式示例

```json
{
  "name": "张三",
  "age": 30,
  "is_student": false,
  "courses": ["Python", "JavaScript", "Java"],
  "address": {
    "city": "北京",
    "district": "朝阳区"
  },
  "scores": null
}
```

## Python 中的 JSON 模块

Python 内置了 `json` 模块，用于处理 JSON 数据。该模块提供了以下主要功能：

- **序列化**：将 Python 对象转换为 JSON 字符串
- **反序列化**：将 JSON 字符串转换为 Python 对象

### 导入 JSON 模块

```py
import json
```

## JSON 序列化（Python → JSON）

使用 `json.dumps()` 函数将 Python 对象转换为 JSON 字符串。

### 基本用法

```py
import json

# Python 字典
person = {
    "name": "张三",
    "age": 30,
    "is_student": False,
    "courses": ["Python", "JavaScript", "Java"]
}

# 转换为 JSON 字符串
json_str = json.dumps(person)
print(json_str)
# 输出: {"name": "张三", "age": 30, "is_student": false, "courses": ["Python", "JavaScript", "Java"]}
```

### 支持的 Python 数据类型

| Python 类型 | JSON 类型 |
|------------|-----------|
| `dict`     | 对象      |
| `list`, `tuple` | 数组 |
| `str`      | 字符串    |
| `int`, `float` | 数字 |
| `True`     | `true`    |
| `False`    | `false`   |
| `None`     | `null`    |

### 格式化输出

使用 `indent` 参数添加缩进，使输出更易读。

```py
json_str = json.dumps(person, indent=4)
print(json_str)
```

输出：
```json
{
    "name": "张三",
    "age": 30,
    "is_student": false,
    "courses": [
        "Python",
        "JavaScript",
        "Java"
    ]
}
```

### 中文编码问题

在 Python 3 中，`json.dumps()` 默认会将非 ASCII 字符编码为 Unicode 转义序列。可以使用 `ensure_ascii=False` 参数保留中文。

```py
json_str = json.dumps(person, indent=4, ensure_ascii=False)
print(json_str)
```

### 排序键

使用 `sort_keys=True` 参数可以对 JSON 对象的键进行排序。

```py
json_str = json.dumps(person, indent=4, sort_keys=True)
print(json_str)
```

## JSON 反序列化（JSON → Python）

使用 `json.loads()` 函数将 JSON 字符串转换为 Python 对象。

### 基本用法

```py
import json

# JSON 字符串
json_str = '{"name": "张三", "age": 30, "is_student": false, "courses": ["Python", "JavaScript", "Java"]}'

# 转换为 Python 字典
person = json.loads(json_str)
print(person)
print(type(person))
print(person["name"])
```

### 转换后的 Python 数据类型

| JSON 类型 | Python 类型 |
|-----------|------------|
| 对象      | `dict`     |
| 数组      | `list`     |
| 字符串    | `str`      |
| 数字      | `int` 或 `float` |
| `true`    | `True`     |
| `false`   | `False`    |
| `null`    | `None`     |

## 处理文件中的 JSON

### 写入 JSON 到文件

使用 `json.dump()` 函数将 Python 对象直接写入文件。

```py
import json

person = {
    "name": "张三",
    "age": 30,
    "is_student": False
}

# 写入 JSON 文件
with open("person.json", "w", encoding="utf-8") as f:
    json.dump(person, f, indent=4, ensure_ascii=False)
```

### 从文件读取 JSON

使用 `json.load()` 函数从文件中读取 JSON 数据。

```py
import json

# 从文件读取 JSON
with open("person.json", "r", encoding="utf-8") as f:
    person = json.load(f)

print(person)
```

## 处理复杂数据结构

### 嵌套数据

JSON 支持嵌套结构，Python 可以轻松处理。

```py
import json

# 复杂嵌套数据
complex_data = {
    "name": "学校",
    "students": [
        {
            "id": 1,
            "name": "张三",
            "courses": ["Python", "数学"]
        },
        {
            "id": 2,
            "name": "李四",
            "courses": ["JavaScript", "英语"]
        }
    ],
    "teachers": {
        "math": "王老师",
        "english": "李老师"
    }
}

# 序列化
json_str = json.dumps(complex_data, indent=4, ensure_ascii=False)
print(json_str)

# 反序列化
parsed_data = json.loads(json_str)
# 访问嵌套数据
print(parsed_data["students"][0]["name"])
```

### 处理日期时间

JSON 本身不支持日期时间类型，需要手动转换。

```py
import json
from datetime import datetime

# 包含日期时间的 Python 对象
data = {
    "event": "会议",
    "start_time": datetime.now()
}

# 手动转换日期时间为字符串
data["start_time"] = data["start_time"].isoformat()

# 序列化
json_str = json.dumps(data, ensure_ascii=False)
print(json_str)

# 反序列化
parsed_data = json.loads(json_str)
# 手动转换字符串为日期时间
parsed_data["start_time"] = datetime.fromisoformat(parsed_data["start_time"])
print(parsed_data["start_time"])
```

## 自定义 JSON 编码器

对于 JSON 不支持的 Python 类型，可以通过继承 `json.JSONEncoder` 类创建自定义编码器。

### 示例：处理日期时间

```py
import json
from datetime import datetime

# 自定义 JSON 编码器
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        # 调用父类的 default 方法处理其他类型
        return super().default(obj)

# 包含日期时间的 Python 对象
data = {
    "event": "会议",
    "start_time": datetime.now()
}

# 使用自定义编码器序列化
json_str = json.dumps(data, cls=DateTimeEncoder, ensure_ascii=False)
print(json_str)
```

### 示例：处理自定义对象

```py
import json

# 自定义类
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# 自定义 JSON 编码器
class PersonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Person):
            return {
                "name": obj.name,
                "age": obj.age,
                "__type__": "Person"
            }
        return super().default(obj)

# 创建自定义对象
person = Person("张三", 30)

# 序列化
json_str = json.dumps(person, cls=PersonEncoder, ensure_ascii=False)
print(json_str)
```

## 自定义 JSON 解码器

使用 `object_hook` 参数可以自定义 JSON 反序列化过程。

### 示例：将 JSON 转换为自定义对象

```py
import json

# 自定义类
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"Person(name={self.name}, age={self.age})"

# 自定义 JSON 解码器函数
def person_decoder(obj):
    if "__type__" in obj and obj["__type__"] == "Person":
        return Person(obj["name"], obj["age"])
    return obj

# JSON 字符串
json_str = '{"name": "张三", "age": 30, "__type__": "Person"}'

# 使用自定义解码器反序列化
person = json.loads(json_str, object_hook=person_decoder)
print(person)
print(type(person))
```

## JSON 处理最佳实践

1. **使用上下文管理器**：处理文件时使用 `with` 语句，确保文件正确关闭

2. **指定编码**：处理包含中文的 JSON 文件时，指定 `encoding="utf-8"`

3. **使用 `ensure_ascii=False`**：保留中文等非 ASCII 字符的原始形式

4. **使用 `indent` 格式化输出**：生成可读的 JSON 文件

5. **处理异常**：捕获 `json.JSONDecodeError` 异常，处理无效的 JSON 数据

6. **使用自定义编码器/解码器**：处理 JSON 不支持的特殊类型

7. **验证 JSON 格式**：在处理前验证 JSON 格式的有效性

8. **注意数据类型转换**：了解 Python 和 JSON 数据类型之间的转换关系

## 错误处理

处理 JSON 数据时，可能会遇到以下错误：

### 无效的 JSON 格式

```py
import json

try:
    # 无效的 JSON 格式（缺少引号）
    json_str = '{name: "张三"}'
    data = json.loads(json_str)
except json.JSONDecodeError as e:
    print(f"JSON 解析错误：{e}")
```

### 不支持的数据类型

```py
import json
from datetime import datetime

try:
    # JSON 不支持 datetime 类型
    data = {"time": datetime.now()}
    json_str = json.dumps(data)
except TypeError as e:
    print(f"JSON 序列化错误：{e}")
```

## 总结

JSON 是一种广泛使用的数据交换格式，Python 提供了强大的 `json` 模块来处理 JSON 数据。通过 `json.dumps()` 和 `json.loads()` 函数，可以轻松实现 Python 对象和 JSON 字符串之间的转换。对于复杂数据类型，可以使用自定义编码器和解码器进行处理。

掌握 Python JSON 处理是进行数据交换和 API 开发的重要基础，建议多加练习，熟悉各种场景下的 JSON 处理技巧。