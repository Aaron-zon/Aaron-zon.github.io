---
outline: deep
---

# Java IO

## IO概述

IO（Input/Output）是指程序与外部设备或其他计算机进行数据交换的过程。Java IO提供了一套用于处理输入输出的API，位于`java.io`包下。

### IO的分类

根据数据的流向，IO可以分为：

- **输入流（Input Stream）**：从外部设备读取数据到程序中
- **输出流（Output Stream）**：从程序中写入数据到外部设备

根据数据的类型，IO可以分为：

- **字节流（Byte Stream）**：以字节为单位处理数据，适用于所有类型的文件
- **字符流（Character Stream）**：以字符为单位处理数据，适用于文本文件

## 字节流

字节流是Java IO的基础，用于处理二进制数据。字节流的基类是`InputStream`和`OutputStream`，它们都是抽象类。

### InputStream（输入字节流）

`InputStream`是所有输入字节流的父类，提供了读取字节数据的基本方法。

#### 常用方法

- `int read()`：读取一个字节，返回读取的字节值，到达文件末尾返回-1
- `int read(byte[] b)`：读取最多b.length个字节到字节数组，返回实际读取的字节数
- `int read(byte[] b, int off, int len)`：读取最多len个字节到字节数组，从off位置开始存储
- `void close()`：关闭流，释放资源

#### 常用实现类

##### FileInputStream

用于从文件中读取字节数据。

```java
import java.io.FileInputStream;
import java.io.IOException;

public class FileInputStreamExample {
    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("test.txt")) {
            int data;
            while ((data = fis.read()) != -1) {
                System.out.print((char) data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### ByteArrayInputStream

用于从内存中的字节数组读取数据。

```java
import java.io.ByteArrayInputStream;

