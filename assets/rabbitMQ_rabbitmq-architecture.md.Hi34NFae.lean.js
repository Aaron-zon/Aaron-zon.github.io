import{ax as a,A as n,aQ as p,z as e}from"./chunks/framework.BWRXlwpK.js";const h=JSON.parse('{"title":"整体架构","description":"","frontmatter":{},"headers":[],"relativePath":"rabbitMQ/rabbitmq-architecture.md","filePath":"rabbitMQ/rabbitmq-architecture.md","lastUpdated":1788243740000}'),l={name:"rabbitMQ/rabbitmq-architecture.md"};function i(c,s,t,o,r,u){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="整体架构" tabindex="-1">整体架构 <a class="header-anchor" href="#整体架构" aria-label="Permalink to &quot;整体架构&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                RabbitMQ Broker</span></span>
<span class="line"><span>┌──────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│ Producer（生产者）                            │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│    ↓                                         │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│ Exchange（交换机）                            │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│    ↓                                         │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│ Queue（队列）                                 │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│    ↓                                         │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│ Consumer（消费者）                            │</span></span>
<span class="line"><span>└──────────────────────────────────────────────┘</span></span></code></pre></div><blockquote><p>RabbitMQ 的所有内容都是围绕这五个角色。</p></blockquote><ul><li>Producer</li><li>Exchange</li><li>Queue</li><li>Consumer</li><li>Broker</li></ul><h2 id="producer-生产者" tabindex="-1">Producer（生产者） <a class="header-anchor" href="#producer-生产者" aria-label="Permalink to &quot;Producer（生产者）&quot;">​</a></h2><blockquote><p>发消息的人（程序）</p></blockquote><p>例如：</p><p>一个电商系统，用户点击下单。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">rabbitTemplate.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">convertAndSend</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;order.exchange&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;order.create&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    order</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>Producer做了两件事情</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>发送消息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>告诉 RabbitMQ：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Exchange 是谁？</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RoutingKey 是什么？</span></span></code></pre></div><h2 id="exchange-交换机" tabindex="-1">Exchange（交换机） <a class="header-anchor" href="#exchange-交换机" aria-label="Permalink to &quot;Exchange（交换机）&quot;">​</a></h2><blockquote><p>决定消息应该进入哪个 Queue。</p></blockquote><p>它是 RabbitMQ的大脑，它负责：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>收到消息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>根据规则判断</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>转发给 Queue</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>自己结束工作</span></span></code></pre></div><p>例如：</p><p>当他收到</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>routingKey = order.create</span></span></code></pre></div><p>Exchange:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>查看绑定规则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>应该去</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Queue A</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>转发过去</span></span></code></pre></div><p>他像一个领导者，决定消息应该去哪。</p><h2 id="queue-队列" tabindex="-1">Queue（队列） <a class="header-anchor" href="#queue-队列" aria-label="Permalink to &quot;Queue（队列）&quot;">​</a></h2><blockquote><p>消息仓库，存储消息的地方。</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Queue</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-------------------</span></span>
<span class="line"><span>订单1</span></span>
<span class="line"><span>订单2</span></span>
<span class="line"><span>订单3</span></span>
<span class="line"><span>订单4</span></span>
<span class="line"><span>订单5</span></span>
<span class="line"><span>-------------------</span></span></code></pre></div><p>进入 Queue 后，即使 Consumer 不在线，消息也可以继续待在 Queue 中。</p><p>例如：</p><p>Producer发来了10000条消息，但是 Consumer 还在忙或没启动，这时这10000条数据就会先保存在 Queue。</p><p>等到 Consumer 可以正常工作了，再开始将 Queue 中的消息取出，一个一个的交给 Consumer 处理。</p><p>Queue的主要作用就是存储消息。</p><h2 id="consumer-消费者" tabindex="-1">Consumer（消费者） <a class="header-anchor" href="#consumer-消费者" aria-label="Permalink to &quot;Consumer（消费者）&quot;">​</a></h2><blockquote><p>处理消息的程序</p></blockquote><p>例如：</p><p>订单服务收到了创建订单的请求，接下来的工作是</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>写数据库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>扣库存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>发短信</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>结束</span></span></code></pre></div><p>Consumer 会一直监听 Queue，只要 Queue 有消息就会：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Queue</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Consumer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>处理</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ACK（消费者告诉 RabbitMQ：&quot;这条消息我已经成功处理了，你可以把它删掉了。&quot;）</span></span></code></pre></div><h2 id="为什么一定要-exchange" tabindex="-1">为什么一定要 Exchange？ <a class="header-anchor" href="#为什么一定要-exchange" aria-label="Permalink to &quot;为什么一定要 Exchange？&quot;">​</a></h2><p>很多人第一次都会想：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Producer</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Queue</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Consumer</span></span></code></pre></div><p>不是更简单吗？</p><p>RabbitMQ 之所以设计 Exchange，是为了 <strong>解耦</strong>。</p><p>假设有三个系统：订单、库存、短信</p><p>用户下单需要：创建订单、口库存、发短信</p><p>如果没有Exchange：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Producer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── Queue1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── Queue2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>└── Queue3</span></span></code></pre></div><p>Producer 必须知道：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>三个 Queue</span></span>
<span class="line"><span></span></span>
<span class="line"><span>三个名字</span></span>
<span class="line"><span></span></span>
<span class="line"><span>三个地址</span></span></code></pre></div><p>以后如果增加了 <code>积分系统</code>，Producer 又要修改代码。增加 <code>物流系统</code> 也要修改 Producer 的代码。</p><p>这样就形成了 <strong>强耦合</strong>。</p><p>有了 Exchange 后</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Producer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Exchange</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── Queue1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── Queue2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── Queue3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>└── Queue4</span></span></code></pre></div><p>Producer 永远只需要发送给 Exchange。</p><p>以后新增 Queue 不需要修改 Producer，Exchange 增加绑定即可。</p><p>这就是 Exchange 最大的价值：</p><blockquote><p>发送方和接收方完全解耦，系统扩展性大大增强。</p></blockquote><h2 id="broker" tabindex="-1">Broker <a class="header-anchor" href="#broker" aria-label="Permalink to &quot;Broker&quot;">​</a></h2><p>Broker 就是整个 RabbitMQ 服务（RabbitMQ Server）</p>`,57)]))}const b=a(l,[["render",i]]);export{h as __pageData,b as default};
