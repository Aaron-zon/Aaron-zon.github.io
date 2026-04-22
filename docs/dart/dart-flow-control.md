---
outline: deep
---

# Dart 流程控制

流程控制是编程中非常重要的部分，它允许我们根据条件执行不同的代码块，或者重复执行某些代码。Dart 提供了丰富的流程控制语句和操作符，本文将详细介绍这些内容。

## 1. 条件语句

### if-else 语句

`if-else` 语句是最基本的条件控制语句，用于根据条件执行不同的代码块。

**语法：**
```dart
if (condition) {
  // 条件为 true 时执行的代码
} else if (anotherCondition) {
  // 第一个条件为 false，第二个条件为 true 时执行的代码
} else {
  // 所有条件都为 false 时执行的代码
}
```

**示例：**
```dart
int score = 85;

if (score >= 90) {
  print('优秀');
} else if (score >= 80) {
  print('良好');
} else if (score >= 60) {
  print('及格');
} else {
  print('不及格');
}
```

**注意：** 在 Dart 中，条件表达式必须是布尔值（`bool` 类型），不能像 JavaScript 那样使用其他类型的值作为条件。

### 三目运算符

三目运算符是一种简洁的条件表达式，用于根据条件返回两个值中的一个。

**语法：**
```dart
condition ? valueIfTrue : valueIfFalse
```

**示例：**
```dart
int score = 85;
String result = score >= 60 ? '及格' : '不及格';
print(result); // 输出: 及格

// 嵌套使用
int a = 10;
int b = 20;
int c = 15;
int max = a > b ? (a > c ? a : c) : (b > c ? b : c);
print('最大值: $max'); // 输出: 最大值: 20
```

## 2. 逻辑运算符

Dart 提供了三种逻辑运算符：`&&`（与）、`||`（或）和 `!`（非）。

### && 运算符

`&&` 运算符表示逻辑与，只有当两个操作数都为 `true` 时，结果才为 `true`。

**语法：**
```dart
condition1 && condition2
```

**示例：**
```dart
bool isAdult = true;
bool hasID = true;

if (isAdult && hasID) {
  print('可以进入');
} else {
  print('不能进入');
}
```

### || 运算符

`||` 运算符表示逻辑或，只要有一个操作数为 `true`，结果就为 `true`。

**语法：**
```dart
condition1 || condition2
```

**示例：**
```dart
bool hasCash = false;
bool hasCard = true;

if (hasCash || hasCard) {
  print('可以支付');
} else {
  print('无法支付');
}
```

### ! 运算符

`!` 运算符表示逻辑非，用于反转布尔值。

**语法：**
```dart
!condition
```

**示例：**
```dart
bool isOpen = false;

if (!isOpen) {
  print('商店关门了');
} else {
  print('商店营业中');
}
```

## 3. 空值运算符

Dart 2.12+ 引入了空安全特性，同时提供了几个空值运算符来处理可空类型。

### ?? 运算符

`??` 运算符（空值合并运算符）用于在左侧表达式为 `null` 时返回右侧表达式的值。

**语法：**
```dart
expression1 ?? expression2
```

**示例：**
```dart
String? name = null;
String displayName = name ?? '匿名用户';
print(displayName); // 输出: 匿名用户

String? username = '张三';
String displayUsername = username ?? '匿名用户';
print(displayUsername); // 输出: 张三
```

### ??= 运算符

`??=` 运算符（空值赋值运算符）用于在变量为 `null` 时给它赋值。

**语法：**
```dart
variable ??= value
```

**示例：**
```dart
String? name = null;
name ??= '默认名称';
print(name); // 输出: 默认名称

String? username = '李四';
username ??= '默认用户名';
print(username); // 输出: 李四
```

### ?. 运算符

`?.` 运算符（条件成员访问运算符）用于安全地访问可空对象的成员。

**语法：**
```dart
object?.member
```

**示例：**
```dart
class Person {
  String? name;
  int? age;
  
  void sayHello() {
    print('Hello');
  }
}

Person? person = null;
print(person?.name); // 输出: null
person?.sayHello(); // 不会执行，因为 person 是 null

person = Person();
person.name = '王五';
print(person?.name); // 输出: 王五
person?.sayHello(); // 输出: Hello
```

### ! 运算符（空值断言）

`!` 运算符（空值断言运算符）用于断言一个可空表达式不为 `null`。

**语法：**
```dart
expression!
```

**示例：**
```dart
String? name = '赵六';
print(name!.length); // 输出: 2

// 注意：如果 name 为 null，会抛出异常
String? nullName = null;
// print(nullName!.length); // 运行时异常
```

## 4. 循环语句

### for 循环

`for` 循环用于重复执行一段代码，直到满足特定条件。

**语法：**
```dart
for (initialization; condition; increment) {
  // 循环体
}
```

**示例：**
```dart
// 基本 for 循环
for (int i = 0; i < 5; i++) {
  print('i = $i');
}

// 遍历列表
List<String> fruits = ['苹果', '香蕉', '橙子'];
for (int i = 0; i < fruits.length; i++) {
  print(fruits[i]);
}

// for-in 循环（遍历可迭代对象）
for (String fruit in fruits) {
  print(fruit);
}

// forEach 方法
fruits.forEach((fruit) {
  print(fruit);
});
```

### while 循环

`while` 循环用于在条件为 `true` 时重复执行一段代码。

**语法：**
```dart
while (condition) {
  // 循环体
}
```

**示例：**
```dart
int i = 0;
while (i < 5) {
  print('i = $i');
  i++;
}
```

