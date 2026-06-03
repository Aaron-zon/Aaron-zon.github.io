---
outline: deep
---

# ArragList

## 1.ArrayList是什么东西？可以用来做什么？

ArrayList 时数组列表，用来装载数据，当我们装载的是基本类型的数据（如：int、long、boolean、byte等）时，我们只能存储他们对应的包装类（也就是：Integer、Long、Boolean、Byte）。

他的主要底层实现是数组 Object[] elementData；

与它类似的是 LinkedList，与LinkedList相比，他的查找和访问元素的速度较快，但新增，删除的速度较慢

**小结**：ArrayList 底层用的是数组是实现的存储

**特点**：查询效率高，增删效率低，线程不安全。使用频率高。

## 2.为什么ArrayList照比LinkedList查找快，增删慢

这与二者的数据结构有关。

ArrayList底层是连续数组:

```java
索引   0    1    2    3
       ↓    ↓    ↓    ↓
      [A]  [B]  [C]  [D]
```

LinkedList底层是双向链表：

```java
A ⇄ B ⇄ C ⇄ D
```

每个节点包含了自身和上下两个元素

```java
class Node<E> {
    E item;

    Node<E> prev;
    Node<E> next;
}
```

### 为什么ArrayList查找快？

因为ArrayList只需要按照索引查找，事件复杂度O(1)。

无论：
```
get(2)
get(100)
get(10000)
```
都是一次定位

而LinkedList需要沿着链表走：

```java
A -> B -> C
```

相当于进行了遍历，取第几个要便利几次，事件复杂度是 O(n)

例如：

```java
get(50000);
```

可能要遍历 50000 次。

### 为什么ArrayList增删慢？

- 删除时：数据可能要变换位置
- 增加时：ArrayList还可能要考虑扩容问题，扩容时还需要复制数据

假设进行数据删除

```java
list.remove(1);

// 原集合： ['A', 'B', 'C', 'D']
// 新集合： ['A', 'C', 'D']
```

由于数组必须保持连续，因此删除B后，C和D都会左移，如果集合很大，那么性能损失会非常大，

时间复杂度 ：O(n)

**LinkedList删除**

原来：

```java
A ⇄ B ⇄ C ⇄ D
```

删除 B：

```java
A ⇄ C ⇄ D
```

只需修改指针：

```java
A.next = C;
C.prev = A;
```

时间复杂度：O(1)

因此常说ArrayList删除慢，而LinkedList删除快

但是实际应用上，因为各种原因，可能并不如此。

因为真正进行删除功能时，还需要查询定位要删除的元素。

假设：
```java
linkedList.remove(50000);
```

要先找到第50000个节点：
```java
头节点
 ↓
1
 ↓
2
 ↓
3
 ...
 ↓
50000
```

查找过程：`O(n)`

然后删除：`O(1)`

总计：`O(n)`

而ArrayList虽然要移动元素，但是这是JVM调用底层C是西安的，

```
连续内存复制
CPU缓存友好
```

因此经常测试出现：

```
ArrayList.remove()
比
LinkedList.remove()
更快
```


**关于CPU缓存影响**

ArrayList:
```
[A][B][C][D][E]
```
它时连续存储，CPU一次缓存读取4个元素，因此ArrayList的读取速度非常快。

LinkedList：

```
A
 ↓
B
 ↓
C
 ↓
D
```

节点分散在堆内存：

```
0x1234
0x9876
0xABCD
0x5678
```

CPU缓存命中率极低。

需要不停：

```
指针跳转
读取内存
指针跳转
读取内存
```
这非常慢。

## 3.为什么线程不安全还使用它呢？

虽然ArrayList线程不安全，但仍是Java中使用最多的集合之一，原因很简单：

> 绝大多数代码根本不需要线程安全

很多初学者会有一个误区：

> 线程安全 == 更好

实际上：

> 线程安全 == 额外开销

### **1.大部分程序运行在单线程上下文**

```java
public void saveUser() {
    List<String> users = new ArrayList<>();
    users.add("Tom");
    users.add("Jerry");
}
```

这里的 `user` 是方法内部变量：

- 当前线程创建
- 当前线程使用
- 方法结束就销毁

因此根本不存在多个线程同时访问的问题，因此ArrayList完全够用。

### **2.线程安全需要付出性能代价**

我们来举两个例子

```java
// ArrayList

list.add("A");

// ArrayList内部大概是这样直接操纵数租
elementData[size++] = "A";
```

```java
// Vector 线程安全版本

public synchronized boolean add(E e) {
    ...
}
```

add每次运行时：
- 加锁
- 解锁

