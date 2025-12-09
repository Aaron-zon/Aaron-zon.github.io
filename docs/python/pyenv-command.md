# pyenv 常用命令

## 实际应用

- pyenv version: 查看当前使用版本
- pyenv versions: 查看所有版本
- pyenv install
  - -l: 查看可安装的版本
  - 安装指定版本: 例如 `pyenv install 3.10.10`
- pyenv global <version>: 设置全局版本，例如 `pyenv global 3.10.10`


### pyenv version && pyenv versions

```shell
# 显示当前使用的的版本
pyenv version

# 显示所有已安装版本
pyenv versions
```

### pyenv install

```shell
# 查看可安装的版本
pyenv install -l

# 安装指定版本
pyenv install 3.10.10

```

### pyenv global

```shell
# 设置全局版本
pyenv global 3.10.10
```

