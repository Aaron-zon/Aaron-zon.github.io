# DeepSeek 接入Claude Code

**1.环境变量**
安装Claude Code后通过环境变量接入DeepSeek

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN="DEEPSEEK_API_KEY"
export ANTHROPIC_MODEL=deepseek-reasoner
```
deepseek-reasoner是思考模式。如果不想用思考模式，可以把deepseek-reasoner换成deepseek-chat

**2.选择模型**

启动Claude Code后，选择模型

```bash
claude
```

输入 /model 来选择模型

```bash
/model
```
![alt text](./images/deepseek-claude-code/image.png)

