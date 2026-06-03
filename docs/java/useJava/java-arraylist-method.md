---
outline: deep
---

# ArrayList

## ArrayList 常用方法

- **boolean add(E e)**: 将指定元素添加到列表尾部
- **void add(int index, E e)**: 将指定元素插入此列表中指定位置
- **boolean addAll(Collection c)**: 按照指定 collection 的迭代器所返回的元素顺序，将该collection中所有的元素添加到此列表尾部
- **boolean addAll(int index, Collection c)**: 从指定的位置开始，将指定 collection 中的所有元素插入到此列表中
- **void clear()**: 移除此列表中的所有元素。
- **Object clone()**: 返回此 ArrayList 实例的浅表副本。
- **boolean contains(Object o)**: 如果此列表中包含指定的元素，则返回 true。
- **E get(int index)**: 返回此列表中指定位置上的元素。
- **int indexOf(Object o)**: 返回此列表中首次出现的指定元素的索引，或如果此列表不包含元素，则返回 -1。
- **boolean isEmpty()**: 如果此列表中没有元素，则返回 true
- **int lastIndexOf(Object o)**: 返回此列表中最后一次出现的指定元素的索引，或如果此列表不包含索引，则返回 -1。
- **E remove(int index)**: 移除此列表中指定位置上的元素。
- **boolean remove(Object o)**: 移除此列表中首次出现的指定元素（如果存在）。
- **protected void removeRange(int fromIndex, int toIndex)**: 移除列表中索引在 fromIndex（包括）和 toIndex（不包括）之间的所有元素。
- **E set(int index, E element)**: 用指定的元素替代此列表中指定位置上的元素。
- **int size()**: 返回此列表中的元素数。
- **Object[] toArray()**: 按适当顺序（从第一个到最后一个元素）返回包含此列表中所有元素的数组。
- **T[] toArray(T[] a)**: 按适当顺序（从第一个到最后一个元素）返回包含此列表中所有元素的数组；返回数组的运行时类型是指定数组的运行时类型。
- **void trimToSize()**: 将此 ArrayList 实例的容量调整为列表的当前大小。
- **Arrays.asList("A", "B", "C", ...)**: 将数组转换为集合

## stream

### 1.遍历（forEach）

传统写法：

```java
for (String s : list) {
    System.out.println(s);
}
```

Stream:

```java
list.stream().forEach(System.out::println);
```

### 2.过滤（fillter）

找出长度大于3的名字：

```java
List<String> result = list.stream()
    .filter(s -> s.length() > 3) // 过滤
    .toList(); // 转回数组
```

### 3.转换（map）

全部转大写

```java
List<String> result = list.stream()
    .map(String::toUpperCase)
    .toList();
```

### 4.去重（distinct）

```java
List<String> result = list.stream()
    .distinct()
    .toList();
```

### 5.排序（sorted）

升序：

```java
List<String> result = list.stream()
    .sorted()
    .toList();
```

降序：

```java
List<String> result = list.stream()
    .sorted(Comparator.reverseOrder())
    .toList();
```

### 6.限制数量（limit）

取前3个：

```java
List<String> result = list.stream()
    .limit(3)
    .toList();
```

### 7.跳过前N个（skip）

```java
List<String> result = list.stream()
    .skip(2)
    .toList();
```

### 8.查找第一个（findFirst）

```java
Optional<String> first =
    list.stream()
        .findFirst();

// 取值：
first.ifPresent(System.out::println);
```

### 9.判断是否存在（anyMatch）

判断是否存在Tom

```java
boolean exist = list.stream()
    .anyMatch("Tom"::equals);
```

### 10.是否全部满足（allMatch）

```java
boolean allMatch = list.stream()
    .allMatch(s -> s.length() > 3);
```

### 11.是否全部不满足（noneMatch）

```java
boolean result = list.stream()
    .noneMatch("Admin"::equals);
```

### 12.统计数量（count）

```java
long count = list.stream()
    .filter("Tom"::equals)
    .count();
```

### 13.求和

```java
int sum = nums.stream()
    .mapToInt(Integer::intValue)
    .sum();
```

### 14.最大值/最小值

最大值：

```java
int max = nums.stream()
    .mapToInt(Integer::intValue)
    .max()
    .orElse(0);
```

最小值：

```java
int min = nums.stream()
    .mapToInt(Integer::intValue)
    .min()
    .orElse(0);
```

### 15.Collect 转 List

```java
List<String> result = list.stream()
    .filter(s -> s.length() > 3)
    .collect(Collectors.toList());
```

Java 16+：

```java
.toList()
```

即可。

### 16.转Set

```java
Set<String> set = list.stream()
    .collect(Collectors.toSet());
```

自动去重。

### 17.字符串拼接

```java
String result = list.stream()
    .collect(Collectors.joining(","));
```

### 18.分组（groupingBy）

统计名字出现次数：

```java
Map<String, Long> map =
    list.stream()
        .collect(
            Collectors.groupingBy(
                s -> s,
                Collectors.counting()
            )
        );
```

### 19.转Map

假设：

```java
class User {
    private Long id;
    private String name;
}
```

```java
Map<Long, User> map =
    users.stream()
         .collect(
             Collectors.toMap(
                 User::getId,
                 Function.identity()
             )
         );
```

等价于：

```java
Map<Long, User> map = new HashMap<>();

for (User user : users) {
    map.put(user.getId(), user);
}
```

结果：

```java
1 -> User
2 -> User
3 -> User
```

### 19.转`Map<List>`

以id为key:

```java
Map<Long, List<User>> map =
    users.stream()
        .collect(
            Collectors.groupingBy(
                User::getId
            )
        );
```

以 id + '-' + name 为key：

```java
Map<String, List<User>> map =
    users.stream()
        .collect(
            Collectors.groupingBy(
                user -> user.getId() + "-" + user.getName()
            )
        );
```