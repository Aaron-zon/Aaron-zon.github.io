---
outline: deep
---

# Java 线程

## 线程概述

线程（Thread）是程序执行的最小单位，是操作系统进行调度的基本单位。一个进程可以包含多个线程，这些线程共享进程的内存空间，但拥有各自独立的栈空间。

### 进程与线程的区别

- **进程**：是程序的一次执行过程，是操作系统资源分配的基本单位，拥有独立的内存空间和系统资源。
- **线程**：是进程的一个执行单元，是CPU调度的基本单位，共享进程的内存空间和系统资源。

### 线程的优势

- **提高程序性能**：多线程可以充分利用CPU资源，提高程序的执行效率。
- **改善用户体验**：后台线程可以处理耗时操作，避免阻塞主线程，保持界面响应。
- **简化程序设计**：将复杂任务分解为多个线程，每个线程负责一部分功能，便于维护和扩展。

## 线程的创建方式

Java提供了三种创建线程的方式：

### 1. 继承Thread类

通过继承Thread类，重写run()方法来创建线程。

```java
public class ThreadExample extends Thread {
    @Override
    public void run() {
        System.out.println("线程执行：" + Thread.currentThread().getName());
    }
    
    public static void main(String[] args) {
        // 创建线程对象
        ThreadExample thread = new ThreadExample();
        // 启动线程
        thread.start();
        System.out.println("主线程：" + Thread.currentThread().getName());
    }
}
```

### 2. 实现Runnable接口

通过实现Runnable接口，重写run()方法来创建线程。这种方式更灵活，因为Java支持多实现接口，但不支持多重继承。

```java
public class RunnableExample implements Runnable {
    @Override
    public void run() {
        System.out.println("线程执行：" + Thread.currentThread().getName());
    }
    
    public static void main(String[] args) {
        // 创建Runnable对象
        RunnableExample runnable = new RunnableExample();
        // 创建Thread对象，传入Runnable实例
        Thread thread = new Thread(runnable);
        // 启动线程
        thread.start();
        System.out.println("主线程：" + Thread.currentThread().getName());
    }
}
```

### 3. 实现Callable接口

