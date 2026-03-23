---
outline: deep
---
# 构建聊天机器人

## 目标

- **LCEL**：使用 LangChain Expression Language（LCEL）实现多步骤聊天互动
- **聊天记录**：保存历史聊天记录， 实现自动多轮聊天
- **整合**：聊天消息整合 LCEL

## LangChain Expression Language（LCEL）

LangChain Expression Language（LCEL）是 LangChain 提供的一种声明式编程接口，用于构建复杂的 LLM 应用。它允许开发者通过简单的表达式组合不同的组件，如模型、提示词模板、内存等，实现高度定制化的 LLM 应用。

说白了就是让各个组件之间可以进行`链式调用`。

注意：进行链式调用的组件 必须是Runnable的子类 / 只有一个方法的类 / 字典

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
# 定义提示词模板
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "将下面的英语翻译成 {language}"),
    ("human", "{input}"),
])

llm = ChatOpenAI(
  model="deepseek-chat",
  base_url="https://api.deepseek.com/v1", 
  api_key=os.getenv("DEEPSEEK_API_KEY")
)
# 结果解析器 StrOutputParser 将 AIMessage 转换为 str，实际上就是获取AIMessage的content属性。
parser = StrOutputParser()
# 构建链
chain = prompt_template | llm | parser
# 直接调用链
print(chain.invoke({"language": "中文", "input": "Hello, how are you?"}))
```

通过LangChain的LCEL链式愈发，就可以直接构建为复杂的基于大模型的处理链。例如将某一次大模型的结果再次访问另一个大模型，那就只需要在 chain 的后面在链接更多的组件即可。

```python
# 一个新的提示词模板
analysis_prompt = ChatPromptTemplate.from_template("我应该怎么回答这句话？{talk}。给我一个五个字以内的示例")

# 在上一个链的基础上继续构建链
chain2 = {"talk": chain} | analysis_prompt | llm | parser

print(chain2.invoke({"text": "nice to meet you", "language": "中文"}))
```

### 并行链路

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableMap, RunnableLambda

load_dotenv()

llm = ChatOpenAI(
  model="deepseek-chat",
  base_url="https://api.deepseek.com/v1", 
  api_key=os.getenv("DEEPSEEK_API_KEY"),
)

parser = StrOutputParser()

# 定义提示词模板
prompt_template_zh = ChatPromptTemplate.from_messages([
  ("system", "将下面的内容翻译成中文"),
  ("user", "{text}")
])

# 定义提示词模板
prompt_template_fr = ChatPromptTemplate.from_messages([
  ("system", "将下面的内容翻译成法语"),
  ("user", "{text}")
])

# 分别构建链
chain_zh = prompt_template_zh | llm | parser
chain_fr = prompt_template_fr | llm | parser

# 将链放入RunnableMap 
# RunnableMap：并行执行多个 Runnable
# 输入同一份 {"text": "..."}，同时喂给两个 chain
parallel_chains = RunnableMap({
  "zh": chain_zh,
  "fr": chain_fr
})

# 将并行结果做一次“格式化处理”
# 输入：{"zh": "...", "fr": "..."}
# 输出：拼接成字符串
fubak_chain = parallel_chains | RunnableLambda(lambda x: f"zh:{x['zh']}\nfr:{x['fr']}")

# 执行整个链
print(fubak_chain.invoke({"text": "hello world"}))

# 输入：
#   {"text": "hello world"}
# 流程：
#   ① 并行调用 chain_zh / chain_fr
#   ② 得到 {"zh": "...", "fr": "..."}
#   ③ Lambda 拼接输出
# 输出：
# zh:你好，世界
# fr:bonjour le monde
```

## 聊天记录

在 LangChain 中，提供了额一个 `BaseChatMessageHistory` 父类，专门用于保存聊天记录，默认情况下，LangChain 只提供了一个基于内存的 `InMemoryChatMessageHistory` 来保存聊天记录

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory

load_dotenv()

llm = ChatOpenAI(
  model="deepseek-chat",
  base_url="https://api.deepseek.com/v1", 
  api_key=os.getenv("DEEPSEEK_API_KEY"),
)


history = InMemoryChatMessageHistory()

# 第一轮对话
history.add_user_message("你是谁？")
aimessage = llm.invoke(history.messages)
print(aimessage.content)
history.add_message(aimessage)

# 第二轮对话
# 这里因为之前的对话存储在history里，因此可以正常回答
# 如果没有上一次的聊天记录，大模型不知道要重复什么内容
history.add_user_message("请重复一次")
aimessage2 = llm.invoke(history.messages)
print(aimessage2.content)
history.add_message(aimessage2)

```

history中存储的是：
- HumanMessage
- AIMessage
- SystemMessage

通过 `history.messages` 可以获取所有的消息

```python
for message in history.messages:
  print(f"{type(message).__name__}: {message.content}")
```

当然，通过这种方式管理聊天信息是不安全的，因为数据都存放在内存中。所以，LangChain还提供了很多基于其他存储系统的扩展依赖，例如：Redis、MongoDB、MySQL等。

### Redis存储聊天信息

LangChain提供了用于Redis的扩展依赖，但是前提是安装的Redis支持Redis Stack

```bash
pip install langchain-redis redis
```

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_redis import RedisChatMessageHistory
load_dotenv()

llm = ChatOpenAI(
  model="deepseek-chat",
  base_url="https://api.deepseek.com/v1", 
  api_key=os.getenv("DEEPSEEK_API_KEY"),
)


history = RedisChatMessageHistory(session_id="test", redis_url="redis://:密码@ip:端口/库号")

history.add_user_message("你是谁？")
aimessage = llm.invoke(history.messages)
print(aimessage.content)
history.add_message(aimessage)


history.add_user_message("请重复一次")
aimessage2 = llm.invoke(history.messages)
print(aimessage2.content)
history.add_message(aimessage2)
```

## 聊天消息整合到LCEL

如果每次都调用 ChatMessageHistory 组件来保存消息，那肯定太麻烦了，所以通常可以通过LCEL来快速整合聊天记录。

由于 BaseChatMessageHistory 并没有实现 Runnable 类，所以他是无法直接接入LCEL的。而在 LangChain 中，又另外提供了一个 RunnableWithMessageHistory 类，他实现了 Runnable，专门用于整合聊天记录。

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_redis import RedisChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

load_dotenv()

llm = ChatOpenAI(
  model="deepseek-chat",
  base_url="https://api.deepseek.com/v1", 
  api_key=os.getenv("DEEPSEEK_API_KEY"),
)

history = RedisChatMessageHistory(session_id="test", redis_url="redis://:密码@ip:端口/库号")

runnable = RunnableWithMessageHistory(
    llm, 
    get_session_history=lambda: history
)

print(runnable.invoke({"text": "请重复一次"}).content)
```

当然也可以给 MessageHistory 整合一个Chain，来完成更复杂的应用逻辑

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_redis import RedisChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

llm = ChatOpenAI(
  model="deepseek-chat",
  base_url="https://api.deepseek.com/v1", 
  api_key=os.getenv("DEEPSEEK_API_KEY"),
)

history = RedisChatMessageHistory(session_id="test", redis_url="redis://:密码@ip:端口/库号")

prompt_template = ChatPromptTemplate.from_messages([
    ("user", "{text}")
])

parser = StrOutputParser()

chain = prompt_template | llm | parser

runnable = RunnableWithMessageHistory(
    chain, 
    get_session_history=lambda: history
)

print(runnable.invoke({"text": "请重复一次"}))

```