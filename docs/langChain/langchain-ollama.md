---
outline: deep
---
# langchain ollama

前提：
- 1.安装了ollama
- 2.下载了语言模型

## 调用API

有两种方式，在之前需要安装 `langchain-ollama`，新版本中也可以通过 `langchain.chat_models`的`init_chat_model` 直接调用。

### 1.init_chat_model 调用

```python
from langchain.chat_models import init_chat_model

model = init_chat_model(
  model="ollama:deepseek-r1:1.5b",
  base_url="http://localhost:11434",
  temperature=0.1,
  timeout=30,
  max_token=2000
)

for chunk in model.stream("来一段唐诗"):
  print(chunk.conten, end="", flush=True)
```


### 2.langchain-ollama 调用

```bash
pip install langchain-ollama
```

```python
from langchain_ollama import ChatOllama

model = ChatOllama(
  model="deepseek-r1:1.5b",
  base_url="http://localhost:11434",
  temperature=0.1
)

for chunk in model.stream("来一段唐诗"):
  print(chunk.conten, end="", flush=True)
```
