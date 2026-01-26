---
outline: deep
---

# 正则的常用方法

## 常见正则表达式示例

### 邮箱验证

```java
String regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
```

### 手机号验证

```java
String regex = "^1[3-9]\\d{9}$";
```

### 身份证号验证

```java
String regex = "^[1-9]\\d{5}(18|19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[0-9Xx]$";
```

### 密码强度验证（至少包含大小写字母、数字和特殊字符，长度8-20位）

```java
String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$";
```

### URL验证

```java
String regex = "^(https?|ftp):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?$";
```

### IP地址验证

```java
String regex = "^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$";
```

### 日期格式验证（yyyy-MM-dd）

```java
String regex = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$";
```

### 时间格式验证（HH:mm:ss）

```java
String regex = "^([01]?\\d|2[0-3]):[0-5]\\d:[0-5]\\d$";
```

## 正则表达式的常用方法

### 字符串匹配

#### 示例：验证邮箱格式

```java
import java.util.regex.Pattern;

public class EmailValidationExample {
    public static void main(String[] args) {
        String email = "test@example.com";
        String regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        
        // 使用Pattern.matches()方法
        boolean isValid = Pattern.matches(regex, email);
        System.out.println("邮箱是否有效: " + isValid);
        
        // 使用Pattern和Matcher类
        Pattern pattern = Pattern.compile(regex);
        boolean isValid2 = pattern.matcher(email).matches();
        System.out.println("邮箱是否有效: " + isValid2);
    }
}
```

#### 示例：验证手机号格式

```java
import java.util.regex.Pattern;

public class PhoneValidationExample {
    public static void main(String[] args) {
        String phone = "13812345678";
        String regex = "^1[3-9]\\d{9}$";
        
        boolean isValid = Pattern.matches(regex, phone);
        System.out.println("手机号是否有效: " + isValid);
    }
}
```

### 字符串查找

#### 示例：查找所有数字

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FindNumbersExample {
    public static void main(String[] args) {
        String text = "Hello 123 World 456 Java 789";
        String regex = "\\d+";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        
        while (matcher.find()) {
            String number = matcher.group();
            int start = matcher.start();
            int end = matcher.end();
            System.out.println("找到数字: " + number + "，位置: " + start + "-" + end);
        }
    }
}
```

#### 示例：查找所有单词

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FindWordsExample {
    public static void main(String[] args) {
        String text = "Hello, World! Java is awesome.";
        String regex = "\\w+";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        
        while (matcher.find()) {
            String word = matcher.group();
            System.out.println("找到单词: " + word);
        }
    }
}
```

### 字符串替换

#### 示例：替换所有数字

```java
import java.util.regex.Pattern;

public class ReplaceNumbersExample {
    public static void main(String[] args) {
        String text = "Hello 123 World 456 Java 789";
        String regex = "\\d+";
        String replacement = "***";
        
        // 使用String.replaceAll()方法
        String result1 = text.replaceAll(regex, replacement);
        System.out.println("替换结果1: " + result1);
        
        // 使用Pattern和Matcher类
        Pattern pattern = Pattern.compile(regex);
        String result2 = pattern.matcher(text).replaceAll(replacement);
        System.out.println("替换结果2: " + result2);
    }
}
```

#### 示例：替换第一个数字

```java
import java.util.regex.Pattern;

public class ReplaceFirstNumberExample {
    public static void main(String[] args) {
        String text = "Hello 123 World 456 Java 789";
        String regex = "\\d+";
        String replacement = "***";
        
        // 使用String.replaceFirst()方法
        String result1 = text.replaceFirst(regex, replacement);
        System.out.println("替换结果1: " + result1);
        
        // 使用Pattern和Matcher类
        Pattern pattern = Pattern.compile(regex);
        String result2 = pattern.matcher(text).replaceFirst(replacement);
        System.out.println("替换结果2: " + result2);
    }
}
```

### 字符串分割

#### 示例：根据空白字符分割字符串

```java
import java.util.regex.Pattern;

public class SplitStringExample {
    public static void main(String[] args) {
        String text = "Hello   World  Java";
        String regex = "\\s+";
        
        // 使用String.split()方法
        String[] result1 = text.split(regex);
        System.out.println("分割结果1: ");
        for (String s : result1) {
            System.out.println(s);
        }
        
        // 使用Pattern.split()方法
        Pattern pattern = Pattern.compile(regex);
        String[] result2 = pattern.split(text);
        System.out.println("分割结果2: ");
        for (String s : result2) {
            System.out.println(s);
        }
    }
}
```

#### 示例：根据逗号分割字符串

```java
import java.util.regex.Pattern;

public class SplitByCommaExample {
    public static void main(String[] args) {
        String text = "apple,banana,orange,grape";
        String regex = ",";
        
        String[] result = text.split(regex);
        System.out.println("分割结果: ");
        for (String s : result) {
            System.out.println(s);
        }
    }
}
```