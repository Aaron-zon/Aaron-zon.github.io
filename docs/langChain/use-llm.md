# LangChain 使用大模型

环境需要安装Python 3.10+ 版本，建议使用conda创建一个新的环境

```bash
conda create -n langchain_env python=3.11
conda activate langchain_env
```

## 1.安装依赖包

```bash
# 安装LangChain核心依赖包
pip install langchain
# 安装社区扩展包
pip install langchain_community
```
## 2.调用大模型

由于open ai对国内的限制，这里可以调用国产模型或其他代理，

langchan-openai默认访问open ai，但是通过修改model、base_url、api_key也可以访问其他国产模型或代理

- model: 模型名称
- base_url：模型地址，如果访问默认地址可以不写
- api_key：模型Key，如果写在了环境变量中也可以不写

```bash
pip install -qU langchain[openai]
```
以下以Deepseek为例

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

# 初始化deepseek模型
llm = ChatOpenAI(
  # 模型名称，这里是deepseek-chat
  model="deepseek-chat",
  # 代理访问地址，因为默认是访问open ai的api，而deepseek的api地址是https://api.deepseek.con/v1
  base_url="https://api.deepseek.com/v1", 
  # 从环境变量或.env中获取deepseek的api key
  api_key=os.getenv("DEEPSEEK_API_KEY")
)

# 调用deepseek模型
llm.invoke('你好')
```

注意：如果有对应模型的适配包，也可以不安装 `langchain[openai]`，直接安装当前模型的适配包，例如 Deepseek 对应的包 `langchain[deepseek]`。使用方式和 `langchain[openai]` 差不多，只是可以少些代码。

```python
import os
from dotenv import load_dotenv
from langchain_deepseek import ChatDeepSeek
load_dotenv()

llm = ChatDeepSeek(
  model="deepseek-chat",
  api_key=os.getenv("DEEPSEEK_API_KEY")
)

llm.invoke('你好')
```

## 3.流式输出

LangChain支持流式四级成绩，即输出结果会一个一个Token的蹦出来

```python
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
load_dotenv()

llm = ChatOpenAI(
  model="deepseek-chat",
  base_url="https://api.deepseek.com/v1", 
  api_key=os.getenv("DEEPSEEK_API_KEY")
)

# 流式输出
stream = llm.stream([HumanMessage("你是谁？")])
for chunk in stream:
  print(chunk.text(), end="\n")
```

## 4.提示词模板

LangChain 支持使用提示词模板的方式来完成大模型交互。

```python
from langchain_openai import ChatOpenAI
# 引入提示词模板
from langchain_core.prompts import ChatPromptTemplate
# 定义提示词模板
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "将下面的英语翻译成 {language}"),
    ("human", "{input}"),
])
# 格式化提示词
prompt = prompt_template.invoke({"language": "中文", "text": "Hello, how are you?"})

llm = ChatOpenAI(
  model="deepseek-chat",
  base_url="https://api.deepseek.com/v1", 
  api_key=os.getenv("DEEPSEEK_API_KEY")
)

# 使用提示词模板与大模型交互
response = llm.invoke(prompt)
print(response.content)
```
## 5.定制参数

LangChain支持传入更多定制参数，例如temperature，tip_p等。而这些能力，通常使用网页和App访问大模型时，是无法传入的。

以 `temperature` 为例，这是一个 `[0, 2)` 之间的浮点数，用于控制模型的输出随机性。默认值为 1.0。值越大，输出越随机；值越小，输出越确定。

```python

llm = ChatOpenAI(
  model="deepseek-chat",
  base_url="https://api.deepseek.com/v1", 
  api_key=os.getenv("DEEPSEEK_API_KEY"),
  temperature=0.5
)

for i in range(5):
  response = llm.invoke("给一款之恩那个手机起一个炫酷的名字？返回字数4个汉字以内")
  print(str(i) + ">>" + response.content)
```