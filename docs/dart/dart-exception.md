---
outline: deep
---

# Dart 异常处理

异常处理是编程中非常重要的一部分，它允许我们优雅地处理程序运行过程中出现的错误和异常情况。Dart 提供了完善的异常处理机制，本文将详细介绍 Dart 的异常处理相关知识。

## 1. 错误和异常的区分

在 Dart 中，错误（Error）和异常（Exception）是两个不同的概念：

### 错误（Error）

错误通常表示程序中的严重问题，这些问题一般是不可恢复的，并且不应该被捕获。错误通常是由程序的逻辑错误或系统级问题引起的，例如：

- `StackOverflowError`：栈溢出错误
- `OutOfMemoryError`：内存不足错误
- `NoSuchMethodError`：调用不存在的方法错误
- `ArgumentError`：参数错误

### 异常（Exception）

异常通常表示程序运行过程中可以预期的、可能发生的问题，这些问题是可以被捕获和处理的。异常通常是由外部因素引起的，例如：

- `FormatException`：格式错误（如解析字符串时）
- `RangeError`：范围错误（如访问列表越界）
- `SocketException`：网络连接错误
- `TimeoutException`：超时错误

**总结**：错误是严重的、不可恢复的问题，不应该被捕获；异常是可以预期的、可恢复的问题，应该被捕获和处理。

## 2. 抛出异常

在 Dart 中，使用 `throw` 关键字来抛出异常。

### 抛出内置异常

```dart
// 抛出 FormatException
if (int.tryParse('abc') == null) {
  throw FormatException('无效的数字格式');
}

// 抛出 ArgumentError
if (age < 0) {
  throw ArgumentError('年龄不能为负数');
}

// 抛出 Exception
throw Exception('发生了一个异常');
```

### 抛出任意对象

在 Dart 中，你可以抛出任意对象作为异常，不仅仅是 Exception 类型的对象。

```dart
// 抛出字符串
throw '发生了一个错误';

// 抛出整数
throw 404;

// 抛出布尔值
throw false;
```

**注意**：虽然可以抛出任意对象，但建议只抛出 Exception 或其子类的实例，这样可以保持代码的一致性和可读性。

## 3. 捕获异常

在 Dart 中，使用 `try-catch` 语句来捕获和处理异常。

### 基本的 try-catch

```dart
try {
  // 可能会抛出异常的代码
  int result = int.parse('abc');
  print('结果: $result');
} catch (e) {
  // 捕获异常并处理
  print('捕获到异常: $e');
}
```

### 捕获特定类型的异常

```dart
try {
  int result = int.parse('abc');
  print('结果: $result');
} on FormatException catch (e) {
  // 只捕获 FormatException 类型的异常
  print('格式错误: $e');
} catch (e) {
  // 捕获其他类型的异常
  print('其他异常: $e');
}
```

### 使用 finally 块

`finally` 块中的代码无论是否发生异常都会执行，通常用于清理资源。

```dart
try {
  // 可能会抛出异常的代码
  int result = int.parse('abc');
  print('结果: $result');
} catch (e) {
  // 捕获异常并处理
  print('捕获到异常: $e');
} finally {
  // 无论是否发生异常都会执行的代码
  print('执行 finally 块');
}
```

### 获取异常的堆栈信息

使用 `stackTrace` 参数来获取异常的堆栈信息。

```dart
try {
  int result = int.parse('abc');
  print('结果: $result');
} catch (e, stackTrace) {
  print('捕获到异常: $e');
  print('堆栈信息: $stackTrace');
}
```

## 4. 自定义异常

在 Dart 中，你可以通过继承 `Exception` 类来创建自定义异常。

### 基本自定义异常

```dart
class CustomException implements Exception {
  final String message;
  
  CustomException(this.message);
  
  @override
  String toString() {
    return 'CustomException: $message';
  }
}

// 使用自定义异常
void main() {
  try {
    throw CustomException('这是一个自定义异常');
  } catch (e) {
    print('捕获到异常: $e');
  }
}
```

### 带错误码的自定义异常

