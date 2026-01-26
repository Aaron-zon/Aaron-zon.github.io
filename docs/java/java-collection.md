---
outline: deep
---

# Java 集合框架

## 集合框架概述

集合框架是Java提供的一套用于存储和操作数据的接口和类，位于`java.util`包下。它提供了更灵活、更高效的数据存储方式，相比数组具有以下优势：

- **动态大小**：可以根据需要自动调整大小
- **丰富的操作方法**：提供了多种数据操作方法，如添加、删除、查找、排序等
- **类型安全**：支持泛型，确保数据类型安全
- **高效的实现**：针对不同场景提供了多种实现类

## 集合框架体系结构

Java集合框架主要分为两大类：

- **Collection接口**：存储单个元素的集合
  - List：有序、可重复的集合
  - Set：无序、不可重复的集合
  - Queue：队列，先进先出

- **Map接口**：存储键值对的集合
  - HashMap：基于哈希表的实现
  - LinkedHashMap：有序的HashMap
  - TreeMap：基于红黑树的有序实现
  - Hashtable：线程安全的哈希表实现

## Collection接口

### List接口

List是有序、可重复的集合，允许通过索引访问元素。

#### 1. ArrayList

基于动态数组实现，查询快，增删慢，适合随机访问场景。

```java
import java.util.ArrayList;
import java.util.List;

public class ArrayListExample {
    public static void main(String[] args) {
        // 创建ArrayList
        List<String> list = new ArrayList<>();
        
        // 添加元素
        list.add("Java");
        list.add("Python");
        list.add("C++");
        list.add("Java"); // 允许重复
        
        // 访问元素
        System.out.println("索引为1的元素：" + list.get(1));
        
        // 修改元素
        list.set(1, "JavaScript");
        
        // 删除元素
        list.remove(2);
        list.remove("Java");
        
        // 遍历元素
        System.out.println("遍历元素：");
        for (String element : list) {
            System.out.println(element);
        }
        
        // 列表大小
        System.out.println("列表大小：" + list.size());
        
        // 清空列表
        list.clear();
    }
}
```

#### 2. LinkedList

基于双向链表实现，增删快，查询慢，适合频繁修改的场景。

```java
import java.util.LinkedList;
import java.util.List;

public class LinkedListExample {
    public static void main(String[] args) {
        // 创建LinkedList
        List<String> linkedList = new LinkedList<>();
        
        // 添加元素
        linkedList.add("Java");
        linkedList.add("Python");
        linkedList.addFirst("C++"); // 添加到开头
        linkedList.addLast("JavaScript"); // 添加到末尾
        
        // 访问元素
        System.out.println("第一个元素：" + linkedList.getFirst());
        System.out.println("最后一个元素：" + linkedList.getLast());
        
        // 删除元素
        linkedList.removeFirst(); // 删除第一个元素
        linkedList.removeLast(); // 删除最后一个元素
        
        // 遍历元素
        System.out.println("遍历元素：");
        for (String element : linkedList) {
            System.out.println(element);
        }
    }
}
```

#### 3. Vector

线程安全的动态数组实现，性能较低，已被ArrayList替代。

### Set接口

Set是无序、不可重复的集合，不允许存储重复元素。

#### 1. HashSet

基于哈希表实现，无序，查询快，不允许重复。

```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        // 创建HashSet
        Set<String> set = new HashSet<>();
        
        // 添加元素
        set.add("Java");
        set.add("Python");
        set.add("C++");
        set.add("Java"); // 重复元素，添加失败
        
        // 遍历元素
        System.out.println("遍历元素：");
        for (String element : set) {
            System.out.println(element);
        }
        
        // 检查元素是否存在
        System.out.println("是否包含Java：" + set.contains("Java"));
        
        // 删除元素
        set.remove("Python");
        
        // 集合大小
        System.out.println("集合大小：" + set.size());
    }
}
```

#### 2. LinkedHashSet

基于哈希表和链表实现，保持插入顺序，不允许重复。

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetExample {
    public static void main(String[] args) {
        // 创建LinkedHashSet
        Set<String> set = new LinkedHashSet<>();
        
        // 添加元素
        set.add("Java");
        set.add("Python");
        set.add("C++");
        
        // 遍历元素，保持插入顺序
        System.out.println("遍历元素：");
        for (String element : set) {
            System.out.println(element);
        }
    }
}
```

#### 3. TreeSet

基于红黑树实现，有序（自然排序或定制排序），不允许重复。

```java
import java.util.TreeSet;
import java.util.Set;

