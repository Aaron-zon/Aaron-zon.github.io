---
outline: deep
---

# Scoop 添加文字扩展（nerd-fonts）

## Scoop

**Scoop** 是 Windows 平台上一个简洁易用的包管理器（类似 macOS 上的Homebrew 或 Linux 上的 apt/yum）。

**安装前提**

- Windows 10/11
- 安装了 **PowerShell 5+**

### 检查 PowerShell

1.打开 PowerShell -> 可以在开始菜单里搜 **PowerShell**，点开。

2.输入：
```powershell
$PSVersionTable.PSVersion
```

3.回车，会显示类似：
```
Major  Minor  Build  Revision
-----  -----  -----  --------
5      1      17763  1490
```

如果 **Major** 大于等于5（比如 `5.1.19041.3636`）就 OK。

### Scoop 安装

1.设置当前用户账户下 PowerShell 脚本的执行权限策略。

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

选择 `Y` 确认。

2.安装 Scoop 本体，在 PowerShell（非管理员也行）里执行：

```powershell
irm get.scoop.sh | iex
```

3.验证 Scoop 是否安装成功：

```powershell
scoop --version
```

## nerd-fonts

[github：nerd-fonts](https://github.com/subframe7536/Maple-font)

[官网：nerd-fonts](https://font.subf.dev/zh-cn/#why)


这是一款为转为软件开发制作的字体包，字形整洁、拥有手写风格的斜体、细粒度配置、内置 Nerd-Font、中英文 2:1 等宽 的字体，用于提升自己的工作效率。

### 安装

**安装字体包**：

```powershell
# 把名为 nerd-fonts 的 Scoop 扩展源（bucket）添加进来。
scoop bucket add nerd-fonts
# 安装 Maple Mono 字体
scoop install Maple-Mono
# 安装 Maple Mono Nerd Font 字体
scoop install Maple-Mono-NF
# 安装 Maple Mono Nerd Font 中文版 字体
scoop install Maple-Mono-NF-CN
```

**确认是否安装成功**：

```powershell
scoop list
```

### 在 VS Code 中进行配置

1.`菜单 → File → Preferences → Settings` 或者按 `Ctrl +` , 打开设置。

2.搜索 `font family`（在右上角搜索框输入 font family，找到 Editor: Font Family）

3.在 Editor: Font Family 的输入框里，填上：

```text
'Maple Mono NF CN', 'Maple Mono NF', 'Maple Mono', Consolas, 'Courier New', monospace
```

4.重启VS Code（保存设置，重启一下 VS Code 就能看到效果啦！）





## 异常

**错误信息**：`Initializing...
Running the installer as administrator is disabled by default, see https://github.com/ScoopInstaller/Install#for-admin for details.
Abort.`

**原因**：这是因为在管理员身份的 PowerShell 窗口里执行了 Scoop 安装命令。默认情况下不允许在管理原权限下安装。

**解决方法**：用普通用户权限执行安装命令