```dart
class AppException implements Exception {
  final String message;
  final int errorCode;
  
  AppException(this.message, this.errorCode);
  
  @override
  String toString() {
    return 'AppException($errorCode): $message';
  }
}

// 使用带错误码的自定义异常
void main() {
  try {
    throw AppException('用户不存在', 404);
  } catch (e) {
    print('捕获到异常: $e');
  }
}
```

### 异常层次结构

你可以创建异常的层次结构，以便更精细地控制异常处理。

```dart
class BaseException implements Exception {
  final String message;
  
  BaseException(this.message);
  
  @override
  String toString() {
    return 'BaseException: $message';
  }
}

class NetworkException extends BaseException {
  final String url;
  
  NetworkException(String message, this.url) : super(message);
  
  @override
  String toString() {
    return 'NetworkException: $message (URL: $url)';
  }
}

class AuthException extends BaseException {
  final String username;
  
  AuthException(String message, this.username) : super(message);
  
  @override
  String toString() {
    return 'AuthException: $message (Username: $username)';
  }
}

// 使用异常层次结构
void main() {
  try {
    throw NetworkException('网络连接失败', 'https://api.example.com');
  } on AuthException catch (e) {
    print('认证异常: $e');
  } on NetworkException catch (e) {
    print('网络异常: $e');
  } on BaseException catch (e) {
    print('基础异常: $e');
  } catch (e) {
    print('其他异常: $e');
  }
}
```

## 5. 异常处理最佳实践

### 1. 只捕获可以处理的异常

不要捕获所有异常，只捕获你知道如何处理的异常。

```dart
// 不好的做法
try {
  // 可能会抛出多种异常的代码
} catch (e) {
  // 捕获所有异常，但不知道如何处理
  print('发生了异常');
}

// 好的做法
try {
  // 可能会抛出 FormatException 的代码
  int result = int.parse(input);
} on FormatException catch (e) {
  // 只捕获 FormatException 并处理
  print('输入格式错误，请输入有效的数字');
}
```

### 2. 提供有意义的异常信息

抛出异常时，提供清晰、具体的错误信息，以便于调试和处理。

```dart
// 不好的做法
if (age < 0) {
  throw Exception('错误');
}

// 好的做法
if (age < 0) {
  throw ArgumentError('年龄不能为负数，当前值: $age');
}
```

### 3. 使用 finally 块清理资源

当使用需要清理的资源（如文件、网络连接等）时，使用 finally 块来确保资源被正确清理。

```dart
File? file;
try {
  file = File('example.txt');
  // 操作文件
} catch (e) {
  print('文件操作异常: $e');
} finally {
  file?.close(); // 确保文件被关闭
}
```

### 4. 合理使用自定义异常

对于应用程序特有的错误情况，创建自定义异常可以使代码更加清晰和可维护。

### 5. 避免过度使用异常

异常应该用于处理异常情况，而不是用于控制正常的程序流程。

```dart
// 不好的做法
try {
  int index = list.indexOf(item);
  if (index == -1) {
    throw Exception('项目未找到');
  }
  // 处理找到的项目
} catch (e) {
  // 处理项目未找到的情况
}

// 好的做法
int index = list.indexOf(item);
if (index == -1) {
  // 直接处理项目未找到的情况
  print('项目未找到');
} else {
  // 处理找到的项目
}
```

## 6. 异常处理示例

### 示例 1：基本异常处理

```dart
void main() {
  print('开始程序');
  
  try {
    // 尝试解析一个无效的数字
    int result = int.parse('abc');
    print('解析结果: $result');
  } on FormatException catch (e) {
    print('格式错误: $e');
  } catch (e) {
    print('其他异常: $e');
  } finally {
    print('程序结束');
  }
}
```

### 示例 2：自定义异常

```dart
class ValidationException implements Exception {
  final String field;
  final String message;
  
  ValidationException(this.field, this.message);
  
  @override
  String toString() {
    return 'ValidationException: $field - $message';
  }
}

void validateUser(String username, String password) {
  if (username.isEmpty) {
    throw ValidationException('username', '用户名不能为空');
  }
  
  if (password.length < 6) {
    throw ValidationException('password', '密码长度不能少于 6 个字符');
  }
}

void main() {
  try {
    validateUser('', '123');
  } on ValidationException catch (e) {
    print('验证失败: $e');
  } catch (e) {
    print('其他异常: $e');
  }
}
```

