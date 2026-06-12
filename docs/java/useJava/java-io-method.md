---
outline: deep
---

# IO 常用方法

## 常见类

### InputStream（子节输入流）

```
InputStream in = new FileInputStream("a.txt");
```

- read(): 读取一个子节
- read(byte[] b): 一次性读取多个子节
- read(byre[], off, len): 从指定位置开始读取
- skip(int i): 跳过子节
- available(): 获取还剩余的可读字节数
- close(): 关闭流

### OutputStream（字节输出流）

```java
OutputStream out = new FileOutputStream("a.txt");
```

- write(int i): 写一个子节
- write(byte[]): 一次性写多个子节
- write(byte[], off, len): 从指定位置开始写
- flush(): 刷新缓冲区，立即写入。
- close(): 关闭流

### Reader（字符输入流）

```java
Reader reader = new FileReader("a.txt");
```

- read(): 读取一个字符。
- read(char[] cbuf): 一次性读取多个字符。
- close(): 关闭流。

### BufferedReader

```java
BufferedReader br = new BufferedReader(new FileReader("a.txt"));
```

- readLine(): 读取一行数据。
```java
while((line = br.readLine()) != null){
    System.out.println(line);
}
```

### Writer（字符输出流）

```java
Writer writer = new FileWriter("a.txt");
```

- write(String s): 写入一行数据。
- write(char[] c): 写入一行数据。
- append(): 追加写入。
- flush(): 刷新缓冲区，立即写入。
- close(): 关闭流。

### Files（8+后最常见）

- readAllBytes(): 读取整个文件

```java
byte[] byte = Files.readAllBytes(path);
```

- readAllLines(): 读取所有行

```java
List<String> lines = Files.readAllLines(path);
```

- write(): 写入文件

```java
Files.write(path, bytes);
```

- copy(): 拷贝文件

```java
Files.copy(src, dest);
```

- move(): 移动文件

```java
Files.move(src, dest);
```

- delete(): 删除文件

```java
Files.delete(path);
```

- exists(): 判断文件是否存在

```java
Files.exists(path);
```

- size(): 文件大小

```java
Files.size(path);
```

#### Java11 新增

- readString(): 直接读取字符串

```java
String text = Files.readString(path);
```

- writeString(): 直接写入字符串

```
Files.writeString(path, text);
```

### File

现在虽然推荐 Path + Files，但是老项目使用File的还很多。

```java
File file = new File("a.txt");
```

- boolean exists(): 判断文件是否存在
- boolean isFile(): 判断是否是文件
- boolean isDirectory(): 判断是否是目录
- long length(): 文件大小
- boolean mkdir(): 创建目录
- mkdirs(): 递归创建目录
- delete(): 删除文件
- File[] listFiles(): 获取目录下文件。

### FileChannel（NIO高频）

- read()
- write()
- transferTo()


## 示例

### Java11+

#### 读取整个文件

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class Demo {
    public static void main(String[] args) throws Exception {

        Path path = Path.of("D:/test.txt");

        String content = Files.readString(path);

        System.out.println(content);
    }
}
```

#### 按行读取

适用于:

- 日志
- CSV
- SQL脚本
- 配置文件

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Demo {

    public static void main(String[] args) throws Exception {

        List<String> lines =
                Files.readAllLines(Path.of("D:/test.txt"));

        lines.forEach(System.out::println);
    }
}
```

大文件时流式读取：

```java
Files.lines(Path.of("D:/test.txt")).forEach(System.out::println);
```

这样不会一次加载整个文件。

#### 读取二进制文件

- 图片
- PDF
- Excel
- Zip

```java
byte[] bytes =
        Files.readAllBytes(
                Path.of("D:/demo.pdf")
        );
```

#### 写入二进制文件

```java
byte[] bytes = "Hello".getBytes();

Files.write(
        Path.of("D:/demo.txt"),
        bytes
);
```

#### 文件复制

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

Files.copy(
        Path.of("D:/a.txt"),
        Path.of("D:/b.txt"),
        StandardCopyOption.REPLACE_EXISTING
);
```

#### 文件移动

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

Files.copy(
        Path.of("D:/a.txt"),
        Path.of("D:/b.txt"),
        StandardCopyOption.REPLACE_EXISTING
);
```

#### 文件删除

```java
Files.delete(
        Path.of("D:/a.txt")
);
```

#### 覆盖写入

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class Demo {

    public static void main(String[] args) throws Exception {

        Files.writeString(
                Path.of("D:/test.txt"),
                "Hello JDK11"
        );
    }
}
```

#### 追加写入

```java
import java.nio.file.StandardOpenOption;

Files.writeString(
        Path.of("D:/test.txt"),
        "\n追加内容",
        StandardOpenOption.CREATE,
        StandardOpenOption.APPEND
);
```



#### 文件上传

前端：

```html
<input type="file" />
```

后端：

```java
@RestController
@RequestMapping("/file")
public class FileController {

    @PostMapping("/upload")
    public String upload(@RequestParam("file")MultipartFile file) throws Exception {

        Path target = Path.of("D:/upload", file.getOriginalFilename());

        Files.copy(file.getInputStream(), target);

        return "上传成功";
    }
}
```

上传流程：

```
浏览器
 ↓
MultipartFile
 ↓
InputStream
 ↓
Files.copy()
 ↓
磁盘
```


#### 文件下载

浏览器访问：`http://localhost:8080/file/download`

后端：
```java
@RestController
@RequestMapping("/file")
public class FileController {

    @GetMapping("/download")
    public ResponseEntity<Resource> download()
            throws Exception {

        Path path = Path.of("D:/test.xlsx");

        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=test.xlsx"
                )
                .body(resource);
    }
}
```




