# 创建一个electron + vue项目

我们来从0到1搭建一个electron + vue3的桌面项目吧。

## 1.确认环境

首先要确认环境，确保项目中有node和npm，且 Node 版本在v18及以上版本。

```bash
# 确认版本 >= 18
node -v
npm -v
```

## 2.创建Vue项目

```
npm create vite@latest
```

使用命令床建一个名为 renderer 的vue项目，运行一下命令确保项目可以正常运行。

```bash
cd renderer
npm install
npm run dev
```

## 3.创建Electron项目

回到根目录添加electron依赖。

```bash
cd ..
npm install electron --save-dev
```

在根目录创建 electron 目录，并创建一个main.js文件（文件名根据根目录下 package.json 文件中 main 字段而定）。

写入以下内容。

```js
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  // 传入的 url 是 vue 项目的运行url
  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  createWindow()
})

```

## 4.配置启动脚本

在根目录添加 concurrently 依赖

```
npm i concurrently --save-dev
```
在package.json中scripts部分添加脚本

```json
scripts: {
  "dev": "concurrently \"npm run dev --prefix renderer\" \"electron .\"",
}
```

**确认package.json中main字段指向 electron/main.js**

## 5.运行项目

在根目录运行以下命令

```bash
npm run dev

```