public class TreeSetExample {
    public static void main(String[] args) {
        // 创建TreeSet，自然排序
        Set<Integer> set = new TreeSet<>();
        
        // 添加元素
        set.add(5);
        set.add(2);
        set.add(8);
        set.add(1);
        
        // 遍历元素，自动排序
        System.out.println("遍历元素：");
        for (Integer element : set) {
            System.out.println(element);
        }
    }
}
```

### Queue接口

Queue是队列接口，遵循先进先出（FIFO）原则。

#### PriorityQueue

基于优先级堆实现，元素按优先级排序。

```java
import java.util.PriorityQueue;
import java.util.Queue;

public class PriorityQueueExample {
    public static void main(String[] args) {
        // 创建PriorityQueue，自然排序（小顶堆）
        Queue<Integer> queue = new PriorityQueue<>();
        
        // 添加元素
        queue.add(5);
        queue.add(2);
        queue.add(8);
        queue.add(1);
        
        // 访问队首元素
        System.out.println("队首元素：" + queue.peek());
        
        // 移除并返回队首元素
        while (!queue.isEmpty()) {
            System.out.println("出队元素：" + queue.poll());
        }
    }
}
```

## Map接口

Map是键值对的集合，键不可重复，值可以重复。

### HashMap

基于哈希表实现，无序，查询快，允许键为null，值为null。

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        // 创建HashMap
        Map<String, Integer> map = new HashMap<>();
        
        // 添加键值对
        map.put("Java", 100);
        map.put("Python", 90);
        map.put("C++", 85);
        map.put("Java", 95); // 覆盖原有值
        
        // 访问值
        System.out.println("Java的值：" + map.get("Java"));
        System.out.println("不存在的键：" + map.get("Go")); // 返回null
        
        // 检查键是否存在
        System.out.println("是否包含Python键：" + map.containsKey("Python"));
        System.out.println("是否包含值95：" + map.containsValue(95));
        
        // 删除键值对
        map.remove("C++");
        
        // 遍历键值对
        System.out.println("遍历键值对：");
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println("键：" + entry.getKey() + ", 值：" + entry.getValue());
        }
        
        // 遍历键
        System.out.println("遍历键：");
        for (String key : map.keySet()) {
            System.out.println(key);
        }
        
        // 遍历值
        System.out.println("遍历值：");
        for (Integer value : map.values()) {
            System.out.println(value);
        }
        
        // 集合大小
        System.out.println("Map大小：" + map.size());
        
        // 清空Map
        map.clear();
    }
}
```

### LinkedHashMap

基于哈希表和链表实现，保持插入顺序或访问顺序。

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapExample {
    public static void main(String[] args) {
        // 创建LinkedHashMap，保持插入顺序
        Map<String, Integer> map = new LinkedHashMap<>();
        
        // 添加键值对
        map.put("Java", 100);
        map.put("Python", 90);
        map.put("C++", 85);
        
        // 遍历键值对，保持插入顺序
        System.out.println("遍历键值对：");
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println("键：" + entry.getKey() + ", 值：" + entry.getValue());
        }
    }
}
```

### TreeMap

基于红黑树实现，按键有序，不允许键为null。

```java
import java.util.TreeMap;
import java.util.Map;

public class TreeMapExample {
    public static void main(String[] args) {
        // 创建TreeMap，按键自然排序
        Map<String, Integer> map = new TreeMap<>();
        
        // 添加键值对
        map.put("C++", 85);
        map.put("Java", 100);
        map.put("Python", 90);
        
        // 遍历键值对，按键排序
        System.out.println("遍历键值对：");
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println("键：" + entry.getKey() + ", 值：" + entry.getValue());
        }
    }
}
```

### Hashtable

线程安全的哈希表实现，不允许键为null，值为null，已被HashMap替代。

## 集合工具类

### Collections

提供了对集合进行操作的静态方法。

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsExample {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(5);
        list.add(2);
        list.add(8);
        list.add(1);
        
        // 排序
        Collections.sort(list);
        System.out.println("排序后：" + list);
        
        // 反转
        Collections.reverse(list);
        System.out.println("反转后：" + list);
        
        // 查找最大值
        System.out.println("最大值：" + Collections.max(list));
        
        // 查找最小值
        System.out.println("最小值：" + Collections.min(list));
        
        // 替换元素
        Collections.replaceAll(list, 5, 10);
        System.out.println("替换后：" + list);
        
        // 填充集合
        List<String> emptyList = new ArrayList<>(5);
        Collections.fill(emptyList, "Java");
        System.out.println("填充后：" + emptyList);
        
        // 打乱顺序
        Collections.shuffle(list);
        System.out.println("打乱后：" + list);
    }
}
```