### 示例 3：异常层次结构

```dart
class ApiException implements Exception {
  final String message;
  
  ApiException(this.message);
  
  @override
  String toString() {
    return 'ApiException: $message';
  }
}

class BadRequestException extends ApiException {
  BadRequestException(String message) : super(message);
}

class UnauthorizedException extends ApiException {
  UnauthorizedException(String message) : super(message);
}

class NotFoundException extends ApiException {
  NotFoundException(String message) : super(message);
}

void fetchData(String endpoint) {
  if (endpoint == '/bad') {
    throw BadRequestException('无效的请求参数');
  } else if (endpoint == '/unauthorized') {
    throw UnauthorizedException('未授权的访问');
  } else if (endpoint == '/notfound') {
    throw NotFoundException('资源不存在');
  } else {
    print('数据获取成功');
  }
}

void main() {
  List<String> endpoints = ['/api', '/bad', '/unauthorized', '/notfound'];
  
  for (var endpoint in endpoints) {
    print('\n请求: $endpoint');
    try {
      fetchData(endpoint);
    } on BadRequestException catch (e) {
      print('请求错误: $e');
    } on UnauthorizedException catch (e) {
      print('授权错误: $e');
    } on NotFoundException catch (e) {
      print('资源错误: $e');
    } on ApiException catch (e) {
      print('API 错误: $e');
    } catch (e) {
      print('其他错误: $e');
    }
  }
}
```

## 7. 异步异常处理

在 Dart 中，异步代码（如 Future 和 async/await）中的异常处理需要特别注意。

### 处理 Future 中的异常

```dart
Future<int> parseNumber(String input) {
  return Future.delayed(Duration(seconds: 1), () {
    int? result = int.tryParse(input);
    if (result == null) {
      throw FormatException('无效的数字格式');
    }
    return result;
  });
}

// 使用 catchError
parseNumber('abc')
  .then((result) => print('结果: $result'))
  .catchError((error) => print('捕获到异常: $error'));

// 使用 async/await
aFuture<void> main() async {
  try {
    int result = await parseNumber('abc');
    print('结果: $result');
  } catch (error) {
    print('捕获到异常: $error');
  }
}
```

### 处理 Stream 中的异常

```dart
Stream<int> countStream(int max) {
  return Stream.periodic(Duration(seconds: 1), (i) {
    if (i == 3) {
      throw Exception('发生错误');
    }
    return i;
  }).take(max);
}

// 使用 listen
try {
  countStream(5).listen(
    (value) => print('值: $value'),
    onError: (error) => print('捕获到异常: $error'),
    onDone: () => print('流结束'),
  );
} catch (error) {
  print('捕获到异常: $error');
}

// 使用 await for
aFuture<void> main() async {
  try {
    await for (int value in countStream(5)) {
      print('值: $value');
    }
    print('流结束');
  } catch (error) {
    print('捕获到异常: $error');
  }
}
```

## 8. 总结

Dart 的异常处理机制提供了一种优雅的方式来处理程序运行过程中出现的错误和异常情况。通过本文的学习，你应该掌握了以下内容：

1. **错误和异常的区分**：错误是严重的、不可恢复的问题，异常是可以预期的、可恢复的问题。

2. **抛出异常**：使用 `throw` 关键字抛出异常，可以抛出内置异常或自定义异常。

3. **捕获异常**：使用 `try-catch` 语句捕获和处理异常，可以捕获特定类型的异常，也可以使用 `finally` 块清理资源。

4. **自定义异常**：通过继承 `Exception` 类创建自定义异常，可以创建异常层次结构，以便更精细地控制异常处理。

5. **异常处理最佳实践**：只捕获可以处理的异常，提供有意义的异常信息，使用 `finally` 块清理资源，合理使用自定义异常，避免过度使用异常。

6. **异步异常处理**：处理 Future 和 Stream 中的异常。

通过合理使用 Dart 的异常处理机制，你可以编写更加健壮、可靠的代码，提高应用程序的用户体验。