# scp 传输

scp 是一个系统自带的用于传输文件的命令

当两台机器的 ip 可以连通时就可以用它进行文件传输

scp 发送的文件 用户名@ip:接收端文件

```shell
scp ./test.txt root@10.0.2.6:~/test.txt

# 回车后会提示输入目标机器的密码
root@10.0.2.6's password: 
```