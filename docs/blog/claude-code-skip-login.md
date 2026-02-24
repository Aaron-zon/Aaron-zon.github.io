# Claude Code 跳过登录

在较新版本中Claude Code 需要进行登录/订阅

![alt text](./images/claude-code-skip-login/image.png)

手动配置第三方接口时，可以通过配置文件跳过登录/订阅

**1.打开Claude Code配置文件**

```bash
C:\Users\{用户名}\.claude.json
```

**2.添加 hasCompletedOnboarding 配置**

在根添加此配置

```json
{
  ...
  "hasCompletedOnboarding": true
  ...
}
```

**3.在工作区重新打开 Claude Code **

```bash
# 工作区运行claude
claude
```

![alt text](./images/claude-code-skip-login/image2.png)
