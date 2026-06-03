---
outline: deep
---

# HashMap

## 1.HashMap的数据结构

> HashMap = 数组 + 链表 + 红黑树（JDK8）

- Java7: 使用 `Entry<K, V>[] table` 数组，每个 `Entry` 是链表节点
- Java8+：改为 `Node<K, V>[] table`，当链表长度超过阈值时，转为红黑树（TreeNode）

```java
// Java 8 的 Node 定义
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;    // 哈希值
    final K key;
    V value;
    Node<K,V> next;    // 链表指针
    // ...
}
```

### put() 原理

例如：

```java
map.put("Tom", "20");
```

1. 计算hash值，确定在table中的位置

```java
int hash = key.hashCode(); 

// 这里的的key就是"Tom"，相当于
// "Tom".hashCode() = 84274
```

2.扰动运算

JDK8：

> hash ^ (hash >>> 16)

源码：
```java
static final int hash(Object key) {
    int h;
    return (key == null)
        ? 0
        : (h = key.hashCode()) ^ (h >>> 16);
}
```
目的是，让高位参与运算。

例如：

```
原hash：

10101010 11110000

右移16位：

00000000 10101010

异或：

10101010 01011010
```

这样哈希更匀称。

3.计算数组下标

```java
capactity = 16
```

计算：

```java
index = (n - 1) & hash

// 即 15 & hash
```

例如：

```
    hash = 10110101
    15   = 00001111
    结果 = 00000101
```

得到：

```
index = 5
```

放到：

```
table[5]
```

4.创建Node对象

```java
static class Node<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}


new Node(
    hash,
    "Tom",
    18,
    null
)
```

然后放入数组中

```java
table

0 -> null
1 -> null
2 -> null
3 -> null
4 -> null
5 -> Node(Tom,18)
6 -> null
7 -> null
...
```

注意由于计算出的索引是5因此就放到5的位置，不必在意前面的空间是否空着，HashMap 根本不关心是否连续。

并且这里村的并不是数据，而是地址。

5.hash冲突的场合

由于是使用key做的hash，那么是有可能出现hash冲突的

例如：

```java
map.put("Tom",18);
map.put("Jack",20);

二者计算的index都是5

Tom -> index=5
Jack -> index=5
```

这就发生了哈希冲突

但是并不用担心，之前就说过table[5]存储的是地址而非数据，更准确来说存的是链表头节点。

真实结构：

```
table
------------------------------------------------

0 -> null

1 -> null

2 -> null

3 -> null

4 -> null

5 -> Node
        |
        + hash=123
        + key=Tom
        + value=18
        + next ----> Node
                           |
                           + key=Jack
                           + value=20

6 -> null

7 -> null
```

这里我们可以看到，table[5]通过链表的地址找到了数据Tom，而数据Tom通过next连接着数据Jack。

在查询Jack时

```java
get("Jack");
```

Hash会再次计算索引： `index = 5`

直接定位到：`table[5]`

然后比较：

```java
Tom.equals(Tom)

也就是：

"Jack".equals(node.key)
```

匹配成功就返回数据，匹配失败就顺着next向下寻找。

**那么这个时候又有老铁要问了，A哥A哥，红黑树哪里去了？**

之前也说了，链表长度超过阈值时会转为红黑树

我们将table的每一个索引为叫做 `哈希桶`，table[5] 也就是5号哈希桶。

当连续几次插入的Key都卡后落在5号桶里时，这是链就会拉的很长，查询时就会很慢。

JDK8规定：

```
TREEIFY_THRESHOLD = 8
且
MIN_TREEIFY_CAPACITY = 64
```

即：
```
链表长度 >= 8

HashMap数组容量 >= 64时就会触发
```

此时就会将链表转为红黑树。

查找方式相同，只不过有了红黑树的特性，查询速度更快。

## 2.什么是红黑树

> 红黑树是一种通过颜色标记和旋转操作实现自平衡的二叉查找树，能够保证查询效率。

**颜色标记**：是维护平衡的手段，它相当于一种标记，帮助红黑树判断什么时候需要调整

红黑树插入新节点时默认为红色，如果到插入结束后，发现不满足红黑树的特性，那么就会触发旋转，重新构建平衡的二叉树，构建的过程就是旋转

**旋转**：在不改变节点大小关系的前提下，调整树的形状，让树更平衡

