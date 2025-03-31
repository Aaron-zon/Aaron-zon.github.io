---
outline: deep
---

# 基本内置模块

[Node Api文档](https://nodejs.org/docs/latest/api/)

- os：提供与操作系统相关的实用方法和属性
    - ELO：获取当前系统使用的换行符（windows和Linux的换行符不同）
    - arch()：获取CPU的架构名（x32、x64、arm、...）
    - **cpus()**： 获取CPU信息，每一个核的信息汇总成一个数组
    - freemem()： 获取当前系统剩余内存大小
    - homedir()： 获取当前用户目录（windows一般为C:\Users\xxx）
    - hostname()： 获取当前主机名称
    - **tmpdir()**： 获取临时文件目录
- **path**：提供与路径相关的操作
    - basename(path[, ext])： 传入路径，获取路径的最后一部分
    - sep： 获取当前系统路径分隔符
    - **delimiter**：提供特定于平台的路径分隔符
        - windows：`;`
        - linux：`:`
    - **dirname(path)**： 传入路径，获取最后一部分前的路径
    - **extname(path)**： 传入路径，获取路径最后一部分的扩展名
    - **join(p1, p2, ...)**： 传入多段路径，合并成完整路径
    - normalize(path)： 传入路径，获取符合操作系统标准的路径
    - relative(from, to)： 传入两个路径，获取from到to的相对路径
    - resolve(p1, p2, ...)： 传入多段路径，解析为绝对路径
- url：提供与url相关的操作
    - URL(path)： 传入路径，获取一个对路径解析后的对象（解析出协议、路径、端口、参数）
    - ...
- util：提供与常用方法相关的操作
    - callbackify(original)：传入异步函数转换为回调函数形式
    - isDeepStrictEqual(val1, val2)：将传入的对象进行深度严格比较
    - promisify(original)：回调模式转为异步模式
- ...