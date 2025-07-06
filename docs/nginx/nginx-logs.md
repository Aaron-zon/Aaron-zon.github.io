# Nginx 日志

通过日志可以获取到 用户地址信息、跳转来源、终端、以及url访问量等。

日志的格式在 http块 的 log_format 中可以定义

log格式：
```
http {

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
}
```

log示例：
```log
192.168.1.227 - - [04/Jul/2025:18:37:49 -0400] "GET / HTTP/1.1" 304 612 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
```

- $remote_addr：客户端 IP 地址。
- $remote_user：客户端用户名。
- $time_local：访问时间 [日期/月份/年份:小时:分钟:秒钟 -时区]。
- $request：请求方式。
- $status：HTTP 响应状态码。
- $body_bytes_sent：发送给客户端的字节数。
- $http_referer：来源页面的 URL，用户从哪个地址请求过来的，如果是新页，则为 "-"。
- $http_user_agent：用户代理字符串（标注用户使用的浏览器，但在浏览器大战后，这个字段已经不再准确）。
- $http_x_forwarded_for: 通过代理服务器来记录客户端的 IP 地址。

## 日志分割

由于日志随着时间不断增大，可能会导致查看不便，我们可以将日志按照每天进行分割。

可以在每天0时进行定时任务，重新命名日志文件，并向nginx发送信号（kill -USR 主进程ID），使nginx重新打开新的日志文件。

主进程ID可以在 **/logs/nginx.pid** 中或使用命令 **ps -ef | grep nginx** 查看。
