# pyenv-virtualenv虚拟环境

利用 **pyenv** 的 `virtualenv` 可以创建一个基于目标 python 版本的虚拟环境。

虚拟环境是一个独立的 Python 运行环境，有自己独立的 `site-packages` （安装包目录）和 Python 版本，不会影响系统全局的 Python 和其他虚拟环境。

简单来说就是帮助我们在同一台机器上隔离不同项目的 Python 版本和依赖包，避免冲突。

## 使用方法

- `pyenv virtualenv python版本 虚拟环境名称`：创建虚拟环境
- `pyenv activate milvus-lite-env`：使用虚拟环境
- `pyenv virtualenvs`：查看全部虚拟环境
- `pyenv deactivate`：退出虚拟环境

例子：

```shell
# 创建虚拟环境
pyenv virtualenv 3.11.9 milvus-lite-env

# 使用虚拟环境
pyenv activate milvus-lite-env

# 查看已有的 pyenv 虚拟环境
pyenv virtualenvs
```