# Linux 安装java和tomcat

## 安装java

```shell
# 安装java
yum install java -y

java -version
```

## 安装tomcat

```shell
# 安装tomcat
yum install tomcat -y

```

程序会安装在 `usr` 目录下（usr/share/tomcat）

### 启动与关闭

启动tomcat：`service tomcat start`

关闭tomcat：`service tomcat stop`

### 修改端口号

在`tomcat`文件夹下进入 `conf` 目录，修改`server.xml` 文件。

将`<Connector port="8080" protocol="HTTP/1.1"... />` 中的 `port` 进行修改，随后重启服务即可

```
cd /conf
```