# agent与本地工具

llm的强大能力源于它过去所学到的知识，但是，模型学习到的知识是有限且非实时的。

比如我们无法让一个大语言模型汇报当日的时间天气，应为它的数据库可能建立于很早之前，无法获取不存在的数据。

那么如何拓展模型的能力边界呢？

Tools 工具就是一个解决这一问题的重要几只。工具几只就是让大预言模型在需要时调用外部API，从而获取外部数据，然后让AI模型基于这些数据，从而扩展模型的能力。Tools工具机制是现在几乎所有大模型都支持的一种机制，也是基于大模型构建本地应用的关键。

- 理解 `Tools` 工具机制
- 定制本地 `Tool` 工具
- 深入理解 `@tool` 注解
- 构建 `Agent` 执行工具

## 1、理解Tools工具机制

我们可以先从一个小问题开始，机器人能不能知道今天是几月几号呢？

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain.tools import tool
from datetime import datetime

load_dotenv()

llm = ChatOpenAI(
    model="deepseek-chat",
    base_url="https://api.deepseek.com/v1", 
    api_key=os.getenv("DEEPSEEK_API_KEY"),
)

@tool
def get_date() -> str:
    """获取当前日期时间"""
    print("调用了get_date")
    return datetime.now().strftime("%Y/%m/%d %H:%M:%S")

agent = create_agent(
    model=llm,
    tools=[get_date]
)

print(agent.invoke({"messages": [{"role": "user", "content": "今天是几号"}]})['messages'][-1].content)
```