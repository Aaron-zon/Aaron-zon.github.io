# Nginx location & rewrie

## localtion 块

- `location = /uri`：精确匹配
- `location ^~/uri`：前缀匹配，顺序在正则之前
- `location /uri`：前缀匹配，在正则之后
- `location ~ pattern`：区分大小写的正则匹配
- `location ~* pattern`：不区分大小写的正则匹配
- `location /`：通用匹配，接收未匹配到其他location的请求

匹配顺序：

首先会进行精确匹配，然后回进行前缀匹配，具体顺序按照指令长度，从长到短的顺序依次匹配，但是在正则匹配时，是按照配置文件的顺序依次匹配的，如果不希望前缀匹配后进行正则匹配，那么使用 `^~`

## URL 重写

对 url 的规范化处理，域名更换时的新旧跳转，一些额外的参数调整等

```conf
server {
    listen 80;
    server_name aaron4899.com
    rewite ^/(.*) http://www.aaron4899.com/$1 pernament;

    # 访问 aaron4899.com 地址会变成 www.aaron4899.com
}
```