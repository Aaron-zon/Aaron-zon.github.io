# Linux 下载安装软件

linux 中可以使用 yum 命令进行软件下载安装，也可以使用 wget 命令进行下载。（不同linux系统中命令可能会有区别，yum命令在centos中，wget命令在ubuntu中）

下载命令：`yum install [软件名]`

我使用了centos7系统，但是由于仓库已经不再维护因此需要做些其他配置

```shell
# 2. 下载阿里云 CentOS 7 仓库配置
sudo curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

# 3. 禁用 fastestmirror 插件（避免干扰）
sudo sed -i 's/enabled=1/enabled=0/g' /etc/yum/pluginconf.d/fastestmirror.conf

# 4. 清理缓存并重建
sudo yum clean all
sudo yum makecache

# 5. 测试安装软件
sudo yum install [软件名] -y
```

**安装vim**

```
sudo yum install vim

或

sudo yum install vim -y
```

-y 表示自动安装