# Electron 打包

## 使用 electron-builder 进行打包

**1. 安装 electron-builder**

```bash
npm install electron-builder --save-dev
```

**2. 配置 package.json**

在 `package.json` 中添加 `build` 脚本：

```json

{
  "scripts": {
    "build": "electron-builder"
  },
}
```

**3.配置build**

在 `package.json` 中添加 `build` 配置，或单独建立一个 `electron-builder.json`文件。

在 `package.json` 中添加 `build` 配置：

```json
{
  "name": "electron-l2-app",
  "version": "1.0.0",
  "description": "Electron L2 App",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder"
  },
  ...
  "build": {
    // 包名
    "appId": "com.example.electron-l2",
    // 项目名称
    "productName": "Electron L2 App",
    // 输出目录
    "directories": {
      "output": "dist"
    },
    // 包含的文件，根据项目不同需要进行修改，只有在这里记录的文件才会被打爆
    "files": [
      "dist**/*",
      "main.js",
      "page/**",
      "assets/**",
      "package.json",
      "node_modules/**"
    ],
    // 平台相关配置
    "win": {
      "target": [
        "nsis",
        "zip"
      ]
    },
    // NSIS 安装程序配置
    "nsis": {
      // 是否一键安装
      "oneClick": false,
      // 是否允许修改安装目录
      "allowToChangeInstallationDirectory": true
    },
    // macOS 安装程序配置
    "mac": {
      // 目标安装程序类型
      "target": [
        "dmg"
      ]
    },
    // Linux 安装程序配置
    "linux": {
      // 目标安装程序类型
      "target": ["AppImage", "deb"]
    }
  }
}

```

创建一个 `electron-builder.json` 文件（无需引用，，Electron Builder 会自动读取它作为配置文件）：

```json
{
  "appId": "com.example.electron-l2",
  "productName": "Electron L2 App",
  "directories": {
    "output": "dist"
  },
  "files": [
    "dist**/*",
    "main.js",
    "page/**",
    "assets/**",
    "package.json",
    "node_modules/**"
  ],
  "win": {
    "target": [
      "nsis",
      "zip"
    ]
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true
  },
  "mac": {
    "target": [
      "dmg"
    ]
  },
  "linux": {
    "target": ["AppImage", "deb"]
  }
}
```

**4. 运行打包命令**

这里最好使用管理员权限执行打包命令

```bash
npm run build
```

注意如果出现报错

```bash
ERROR: Cannot create symbolic link : ...
```

这是由于 **Windows上Electron Builder下载 winCodeSign解压失败**。

Electron Builder 尝试解压一个 **包含符号链接（symlink）的 macOS 库文件** 到 Windows 的缓存目录，而 Windows 文件系统 **默认不允许普通用户创建符号链接**，所以 7-Zip 解压失败了。

解决方法是以管理员权限运行

**5.打包结果**

根据配置打包会生成在 dist 目录下。

- win-unpacked（文件夹）：解压后的应用本体（可直接运行），用作测试
- builder-debug.yml：Electron Builder 生成的调试日志配置文件。
- builder-effective-config.yaml：Electron Builder 根据你的配置生成的 最终有效配置。可以检查打包时实际使用了哪些参数。
- Electron L2 App Setup 1.0.0.exe：Windows 安装程序
- Electron L2 App Setup 1.0.0.exe.blockmap：安装程序的 块映射文件。
- Electron L2 App-1.0.0-win.zip：便携版 ZIP 包。