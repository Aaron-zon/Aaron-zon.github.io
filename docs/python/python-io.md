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

- write()
- writelines()

## 文件的追加模式

## 文件的自动关闭（with语句）

## 文件的常用属性和方法

## 文本文件和二进制文件的区别

## 异常处理和文件操作

## 文件和目录操作（os模块

## 文件内容的编码与解码（encoding）