通过实现Callable接口，重写call()方法来创建线程。这种方式可以返回执行结果，并且可以抛出异常。

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class CallableExample implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        return sum;
    }
    
    public static void main(String[] args) {
        // 创建Callable对象
        CallableExample callable = new CallableExample();
        // 创建FutureTask对象，用于接收Callable的执行结果
        FutureTask<Integer> futureTask = new FutureTask<>(callable);
        // 创建Thread对象，传入FutureTask实例
        Thread thread = new Thread(futureTask);
        // 启动线程
        thread.start();
        
        try {
            // 获取线程执行结果
            Integer result = futureTask.get();
            System.out.println("计算结果：" + result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

## 线程的生命周期

Java线程的生命周期包括以下6个状态：

1. **新建状态（New）**：线程对象创建后，尚未启动时的状态。
2. **就绪状态（Runnable）**：线程调用start()方法后，等待CPU调度的状态。
3. **运行状态（Running）**：线程获得CPU资源，正在执行run()方法的状态。
4. **阻塞状态（Blocked）**：线程因为某种原因（如等待锁、等待IO）暂时停止执行的状态。
5. **等待状态（Waiting）**：线程无限期等待其他线程通知或中断的状态。
6. **超时等待状态（Timed Waiting）**：线程等待指定时间后自动唤醒的状态。
7. **终止状态（Terminated）**：线程执行完毕或发生异常后终止的状态。

### 线程状态转换图

```
新建状态（New）
    ↓ start()
就绪状态（Runnable）
    ↓ CPU调度
运行状态（Running）
    ↓ 失去CPU资源
就绪状态（Runnable）
    ↓ wait() / join() / LockSupport.park()
等待状态（Waiting）
    ↓ notify() / notifyAll() / 被中断
就绪状态（Runnable）
    ↓ sleep(long) / wait(long) / join(long) / LockSupport.parkNanos() / LockSupport.parkUntil()
超时等待状态（Timed Waiting）
    ↓ 时间到 / 被中断
就绪状态（Runnable）
    ↓ 进入同步块/方法
阻塞状态（Blocked）
    ↓ 获取锁
就绪状态（Runnable）
    ↓ run()执行完毕 / 发生未捕获异常
终止状态（Terminated）
```

## 线程的常用方法

### Thread类的常用方法

#### 线程创建与启动

- `Thread()`：创建一个新的线程对象。
- `Thread(Runnable target)`：创建一个新的线程对象，传入Runnable实例。
- `Thread(Runnable target, String name)`：创建一个新的线程对象，传入Runnable实例和线程名称。
- `start()`：启动线程，使线程进入就绪状态，等待CPU调度。

#### 线程控制

- `run()`：线程的执行体，包含线程要执行的代码。
- `sleep(long millis)`：使当前线程休眠指定的毫秒数，进入超时等待状态。
- `join()`：等待当前线程执行完毕，其他线程才能继续执行。
- `join(long millis)`：等待当前线程执行指定的毫秒数。
- `yield()`：让出CPU资源，使当前线程从运行状态转换为就绪状态。
- `interrupt()`：中断当前线程，设置中断标志位。
- `isInterrupted()`：判断当前线程是否被中断。
- `interrupted()`：判断当前线程是否被中断，并清除中断标志位。
- `stop()`：强制终止线程，已过时，不推荐使用。
- `suspend()`：暂停线程，已过时，不推荐使用。
- `resume()`：恢复被暂停的线程，已过时，不推荐使用。

#### 线程属性

- `getName()`：获取线程名称。
- `setName(String name)`：设置线程名称。
- `getId()`：获取线程ID。
- `getPriority()`：获取线程优先级。
- `setPriority(int priority)`：设置线程优先级，范围1-10，默认5。
- `isDaemon()`：判断是否为守护线程。
- `setDaemon(boolean on)`：设置是否为守护线程。
- `getState()`：获取线程当前状态。
- `isAlive()`：判断线程是否存活。

### 线程优先级

Java线程的优先级范围是1-10，默认优先级是5。优先级越高的线程，获得CPU调度的机会越大，但不保证一定先执行。

- `Thread.MIN_PRIORITY`：最低优先级，值为1。
- `Thread.NORM_PRIORITY`：默认优先级，值为5。
- `Thread.MAX_PRIORITY`：最高优先级，值为10。

### 守护线程

守护线程（Daemon Thread）是为其他线程提供服务的线程，当所有非守护线程结束时，守护线程会自动结束。例如，垃圾回收线程就是一个守护线程。

```java
public class DaemonThreadExample {
    public static void main(String[] args) {
        Thread daemonThread = new Thread(() -> {
            while (true) {
                System.out.println("守护线程正在运行...");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        // 设置为守护线程
        daemonThread.setDaemon(true);
        daemonThread.start();
        
        // 主线程执行3秒后结束
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("主线程结束，守护线程也会自动结束");
    }
}
```

## 线程同步

### 线程安全问题

当多个线程同时访问共享资源时，如果不进行同步控制，就会导致数据不一致的问题，称为线程安全问题。

### 同步机制

Java提供了多种同步机制来解决线程安全问题：

#### 1. synchronized关键字

`synchronized`关键字可以用于修饰方法或代码块，确保同一时间只有一个线程可以执行被修饰的方法或代码块。

##### 同步方法

```java
public synchronized void synchronizedMethod() {
    // 同步代码
}
```

##### 同步代码块

```java
public void synchronizedBlock() {
    synchronized (this) {
        // 同步代码
    }
}
```

##### 静态同步方法

```java
public static synchronized void staticSynchronizedMethod() {
    // 同步代码
}
```

##### 示例：解决线程安全问题

```java
public class SynchronizedExample {
    private int count = 0;
    
    // 同步方法
    public synchronized void increment() {
        count++;
    }
    
    public static void main(String[] args) throws InterruptedException {
        SynchronizedExample example = new SynchronizedExample();
        
        // 创建1000个线程，每个线程执行1000次increment()方法
        Thread[] threads = new Thread[1000];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    example.increment();
                }
            });
            threads[i].start();
        }
        
        // 等待所有线程执行完毕
        for (Thread thread : threads) {
            thread.join();
        }
        
        // 输出结果
        System.out.println("count = " + example.count); // 预期结果：1000000
    }
}
```

#### 2. Lock接口

`Lock`接口是Java 5引入的，提供了比`synchronized`更灵活的同步机制。常用的实现类是`ReentrantLock`。

##### Lock接口的常用方法

- `lock()`：获取锁，如果锁被其他线程占用，则一直等待。
- `tryLock()`：尝试获取锁，如果锁可用则返回true，否则返回false。
- `tryLock(long time, TimeUnit unit)`：在指定时间内尝试获取锁。
- `lockInterruptibly()`：获取锁，但可以被中断。
- `unlock()`：释放锁。

##### 示例：使用Lock解决线程安全问题

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class LockExample {
    private int count = 0;
    private Lock lock = new ReentrantLock();
    
    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
    
    public static void main(String[] args) throws InterruptedException {
        LockExample example = new LockExample();
        
        // 创建1000个线程，每个线程执行1000次increment()方法
        Thread[] threads = new Thread[1000];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    example.increment();
                }
            });
            threads[i].start();
        }
        
        // 等待所有线程执行完毕
        for (Thread thread : threads) {
            thread.join();
        }
        
        // 输出结果
        System.out.println("count = " + example.count); // 预期结果：1000000
    }
}
```

#### 3. volatile关键字

`volatile`关键字用于修饰变量，确保变量的可见性和有序性，但不保证原子性。

- **可见性**：当一个线程修改了volatile变量的值，其他线程可以立即看到最新的值。
- **有序性**：禁止指令重排序，确保变量的读写操作按顺序执行。

##### 示例：使用volatile解决可见性问题

```java
public class VolatileExample {
    private volatile boolean flag = false;
    private int count = 0;
    
