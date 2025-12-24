# LangChain 介绍

LangChain 是一个基于 LLM 构建智能体和应用程序的框架。

只需要极短的代码就可以连接到 OpenAI、DeepSeek 等平台的 LLM 模型。

提供快速连接LLM和构建智能体的方法。

## 相关生态

- LangChain：提供基础工具，构建基础智能体
- LangGraph：提供图结构支持，构建多智能体
- Deep Agents：构建复杂智能体
- Integration packages：继承访问各种LLM的Provider，提供实现各种功能的Component
- LangSmith：商业组件（付费可选），提供 部署、建工、测试、日志等功能

## 环境

- Python 3.10 或以上版本
- pip 包管理器

**安装常用包**

```bash
# 安装 LangChain 核心库
pip install langchain
# 安装 多智能体集成
pip install langgraph
# 安装 OpenAI 集成
pip install langchain-openai
# 安装 复杂智能体集成
pip install deepagents

# 读取环境变量（这个和langchain无关，只是为了方便读取环境变量）
pip install python-dotenv
```

## Chain = 流水线

- 1.收集用户提供的提示词和资料整理成通顺的问题
- 2.整理后将问题交给大语言模型，让大语言模型给出答复
- 3.大语言模型的回复可能比较多，整理出最核心的信息后交给用户

这是一个流水线式的智能体，它的架构优点是稳定，但缺点也十分明显，一根筋，不懂变通，十分死板，能处理的问题十分局限。

比如如果我想知道今天的天气那么这种架构的模型是无法满足我的需求的。

```python
import os
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent

model = ChatOpenAI(
    model="deepseek-chat",
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com/v1"
)

SYSTEM_PROMPT = """
你叫楼兰，是一个健康助手，你可以记录血压、尿酸水平，根据用户性别年龄信息，和标准范围提供健康情况和相关建议（注意不要提供医疗建议，仅提供生活建议）。
使用户可以轻松了解自身健康状态，及时调整生活方式，预防高血压等疾病。

## 限制
- 仅回答与健康相关的问题。
- 不提供医疗建议或专业咨询。
"""

agent = create_agent(
    model=chat.model,
    system_prompt=SYSTEM_PROMPT,
)

response = agent.agent.invoke(
    {"messages": [{"role": "user", "content": "你是谁？"}]},
)

print(response['messages'][-1].content)

```

## Graph = 指挥官

核心功能：循环（Loop）+ 记忆（State）

![alt text](./images/langchain-intro/image.png)

在LangGraph架构中，大语言模型从流水线工人变味了指挥官，当一个任务进来，LangGraph不会规定死下一步走哪。他只是把当前的情况，也就是 **State（记忆）** 交给大模型，由大模型来决定接下来做什么。

如果大模型觉得这部分有问题，那么他就会返回一个 **Loop（循环）** 指令，然后LangGraph会根据Loop指令进行修正（这里可能需要各类工具介入），修正后再将 **State（记忆）** 交给大模型处理。


