---
title: ADB reverse 端口转发解决不同网段 App 无法调用接口的问题
description: 电脑网口与手机 WiFi 不在同一网段时，Android App 无法访问电脑本地接口。本文讲解 adb reverse 端口转发原理与步骤，通过 USB 让手机直接访问电脑 localhost 服务，适用于 Android App 和 WebView 调试场景。
---

# ADB reverse 端口转发解决不同网段 App 无法调用接口的问题

> 本文介绍 **adb reverse（端口转发）** 的用法，解决 Android 手机与电脑不在同一网段时，**App 无法访问电脑本地接口**（localhost 后台服务）的问题。

换新公司后网口和 wifi 不在一个网段，导致我的接口无法正常调用。无线网卡还没到只能先用这种方式凑合一下了。

**适用场景**：手机 App 联调时，电脑连的是网口、手机连的是 WiFi，两者不在同一网段，App 直接访问电脑 IP 会超时。此时可以用 USB 连接 + `adb reverse` 把手机端口转发到电脑端口。

## 准备

- 1.手机连接usb
- 2.手机打开开发者模式
- 3.接口地址

## 步骤

### 1.确认adb正常

在 CMD / PowerShell 中输入

```bash
adb devices
```

确认adb是否正常。

正常来说应该看到：

```bash
List of devices attached
xxxxx    device
```

如果没有：

- 检查电脑和手机的USB连接是否正常
- 检查手机USB调试是否开启，部分手机还需要开启 `USB调试（安全设置）`
- 允许 RSA 授权

### 2.确认 后台服务 本地可访问

比如你的后台地址是：

```
http://localhost:8080

或

http://localhost:8080/xxx/api
```

要确认是否运行正常

### 3.开启 reverse 端口转发

因为我的后台端口用的是 `8080` 所以这里转发的也要是 `8080`

```bash
adb reverse tcp:8080 tcp:8080
```

**命令解释**：

```
adb reverse [手机端端口] [电脑端端口]
```

这里就是 `手机 8080` 转发到 `电脑 8080`。

### 4.验证是否成功

```bash
adb reverse --list
```

正常会看到

```bash
tcp:8080 tcp:8080
```

这时再用手机访问应该就可以了。

## 注意

- 1.使用这种方式期间USB不能断开
- 2.如果断开USB，需要重新执行上述命令进行连接
- 3.此方法仅适用于Android App、Android WebView，不适用于浏览器（Chrome/Edge/等...）