    public void writer() {
        count = 1;
        flag = true;
    }
    
    public void reader() {
        if (flag) {
            System.out.println("count = " + count);
        }
    }
    
    public static void main(String[] args) {
        VolatileExample example = new VolatileExample();
        
        // 写入线程
        Thread writerThread = new Thread(example::writer);
        // 读取线程
        Thread readerThread = new Thread(example::reader);
        
        // 启动线程
        readerThread.start();
        writerThread.start();
    }
}
```

## 线程通信

线程通信是指多个线程之间相互协作，完成共同的任务。Java提供了多种线程通信机制：

### 1. wait()、notify()、notifyAll()方法

这些方法是Object类的方法，用于线程之间的通信。

- `wait()`：使当前线程进入等待状态，释放锁。
- `notify()`：唤醒一个等待在当前对象锁上的线程。
- `notifyAll()`：唤醒所有等待在当前对象锁上的线程。

##### 示例：生产者-消费者模式

```java
import java.util.LinkedList;
import java.util.Queue;

public class ProducerConsumerExample {
    private Queue<Integer> queue = new LinkedList<>();
    private static final int MAX_SIZE = 10;
    
    // 生产者线程
    class Producer implements Runnable {
        @Override
        public void run() {
            int count = 0;
            while (true) {
                synchronized (queue) {
                    // 队列已满，等待消费者消费
                    while (queue.size() == MAX_SIZE) {
                        try {
                            queue.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    
                    // 生产产品
                    queue.offer(count);
                    System.out.println("生产者生产了：" + count);
                    count++;
                    
                    // 通知消费者消费
                    queue.notifyAll();
                }
                
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    // 消费者线程
    class Consumer implements Runnable {
        @Override
        public void run() {
            while (true) {
                synchronized (queue) {
                    // 队列已空，等待生产者生产
                    while (queue.isEmpty()) {
                        try {
                            queue.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    
                    // 消费产品
                    int product = queue.poll();
                    System.out.println("消费者消费了：" + product);
                    
                    // 通知生产者生产
                    queue.notifyAll();
                }
                
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    public static void main(String[] args) {
        ProducerConsumerExample example = new ProducerConsumerExample();
        
        // 创建生产者和消费者线程
        Thread producerThread = new Thread(example.new Producer());
        Thread consumerThread = new Thread(example.new Consumer());
        
        // 启动线程
        producerThread.start();
        consumerThread.start();
    }
}
```

### 2. LockSupport类

`LockSupport`类是Java 6引入的，提供了更灵活的线程阻塞和唤醒机制。

- `park()`：阻塞当前线程。
- `park(Object blocker)`：阻塞当前线程，并指定阻塞对象。
- `parkNanos(long nanos)`：阻塞当前线程指定的纳秒数。
- `parkUntil(long deadline)`：阻塞当前线程直到指定的时间。
- `unpark(Thread thread)`：唤醒指定的线程。

##### 示例：使用LockSupport实现线程通信

```java
import java.util.concurrent.locks.LockSupport;

public class LockSupportExample {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("线程开始执行");
            // 阻塞当前线程
            LockSupport.park();
            System.out.println("线程被唤醒");
        });
        
        // 启动线程
        thread.start();
        
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // 唤醒线程
        LockSupport.unpark(thread);
    }
}
```

## 线程池

线程池是一种管理线程的机制，它可以复用线程，减少线程创建和销毁的开销，提高程序性能。

### Executor框架

Java的线程池框架是基于`Executor`接口和`ExecutorService`接口实现的，位于`java.util.concurrent`包下。

### 线程池的创建方式

#### 1. 使用Executors工厂类

`Executors`类提供了多种创建线程池的静态方法：

- `newFixedThreadPool(int nThreads)`：创建固定大小的线程池。
- `newCachedThreadPool()`：创建可缓存的线程池，线程数量根据任务自动调整。
- `newSingleThreadExecutor()`：创建只有一个线程的线程池。
- `newScheduledThreadPool(int corePoolSize)`：创建可定时执行任务的线程池。

##### 示例：使用Executors创建线程池

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorsExample {
    public static void main(String[] args) {
        // 创建固定大小的线程池
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        
        // 提交10个任务
        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            executorService.submit(() -> {
                System.out.println("任务" + taskId + "由线程" + Thread.currentThread().getName() + "执行");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        
        // 关闭线程池
        executorService.shutdown();
    }
}
```

#### 2. 使用ThreadPoolExecutor类

`ThreadPoolExecutor`类是`ExecutorService`接口的实现类，提供了更灵活的线程池配置。

##### 构造方法

```java
public ThreadPoolExecutor(
    int corePoolSize, // 核心线程数
    int maximumPoolSize, // 最大线程数
    long keepAliveTime, // 非核心线程的存活时间
    TimeUnit unit, // 存活时间的单位
    BlockingQueue<Runnable> workQueue, // 任务队列
    ThreadFactory threadFactory, // 线程工厂
    RejectedExecutionHandler handler // 拒绝策略
) {
    // 构造函数实现
}
```

##### 示例：使用ThreadPoolExecutor创建线程池

```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ThreadPoolExecutorExample {
    public static void main(String[] args) {
        // 创建线程池
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
            2, // 核心线程数
            5, // 最大线程数
            60, // 非核心线程的存活时间
            TimeUnit.SECONDS, // 存活时间的单位
            new ArrayBlockingQueue<>(10), // 任务队列
            ThreadPoolExecutor.AbortPolicy // 拒绝策略
        );
        
        // 提交10个任务
        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("任务" + taskId + "由线程" + Thread.currentThread().getName() + "执行");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        
        // 关闭线程池
        executor.shutdown();
    }
}
```

### 线程池的拒绝策略

当线程池的任务队列已满，并且线程数已达到最大线程数时，新提交的任务会被拒绝。Java提供了4种拒绝策略：

- `AbortPolicy`：直接抛出`RejectedExecutionException`异常。
- `CallerRunsPolicy`：由提交任务的线程执行任务。
- `DiscardPolicy`：直接丢弃任务，不抛出异常。
- `DiscardOldestPolicy`：丢弃任务队列中最旧的任务，然后尝试提交新任务。

### 线程池的执行流程

1. 当提交一个新任务时，如果核心线程数未满，则创建核心线程执行任务。
2. 如果核心线程数已满，但任务队列未满，则将任务放入任务队列。
3. 如果任务队列已满，但线程数未达到最大线程数，则创建非核心线程执行任务。
4. 如果线程数已达到最大线程数，则执行拒绝策略。

## 并发工具类

Java提供了多种并发工具类，用于简化并发编程：

### 1. CountDownLatch

`CountDownLatch`类用于等待多个线程完成任务。

- `CountDownLatch(int count)`：创建一个CountDownLatch实例，指定计数。
- `await()`：使当前线程等待，直到计数减为0。
- `countDown()`：将计数减1。

##### 示例：使用CountDownLatch等待多个线程完成

```java
import java.util.concurrent.CountDownLatch;

public class CountDownLatchExample {
    public static void main(String[] args) throws InterruptedException {
        int threadCount = 5;
        CountDownLatch latch = new CountDownLatch(threadCount);
        
        for (int i = 0; i < threadCount; i++) {
            final int threadId = i;
            new Thread(() -> {
                System.out.println("线程" + threadId + "开始执行");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("线程" + threadId + "执行完毕");
                // 计数减1
                latch.countDown();
            }).start();
        }
        
        System.out.println("等待所有线程执行完毕...");
        // 等待计数减为0
        latch.await();
        System.out.println("所有线程执行完毕");
    }
}
```

### 2. CyclicBarrier

`CyclicBarrier`类用于让多个线程在某个点上等待，直到所有线程都到达该点后才继续执行。

- `CyclicBarrier(int parties)`：创建一个CyclicBarrier实例，指定参与的线程数。
- `await()`：使当前线程等待，直到所有线程都调用了await()方法。

##### 示例：使用CyclicBarrier让多个线程同步执行

```java
import java.util.concurrent.CyclicBarrier;

public class CyclicBarrierExample {
    public static void main(String[] args) {
        int threadCount = 5;
        CyclicBarrier barrier = new CyclicBarrier(threadCount, () -> {
            System.out.println("所有线程都已到达屏障，继续执行");
        });
        
        for (int i = 0; i < threadCount; i++) {
            final int threadId = i;
            new Thread(() -> {
                System.out.println("线程" + threadId + "开始执行");
                try {
                    Thread.sleep(1000);
                    System.out.println("线程" + threadId + "到达屏障，等待其他线程");
                    // 等待所有线程到达屏障
                    barrier.await();
                    System.out.println("线程" + threadId + "继续执行");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}
```

### 3. Semaphore

`Semaphore`类用于控制同时访问某个资源的线程数量。

- `Semaphore(int permits)`：创建一个Semaphore实例，指定许可数。
- `acquire()`：获取一个许可，如果没有许可则等待。
- `release()`：释放一个许可。

##### 示例：使用Semaphore控制并发访问

```java
import java.util.concurrent.Semaphore;

public class SemaphoreExample {
    public static void main(String[] args) {
        // 创建一个Semaphore实例，许可数为3
        Semaphore semaphore = new Semaphore(3);
        
        for (int i = 0; i < 10; i++) {
            final int threadId = i;
            new Thread(() -> {
                try {
                    // 获取许可
                    semaphore.acquire();
                    System.out.println("线程" + threadId + "获取了许可，开始执行");
                    Thread.sleep(1000);
                    System.out.println("线程" + threadId + "执行完毕，释放许可");
                    // 释放许可
                    semaphore.release();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}
```

### 4. Atomic类

Java提供了多种原子类，用于实现原子操作，避免使用锁。

- `AtomicInteger`：原子整数。
- `AtomicLong`：原子长整数。
- `AtomicBoolean`：原子布尔值。
- `AtomicReference`：原子引用。

##### 示例：使用AtomicInteger实现原子操作

```java
import java.util.concurrent.atomic.AtomicInteger;

public class AtomicIntegerExample {
    private AtomicInteger count = new AtomicInteger(0);
    
    public void increment() {
        count.incrementAndGet();
    }
    
    public static void main(String[] args) throws InterruptedException {
        AtomicIntegerExample example = new AtomicIntegerExample();
        
        // 创建1000个线程，每个线程执行1000次increment()方法
        Thread[] threads = new Thread[1000];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 1000; j++) {
                    example.increment();
                }
            });
            threads[i].start();
        }
        
        // 等待所有线程执行完毕
        for (Thread thread : threads) {
            thread.join();
        }
        
        // 输出结果
        System.out.println("count = " + example.count.get()); // 预期结果：1000000
    }
}
```

## 线程安全问题

### 常见的线程安全问题

1. **竞态条件（Race Condition）**：多个线程同时访问共享资源，导致数据不一致的问题。
2. **死锁（Deadlock）**：两个或多个线程互相等待对方释放资源，导致所有线程都无法继续执行的问题。
3. **活锁（Livelock）**：线程不断尝试获取资源，但总是失败，导致无法继续执行的问题。
4. **饥饿（Starvation）**：某些线程长期无法获得CPU资源或锁，导致无法继续执行的问题。

### 死锁的产生条件

死锁的产生需要满足以下4个条件：

1. **互斥条件**：资源不能被多个线程同时占用。
2. **请求与保持条件**：线程已获得的资源在未使用完之前，不能被其他线程抢占。
3. **不剥夺条件**：线程已获得的资源在未使用完之前，不能被强制剥夺。
4. **循环等待条件**：多个线程之间形成循环等待资源的关系。

### 如何避免死锁

1. **破坏互斥条件**：尽量使用可共享的资源。
2. **破坏请求与保持条件**：一次性获取所有需要的资源。
3. **破坏不剥夺条件**：允许线程在等待资源时释放已获得的资源。
4. **破坏循环等待条件**：对资源进行编号，线程按照编号顺序获取资源。

### 示例：死锁的产生与避免

```java
public class DeadlockExample {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    // 方法1：先获取lock1，再获取lock2
    public void method1() {
        synchronized (lock1) {
            System.out.println("方法1获取了lock1");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (lock2) {
                System.out.println("方法1获取了lock2");
            }
        }
    }
    
    // 方法2：先获取lock2，再获取lock1
    public void method2() {
        synchronized (lock2) {
            System.out.println("方法2获取了lock2");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (lock1) {
                System.out.println("方法2获取了lock1");
            }
        }
    }
    
    public static void main(String[] args) {
        DeadlockExample example = new DeadlockExample();
        
        // 创建两个线程，分别执行method1和method2
        Thread thread1 = new Thread(example::method1);
        Thread thread2 = new Thread(example::method2);
        
        // 启动线程
        thread1.start();
        thread2.start();
    }
}
```

## 线程的最佳实践

1. **使用线程池管理线程**：避免频繁创建和销毁线程，提高程序性能。
2. **避免使用ThreadLocal**：如果使用不当，可能导致内存泄漏。
3. **使用volatile关键字**：确保变量的可见性和有序性。
4. **使用原子类**：避免使用锁，提高程序性能。
5. **避免死锁**：按照固定顺序获取锁，避免循环等待。
6. **使用try-with-resources**：确保资源被正确关闭。
7. **避免使用stop()、suspend()、resume()方法**：这些方法已过时，可能导致线程安全问题。
8. **使用合适的同步机制**：根据实际情况选择synchronized或Lock。
9. **减少锁的粒度**：只对必要的代码进行同步，提高程序并发性能。
10. **使用并发工具类**：简化并发编程，提高程序可读性和可维护性。

## 总结

Java线程是Java并发编程的基础，掌握线程的创建、生命周期、同步机制、通信方式、线程池和并发工具类等知识，对于编写高效、可靠的并发程序至关重要。

通过学习Java线程，我们可以：

1. 理解线程的基本概念和生命周期。
2. 掌握多种线程创建方式。
3. 学会使用线程同步机制解决线程安全问题。
4. 学会使用线程通信机制实现线程间的协作。
5. 掌握线程池的使用，提高程序性能。
6. 学会使用并发工具类简化并发编程。
7. 了解常见的线程安全问题及其解决方法。
8. 掌握线程的最佳实践，编写高效、可靠的并发程序。

Java线程的学习是一个持续的过程，需要不断实践和总结经验。希望本学习笔记能够帮助你更好地理解和掌握Java线程的相关知识。