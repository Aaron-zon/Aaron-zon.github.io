---
outline: deep
---

# 类型转换

## 1.同种数据类型

同种数据类型之间实可以直接进行赋值操作的

```java
// 同为 int 类型
int a = 1;
int b = a;

// 同为 float 类型
float x = 3.4;
float y = x;
```

## 2.不同种数据类型

不同数据类型之间转换，需要注意转换问题。

### 自动类型转换（隐式转换）

小 -> 大

小数据类型，可以向大数据类型进行自动转换，如： `int -> long`、`float -> double`.

顺序：

```
byte → short → int → long → float → double
       ↑
      char
```

例：

```java

int a = 10
double b = a; // b = 10 自动转换 int -> double

```

**注意：**

- `boolean` 不参与数值类型转换。
- `char` 可以转换为 `int`（对应 Unicode 编码）

### 强制类型转换（显示转换）

大 -> 小

**必须使用强制强制转换符** `(type)`

可能 **丢失精度或溢出**

例:

```java

double d = 9.78;
int i = (int) d; // i = 9

```

风险：

```java

int x = 130;
byte y = (byte) x; // y = -126 （因为超过了 byte的最大值范围，因此溢出）
```

## 3.基本类型 与 包装类

每个基本类型都有与其对应的引用类型（包装类），在进行转换时会进行自动 装箱/拆箱。

### 自动装箱

基本类型 -> 包装类

自动装箱会将同种类型的基本类型转换为包装类

```java

int n = 10
Integer obj = n; // 自动装箱

```

### 自动拆箱

包装类 -> 基本类型

自动拆箱会将同种类的包装类转换为基本类型

```java

Integer obj = 20;
n = obj; // 自动拆箱

```

**注意：**

- 装箱/拆箱 底层通过 `Integer.valueOf()` 与 `Integer.intValue()` 实现。
- 若对象为 `null`，拆箱会抛出 `NullPointerException`。

## 4.基本类型 与 字符串

**基本类型 → 字符串**

```java
int a = 10;
String s1 = String.valueOf(a);
String s2 = Integer.toString(a);
String s3 = a + ""; // 拼接

```

**字符串 → 基本类型**

```java
int a = Integer.parseInt("123");
double b = Double.parseDouble("3.14");
boolean c = Boolean.parseBoolean("true");

```

**注意：**

- 若字符串格式非法，会抛出 NumberFormatException。

## 5.引用类型

**向上转型**

子类 → 父类（自动）

```java

Animal a = new Dog();  // 自动类型提升

```

**向下转型**

父类 → 子类（需强制转换）

```java
Animal a = new Dog();
Dog d = (Dog) a;  // 合法

Animal a2 = new Animal();
Dog d2 = (Dog) a2;  // 运行时错误 ClassCastException
```

**安全判断：** 为预防错误，可加入判断要转换的对象是否属于目标类

```java
if (a instanceof Dog) {
    Dog d = (Dog) a;
}
```

## 6.基本类型 与 引用类型

| 转换方向          | 是否允许 | 示例              | 注意事项    |
| ------------- | ---- | --------------- | ------- |
| 基本 → 基本       | ✅    | `int → double`  | 自动或强制转换 |
| 包装类 ↔ 基本      | ✅    | `Integer ↔ int` | 自动装箱/拆箱 |
| 基本 ↔ 引用（非包装类） | ❌    | 不允许             | 不能直接转换  |
| 引用 ↔ 引用       | ✅    | `Dog ↔ Animal`  | 需类型兼容   |
| 基本 ↔ String   | ✅    | `int ↔ String`  | 使用工具方法  |


## 7.其他注意点

- 1.`boolean` 不能与其他类型互相转换
- 2.拆箱时若对象为 `null`，抛出异常 `NullPointerException`
- 3.强制类型转换可能造成溢出
- 4.`instanceof` 用于放置向下转型错误
- 5.JDK5之后自动拆箱、自动装箱简化了代码，但是要注意性能与空指针风险