**二叉搜索树(BST)**: 红黑树是特殊的二叉查找树，因此也要满足二叉搜索树的条件

例如存放：

```
10 5 15 3 7 12 18
```
构建出来：
```
        10
       /  \
      5    15
     / \   / \
    3  7 12 18
```
规则：
```
左子树 < 根节点 < 右子树
```

**注意**：

颜色标记是判断是否旋转的条件之一，不是唯一条件，实际上还要满足以下条件
- 满足BST
- 每个节点要么是红色，要么是黑色
- 红节点不能连续
- 从任意节点到叶子节点经过的黑色节点数必须相同

## 3.为什么需要链表，链表有是什么样子的？

数组的长度是有限的，在有限的长度里我们使用hash，哈希本身就存在概率性。

在put的例子中已经有说明，当多个数据指向同一个哈希桶时，我们就需要依靠链表的next对数据进行关联。

链表的结构：

```java
static class Node<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}
```

## 4.新的Entry节点在插入链表的时候，是怎么插入的？

Entry节点，这是JDK7之前的叫法，使用的是头插法。

例如：

```java
map.put("Tom",18);
map.put("Jack",20);
map.put("Lucy",22);
```

假设都落到 table[5] 上，插入时：

```java
// 插入 Tom

table[5] -> Tom

// 插入Jack

table[5] -> Jack - Tom

// 插入Lucy

table[5] -> Lucy - Jack - Tom

```

新的会放在最前面。

这种方式就叫做头插法。

而在JDK8之后，改为了 **尾插法**

还是上面的例子：
```java
// 插入 Tom

table[5] -> Tom

// 插入Jack

table[5] -> Tom - Jack

// 插入Lucy

table[5] -> Tom - Jack - Lucy
```

## 5.为什么JDK8改成尾插法？

主要有两个原因。

### 1.扩容时更容易维护顺序

JDK8 引入红黑树

树化过程中需要保持节点顺序稳定，尾插法更容易处理

### 2.解决了JDK扩容死循环问题

JDK7在执行扩容（resize）时，如果同时有两个线程同时同时进行数据迁移，如果交错执行很可能出现死循环。

比如：

HashMap 的容量是 2

```java
HashMap<String,Integer> map = new HashMap<>(2);
```

阈值：

```
2 * 0.75 = 1
```

插入第一个元素时正常，在插入第二个元素时，由于内部空间不足就会触发 `resize`, 这在但线程中是没问题的。

但是如果两个线程同时进行扩容

- 线程1：Thread-1
- 线程2：Thread-2

同时执行 `map.put(...)`，同时发现需要 `resize`，于是两个线程同时开始迁移。

初始状态

```
table[5]
   |
Entry(A)
   |
Entry(B)
   |
Entry(C)
```

**Thread-1执行：**

```java
next = A.next
```

得到 `next -> B`

然后 CPU 切换。

**Thread-2执行：**

也开始处理 A。

```java
next = A.next;
```

得到 `next -> B`

执行：

```java
A.next = null

newTable = A
```

此时新链表: `A - null`

再处理 B，执行：`B.next = A`

得到新链表：`B - A - null`

**CPU切回 Thread-1**

此时 Thread-1 还以为 `A.next = B`，因为它之前保存了 `next = B`，但实际上 `A.next 已经被 Thread-2 修改了`

于是两个线程开始互相修改 `A.next` 和 `B.next` 的指向。

最终可能形成

```
A
↓
B
↑
│
└───
```

即：

```
A.next = B;
B.next = A;
```

形成环状。

在进行get()时，会顺着 `next` 一直向下查找，形成死循环。

导致 CPU 占用过高，线程卡死，程序假死。

## 6.什么是resize，什么时候resize呢？

JDK7扩容（resize）

假设：

```java
table[5]

A -> B -> C
```

扩容时需要迁移。

JDK7的迁移逻辑是：

```java
// 第一次循环 e = A
// next = e.next = B
Entry next = e.next;

// newTable[i] 初始应该为 null
// 因此 e.next = null
e.next = newTable[i];

// newTable[i] = e = A
newTable[i] = e;

// e = next = B
e = next;

// 此时 newTable[i] = A

// 第二次循环 e = B
// next = e.next = C
Entry next = e.next;

// 经过上次循环 newTable[i] = A
// 因此 e.next = A
e.next = newTable[i];

// newTable[i] = e = B
newTable[i] = e;

// e = next = C
e = next;

// 此时 newTable[i] = B -> A

// 第三次循环 e = C
// next = e.next = null
Entry next = e.next;

// 经过上次循环 newTable[i] = B
// 因此 e.next = B
e.next = newTable[i];

// newTable[i] = e = C
newTable[i] = e;

// e = next = null
e = next;

// 此时 newTable[i] = C -> B -> A
```

