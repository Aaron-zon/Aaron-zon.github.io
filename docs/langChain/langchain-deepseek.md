# langchain deepseek

前提：
- 1.deepseek账号并充值
- 2.创建deepseek key

## 调用API

```python
from langchain.chat_models import init_chat_model

model = init_chat_model(
  model="deepseek-chat"
)
```
