---
outline: deep
---
# langchain deepseek

前提：
- 1.deepseek账号并充值
- 2.创建deepseek key

## 调用API

有两种方式，在之前需要安装 `langchain-deepseek`，新版本中也可以通过 `langchain.chat_models`的`init_chat_model` 直接调用。

### 1.init_chat_model 调用

```python
from langchain.chat_models import init_chat_model

model = init_chat_model(
  model="deepseek-chat",
  model_provider="deepseek",
  temperature=0.1
)

for chunk in model.stream("来一首唐诗"):
  print(chunk.content, end="", flush=True)
```

### 2.langchain-deepseek 调用

**1.下载包**

```bash
pip install langchain-deepseek
```

**2.调用**

```python
from langchain_deepseek import ChatDeepSeek

model = ChatDeepSeek(
  model="deepseek-chat",
  temperature=0.1,
  max_tokens=2000,
  timeout=None,
  max_retries=2
)

for chunk in model.stream('来一段唐诗'):
  print(chunk.content, end="", flush=True)
```