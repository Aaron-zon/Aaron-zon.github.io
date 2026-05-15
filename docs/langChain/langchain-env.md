---
outline: deep
---
# langchain 环境搭建

前提：
- 1.安装 python
- 2.安装 Anaconda
- 3.安装 vscode 或其他IDE
- 4.安装 git
- 5.安装 ollama（如果使用本地模型需要安装，否则不用）

## 环境

**1.使用Anaconda创建一个python环境**


```bash
# 创建环境，python版本为3.11
conda create -n py311 python=3.11

# 启用该环境
conda activate py311
```

**2.ollama**

如果用本地模型的话需要下载对应模型。

如：

```bash
# 下载语言模型
ollama pull deepseek-r1:1.5b
ollama pull llama3.2:3b

# 下载嵌入模型
ollama pull nomic-embed-text

# 查看本地已有模型
ollama list
```

**3.下载包**

```bash
# 下载 langchain
pip install langchain

# 下载 langchain 扩展包
pip install langchain-community

# 安装向量数据库
pip install chromadb
pip installlangchain-chroma

# 可以导出当前环境下已下载的包，以及其版本号
pip freeze > pypackage.txt
```