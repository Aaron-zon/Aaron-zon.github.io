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