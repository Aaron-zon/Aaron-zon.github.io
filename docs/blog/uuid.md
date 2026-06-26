# UUID

UUID（通用唯一标识符）是一种用来表示信息的128位标识符。

简单来说就是一个不会重复得随机ID。

通常用于：数据库主键、分布式系统、文件标识等场景。

## UUID 长什么样？

典型格式是：

```
550e8400-e29b-41d4-a716-446655440000
```

特点：

- 由 32个16进制字符 + 4个“-”
- 共36个字符
- 看起来像一串随机字符串

## 在分布式中UUID解决什么问题？

核心目标：**在不依赖中心数据库得情况下，保证全局唯一**

比如：

- 多台服务器同时产生用户ID
- 分布式系统生成订单号
- 离线环境生成唯一标识

不用像自增ID那样依赖数据库。

## UUID的版本

UUID有多个版本，常见的有

| 版本 | 特点           |
| -- | ------------ |
| v1 | 基于时间 + MAC地址 |
| v3 | 基于MD5        |
| v4 | 完全随机（最常用）    |
| v5 | 基于SHA-1      |

其他版本（2、6、7等）：用于特定需求或实验性实现，Version 2 基于DCE安全标注，Version 6/7 为时间排序优化版本。

目前开发中最常见的是：UUID v4。

## 优缺点

优点：

- 全局唯一
- 不依赖数据库
- 是和分布式系统

缺点：

- 太长，不适合人工阅读
- 无序（影响数据库索引性能）
- 占用空间比 int/long 大

## 生成UUID

### Java

```java
import java.util.UUID;

public class Test {
    public static void main(String[] args) {
        String id = UUID.randomUUID().toString();
        System.out.println(id);
    }
}
```

### Python

```python
import uuid

# 字符串 uuid
id = str(uuid.uuid4())

# 不带横杠版
id2 = uuid.uuid4().hex
```

### Node

**安装**

```bash
npm install uuid
```

**生成 UUID v4**

```js
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();
console.log(id);
```

## UUID 为什么带横杠

这不是必须格式，本质上是 **为了可读性和规范分段表示**。

分段方式是：

```
8-4-4-4-12
```

```
550e8400-e29b-41d4-a716-446655440000
```