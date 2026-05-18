---
outline: deep
---
# langchain 语义搜索

**相似度检索方式：**
- similarity_search: 相似度查询
- similarity_search_with_score: 带分数的相似度查询
- similarity_search_by_vector: 用向量进行相似度查询

**检索器：**
- runnables: 为了方便以上语义检索调用的检索器，它定义了一套所有组件都必须遵守的统一交互规范

## 搜索方式

无论是哪种搜索方式，搜索前都要先获取向量知识库
```python
from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma

# 嵌入模型
embedding = OllamaEmbeddings(model="nomic-embed-text")

# 向量知识库
vector_store = Chroma(
    collection_name="example_collection",
    embedding_function=embedding,
    persist_directory="./chroma_langchain_db",
)
```

### 相似度查询

`similarity_search` 进行相似度搜索，返回多个相关结果

```python
results = vector_store.similarity_search(
    "介绍一下文档中关于唐诗的内容"
)

for index, result in enumerate(results):
    print(index) # 索引
    print(result.page_content[:100]) # 搜索内容（[:100]表示每个内容只取前100个字符）
```

### 带分数的相似度查询

`similarity_search_with_score` 同样是相似度搜索，但是返回值除了要搜索的内容还有相关度的分数，分数越小表示越相似

```python
results = vector_store.similarity_search_with_score(
    "介绍一下文档中关于唐诗的内容"
)

for doc, score in results:
    print(score) # 分数越小表示越相似
    print(doc.page_content[:100]) # 搜索内容（[:100]表示每个内容只取前100个字符）
```

### 用向量进行相似度查询

先将要查询的内容转成向量，然后使用 `similarity_search_by_vector` 用向量进行相似度查询

```python
vector = embedding.embed_query("介绍一下文档中关于唐诗的内容")

results = vector_store.similarity_search_by_vector(vector)

for index, result in enumerate(results):
    print(index) # 索引
    print(result.page_content[:100]) # 搜索内容（[:100]表示每个内容只取前100个字符）

```

### 检索器

```python
# 从 typing 模块导入 List 类型，用于类型注解
from typing import List

# 导入 LangChain 的文档类，用于表示检索到的文本片段
from langchain_core.documents import Document
# 导入 chain 装饰器，用于将普通函数快速转换为 Runnable 对象
from langchain_core.runnables import chain

# 使用 @chain 装饰器将函数装饰成一个 Runnable 对象
# 这样这个函数就可以使用 .invoke(), .batch(), .stream() 等标准方法
@chain
def retriever(query: str) -> List[Document]:
    # 调用向量存储的 similarity_search 方法进行语义相似度搜索
    # query: 查询文本
    # k=1: 只返回最相似的 1 个文档
    return vector_store.similarity_search(query, k=1)

# 调用检索器（注意必须使用 .invoke() 方法，不能直接 retriever()）
# 因为 @chain 装饰器返回的是一个 Runnable 对象，需要通过 invoke 方法执行
results = retriever.invoke("介绍一下医疗行业轮班考勤管理系统")

for index, result in enumerate(results):
    print(index)
    print(result.page_content[:100])
```