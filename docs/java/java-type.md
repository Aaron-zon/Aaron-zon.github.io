---
outline: deep
---

# Java 数据类型

## 基本数据类型

- 整形（4个）： `byte`、`byte`、`byte`、`byte`
- 浮点型（2个）：`float`、`double`
- 字符型（1个）：`char`
- 布尔型（1个）：`boolean`

### byte 字节形

1 byte = 8 bit（比特）

每个 `bit` 可以为 0 或 1，因此 **8bit** 共有 **2的8次方** 个变化，共 **256** 种组合。

0 0000000

byte 中用第一个bit位，记录符号的正负，0代表正数，1代表负数

**取值范围：[-128 ~ 127]（[-2的7次方 ~ 2的7次方 - 1]）**


### short

1 short = 2 byte = 16 bit

**取值范围：[-32768 ~ 32767]**

### int

1 int = 4 byte = 32 bit

**取值范围：【-2147483648 ~ 2147483647】**

### long

1 long = 8 字节 = 64 bit

### float

4 byte = 32 bit

0 000000000 0000...

第1bit位用来记录小数的正负，后9bit用来计算整数，再后的所有表示小数部分

### double

8 byte = 64 bit

0 0000000000000000000 0000...

第 1bit 来记录小数的正负，后 19bit 用来计算整数，再后的所有表示小数部分

### char

1 char = 16 bit

## 引用数据类型

- 数组（Array）
- 类（Class）
- 接口（interface）
- 枚举（enum）
- 注解（@interface）
- ...