三次循环后我们发现原链表在钱以后顺序调转了，这就是头插法的扩容方式。

**注意**：上述虽然是扩容时的计算方式，但是在JDK7中，即使不进行扩容，依旧是新插入的在前。

## 7.为什么resize不直接复制链呢，而是要使用这么复杂的处理呢？

这是由于扩容后HashMap的容量改变了，而计算哈希桶的时候需要用到容量，一旦直接复制，在 `增删改查` 时有可能查不到准确的哈希桶。

假设当前容量：

```
capactiy = 16
```

Tom 的 hash：

```
hash = 21
```

在计算哈希桶的时候

```
index = (16 - 1) & 21 = 5
```

但是扩容之后：

```
capactiy = 16 -> 32
```

哈希桶的计算就变为了：

```
index = (32 - 1) & 21 = 5
```

与之前的哈希桶不是一个了，如果resize时不重新计算保存，就会发生错误。

所以扩容时必须要重新计算每一个节点在新容量下应该落到哪个桶。

这步叫做： `Rehash（重新定位）`

**注意**：以上是JDK7时的顾虑在JDK8中有了更好的解决办法，下标不用完整重算（当然还是要计算，只是不那么麻烦）

因为容量始终是 2 的幂

节点只会是：**原位置** 或 **原位置 + oldCap（原来的容量）**

例如： 16 扩容到 32，数据原来在哈希桶中的位置是 5，那么现在就会使 `5` 或 `5 + 16 = 21`。

以下是详细计算

- 原始容量(oldCap)：16
- 扩容容量(cap)：32
- Tom的哈希(hash)：21

原下标计算：

```
index = hash & (oldCap - 1)
index = hash & 15


15（二进制） = 01111
21（二进制） = 10101

index = 01111 & 00101 = 5
```

扩容到32后的下标计算：

```
index = hash & (cap - 1)
index = hash & 31

31（二进制） = 11111
21（二进制） = 10101

index = 10101 & 11111 = 21
```

注意变化：

```
扩容前：
15 = 0 1111
扩容后：
31 = 1 1111
```

前后低4位完全没变化，只多出了一个最高位。

所以我们可以得出结论

> JDK8 resize时，节点的位置要么不变，要么移动oldCpa


## 8.尾插法是怎么样的呢？

> 永远插到链表尾部

假设原链表为：`A - B - C`

迁移到新的桶里时

```
第一步：先处理A

head（头）= A
tail（尾）= A

第二步：处理B
tail.next =B
tail = B

此时 A - B

第三步：处理C
tail.next = C
tail = C

此时：A - B - C
```

最终结果与迁移前一致。

## 9.那是不是意味着Java8就可以把HashMap用在多线程中呢？

不是的，虽然修复了死循环的问题，但是线程依旧还是不安全的，线程安全问题从事自终都没有解决。

当然也不需要解决，因为同ArrayList一样，线程安全和效率二者不可兼得。

HashMap本就不是为多线程准备的。

JDK8只是修复了一个严重的Bug（死循环），不是把HashMap改造成了线程安全的集合。

## 10.HashMap的默认初始化长度是多少，负载因子是多少？

HashMap 的**默认初始容量（Initial Capacity）**是：`16`。

负载因子为：`0.75f`。

```java
static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;
```

不过这里有一个容易被忽略的细节：

JDK8 之后并不会立即创建长度为16的数组

当你执行：

```java
HashMap<String, Integer> map = new HashMap<>();
```

此时：

```java
table == null
```

数组还没有被创建，只有当第一次 `put()` 时才会触发 `resize()`，进行创建，这和ArrayList的机制很像。

## 11.为什么是16？

这是一个统计后的结果。

Oracle团队发现，绝大部分Map，元素数量在几个到十几个。

16的容量和其扩容后的结果可以覆盖很多场合。同时16个哈希桶占用的内存也不算大。

综合多方面的考量，最终选择了16作为默认值。

## 12.为什么重写equals方法的时候需要重写hashCode方法呢？

