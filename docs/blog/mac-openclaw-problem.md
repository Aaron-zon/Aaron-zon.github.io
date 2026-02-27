# mac 安装图形界面版 openclaw

这里使用的设备是mac mini，进行图形界面的安装。

**前提条件**

- node 22+
- git

在 [GitHub Releases](https://github.com/openclaw/openclaw/releases) 下载最新版本的 `.dmg` 文件，双击打开

## 1.安全警告

由于不是上架的应用，双击应用打开会探出无法打开的警告弹窗，

处理方法：

- 1.点击弹窗里的 “取消”（不要移入废纸篓）
- 2.在 `设置→ 隐私与安全性`
- 3.向下滚动，找到关于 OpenClaw 的提示，点击 **“仍要打开”**
- 4.输入账户密码确认打开

## 2.允许访问本地网络

在应用请求连接本地网络时选择允许，如果误关，按照以下步骤设置

- 1.在 `设置→ 隐私与安全性`
- 2.向下滚动，找到 `本地网络`，点击进入
- 3.如果 **OpenClaw** 没有允许，点击允许

## 3.网关设置

启动后按照步骤向下会有网关设置

在哪里运行 Gateway

这里选择：这台Mac（this Mac）

> **网关是什么？** 网关是 OpenClaw 的"指挥中心"，所有消息都经过它。它必须持续运行，AI 才能接收和回复你的消息。

**选择"这台 Mac"（推荐）**，让网关就运行在你眼前这台电脑上，最简单。

### 网关错误

如果出现 gateway did not become ready. check that it is running 错误可按照以下方式进行排查

在终端输入

```bash
ls -la ~/.openclaw
```

查看是否缺少 `bin` 文件夹

如果缺少，那么可能时由于少侠了Gateway核心文件。

```bash
mkdir -p ~/.openclaw/bin

sudo npm install -g openclaw
```

下载后，查看网关是否恢复正常

## 4.授予系统权限

在这个步骤应用会请求一些可选权限，在默认的基础上可以先把 **通知** 打开。

其余的需要用到时再开。

点击Notifications（通知）的 grant后，右上角会弹出提示框，点击允许即可。

## 5.API设置

当前openclaw还没有设置API，因此对话功能还不好用。

打开 `终端`，输入

```bash
openclaw agents add main
```

然后按照提示选择模型。

这里我用的 DeepSeek，因此选择 **vLLM**，之后按照以下步骤

- 1.输入BaseURL: https://api.deepseek.com/v1
- 2.输入API Key: sk-xxxxxxxxxx
- 3.输入模型名称: 如: `deepseek-chat`

随后按照提示步骤退出即可。

通过以下命令可以查看当前状态：

```
openclaw gateway status
```

## 完结

到此为止在mac mini上安装openclaw就结束了，启动后右上角会有一个属于openclaw的图标。


