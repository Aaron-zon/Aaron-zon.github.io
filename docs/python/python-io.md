---
outline: deep
---
# python IO

## IO 基础概念

IO = Input（输入） + Output（输出）

- 输入（Input）：程序接收外部的数据（比如在键盘上输入，或从文件中读取）
- 输出（Output）：将程序内的数据展示或保存到外部（比如在屏幕上打印出结果，或者写入文件）

Python的IO操作主要包括有：

- 控制台的输入和输出
- 文件读写
- 进阶的网络IO

## 使用 print() 输出内容

`print()` 是 Python 中最常用的输出函数，用来把结果显示到控制台。

基本用法：

```python
print("Hello World") # 输出 Hello World
print(123)           # 输出 123
print(3 + 5)         # 输出 8
print(True)          # 输出 True
```

输出多个内容：

```python
print("Hello", "World") # 输出 Hello World
print("Hello", 123)     # 输出 Hello 123
```

换行与不换行：
> 默认两个 `print()` 会自动换行
> 但如果不想换行，也可以使用参数 `end=""`

```python
print("Hello", end="")
print("World")  
# 输出：HelloWorld
```

## 使用 input() 获取用户输入

`input()` 函数用于获取用户键盘输入。

基本用法：
```python
name = input("请输入你的名字：")
print("你好，", name)

# 运行结果
# 请输入你的名字: 小明
# 你好, 小明
```

## 文件打开与关闭（open() 、 close()）

在 Python 中，操作文件的第一步就是 **打开文件**。

open() 函数用于打开一个文件，并返回一个文件对象。

close() 函数用于关闭一个文件。这很重要，它会释放资源，否则文件可能被占用。

语法：
```python
f = open(文件路径, 模式, encoding="编码方式")
```

常见的 **模式**：
- r: 只读模式（默认值，文件必须存在）
- w: 只写模式（会覆盖原有内容，如果没有文件就创建一个新文件）
- a: 追加模式（内容写道文件末尾，没有就新建）

例子：
```python
# 只读模式
f = open("test.txt", "r", encoding="utf-8")

# 使用完一定要关闭
f.close()
```

## 文件读取操作

文件 **读操作** 有三种方式，可根据具体需求选择：

- read()：一次性读取整个文件
- readline()：每次读取一行数据
- readlines()：读取所有行，返回一个列表

read：
```python
f = open("test.txt", "r", encoding="utf-8")
content = f.read()
print(content)
f.close()
```

readline：
```python
f = open("test.txt", "r", encoding="utf-8")
line1 = f.readline()
line2 = f.readline()
print(line1)
print(line2)
f.close()
```

readlines：
```python
f = open("test.txt", "r", encoding="utf-8")
lines = f.readlines()
print(lines)   # ['第一行\n', '第二行\n', '第三行\n']
f.close()
```

**注意**：大文件时不要用 `read()`，因为会一次性将所有内容读取到内存中，很耗资源。

## 文件写入操作

写操作就是把数据保存到文件。

- write()：写入单个字符串
- writelines()：写入多行（列表形式）

### write()：写入单个字符串

```python
f = open('out.txt', 'w', encoding='utf-8')
f.write('你好，Python！\n')
f.write('第二行')
f.close()
```

注意：如果源文件存在，会清空原有内容

### writelines()：写入多行（列表形式）

```python
f = open('out.txt', 'w', encoding='utf-8')
f.writelines(['你好，Python！\n', '第二行\n', '第三行'])
f.close()
```

## 文件的追加模式

- "w"模式，清空原有内容
- "a"模式，不会清空，而是在文件末尾追加内容

```python
f = open("output.txt", "a", encoding="utf-8")
f.write("\n这是追加的一行")
f.close()
```

## 文件的自动关闭（with语句） 推荐写法

每次都写 close() 很麻烦，而且如果忘记写，文件可能会被占用。

Python 提供了 with 语句，会在代码块结束后自动关闭文件：

```python
with open("test.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# 离开 with 代码块后，文件会自动关闭
```

## 文件的常用属性

打开文件后，可以通过一些属性了解文件的信息：

- `f.name`: 读取文件的名称
- `f.encoding`: 读取文件的编码方式
- `f.closed`: 读取文件是否关闭
- `f.mode`: 读取文件打开的模式

```python
with open("test.txt", "r", encoding="utf-8") as f:
    print("文件名:", f.name)
    print("文件编码:", f.encoding)
    print("文件是否关闭:", f.closed)
    print("文件模式:", f.mode)
```

## 文本文件和二进制文件的区别

在 Python 中，文件分为两种常见类型，`文本文件` 与 `二进制文件`

### 文本文件（text）

- 用 `"r"`、 `"w"`、 `"a"` 模式打开
- 数据以字符串形式读写
- 默认编码是 `utf-8`
- 常见：txt, log, csv, py

例子：

```python
with open("note.txt", "w", encoding="utf-8") as f:
    f.write("你好，Python！")
```

### 二进制文件（binary）

- 用 `"rb"`、 `"wb"`、 `"ab"` 模式打开（多了一个 b）
- 数据以字节形式（bytes）读写
- 常见：图片、视频、音频、压缩包等

例子：

```python
# 复制一张图片
with open("a.jpg", "rb") as f1:
    data = f1.read()

with open("b.jpg", "wb") as f2:
    f2.write(data)
```

## 异常处理和文件操作

操作文件时可能遇到的问题：

- 文件不存在
- 文件权限问题
- 读写错误

这是程序会报错，如果不处理可能导致崩溃。

解决方法：使用 `try ... except` 来进行异常捕获。

例子：

```python
try:
    f = open("not_exist.txt", "r", encoding="utf-8")
    content = f.read()
    print(content)
    f.close()
except FileNotFoundError:
    print("文件不存在，请检查文件路径！")
```


## 文件和目录操作（os模块）

除了读写文件，我们还需要对 **文件和文件夹** 做操作，比如：创建、删除、重命名。

Python 提供了 **os 模块** 来处理这些操作。

常用方法：

```python
import os

# 判断文件是否存在
print(os.path.exists("test.txt"))

# 删除文件
os.remove("test.txt")

# 创建目录
os.mkdir("myfolder")

# 删除目录（必须空目录）
os.rmdir("myfolder")

# 获取当前工作目录
print(os.getcwd())

# 修改工作目录
os.chdir("..")

# 列出目录下的所有文件和文件夹
print(os.listdir("."))

```

注意：

删除操作是不可逆的，要小心使用。

os 模块更偏底层，操作时要确认路径正确。

## 文件内容的编码与解码（encoding）

- 编码（Encoding）： 把字符串转换成二进制存储。
- 解码（Decoding）： 把二进制还原成字符串。

在不同系统/语言环境下，文件可能使用不同编码：

- 常见编码：UTF-8、GBK、Shift-JIS
- 如果编码不一致，就可能出现乱码。

### 指定编码读取文件

```python
# 正确指定编码
with open("test_utf8.txt", "r", encoding="utf-8") as f:
    print(f.read())

# 如果文件是 GBK 编码，就要写 encoding="gbk"
with open("test_gbk.txt", "r", encoding="gbk") as f:
    print(f.read())

```

### 编码与解码示例

```python
# 编码
text = "你好 Python"

# 编码：字符串 → 字节
data = text.encode("utf-8")
print(data)   # b'\xe4\xbd\xa0\xe5\xa5\xbd Python'

# 解码：字节 → 字符串
new_text = data.decode("utf-8")
print(new_text)  # 你好 Python

```

注意：
- encode() 用来编码成字节
- decode() 用来解码成字符串
- 读写文件时一定要指定正确的 encoding，否则可能乱码