> 如果重写了 `equals()` 方法，通常必须重写 `hashCode()`。
> 否则HashMap、HashSet等基于哈希的容器会出现逻辑错误。

在Object中，`equals()` 和 `hashCode()` 是两个独立的方法。

但是 `a.equals(b) == true`，那么必须满足 `a.hashCode() == b.hashCode()`

即：equals相等，hashCode一定相等。

反过来则不一定成立，毕竟哈希冲突是允许的。

举个栗子：

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }
}
```

创建两个对象：

```java
Person p1 = new Person("Tom");
Person p2 = new Person("Tom");
```

默认情况下：p1.equals(p2) == false

因为 Object 默认比较是地址。

业务上我们想让他们相等，因此需要重写 `equals()` 方法。

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        Person p = (Person) obj;
        return Objects.equals(name, p.name);
    }
}
```

此时：p1.equals(p2) == true

因为：Tom == Tom

没有重写hashCode，看似没有问题，但是当我们使用带哈希的集合时，问题就会暴露。

**HashSet**:

```java
Set<Person> set = new HashSet<>();
set.add(p1);
set.add(p2);
```

业务上我们认为p1和p2是同一个人，应该只有一条记录，可实际上却生成了两条记录。

因为hashCode和地址有关，因此：

```
p1.hashCode() 可能为 123456

p2.hashCode() 可能为 789456
```

现在的情况是 `equals == true` 但是 `hashCode` 不同。

由于两个元素的hashCode不同，导致他们的哈希桶不同，根本不会调用equals();

**HashMap**:

在查找时，第一步会先使用`hashCode()`，获取参数的哈希，定位桶的位置。

然后使用 `equals()` 比较Key是否相等。

源码思想：

```java
if (node.hash == hash
        && key.equals(node.key)) {
    return node;
}
```

因此：

```java
Person p1 = new Person("Tom");
Person p2 = new Person("Tom");

map.put(p1, "程序员");

map.get(p2); // 结果：null
```

此时虽然 p1.equals(p2) == true，但是 `p1.hashCode() != p2.hashCode()`，因此不会命中。

**正确做法**

重写 `equals()` 的同时也要重写 `hashCode()`

```java
class Person {
    String name;

    Person(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Person)) {
            return false;
        }

        Person p = (Person)obj;

        return Objects.equals(name, p.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

}
```

此时hashCode()返回的是name的哈希值，这样就能保证p1和p2的hashCode相同。

## 13.为什么HashMap要如此比较呢？

如果只靠 `equals()` 查找，那每次都要遍历所有元素，时间复杂度为 `O(n)`

而引入 `hashCode()` 后，先定位桶 `O(1)` 再比较 `equals`，效率将大大提升。

## 14.怎么处理HashMap在线程安全的场景？

### 1.ConcurrentHashMap（最推荐）

适合绝大多数场景

```java
Map<String, Object> map = new ConcurrentHashMap<>();
```

优点：
- 线程安全
- 并发行额能搞
- JDK8后实现非常优秀
- 读操作基本无锁

```java
ConcurrentHashMap<String,Integer> map =
        new ConcurrentHashMap<>();

map.put("Tom",18);

Integer age = map.get("Tom");
```

### 2.Collections.synchronizedMap()
JDK 提供的同步包装：

```java
Map<String,Object> map =
    Collections.synchronizedMap(
        new HashMap<>()
    );
```

内部其实就是：

```java
synchronized(lock) {
    ...
}
```

把所有方法锁起来。

类似：

```java
public V get(Object key) {
    synchronized (mutex) {
        return map.get(key);
    }
}
```

优点：
- 使用简单

缺点：
- 整个Map一把锁
- 并发性能差

适合场景：
- 线程不多
- 并发不高

### 3.Hashtable（老方案）

```java
Hashtable<String,Object> table =
    new Hashtable<>();
```

Hashtable 比 HashMap 早，内部很多方法都被 `synchronized` 修饰。

```java
public synchronized V put(...)

public synchronized V get(...)
```

缺点：
- 锁颗粒度太大
- 性能差
- 基本可以被ConcurrentHashMap取代

### 4.自己加 synchronized

```java
private final Map<String,Object> map =
        new HashMap<>();
```

写入：

```java
synchronized(map) {
    map.put("Tom",18);
}
```

读取：

```java
synchronized(map) {
    return map.get("Tom");
}
```

适合：
- 业务代码少量同步

不适合：
- 高并发

