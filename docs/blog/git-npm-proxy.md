# 如何对 Git 和 Npm 进行代理?

由于国内网络原因在使用Git、NPM等管理工具拉取外网资源时可能会出现网络问题，如果你有本地代理工具，配置网络代理可以有效地解决这一问题。

Clash是一个开源的代理工具，它可以在Windows、macOS和Linux上运行，并且支持多种代理模式。

本篇文章就以Clash为例，介绍如何快速进行Git和NPM的代理配置。

## 查看代理软件的端口

在使用代理软件时，需要知道代理软件的端口号。

在Clash中，代理软件默认的端口号为 `7890`。也可以在Clash的设置中修改端口号。

查看和修改的位置在 **General -> Port**。

下文中端口以 `7890` 为例。

## 配置Git代理

在命令提示符工具（CMD）中输入以下命令

配置Git代理：

```shell
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

取消Git代理：

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 配置NPM代理

在命令提示符工具（CMD）中输入以下命令

配置NPM代理：

```shell
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
```

取消NPM代理：

```shell
npm config delete proxy
npm config delete https-proxy
```