都会产生额外开销

假如我们执行1000万次add，那么差距会非常明显。

因此JDK的设计理念是：
> 默认提供最快速的实现，在需要线程安全时再额外处理

### **3.真正的并发场景也不一定需要线程安全的集合**

很多高并发项目中依然大量使用 ArrayList;

因为：
- 查询结果属于当前请求
- 当前线程独占
无需同步

### **4.现代开发更多实用"线程隔离"**

例如Web项目：

```
请求A -> 线程1
请求B -> 线程2
请求C -> 线程3
```

每个请求中使用 ArrayList。

因为相互不共享因此ArrayList依旧可以安全使用。

### **5.真正需要共享时有更好的选择**

#### Collections.synchronizedList搭配ArrayList

```java
List<String> list =
    Collections.synchronizedList(
        new ArrayList<>()
    );

list.add("A");
```

其内部相当于

```java
synchronized(lock) {
    list.add(x);
}
```

**优点**

改造成本低，仅需再 `new ArrayList` 外加一个方法嵌套，就完成了线程安全的改造

**缺点**

所有操作共用一把锁

```java
add()
get()
remove()
size()
```
都会竞争同一个锁。

如100个线程读取，每个读取线程也会相互阻塞，性能一般

#### CopyOnWriteArrayList

适合：
- 读多
- 写少

例如：
- 配置缓存
- 监听器列表
- 黑名单列表

这是JUC（java.util.concurrent）专门设计的并发容器。

**工作原理**

假设当前数组：

```java
[A, B, C]
```

线程执行：

```java
list.add("D");
```

不会直接修改原数组，而是：

```java
[A, B, C]
|
复制
|
[A, B, C]
|
修改
|
[A, B, C, D]
```

**优点**

读取完全无锁：

```java
list.get(i);
```

直接访问数租。

多个线程同时读取时互不影响

#### 加锁控制

```java
private final ReentrantLock lock =
        new ReentrantLock();

lock.lock();
try {
    list.add(x);
} finally {
    lock.unlock();
}
```

很多时候比使用线程安全集合更灵活。

## 4.既然ArrayList底层是数组，但数组是定长的，那么ArrayList如何处理不断添加的数据

这是 ArrayList 最核心的设计之一：**动态扩容**。

数组本身确实是定长的，创建长度如果设定为10，那么就不能变为11.

而 ArrayList 的做法是：空间不够时，创建一个更大的数组，然后把旧数据复制过去。

**扩容规则**

从JDK8开始，扩容规则为：

```java
newCapacity = oldCapacity + (oldCapacity >> 1);

// 即：
// 新容量 = 旧容量 * 1.5
```

例如：

| 原容量 | 新容量 |
| --- | --- |
| 10  | 15  |
| 15  | 22  |
| 22  | 33  |

**为什么不是翻倍？**

也有很多语言采取了2倍扩容。

优点：扩容次数少
缺点：浪费内存空间

Java选择1.5倍扩容是再扩容次数和内存空间之间做了平衡

**初始长度？**

这里有两种情况

1.设定了容量的场合：

```java
new ArrayList<>(100);
```

底层创建了 `new Object[100]`，容量为100

2.无参构造的场合：

很多人以为默认值是10，但事实上不是。

JDK8以后

```java
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
```

容量为0，只有当第一次添加数据时，才会分配默认初始容量为 `DEFAULT_CAPACITY`

```java
DEFAULT_CAPACITY = 10
```

内部变化：

```java
创建时：
[]

第一次add后：
容量10

第11次add：
容量15

第16次add：
容量22
```

**扩容昂贵吗？**

扩容本身是昂贵的

```java
Arrays.copyOf(...)
```

需要复制整个数组。

例如：有100万数据，在复制时100万个索引成本并不低。

因此如果你提前知道数量，可以指定初始容量，避免扩容带来的性能损耗。


## 5.既然数组的长度是有限制，那么ArrayList的长度有限制吗？

有。

因为 **ArrayList 本质上就是对数组的封装**，所以它最终也受数组长度限制。

**ArrayList 的底层**

源码里最核心的成员变量：

```
transient Object[] elementData;
```

所有元素都存放在这个数组里。

所以：

> ArrayList 的最大容量 ≈ Object[] 的最大容量

JDK源码中的限制:

在ArrayList源码中有：

```java
private static final int MAX_ARRAY_SIZE =
    Integer.MAX_VALUE - 8;
```

扩容会检查：

```java
if (newCapacity > MAX_ARRAY_SIZE)
```

所以理论上限应该在21亿左右。

另外实际过程中，由于内存限制，可能远低于这个数字。
