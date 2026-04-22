---
outline: deep
---

# Dart 数据类型

## 基本数据类型

- 数值类型（2个）：`int`、`double`
- 布尔型（1个）：`bool`
- 字符串类型（1个）：`String`
- 空类型（1个）：`null`

### int 整型

表示整数，在 Dart 中，`int` 的大小取决于运行平台：
- 在 64 位平台上，`int` 是 64 位的
- 在 32 位平台上，`int` 是 32 位的

**取值范围**：
- 64 位平台：[-2^63 ~ 2^63 - 1]
- 32 位平台：[-2^31 ~ 2^31 - 1]

**示例**：
```dart
int age = 18;
int largeNumber = 999999999999999999;
```

### double 浮点型

表示浮点数，在 Dart 中，`double` 是 64 位的，遵循 IEEE 754 标准。

**取值范围**：约 ±5.0 × 10^-324 到 ±1.7 × 10^308

**示例**：
```dart
double pi = 3.14159;
double price = 99.99;
```

### bool 布尔型

表示布尔值，只有两个可能的值：`true` 和 `false`。

**示例**：
```dart
bool isActive = true;
bool isEmpty = false;
```

### String 字符串类型

表示字符串，在 Dart 中，字符串是 UTF-16 编码的字符序列。

**示例**：
```dart
String name = 'Dart';
String message = "Hello, World!";
String multiLine = '''
  This is a
  multi-line string
''';
```

### null 空类型

表示空值，在 Dart 2.12+ 中，默认情况下变量不能为 `null`，除非显式声明为可空类型。

**示例**：
```dart
String? nullableString = null;
int? nullableInt;
```

## 复合数据类型

- 列表（List）：有序的对象集合
- 映射（Map）：键值对的集合
- 集合（Set）：无序的唯一对象集合
- 函数（Function）：可执行的代码块
- 类（Class）：对象的蓝图
- 接口（Interface）：类的契约
- 枚举（Enum）：命名的常量值集合
- 泛型（Generic）：参数化类型

### 列表（List）

表示有序的对象集合，可以通过索引访问元素。

**示例**：
```dart
List<int> numbers = [1, 2, 3, 4, 5];
List<String> fruits = ['apple', 'banana', 'orange'];
List<dynamic> mixed = [1, 'hello', true];
```

### 映射（Map）

表示键值对的集合，通过键访问值。

**示例**：
```dart
Map<String, int> scores = {
  'Alice': 95,
  'Bob': 88,
  'Charlie': 92
};
Map<String, dynamic> person = {
  'name': 'John',
  'age': 30,
  'isStudent': false
};
```

### 集合（Set）

表示无序的唯一对象集合，不允许重复元素。

**示例**：
```dart
Set<int> uniqueNumbers = {1, 2, 3, 4, 5};
Set<String> uniqueNames = {'Alice', 'Bob', 'Charlie'};
```

### 函数（Function）

表示可执行的代码块，可以接收参数并返回值。

**示例**：
```dart
int add(int a, int b) {
  return a + b;
}

void printMessage(String message) {
  print(message);
}

Function multiply = (int a, int b) => a * b;
```

### 类（Class）

表示对象的蓝图，定义了对象的属性和方法。

**示例**：
```dart
class Person {
  String name;
  int age;
  
  Person(this.name, this.age);
  
  void sayHello() {
    print('Hello, my name is name.');
  }
}

// 使用
Person person = Person('John', 30);
person.sayHello();
```

### 接口（Interface）

在 Dart 中，所有类都隐式地定义了一个接口，可以被其他类实现。

**示例**：
```dart
class Printable {
  void print();
}

class Document implements Printable {
  @override
  void print() {
    print('Printing document...');
  }
}
```

### 枚举（Enum）

表示命名的常量值集合。

**示例**：
```dart
enum Color {
  red,
  green,
  blue
}

// 使用
Color favoriteColor = Color.blue;
```

### 泛型（Generic）

表示参数化类型，可以用于类、函数和方法。

**示例**：
```dart
class Box<T> {
  T value;
  
  Box(this.value);
}

// 使用
Box<int> intBox = Box(42);
Box<String> stringBox = Box('Hello');

List<T> getFirstElement<T>(List<T> list) {
  if (list.isEmpty) return null;
  return list[0];
}
```

## 类型推断

Dart 支持类型推断，允许在声明变量时省略类型注解，编译器会根据上下文推断出类型。

**示例**：
```dart
// 类型推断
var name = 'Dart'; // 推断为 String 类型
var age = 18; // 推断为 int 类型
var isActive = true; // 推断为 bool 类型

// 显式类型
String explicitName = 'Dart';
int explicitAge = 18;
bool explicitIsActive = true;
```

## 可空类型

在 Dart 2.12+ 中，默认情况下变量不能为 `null`，除非显式声明为可空类型（使用 `?` 标记）。

**示例**：
```dart
// 可空类型
String? nullableString = null;
int? nullableInt;

// 非空类型（默认）
String nonNullableString = 'Hello'; // 不能赋值为 null
int nonNullableInt = 42; // 不能赋值为 null

// 空值判断
if (nullableString != null) {
  print(nullableString.length);
}

// 空值断言（仅当确定值不为 null 时使用）
print(nullableString!.length);

// 空值合并运算符
String result = nullableString ?? 'Default';
```

## 类型转换

Dart 提供了多种类型转换方法：

**示例**：
```dart
// 数值转换
int intValue = int.parse('42');
double doubleValue = double.parse('3.14');

// 字符串转换
String intToString = 42.toString();
String doubleToString = 3.14.toString();

// 布尔转换
bool boolValue = bool.fromEnvironment('DEBUG');

// 类型检查
if (value is String) {
  print('It\'s a string');
}

// 类型转换
String stringValue = value as String;
```

## 总结

Dart 提供了丰富的数据类型，包括基本数据类型和复合数据类型。这些数据类型为 Dart 语言提供了强大的表达能力，使开发者能够构建各种复杂的应用。

Dart 的类型系统是静态的，但支持类型推断，这使得代码既安全又简洁。同时，Dart 2.12+ 引入的空安全特性进一步提高了代码的可靠性。