public class ByteArrayInputStreamExample {
    public static void main(String[] args) {
        byte[] bytes = "Hello, ByteArrayInputStream!“.getBytes();
        try (ByteArrayInputStream bais = new ByteArrayInputStream(bytes)) {
            int data;
            while ((data = bais.read()) != -1) {
                System.out.print((char) data);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

##### BufferedInputStream

带有缓冲区的输入流，可以提高读取效率。

```java
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class BufferedInputStreamExample {
    public static void main(String[] args) {
        try (BufferedInputStream bis = new BufferedInputStream(
                new FileInputStream("test.txt"))) {
            int data;
            while ((data = bis.read()) != -1) {
                System.out.print((char) data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### OutputStream（输出字节流）

`OutputStream`是所有输出字节流的父类，提供了写入字节数据的基本方法。

#### 常用方法

- `void write(int b)`：写入一个字节
- `void write(byte[] b)`：写入字节数组中的所有字节
- `void write(byte[] b, int off, int len)`：写入字节数组中从off位置开始的len个字节
- `void flush()`：刷新输出流，将缓冲区中的数据强制写入
- `void close()`：关闭流，释放资源

#### 常用实现类

##### FileOutputStream

用于向文件中写入字节数据。

```java
import java.io.FileOutputStream;
import java.io.IOException;

public class FileOutputStreamExample {
    public static void main(String[] args) {
        String content = "Hello, FileOutputStream!“;
        try (FileOutputStream fos = new FileOutputStream("output.txt")) {
            fos.write(content.getBytes());
            System.out.println("写入成功!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### ByteArrayOutputStream

用于将数据写入内存中的字节数组。

```java
import java.io.ByteArrayOutputStream;

public class ByteArrayOutputStreamExample {
    public static void main(String[] args) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            String content = "Hello, ByteArrayOutputStream!“;
            baos.write(content.getBytes());
            byte[] bytes = baos.toByteArray();
            System.out.println(new String(bytes));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

##### BufferedOutputStream

带有缓冲区的输出流，可以提高写入效率。

```java
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class BufferedOutputStreamExample {
    public static void main(String[] args) {
        String content = "Hello, BufferedOutputStream!“;
        try (BufferedOutputStream bos = new BufferedOutputStream(
                new FileOutputStream("output.txt"))) {
            bos.write(content.getBytes());
            System.out.println("写入成功!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 字符流

字符流用于处理文本数据，以字符为单位进行操作。字符流的基类是`Reader`和`Writer`，它们都是抽象类。

### Reader（输入字符流）

`Reader`是所有输入字符流的父类，提供了读取字符数据的基本方法。

#### 常用方法

- `int read()`：读取一个字符，返回读取的字符值，到达文件末尾返回-1
- `int read(char[] cbuf)`：读取最多cbuf.length个字符到字符数组，返回实际读取的字符数
- `int read(char[] cbuf, int off, int len)`：读取最多len个字符到字符数组，从off位置开始存储
- `void close()`：关闭流，释放资源

#### 常用实现类

##### FileReader

用于从文件中读取字符数据。

```java
import java.io.FileReader;
import java.io.IOException;

public class FileReaderExample {
    public static void main(String[] args) {
        try (FileReader fr = new FileReader("test.txt")) {
            int data;
            while ((data = fr.read()) != -1) {
                System.out.print((char) data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### BufferedReader

带有缓冲区的字符输入流，可以提高读取效率，还提供了`readLine()`方法用于读取一行文本。

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class BufferedReaderExample {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(
                new FileReader("test.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### InputStreamReader

将字节流转换为字符流，用于处理不同编码的文本。

```java
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class InputStreamReaderExample {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(
                        new FileInputStream("test.txt"), "UTF-8"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Writer（输出字符流）

`Writer`是所有输出字符流的父类，提供了写入字符数据的基本方法。

#### 常用方法

- `void write(int c)`：写入一个字符
- `void write(char[] cbuf)`：写入字符数组中的所有字符
- `void write(char[] cbuf, int off, int len)`：写入字符数组中从off位置开始的len个字符
- `void write(String str)`：写入字符串
- `void write(String str, int off, int len)`：写入字符串中从off位置开始的len个字符
- `void flush()`：刷新输出流，将缓冲区中的数据强制写入
- `void close()`：关闭流，释放资源

#### 常用实现类

##### FileWriter

用于向文件中写入字符数据。

```java
import java.io.FileWriter;
import java.io.IOException;

public class FileWriterExample {
    public static void main(String[] args) {
        String content = "Hello, FileWriter!“;
        try (FileWriter fw = new FileWriter("output.txt")) {
            fw.write(content);
            System.out.println("写入成功!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### BufferedWriter

带有缓冲区的字符输出流，可以提高写入效率，还提供了`newLine()`方法用于写入换行符。

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferedWriterExample {
    public static void main(String[] args) {
        try (BufferedWriter bw = new BufferedWriter(
                new FileWriter("output.txt"))) {
            bw.write("Hello, BufferedWriter!");
            bw.newLine();
            bw.write("这是第二行。");
            System.out.println("写入成功!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### OutputStreamWriter

将字符流转换为字节流，用于处理不同编码的文本。

```java
import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class OutputStreamWriterExample {
    public static void main(String[] args) {
        try (BufferedWriter bw = new BufferedWriter(
                new OutputStreamWriter(
                        new FileOutputStream("output.txt"), "UTF-8"))) {
            bw.write("Hello, OutputStreamWriter!");
            bw.newLine();
            bw.write("这是第二行。");
            System.out.println("写入成功!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## IO装饰器模式

Java IO使用了装饰器模式，允许我们将不同的流组合起来，以实现更复杂的功能。装饰器模式的核心是将一个流包装在另一个流中，从而增强其功能。

### 装饰器模式示例

```java
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class DecoratorPatternExample {
    public static void main(String[] args) {
        try (
            // 装饰器链：FileInputStream → InputStreamReader → BufferedReader
            BufferedReader br = new BufferedReader(
                new InputStreamReader(
                    new FileInputStream("input.txt"), "UTF-8")
            );
            // 装饰器链：FileOutputStream → OutputStreamWriter → PrintWriter
            PrintWriter pw = new PrintWriter(
                new OutputStreamWriter(
                    new FileOutputStream("output.txt"), "UTF-8")
            )
        ) {
            String line;
            while ((line = br.readLine()) != null) {
                pw.println(line.toUpperCase());
            }
            System.out.println("转换成功!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## File类

`File`类用于表示文件和目录的路径名，提供了创建、删除、重命名文件和目录的方法。

### 常用方法

- `String getName()`：获取文件名
- `String getPath()`：获取文件路径
- `String getAbsolutePath()`：获取文件绝对路径
- `boolean exists()`：判断文件或目录是否存在
- `boolean isFile()`：判断是否为文件
- `boolean isDirectory()`：判断是否为目录
- `boolean createNewFile()`：创建新文件
- `boolean mkdir()`：创建目录
- `boolean mkdirs()`：创建多级目录
- `boolean delete()`：删除文件或目录
- `String[] list()`：列出目录中的文件和目录名
- `File[] listFiles()`：列出目录中的文件和目录对象

### 示例

```java
import java.io.File;
import java.io.IOException;

public class FileExample {
    public static void main(String[] args) {
        // 创建File对象
        File file = new File("test.txt");
        
        try {
            // 判断文件是否存在
            if (!file.exists()) {
                // 创建新文件
                boolean created = file.createNewFile();
                System.out.println("文件创建: " + created);
            }
            
            // 获取文件信息
            System.out.println("文件名: " + file.getName());
            System.out.println("文件路径: " + file.getPath());
            System.out.println("绝对路径: " + file.getAbsolutePath());
            System.out.println("是否为文件: " + file.isFile());
            System.out.println("是否为目录: " + file.isDirectory());
            System.out.println("文件大小: " + file.length() + "字节");
            
            // 创建目录
            File dir = new File("test_dir");
            boolean dirCreated = dir.mkdir();
            System.out.println("目录创建: " + dirCreated);
            
            // 列出目录内容
            File parentDir = new File(".");
            System.out.println("当前目录内容:");
            File[] files = parentDir.listFiles();
            if (files != null) {
                for (File f : files) {
                    System.out.println(f.getName() + (f.isDirectory() ? " (目录)" : " (文件)"));
                }
            }
            
            // 删除文件
            // boolean deleted = file.delete();
            // System.out.println("文件删除: " + deleted);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Java NIO

Java NIO（New IO）是Java 1.4引入的新IO API，提供了更高效的IO操作方式。NIO基于通道（Channel）和缓冲区（Buffer），支持非阻塞IO操作。

### 核心概念

#### 1. Buffer

Buffer是一个容器，用于存储数据。NIO中的所有数据都通过Buffer处理，包括读和写。

常用的Buffer类型：
- `ByteBuffer`：存储字节数据
- `CharBuffer`：存储字符数据
- `ShortBuffer`：存储短整型数据
- `IntBuffer`：存储整型数据
- `LongBuffer`：存储长整型数据
- `FloatBuffer`：存储浮点型数据
- `DoubleBuffer`：存储双精度浮点型数据

Buffer的常用方法：
- `capacity()`：获取Buffer的容量
- `position()`：获取当前位置
- `limit()`：获取限制位置
- `flip()`：切换到读模式
- `rewind()`：重置position为0
- `clear()`：清空Buffer，切换到写模式
- `compact()`：压缩Buffer，保留未读取的数据
- `put()`：写入数据
- `get()`：读取数据

#### 2. Channel

Channel是用于读取和写入数据的通道，类似于流，但支持双向操作。

常用的Channel类型：
- `FileChannel`：用于文件的读写
- `SocketChannel`：用于TCP网络连接的读写
- `ServerSocketChannel`：用于监听TCP连接
- `DatagramChannel`：用于UDP网络连接的读写

Channel的常用方法：
- `read(Buffer dst)`：从Channel读取数据到Buffer
- `write(Buffer src)`：从Buffer写入数据到Channel
- `close()`：关闭Channel

#### 3. Selector

Selector用于监听多个Channel的事件，支持非阻塞IO操作。

Selector的常用方法：
- `open()`：打开Selector
- `select()`：阻塞直到至少有一个Channel就绪
- `selectNow()`：立即返回就绪的Channel数量
- `selectedKeys()`：获取就绪的事件
- `register(Channel ch, int ops)`：注册Channel到Selector
- `close()`：关闭Selector

### NIO示例

#### 文件读写示例

```java
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

public class NIOFileExample {
    public static void main(String[] args) {
        try (RandomAccessFile file = new RandomAccessFile("test.txt", "rw");
             FileChannel channel = file.getChannel()) {
            // 写入数据
            String content = "Hello, NIO!“;
            ByteBuffer writeBuffer = ByteBuffer.allocate(1024);
            writeBuffer.put(content.getBytes());
            writeBuffer.flip();
            channel.write(writeBuffer);
            
            // 读取数据
            ByteBuffer readBuffer = ByteBuffer.allocate(1024);
            channel.position(0); // 重置文件指针
            int bytesRead = channel.read(readBuffer);
            readBuffer.flip();
            if (bytesRead > 0) {
                byte[] data = new byte[bytesRead];
                readBuffer.get(data);
                System.out.println(new String(data));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### 非阻塞IO示例

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

public class NIOServerExample {
    public static void main(String[] args) {
        try {
            // 打开Selector
            Selector selector = Selector.open();
            
            // 打开ServerSocketChannel
            ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
            serverSocketChannel.bind(new InetSocketAddress(8080));
            serverSocketChannel.configureBlocking(false);
            
            // 注册ServerSocketChannel到Selector
            serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);
            
            System.out.println("服务器已启动，监听端口8080...");
            
            while (true) {
                // 阻塞直到有事件就绪
                int readyChannels = selector.select();
                if (readyChannels == 0) continue;
                
                // 获取就绪的事件
                Set<SelectionKey> selectionKeys = selector.selectedKeys();
                Iterator<SelectionKey> iterator = selectionKeys.iterator();
                
                while (iterator.hasNext()) {
                    SelectionKey key = iterator.next();
                    
                    if (key.isAcceptable()) {
                        // 处理连接请求
                        ServerSocketChannel serverChannel = (ServerSocketChannel) key.channel();
                        SocketChannel socketChannel = serverChannel.accept();
                        socketChannel.configureBlocking(false);
                        socketChannel.register(selector, SelectionKey.OP_READ);
                        System.out.println("客户端连接: " + socketChannel.getRemoteAddress());
                    } else if (key.isReadable()) {
                        // 处理读取事件
                        SocketChannel socketChannel = (SocketChannel) key.channel();
                        ByteBuffer buffer = ByteBuffer.allocate(1024);
                        int bytesRead = socketChannel.read(buffer);
                        
                        if (bytesRead > 0) {
                            buffer.flip();
                            byte[] data = new byte[buffer.limit()];
                            buffer.get(data);
                            String message = new String(data);
                            System.out.println("收到消息: " + message);
                            
                            // 回送消息
                            ByteBuffer writeBuffer = ByteBuffer.wrap("已收到: " + message.getBytes());
                            socketChannel.write(writeBuffer);
                        } else if (bytesRead < 0) {
                            // 客户端断开连接
                            System.out.println("客户端断开连接: " + socketChannel.getRemoteAddress());
                            socketChannel.close();
                        }
                    }
                    
                    // 移除已处理的事件
                    iterator.remove();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 总结

Java IO提供了丰富的API用于处理输入输出，包括传统的IO和NIO。传统IO基于流，而NIO基于通道和缓冲区，支持非阻塞操作。

### 传统IO与NIO的比较

| 特性 | 传统IO | NIO |
|------|--------|-----|
| 基于 | 流 | 通道和缓冲区 |
| 阻塞 | 阻塞IO | 支持非阻塞IO |
| 操作 | 单向（输入流/输出流） | 双向（通道） |
| 选择器 | 不支持 | 支持Selector |
| 缓冲区 | 不使用 | 使用Buffer |

### IO最佳实践

1. **使用try-with-resources**：自动关闭流，避免资源泄漏
2. **使用缓冲流**：提高IO效率
3. **选择合适的流类型**：根据数据类型选择字节流或字符流
4. **处理异常**：妥善处理IO异常
5. **关闭流**：确保流被正确关闭，无论是否发生异常
6. **使用NIO**：对于高并发场景，考虑使用NIO提高性能
7. **使用Path和Files**：Java 7引入的Path和Files类提供了更简洁的文件操作API

### Java 7+ 新IO API

Java 7引入了新的IO API，位于`java.nio.file`包下，提供了更简洁、更高效的文件操作方法。

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;

public class NewIOExample {
    public static void main(String[] args) {
        try {
            // 创建Path对象
            Path path = Paths.get("test.txt");
            
            // 写入文件
            String content = "Hello, New IO!“;
            Files.write(path, content.getBytes(StandardCharsets.UTF_8),
                    StandardOpenOption.CREATE, StandardOpenOption.WRITE);
            System.out.println("写入成功!");
            
            // 读取文件
            byte[] bytes = Files.readAllBytes(path);
            System.out.println("读取内容: " + new String(bytes, StandardCharsets.UTF_8));
            
            // 按行读取
            List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
            System.out.println("按行读取:");
            for (String line : lines) {
                System.out.println(line);
            }
            
            // 复制文件
            Path destPath = Paths.get("test_copy.txt");
            Files.copy(path, destPath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("复制成功!");
            
            // 删除文件
            // Files.delete(destPath);
            // System.out.println("删除成功!");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

通过学习Java IO，我们可以更好地理解和掌握Java中的输入输出操作，从而编写出更高效、更可靠的Java程序。