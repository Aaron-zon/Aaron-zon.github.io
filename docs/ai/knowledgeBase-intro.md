---
outline: deep
---

# AI 知识库介绍

## 什么是 AI知识库？

简单来说就是将 `已有数据` 喂给AI大模型，形成一个专属的小仓库。在使用大语言模型（如：chatGPT）时，会从AI知识库中获取数据进行回复。

举个栗子，当我在与大语言模型进行对话时，如果询问【我在2025年一月一日做了什么？】，这种私人的问题AI是无法精准回复的。

如果我创建了一个专属的日记知识库，在询问同样问题时，AI就可以从这个知识库中找到答案，而不是凭空想象的回复。


## AI知识库需要用到哪些模型

- 大语言模型：用以提问与回答
  - deepseek-ai/DeepSeek-V3
  - deepseek-ai/DeepSeek-R1
  - openai/GPT-4.1
- 嵌入模型：用以将文本转化为向量（也就是实现了将数据喂给模型）
  - BAA/bge-m3

## 详细分步

### 一、上传文件画面

1.前端：
- 上传文件 UI
- 显示上传进度和上传成功/失败

2.后端接口：
- 接收上传的文件
- 存储源文件（保留原文件方便溯源）

3.文件解析与分段：
- 解析 PDF、Word、txt（推荐用 `pdfplumber`、`python-docx`、`markdown` 库）
- 文本分段（按 token 数或段落，推荐 256 ~ 1024 tokens）

4.文本向量化
- 调用 BGE-M3 模型，将分段文本编码成向量
- 催出每个分段的：
  - 原文
  - 向量值
  - 所属文件名、段落编号、上传时间等元数据

5.入库：
- 存入向量数据库（Milvus / Chroma / Faiss / PGVector）
- 同时存一份 metadata （如：MongoDB / MySQL / Elasticsearch）

### 二、对话画面

1.前端：
- 聊天UI（输入问题 + 显示AI回复）
- 聊天记录展示（可存储历史记录）

2.后端：
- 接收用户问题
- 用 BGE-M3 编码成向量
- 在向量库中查找最近的 N 个相关文本段

3.上下文拼接
- 把检索出来的文本段，按顺序拼接成上下文 prompt
- 加上用户问题，形成大预言模型的输入 prompt

4.调用大预言模型 API
- 调用 API 生成回答
- 返回前端

5.保存聊天记录（可选）
- 存储提问、AI回答、上下文段落、时间戳等，方便日志和二次训练

### 三、后台知识库管理

- 查看已上传文件列表
- 查看向量入库情况
- 删除/更新已上传文件
- 查看文档来源、检索命中日志、聊天记录

## 涉及模块

| 模块    | 推荐方案                                 |
| :---- | :----------------------------------- |
| 文档解析  | pdfplumber、python-docx、markdown      |
| 文本切分  | tiktoken、nltk、langchain.textsplitter |
| 向量化   | BGE-M3 + FlagEmbedding               |
| 向量库   | Chroma、Milvus、Faiss、PGVector         |
| 大语言模型 | OpenAI GPT-4 API、本地 LLaMA            |
| 后端    | Spring Boot、Node.js、Python Flask     |
| 前端    | Vue、React、Element UI、Ant Design      |
| 文件存储  | MinIO、FastDFS、本地路径                   |
