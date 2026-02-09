# python conda 

Conda 是一个环境管理器，主要用于 Python，也支持 R、C/C++ 等语言。

它可以在同一台机器上创建多个相互隔离的运行环境，并为每个环境安装不同版本的Python和第三方库。

## 常用

```bash
conda create -n myenv python=3.10   # 创建
conda env list                      # 查看所有环境 
conda activate myenv                # 激活
conda install 包名                   # 安装包
conda list                          # 查看已安装包
conda deactivate                    # 退出环境
```

## 基本命令

### Conda 基本信息查看

```bash
conda --version  # 查看 conda 版本
conda info       # 查看 conda 信息
conda info -e    # 查看所有环境
```

### 环境管理

**1.创建环境**
> conda create -n [环境名] python=[python版本]

```bash
conda create -n myenv python=3.10  # 创建一个名为 myenv 的环境，Python 版本为 3.10
```

指定多个包

```bash
# 创建一个名为 myenv 的环境，Python 版本为 3.10，安装 numpy、pandas
conda create -n myenv python=3.10 numpy pandas
```

**2.激活/退出环境**
> conda activate [环境名]
> conda deactivate

```bash
conda activate myenv  # 激活名为 myenv 的环境
conda deactivate      # 退出当前环境
```

！注意：Windows 第一次使用需要

```bash
conda init
```

**3.查看环境列表**
```bash
conda env list
# 或
conda info -e
```

**4.删除环境**
> conda env remove -n [环境名]

```bash
conda env remove -n myenv # 删除名为 myenv 的环境
```

## 包（库）管理

**1.安装包**
> conda install [包名]

```bash
conda install numpy
```

指定版本：

```bash
conda install numpy=1.23.5
```

多个包：

```bash
conda install numpy pandas matplotlib
```

**2.卸载包**
> conda uninstall [包名]

```bash
conda uninstall numpy # 卸载 numpy 包
```

**3.更新包**
> conda update [包名]

```bash
conda update numpy # 更新 numpy 包
```

更新 conda 本身：

```bash
conda update conda
```

**4.查看已安装包**

```bash
conda list # 查看当前环境已安装的所有包
```

查看某个包：

```bash
conda list numpy # 查看 numpy 包的安装信息
```

## 环境导入/导出

**1.环境导出**
> 导出当前环境：`conda env export > environment.yml`
> 导出指定环境：`conda env export -n [环境名] > [文件名].yml`
> 

```bash
conda env export > environment.yml # 导出当前环境到 environment.yml 文件
# 或
conda env export -n myenv > myenv.yml # 导出名为 myenv 的环境到 myenv.yml 文件
```

**2.根据yml导入环境**
> conda env create -f [文件名].yml
> conda env create -n [环境名] -f [文件名].yml

```bash
conda env create -f environment.yml # 从 environment.yml 文件创建环境

conda env create -n myenv -f environment.yml # 从 environment.yml 文件创建名为 myenv 的环境
```

## 镜像源管理

**1.查看已配置源**

```bash
conda config --show channels
```

**2.添加源**

```bash
# 清华镜像示例
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
```

**3.恢复默认源**

```bash
conda config --remove-key channels
```

## 常见问题

**1.conda activate 报错**

```text
CondaError: Run 'conda init' before 'conda activate'
```

对应办法：

```bash
conda init
```

**2.环境列表有但进不去**

对应办法：

```bash
conda info
conda activate 环境名
```
