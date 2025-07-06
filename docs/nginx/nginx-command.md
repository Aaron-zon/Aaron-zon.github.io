# Nginx 命令

## 配置防火墙：
```shell
# 查看当前配置
firewall-cmd --list-all
# 开放http和https访问
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
# 开放80端口
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --reload
```

## 启动命令
```shell
cd /usr/local/nginx/sbin

# 启动
./nginx

# 关闭
./nginx -s stop

# 重启
./nginx -s reopen

# 重新加载配置
./nginx -s reload
```

## 使用关闭进程的方式关闭nginx
- `kill -TERM pid`：快速停止服务
- `kill -QUIT pid`：平缓停止服务
- `kill -9 pid`：强制停止服务（一般快速停止服务和平缓停止服务不好用时可以使用这个）

## 注册为系统服务

手动编译安装，无法直接使用 `service [软件名] start` 或 `systemctl start [软件名]` 启动，需要将软件注册为系统服务。`启动，需要将软件注册为系统服务。

步骤：
```shell
# 创建服务文件
vim /etc/systemd/system/nginx.service

# 进入编辑模式
[Unit]
Description=The NGINX HTTP and revers proxy server
After=network.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
Restart=on-failure
RestartSec=5s
[Install]
WantedBy=multi-user.target
# 参数说明 
# PIDFile：Nginx 的进程 ID 文件路径（通常在 logs/nginx.pid）。
# ExecStart：Nginx 启动命令。
# ExecReload：Nginx 重载配置命令。
# ExecStop：Nginx 停止命令。
# 保存退出

# 重新加载Systemctl
systemctl daemon-reload

# 启动 Nginx 并设置开机自启
sudo systemctl start nginx          # 启动
sudo systemctl enable nginx         # 开机自启
sudo systemctl status nginx         # 查看状态

# 如果成功，你应该会看到：
# nginx.service - The NGINX HTTP and reverse proxy server
# Loaded: loaded (/etc/systemd/system/nginx.service; enabled; vendor preset: disabled)
# Active: active (running) since ...

# 检查 Nginx 是否正常运行
curl http://localhost

```

如果在配置前通过 ./nginx 手动启动过nginx，那么很可能在使用 systemctl 启动时失败，需要先关闭之前 nginx 所占用的进程

```shell
# 排查端口是否被占用
sudo lsof -i :80

# 输出结果
# COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
# nginx   31080   root    6u  IPv4  42489      0t0  TCP *:http (LISTEN)
# nginx   31081 nobody    3u  IPv4  54336      0t0  TCP 192.168.1.36:http->192.168.1.227:65005 (ESTABLISHED)
# nginx   31081 nobody    6u  IPv4  42489      0t0  TCP *:http (LISTEN)
# nginx   31081 nobody   10u  IPv4  54337      0t0  TCP 192.168.1.36:http->192.168.1.227:65006 (ESTABLISHED)

# 这里有两个进程 31080 和 31081
# 关闭这两个进程
sudo kill -9 31080 31081

# 启动nginx
sudo systemctl start nginx

```