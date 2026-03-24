# python 包上传

## 打包

1.准备项目结构（标准包结构）

```
your_project/
│
├── src/
│   └── your_package/
│       ├── __init__.py
│       └── core.py
│
├── tests/
├── README.md
├── pyproject.toml   ←（核心配置）
├── LICENSE
└── .gitignore
```

2.写 pyproject.toml

```
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "your-package-name"
version = "0.1.0"
description = "your description"
readme = "README.md"
authors = [{ name="your name", email="your@email.com" }]
license = { text = "MIT" }
dependencies = []

[project.urls]
Homepage = "https://github.com/yourname/your-project"
```

**⚠️ 注意：**
- name 在 PyPI 必须唯一
- version 每次发布必须递增

3.安装打包工具

```bash
pip install build twine
```

- build → 生成包
- twine → 上传到 PyPI

4.打包

```bash
python -m build
```

生成：

```
dist/
├── your_package-0.1.0.tar.gz
└── your_package-0.1.0-py3-none-any.whl
```

5.上传包

```bash
python -m twine upload dist/*
```

这里会要求输入token

获取方式：https://pypi.org/manage/account/token/

如果没有需要创建：
- name：随便写
- scope：
    - 推荐选：Entire account（整个账号）
    - 或更安全：只绑定某个 package

6.查看包

在 https://pypi.org/ 搜索刚刚上传的包，确认包已经成功上传

7.测试

```bash
pip install your-package-name
```