# 构建聊天机器人

## 目标

- 使用 LangChain Expression Language（LCEL）实现多步骤聊天互动
- 保存历史聊天记录， 实现自动多轮聊天
- 聊天消息整合 LCEL

## LangChain Expression Language（LCEL）

LangChain Expression Language（LCEL）是 LangChain 提供的一种声明式编程接口，用于构建复杂的 LLM 应用。它允许开发者通过简单的表达式组合不同的组件，如模型、提示词模板、内存等，实现高度定制化的 LLM 应用。

说白了就是让各个组件之间可以进行`链式调用`。

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
```