### Arrays

提供了对数组进行操作的静态方法，也可以用于数组和集合的转换。

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArraysExample {
    public static void main(String[] args) {
        // 数组转集合
        String[] array = {"Java", "Python", "C++"};
        List<String> list = Arrays.asList(array);
        System.out.println("数组转集合：" + list);
        
        // 集合转数组
        List<Integer> numberList = new ArrayList<>();
        numberList.add(1);
        numberList.add(2);
        numberList.add(3);
        Integer[] numberArray = numberList.toArray(new Integer[0]);
        System.out.println("集合转数组：" + Arrays.toString(numberArray));
        
        // 数组排序
        int[] intArray = {5, 2, 8, 1};
        Arrays.sort(intArray);
        System.out.println("数组排序：" + Arrays.toString(intArray));
        
        // 数组二分查找
        int index = Arrays.binarySearch(intArray, 5);
        System.out.println("5的索引：" + index);
        
        // 数组填充
        int[] filledArray = new int[5];
        Arrays.fill(filledArray, 10);
        System.out.println("数组填充：" + Arrays.toString(filledArray));
    }
}
```

## 集合的遍历方式

### 1. 增强for循环（for-each）

适用于Collection和Map的遍历。

```java
// Collection遍历
for (String element : list) {
    System.out.println(element);
}

// Map遍历
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

### 2. 迭代器（Iterator）

适用于Collection的遍历，支持在遍历过程中删除元素。

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorExample {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Python");
        list.add("C++");
        
        // 使用迭代器遍历
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String element = iterator.next();
            System.out.println(element);
            // 安全删除元素
            if (element.equals("Python")) {
                iterator.remove();
            }
        }
        
        System.out.println("删除后的列表：" + list);
    }
}
```

### 3. Lambda表达式（Java 8+）

适用于Collection和Map的遍历，代码更简洁。

```java
// Collection遍历
list.forEach(element -> System.out.println(element));

// Map遍历
map.forEach((key, value) -> System.out.println(key + ": " + value));
```

## 集合框架性能对比

| 集合类型 | 底层实现 | 插入性能 | 查询性能 | 特点 |
|---------|---------|---------|---------|------|
| ArrayList | 动态数组 | 尾部快，中间慢 | O(1) | 随机访问快，适合频繁查询 |
| LinkedList | 双向链表 | 快 | O(n) | 插入删除快，适合频繁修改 |
| HashSet | 哈希表 | 快 | O(1) | 无序，不可重复，查询快 |
| TreeSet | 红黑树 | O(log n) | O(log n) | 有序，不可重复 |
| HashMap | 哈希表 | 快 | O(1) | 无序，键不可重复，查询快 |
| TreeMap | 红黑树 | O(log n) | O(log n) | 有序，键不可重复 |

## 集合框架的选择建议

1. **如果需要有序且可重复**：使用List
   - 频繁查询：ArrayList
   - 频繁修改：LinkedList

2. **如果需要无序且不可重复**：使用Set
   - 一般场景：HashSet
   - 需要插入顺序：LinkedHashSet
   - 需要排序：TreeSet

3. **如果需要键值对存储**：使用Map
   - 一般场景：HashMap
   - 需要插入顺序：LinkedHashMap
   - 需要按键排序：TreeMap

4. **如果需要线程安全**：
   - 使用Collections.synchronizedXXX()方法包装
   - 或使用ConcurrentHashMap等并发集合

## 总结

Java集合框架是Java编程中的重要组成部分，提供了丰富的数据结构和操作方法。了解不同集合的特点和性能，根据实际需求选择合适的集合类型，可以提高程序的效率和可读性。

主要内容总结：

1. 集合框架分为Collection和Map两大接口
2. Collection包括List（有序可重复）、Set（无序不可重复）、Queue（先进先出）
3. Map用于存储键值对，键不可重复
4. 常用实现类有ArrayList、LinkedList、HashSet、HashMap等
5. Collections和Arrays工具类提供了丰富的操作方法
6. 集合可以通过多种方式遍历
7. 根据性能和需求选择合适的集合类型

通过学习和实践集合框架，可以编写更加高效、灵活的Java程序。