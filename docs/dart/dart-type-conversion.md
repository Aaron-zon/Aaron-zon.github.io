---
outline: deep
---

# Dart 类型转换

## 1. 同种数据类型

同种数据类型之间可以直接进行赋值操作。

```dart
// 同为 int 类型
int a = 1;
int b = a;

// 同为 double 类型
double x = 3.4;
double y = x;

// 同为 String 类型
String s1 = 'Hello';
String s2 = s1;
```

## 2. 不同种数据类型

不同数据类型之间转换，需要注意转换规则。

在 Dart 中，不同数值类型之间的转换需要使用相应的转换方法。

**数值类型转换**：

```dart
// int -> double
int a = 10;
double b = a.toDouble(); // b = 10.0

// double -> int
double d = 9.78;
int i = d.toInt(); // i = 9
int j = d.round(); // j = 10 (四舍五入)
int k = d.floor(); // k = 9 (向下取整)
int l = d.ceil(); // l = 10 (向上取整)

// int -> String
int num = 42;
String str = num.toString();

// double -> String
double pi = 3.14;
String piStr = pi.toString();

// String -> int
String intStr = '123';
int parsedInt = int.parse(intStr);

// String -> double
String doubleStr = '3.14';
double parsedDouble = double.parse(doubleStr);

// String -> bool
String boolStr = 'true';
bool parsedBool = bool.parse(boolStr);
```

**注意：**
- 数值类型转换可能会丢失精度或溢出
- 字符串转换为数值时，如果字符串格式非法，会抛出 FormatException

## 3. 基本类型与包装类

在 Dart 中，所有类型都是对象，没有专门的包装类。基本类型（如 int、double、bool）本身就是对象。

```dart
// 基本类型是对象
int a = 10;
print(a.runtimeType); // 输出: int
print(a is Object); // 输出: true

// 可以直接调用方法
a.toString();
a.toDouble();
```

## 4. 基本类型与字符串

**基本类型 → 字符串**

```dart
int a = 10;
String s1 = a.toString();
String s2 = '$a'; // 字符串插值

double b = 3.14;
String s3 = b.toString();
String s4 = '$b'; // 字符串插值

bool c = true;
String s5 = c.toString();
String s6 = '$c'; // 字符串插值
```

**字符串 → 基本类型**

```dart
int a = int.parse('123');
double b = double.parse('3.14');
bool c = bool.parse('true');
```

**注意：**
- 若字符串格式非法，会抛出 FormatException
- 可以使用 try-catch 来处理可能的异常

```dart
try {
  int a = int.parse('abc');
} catch (e) {
  print('转换失败: $e');
}
```

## 5. 引用类型

**向上转型**

子类 → 父类（自动）

```dart
class Animal {
  void eat() {
    print('Animal eats');
  }
}

class Dog extends Animal {
  void bark() {
    print('Dog barks');
  }
}

// 向上转型（自动）
Animal a = Dog();
a.eat(); // 可以调用父类方法
// a.bark(); // 错误：不能调用子类特有方法
```

**向下转型**

父类 → 子类（需显式转换）

```dart
Animal a = Dog();
// 向下转型
Dog d = a as Dog;
d.bark(); // 可以调用子类特有方法

// 安全的向下转型
if (a is Dog) {
  Dog d = a;
  d.bark();
}
```

**注意：**
- 如果类型不兼容，使用 `as` 运算符会抛出 TypeError
- 使用 `is` 运算符进行类型检查可以避免类型转换错误

## 6. 集合类型转换

**List 转换**

```dart
// List<dynamic> -> List<int>
List<dynamic> dynamicList = [1, 2, 3, 4, 5];
List<int> intList = dynamicList.cast<int>();

// List<int> -> List<String>
List<int> numbers = [1, 2, 3];
List<String> numberStrings = numbers.map((e) => e.toString()).toList();
```

**Map 转换**

```dart
// Map<dynamic, dynamic> -> Map<String, int>
Map<dynamic, dynamic> dynamicMap = {'a': 1, 'b': 2};
Map<String, int> stringIntMap = {};
dynamicMap.forEach((key, value) {
  stringIntMap[key.toString()] = value as int;
});
```

**Set 转换**

```dart
// Set<dynamic> -> Set<String>
Set<dynamic> dynamicSet = {'a', 'b', 'c'};
Set<String> stringSet = dynamicSet.cast<String>();
```

## 7. 可空类型转换

在 Dart 2.12+ 中，可空类型和非空类型之间的转换需要注意空值处理。

**非空类型 → 可空类型**（自动）

```dart
String nonNullable = 'Hello';
String? nullable = nonNullable; // 自动转换
```

**可空类型 → 非空类型**（需显式处理）

```dart
String? nullable = 'Hello';

// 方法 1：空值检查
if (nullable != null) {
  String nonNullable = nullable;
  print(nonNullable.length);
}

// 方法 2：空值断言（仅当确定值不为 null 时使用）
String nonNullable = nullable!;
print(nonNullable.length);

// 方法 3：空值合并运算符
String nonNullable = nullable ?? 'Default';
print(nonNullable.length);
```

## 8. 函数类型转换

**函数赋值**

```dart
// 函数类型转换
int Function(int, int) add = (a, b) => a + b;

// 函数作为参数
void execute(int Function(int, int) operation, int a, int b) {
  print(operation(a, b));
}

execute(add, 10, 20); // 输出: 30
```

## 9. 其他注意点

1. **null 不能转换为非空类型**，除非使用空值断言
2. **类型转换可能会抛出异常**，建议使用 try-catch 或类型检查
3. **使用 `as` 运算符进行类型转换时**，如果类型不兼容会抛出 TypeError
4. **使用 `is` 运算符进行类型检查**可以安全地进行向下转型
5. **集合类型转换**可以使用 `cast()` 方法或 `map()` 方法
6. **字符串插值**是 Dart 中一种方便的类型转换方式

## 10. 类型转换示例

```dart
// 综合示例
void main() {
  // 数值转换
  int a = 10;
  double b = a.toDouble();
  print('int -> double: $b');

  double c = 9.78;
  int d = c.toInt();
  print('double -> int: $d');

  // 字符串转换
  int e = 42;
  String f = e.toString();
  print('int -> string: $f');

  String g = '3.14';
  double h = double.parse(g);
  print('string -> double: $h');

  // 类型检查和转换
  dynamic value = 'Hello';
  if (value is String) {
    String str = value;
    print('Value is a string: $str');
  }

  // 可空类型转换
  String? nullableStr = 'World';
  String nonNullableStr = nullableStr ?? 'Default';
  print('Nullable to non-nullable: $nonNullableStr');

  // 集合转换
  List<dynamic> dynamicList = [1, 2, 3];
  List<int> intList = dynamicList.cast<int>();
  print('List conversion: $intList');
}
```

## 总结

Dart 的类型转换系统设计清晰，提供了多种方式来处理不同类型之间的转换。通过了解和掌握这些转换方法，开发者可以更加灵活地处理数据类型，编写更加健壮的代码。

在进行类型转换时，应注意：
- 数值类型转换可能会丢失精度
- 字符串转换为数值时可能会抛出异常
- 向下转型时应使用类型检查以避免错误
- 可空类型和非空类型之间的转换需要特别注意空值处理

通过合理使用类型转换，开发者可以充分发挥 Dart 类型系统的优势，构建高质量的应用。