# SpringBoot FormData 参数个数限制

在 SpringBoot 3.4.x 做文件上传时，如果使用FormData，当append的参数超过一定数量（我这里测试是10个）时，会导致上传失败

## 例子
```js
const formData = new FormData();
formData.append('p1', 'p1');
formData.append('p2', 'p2');
formData.append('p3', 'p3');
formData.append('p4', 'p4');
formData.append('p5', 'p5');
formData.append('p6', 'p6');
formData.append('p7', 'p7');
formData.append('p8', 'p8');
formData.append('p9', 'p9');
formData.append('p10', 'p10');
formData.append('p11', 'p11');

```

错误为：
```java
// 表示上传的文件个属超过了限制
org.apache.tomcat.util.http.fileupload.impl.FileCountLimitExceededException: attachment
```

## 解决方案

### 1. 修改配置文件

配置项为 `server.tomcat.max-part-count`, 根据你的参数数量设定。

以 `application.yml` 文件为例，添加以下配置：
```yaml
server:
  tomcat:
    max-part-count: 20
```
