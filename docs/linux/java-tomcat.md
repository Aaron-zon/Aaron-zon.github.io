# Linux 安装java/tomcat/maven/git/Mysql/Nginx

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

## 安装 maven

`yum install maven`

`mvn -v`

## 安装 git

`yum install git`

## 安装 Mysql

yum 的中央仓库中没有 mysql 因此想要安装，需要先下载一个安装包（.rpm）

```shell
# 先安装 wget
yum install wget

# 下载 mysql 安装包（文件会下载到执行命令的当前目录）
# 注意这里是实验因此下载的版本可能不是你想要的，按照你想要的版本自行找链接
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm

# 加载到内存中
rpm -ivh mysql-community-release-el7-5.noarch.rpm

# 下载 mysql 服务端
yum install mysql-server

# 下载 mysql 开发包
yum install mysql-devel

# 安装 mysql 客户端
yum install mysql

# 可能会提示这个表示已经安装过了，可以忽略
# Package mysql-community-client-5.6.51-2.el7.x86_64 already installed and latest version
# Nothing to do


```

### 配置文件

进入配置文件

> vim /etc/my.cnf

```shell
# 在 [mysqld] 区块加一行编码格式
character-set-server=utf8
```

### mysql 命令

启动：`service mysql start`

停止：`service mysql stop`

重启：`service mysql restart`

进入mysql：`mysql -u root -p`

第一次进入密码为空，直接回车就可以进入

```shell
# 修改密码（这是 5.6.51 版本修改密码的方式，8版本以上有所不同）
mysql> UPDATE mysql.user SET password=PASSWORD('你的新密码') WHERE user='root';

# 刷新内存让新密码生效
mysql> FLUSH PRIVILEGES;

# 退出
mysql> quit;
```

## 安装 Nginx