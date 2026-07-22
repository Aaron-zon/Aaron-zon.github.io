import{ax as a,A as n,aQ as e,z as p}from"./chunks/framework.BWRXlwpK.js";const d=JSON.parse('{"title":"Queue","description":"","frontmatter":{},"headers":[],"relativePath":"rabbitMQ/queue.md","filePath":"rabbitMQ/queue.md"}'),l={name:"rabbitMQ/queue.md"};function i(u,s,t,c,o,h){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="queue" tabindex="-1">Queue <a class="header-anchor" href="#queue" aria-label="Permalink to &quot;Queue&quot;">​</a></h1><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Producer</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>Exchange</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>Queue</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>Consumer</span></span></code></pre></div><h2 id="什么是-queue" tabindex="-1">什么是 Queue？ <a class="header-anchor" href="#什么是-queue" aria-label="Permalink to &quot;什么是 Queue？&quot;">​</a></h2><blockquote><p>Queue 的职责只有一个就是 <strong>存储消息</strong>，等待 Consummer 消费</p></blockquote><p>它像是一个快递仓库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>京东仓库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>──────────────</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📦 包裹1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📦 包裹2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📦 包裹3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>📦 包裹4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>──────────────</span></span></code></pre></div><p>快递员不断放入包裹</p><p>配送员不断把包裹拿走</p><p>RabbitMQ 的 Queue 也是如此：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Producer</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>Queue</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Message1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Message2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Message3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Message4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Consumer</span></span></code></pre></div><h2 id="queue-是先进先出吗" tabindex="-1">Queue 是先进先出吗？ <a class="header-anchor" href="#queue-是先进先出吗" aria-label="Permalink to &quot;Queue 是先进先出吗？&quot;">​</a></h2><p>理论上是的，Queue 默认情况下是先进先出，但是也有</p><ul><li>优先级队列（Priority Queue）</li><li>多 Consumer</li><li>重新入队（Requeue）</li></ul><h2 id="queue-内部结构" tabindex="-1">Queue 内部结构 <a class="header-anchor" href="#queue-内部结构" aria-label="Permalink to &quot;Queue 内部结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Head（队头）</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Message1</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Message2</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Message3</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>Tail（队尾）</span></span></code></pre></div><p>Producer永远尾部插入，Consumer永远头部取出</p><h2 id="queue保存什么" tabindex="-1">Queue保存什么？ <a class="header-anchor" href="#queue保存什么" aria-label="Permalink to &quot;Queue保存什么？&quot;">​</a></h2><p>Queue 保存的是 Message，而一个Message不只是正文。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Message</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── Body（消息内容）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>├── Properties（属性）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>└── Headers（头）</span></span></code></pre></div><p>创建 Queue：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">channel.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">queueDeclare</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;order.queue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//  队列名字</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// durable</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// exclusive</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// autoDelete</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    null</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // arguments</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>这些都是 Queue 的属性</p><ul><li>队列名字</li><li>durable</li><li>exclusive</li><li>autoDelete</li><li>arguments</li></ul><h3 id="durable-持久化" tabindex="-1">Durable（持久化） <a class="header-anchor" href="#durable-持久化" aria-label="Permalink to &quot;Durable（持久化）&quot;">​</a></h3><p>这时最重要的属性，当它为 <code>true</code> 时，表示 RabbitMQ 重启后 Queue 仍然存在。</p><p>如果为 <code>false</code>，那么当 RabbitMQ 重启后 Queue 也会消失。</p><p>在开发环境 <code>durable</code> 可以设置为 <code>false</code>，但是生产环境基本为 <code>true</code>。</p><p>注意：</p><p>Queue 持久化不代表消息就不会丢，Queue 持久化只是 Queue 这个仓库不会丢，但是里面的Message可能在重启前还在内存中，该丢还是会丢。</p><p>durable不会让消息也持久化，消息是否持久化还要看 <code>deliveryMode = 2</code></p><h3 id="exclusive-独占" tabindex="-1">Exclusive（独占） <a class="header-anchor" href="#exclusive-独占" aria-label="Permalink to &quot;Exclusive（独占）&quot;">​</a></h3><p><code>Exclusive = true</code>时，这个 Queue只能被创建它的 Connection 使用。</p><p>例如：</p><p>Connection A 创建了 Queue_Test，Connection B进行访问时会被拒绝</p><p>而且当 Connection A 关闭时，Queue 会自动删除，一般用于：</p><ul><li>临时 Queue</li><li>RPC</li></ul><p>平时开发基本为 false。</p><h3 id="autodelete-自动删除" tabindex="-1">AutoDelete（自动删除） <a class="header-anchor" href="#autodelete-自动删除" aria-label="Permalink to &quot;AutoDelete（自动删除）&quot;">​</a></h3><p><code>autoDelete = true</code>时，表示当最后一个 Consumer 取消订阅后，这个 Queue 会自动删除。</p><h2 id="一个-queue-能绑定多个-exchange-吗" tabindex="-1">一个 Queue 能绑定多个 Exchange 吗？ <a class="header-anchor" href="#一个-queue-能绑定多个-exchange-吗" aria-label="Permalink to &quot;一个 Queue 能绑定多个 Exchange 吗？&quot;">​</a></h2><p>可以，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>         Direct Exchange</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>         Queue_Order</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>         Topic Exchange</span></span></code></pre></div><p>同一个Queue可以绑定多个Exchange，只要Binding建立即可，所以Queue不是属于某一个Exchange的，而是可以同时接受多个 Exchange 消息的。</p><h2 id="多个-consumer-消费一个-queue" tabindex="-1">多个 Consumer 消费一个 Queue <a class="header-anchor" href="#多个-consumer-消费一个-queue" aria-label="Permalink to &quot;多个 Consumer 消费一个 Queue&quot;">​</a></h2><p>一个 Queue 可以有多个 Consumer，但一个 Message 不会被多个 Consumer 拿到。</p><p>RabbitMQ 采用竞争消费，一条消息指挥投递给 Consumer。</p><p>如果想让多个消费者同时受到一条消息，正确得做法是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Producer</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>Fanout Exchange</span></span>
<span class="line"><span>   ├────► Queue_A ───► Consumer_A</span></span>
<span class="line"><span>   ├────► Queue_B ───► Consumer_B</span></span>
<span class="line"><span>   └────► Queue_C ───► Consumer_C</span></span></code></pre></div><p>不是多个 Consumer 监听同一个 Queue，而是多个 Queue 分别接收同一条消息。</p>`,49)]))}const g=a(l,[["render",i]]);export{d as __pageData,g as default};
