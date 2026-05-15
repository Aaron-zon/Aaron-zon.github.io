# langchain PDF转向量

- 1.读取PDF：按照页来管理，每页都是一个 `Document`，最终形成 `List<Document>`
- 2.分割问本：文本段（chunk），每个文本段都是一个 `Document`，最终形成 `List<Document>`
- 3.向量化：文本段 <=> 向量，需要接住嵌入模型进行转换
- 4.向量库存储：将多个文本段/向量存储到向量库

## 步骤

**1.安装包**

```bash
# 用于读取PDF文件，实现 langchain_community.document_loaders 的 PyPDFLoader
pip install pypdf
```

**2.实行**

```python

# 1.读取PDF
from langchain_community.document_loaders import PyPDFLoader

# 文件路径
file_path = "langchain文档.pdf"
# 创建PDF加载器
loader = PyPDFLoader(file_path)
# 读取文件
docs = loader.load()


# 2.分割问本
from langchain_text_splitters import RecursiveCharacterTextSplitter

# 创建文本分割器
text_splitter = RecursiveCharacterTextSplitter(
  # 每块的最大字符数
  chunk_size=1000, 
  # 块之间的重叠字符数
  #（这个是为了上下文语义通顺，避免语义断裂的，因为知识可能刚好跨chunk）
  chunk_overlap=200, 
  # 给 metadata 增加原文起始位置
  # 方便后续：
  # - 定位原文
  # - 高亮
  # - 引用来源
  add_start_index=True
)

# 切分文本
all_splits = text_splitter.split_documents(docs)

# 3.向量化
# 这是本地的嵌入模型，需要当前本地安装了ollama，且下载了嵌入模型
from langchain_ollama import OllamaEmbeddings

# 初始话embedding模型
embedding = OllamaEmbeddings(model="nomic-embed-text")

# 将第一个chunk转为向量
# 转换后vector_0的值将是一个存储一堆浮点数的列表
# 这里只是教学，因此只转换第一个chunk，在后续也不会使用
vector_0 = embedding.embed_query(all_splits[0].page_content)

# 4.向量库存储
from langchain_chroma import Chroma

# 创建向量数据库
vector_store = Chroma(
  # 集合名
  collection_name="example_collection",
  # 指定想量化函数
  embedding_function=embedding,
  # 存储的数据库目录
  persist_directory="./chroma_langchain_db"
)

# 将全部all_splits转换成向量存入向量数据库中
ids = vector_store.add_documents(documents=all_splits)
```