### do-while 循环

`do-while` 循环与 `while` 循环类似，但它会先执行一次循环体，然后再检查条件。

**语法：**
```dart
do {
  // 循环体
} while (condition);
```

**示例：**
```dart
int i = 0;
do {
  print('i = $i');
  i++;
} while (i < 5);
```

## 5. 跳转语句

### break 语句

`break` 语句用于终止循环或 switch 语句。

**示例：**
```dart
// 终止 for 循环
for (int i = 0; i < 10; i++) {
  if (i == 5) {
    break;
  }
  print('i = $i');
}

// 终止 while 循环
int i = 0;
while (i < 10) {
  if (i == 5) {
    break;
  }
  print('i = $i');
  i++;
}
```

### continue 语句

`continue` 语句用于跳过当前循环迭代，继续下一次迭代。

**示例：**
```dart
// 跳过偶数
for (int i = 0; i < 10; i++) {
  if (i % 2 == 0) {
    continue;
  }
  print('奇数: $i');
}
```

### return 语句

`return` 语句用于从函数中返回值，并终止函数的执行。

**示例：**
```dart
int add(int a, int b) {
  return a + b; // 返回 a + b 的值，并终止函数
}

void checkAge(int age) {
  if (age < 18) {
    print('未成年');
    return; // 终止函数
  }
  print('成年人');
}
```

## 6. switch-case 语句

`switch-case` 语句用于根据表达式的值执行不同的代码块。

**语法：**
```dart
switch (expression) {
  case value1:
    // 代码块
    break;
  case value2:
    // 代码块
    break;
  default:
    // 代码块
    break;
}
```

**示例：**
```dart
String fruit = '苹果';

switch (fruit) {
  case '苹果':
    print('这是苹果');
    break;
  case '香蕉':
    print('这是香蕉');
    break;
  case '橙子':
    print('这是橙子');
    break;
  default:
    print('未知水果');
    break;
}

// 使用 continue 标签
String grade = 'B';

switch (grade) {
  case 'A':
  case 'B':
    print('及格');
    break;
  case 'C':
  case 'D':
    print('不及格');
    break;
  default:
    print('无效成绩');
    break;
}
```

**注意：** 在 Dart 中，`switch-case` 语句的每个 case 都必须以 `break`、`return` 或 `continue` 结束，否则会导致编译错误。

## 7. assert 语句

`assert` 语句用于在开发过程中检查条件是否为 `true`，如果为 `false`，则会抛出异常。

**语法：**
```dart
assert(condition, optionalMessage);
```

**示例：**
```dart
int age = 15;
assert(age >= 18, '年龄必须大于等于 18'); // 开发模式下会抛出异常

// 仅在开发模式下生效
// 生产模式下 assert 语句会被忽略
```

**注意：** `assert` 语句只在开发模式下生效，在生产模式下会被忽略。

## 8. 流程控制综合示例

```dart
void main() {
  // 条件语句和三目运算符
  int score = 85;
  String result = score >= 90 ? '优秀' : score >= 80 ? '良好' : score >= 60 ? '及格' : '不及格';
  print('成绩评定: $result');

  // 逻辑运算符
  bool isAdult = true;
  bool hasID = false;
  if (isAdult && hasID) {
    print('可以进入');
  } else if (isAdult || hasID) {
    print('需要进一步检查');
  } else {
    print('不能进入');
  }

  // 空值运算符
  String? name = null;
  String displayName = name ?? '匿名用户';
  print('显示名称: $displayName');

  // 循环语句
  print('\n循环示例:');
  for (int i = 0; i < 5; i++) {
    if (i == 3) {
      continue; // 跳过 i = 3 的迭代
    }
    print('i = $i');
    if (i == 4) {
      break; // 终止循环
    }
  }

  // switch-case 语句
  print('\nSwitch 示例:');
  String day = '周一';
  switch (day) {
    case '周一':
    case '周二':
    case '周三':
    case '周四':
    case '周五':
      print('工作日');
      break;
    case '周六':
    case '周日':
      print('休息日');
      break;
    default:
      print('无效日期');
      break;
  }
}
```

## 9. 最佳实践

1. **使用空值运算符**：优先使用 `??`、`??=` 和 `?.` 运算符来处理可空类型，避免空指针异常。

2. **合理使用三目运算符**：三目运算符适用于简单的条件判断，复杂的条件判断应使用 `if-else` 语句。

3. **避免深度嵌套**：过多的嵌套会使代码难以阅读和维护，应尽量减少嵌套层次。

4. **使用 for-in 和 forEach**：对于遍历集合，优先使用 `for-in` 循环或 `forEach` 方法，使代码更简洁。

5. **使用 assert 进行调试**：在开发过程中，使用 `assert` 语句检查条件，帮助发现潜在问题。

6. **明确的 break 语句**：在 `switch-case` 语句中，确保每个 case 都有明确的 `break` 语句，避免意外的贯穿。

## 总结

Dart 提供了丰富的流程控制语句和操作符，包括：

- **条件语句**：`if-else`、三目运算符
- **逻辑运算符**：`&&`、`||`、`!`
- **空值运算符**：`??`、`??=`、`?.`、`!`
- **循环语句**：`for`、`while`、`do-while`
- **跳转语句**：`break`、`continue`、`return`
- **switch-case 语句**：根据值执行不同的代码块
- **assert 语句**：用于开发过程中的条件检查

通过合理使用这些流程控制工具，开发者可以编写更加清晰、高效、可靠的 Dart 代码。