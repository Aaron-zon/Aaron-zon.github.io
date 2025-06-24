---
outline: deep
---

# 搭建知识库（Java）

本篇将介绍如何通过 Spring ai、DeepSeek 等工具搭建一个AI知识库。

这里用到两个重要模型，一个是制作矢量数据的嵌入模型（BGE-M3），一个是用来沟通对话的大语言模型（deepseek-ai/DeepSeek-V3）。

## 环境

- java 17
- Spring Boot 3.5
- OpenAI（Spring ai一般要求Spring Boot >= 3.4.0 and < 3.6.0-M1）
- DeepSeek：大语言模型key

## 对话功能

### 配置文件

`application.yml`

```yml
spring:
    ai:
        openai:
            # 申请的个人/企业 key
            api-key: xxxxxxxxxxxxx
            # 
            base-url: https://api.deepseek.com
            chat:
                options:
                    model: deepseek-chat
```

### Java代码部分

```java
@RestController
public class ChatController {
    // 创建chat客户端
    private final ChatClient chatClient;

    // 构造函数时为chat客户端赋值
    public ChatController(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    /**
     * 聊天接口SSE
     * 
     * @param message 传进来的对话信息
     * @return 
     */
    @RequestMapping(value = "/chat/stream", produces = "text/event-stream")
    public Flux<String> chatStream(@RequestParam(value = "message", defaultValue = "给我讲个笑话") String message) {
        try {
            return this.chatClient.prompt()
                    .user(message) // 传入聊天信息
                    .stream()
                    .content();
        } catch (Exception e) {
            return null;
        }
    }


    /**
     * 聊天接口
     * @param message 传进来的对话信息
     * @return 
     */
    @RequestMapping("/chat")
    public String chat(@RequestParam(value = "message", defaultValue = "给我讲个笑话") String message) {
        try {
            return this.chatClient.prompt()
                    .user(message) // 传入聊天信息
                    .call()
                    .content();
        } catch (Exception e) {
            return "no";
        }
    }
}
```

### 前端

```javascript
// 访问SSE形式接口
let message = '你是谁';
let result = '';
const eventSource = new EventSource(`http://xxx.xxx.xxx.xxx:xxxx/chat/stream?message=${encodeURIComponent(message)}`);
eventSource.onmessage = (event) => {
    result += event.data;
};

eventSource.onerror = (error) => { 
    eventSource.close();
};
// =============================================================

// 访问普通接口
let message = '你是谁';
let result = '';
fetch(`http://xxx.xxx.xxx.xxx:xxxx/chat?message=${encodeURIComponent(message)}`)
  .then(response => response.text())
  .then(data => {
    result = data;
  })
  .catch(error => {
    console.error('Error:', error);
  });

```