# 数据向量化

## python版本
- python 3.11

## 安装包
- pip install langchain
- pip install langgraph
- pip install langchain-openai
- pip install langchain_community
- pip install langchain_huggingface
- pip install langchain-text-splitters
- python -m pip install huggingface-hub==0.36.1 transformers==4.41.2 sentence-transformers==2.7.0
- pip install chromadb
- pip install fastapi
- pip install uvicorn

## 嵌入模型

进行数据向量化需要向量模型，常用的嵌入模型有：

| 模型                            | 参数量       | 向量维度     | 资源占用 | 典型用途         |
| ----------------------------- | --------- | -------- | ---- | ------------ |
| all-MiniLM-L6-v2              | ~22M      | 384      | ⭐ 很轻 | demo / 玩具    |
| bge-small                     | ~100M     | 384      | ⭐⭐   | 轻量检索         |
| bge-base                      | ~300M     | 768      | ⭐⭐⭐  | 实用           |
| **bge-m3**                    | **~560M** | **1024** | ⭐⭐⭐⭐ | **商用 / 多语言** |
| e5-large                      | ~335M     | 1024     | ⭐⭐⭐  | 英文为主         |
| OpenAI text-embedding-3-large | 不公开       | 3072     | ⭐⭐⭐⭐ | 云托管          |

商用的话，建议使用 bge-m3 模型，因为它在多语言任务上表现良好，且参数量适中。不过对于开发阶段来说就有些重了，因为运行时会先下载5~7G的模型文件，每次运行都非常占用内存和显存。

开发阶段可以使用更小的all-MiniLM-L6-v2，或其他轻量模型

- model_name="BAAI/bge-small-zh-v1.5": 轻量中文为主（推荐）
- model_name="intfloat/e5-base": 轻量英文为主


## 示例

> 向量化文件夹夏后缀为 .txt 的文件

```python
# 导入必要的模块
import os  # 用于文件和目录操作
from dotenv import load_dotenv  # 用于加载环境变量

# 导入LangChain相关模块
from langchain_community.document_loaders import TextLoader  # 用于加载文本文件
# from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma  # 用于创建和管理向量数据库

from langchain_text_splitters import RecursiveCharacterTextSplitter


# 加载环境变量
load_dotenv()

# 全局变量定义
DATA_DIR = "data/txt_files"  # 存放文本文件的目录路径
DB_DIR = "vectordb"  # 存放向量数据库的目录路径

def ingest_txt():
  """
  处理文本文件并创建向量数据库的函数
  
  步骤：
  1. 读取指定目录下的所有txt文件
  2. 对文本进行切分，生成更小的文本块
  3. 使用DeepSeek API生成文本嵌入
  4. 将嵌入和文本块存储到Chroma向量数据库中
  """
  # 初始化文档列表
  documents = []

  # 遍历目录下的所有文件
  for file in os.listdir(DATA_DIR):
    # 只处理txt文件
    if file.endswith(".txt"):
      # 构建完整的文件路径
      file_path = os.path.join(DATA_DIR, file)
      # 创建文本加载器
      loader = TextLoader(file_path, encoding="utf-8")
      # 加载文件内容
      docs = loader.load()
      # 将加载的文档添加到文档列表中
      documents.extend(docs)
  
  # 打印读取到的文档数量
  print(f"读取到 {len(documents)} 个文档")

  # 文本切分
  # 创建递归字符文本切分器，设置切分大小和重叠部分
  splitter = RecursiveCharacterTextSplitter(
    chunk_size=900,  # 每个文本块的大小
    chunk_overlap=150  # 相邻文本块的重叠部分大小
  )
  # 对文档进行切分
  split_docs = splitter.split_documents(documents)
  # 打印切分后的文档数量
  print(f"切分后的文档数: {len(split_docs)}")
  embeddings = HuggingFaceEmbeddings(
    # model_name="BAAI/bge-m3"
    model_name="sentence-transformers/all-MiniLM-L6-v2"
  )

  # 创建向量数据库
  # 使用Chroma.from_documents方法，将切分后的文档和嵌入存储到向量数据库中
  db = Chroma.from_documents(
    split_docs,  # 切分后的文档
    embeddings,  # 生成的嵌入
    persist_directory=DB_DIR  # 向量数据库的存储目录
  )
  # 持久化向量数据库
  db.persist()
  # 打印向量库创建完成信息
  print(f"向量库创建完成！")


if __name__ == "__main__":
  """
  主函数入口
  当直接运行此脚本时，调用ingest_txt函数
  """
  ingest_txt()
```
