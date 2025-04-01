---
outline: deep
---

# I/O

对外部设备的输入输出可以称之为IO，这里的外部设备指的是CPU、内存之外。

磁盘、网卡、显卡、打印机等等设备的输入输出都是IO。

IO的速度往往低于内存和CPU的交互速度。

## 文件IO 

这里主要讲的是 `fs` 模块进行文件的输入输出。

[fs API文档](https://nodejs.org/docs/latest/api/fs.html)

### 读取文件

**readFile**：以异步方式读取文件，**推荐**

```js
const fs = require('fs');
const path = require('path');

// 这里不使用相对路径，因为除了在require中，其他地方使用相对路径都是相对命令提示符的路径
// 只有在require中才是相对于本文件的相对路径
const filename = path.resolve(__dirname, './test.txt');

// 写法1
fs.readFile(filename, (err, content) => {
    console.log(content); // 这里返回的是一个Buffer对象，每个字符显示为16进制数字
    console.log(content.toString('utf-8')); // 转换为正常的字符串，注意要设置编码字符集
})

// 写法2
fs.readFile(filename, 'utf-8', (err, content) => {
    console.log(content); // 这里返回的是正常的字符串
})

// 写法3
fs.readFile(filename, {
    encoding: 'utf-8',
    // ...
}, (err, content) => {
    console.log(content); // 这里返回的是正常的字符串
})
```

**readFileSync**：以同步方式读取文件，**不推荐** 会导致运行阻塞

```js
const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, './test.txt');

const content = fs.readFileSync(filename, 'utf-8');
```

**promises.readFile**：promises版本的readFile

```js
fs.promises.readFile(filename, 'utf-8').then(content => {})
// 在函数中还可以使用 await
async function test() {
    const content = await fs.promises.readFile(filename, 'utf-8');
}
```

### 写入文件
### 获取文件或目录信息
### 获取目录中文件和子目录信息
### 创建目录
### 判断文件或目录是否存在
