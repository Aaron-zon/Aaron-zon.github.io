import{ax as a,A as s,aQ as p,z as e}from"./chunks/framework.BWRXlwpK.js";const b=JSON.parse('{"title":"Connection 与 Channel","description":"","frontmatter":{},"headers":[],"relativePath":"rabbitMQ/connection-channel.md","filePath":"rabbitMQ/connection-channel.md","lastUpdated":1788148933000}'),l={name:"rabbitMQ/connection-channel.md"};function i(c,n,t,o,h,d){return e(),s("div",null,n[0]||(n[0]=[p(`<h1 id="connection-与-channel" tabindex="-1">Connection 与 Channel <a class="header-anchor" href="#connection-与-channel" aria-label="Permalink to &quot;Connection 与 Channel&quot;">​</a></h1><h2 id="为什么rabbitmq不建议每发送一条消息都建立一个tcp连接" tabindex="-1">为什么RabbitMQ不建议每发送一条消息都建立一个TCP连接？ <a class="header-anchor" href="#为什么rabbitmq不建议每发送一条消息都建立一个tcp连接" aria-label="Permalink to &quot;为什么RabbitMQ不建议每发送一条消息都建立一个TCP连接？&quot;">​</a></h2><p>这其实和连接池一个道理。</p><p>每次发送消息都 <code>创建TCP链接 - 发送消息 - 关闭TCP连接</code>，请求很多时，大量的时间花在了创建TCP和关闭TCP上。</p><p>而建立TCP连接其实时很贵的，TCP不是一句话就能连的，创建它需要三次握手，关闭时需要四次挥手。</p><p>所以发送消息最耗时的可能不是数据的传输，而是创建和关闭TCP连接。</p><p>我们完全可以只连接一次：<code>Spring Boot - 连接RabbitMQ</code></p><p>之后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>消息1</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>消息2</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>消息3</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>……</span></span>
<span class="line"><span></span></span>
<span class="line"><span>一直复用</span></span></code></pre></div><p>当程序关闭后，再关闭连接，这就是 <strong>Connection</strong>。</p><h2 id="什么是connection" tabindex="-1">什么是Connection？ <a class="header-anchor" href="#什么是connection" aria-label="Permalink to &quot;什么是Connection？&quot;">​</a></h2><blockquote><p>Connection 就是一条 TCP 长连接。</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Spring Boot</span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span>      │ TCP</span></span>
<span class="line"><span>      ▼</span></span>
<span class="line"><span>RabbitMQ</span></span></code></pre></div><p>这个连接会一直存在，不会随着一条消息发送完毕而断开，而是一直保持。</p><h2 id="什么是-channel" tabindex="-1">什么是 Channel？ <a class="header-anchor" href="#什么是-channel" aria-label="Permalink to &quot;什么是 Channel？&quot;">​</a></h2><blockquote><p>Connection 上开辟出的一个逻辑通信通道</p></blockquote><p>举个栗子：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>应用程序</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span> TCP连接（Connection）</span></span>
<span class="line"><span>═══════════════════════</span></span>
<span class="line"><span>│   │   │   │   │</span></span>
<span class="line"><span>Ch1 Ch2 Ch3 Ch4 Ch5</span></span></code></pre></div><p>程序和RabbitMQ通信时，可以理解为：</p><ul><li>Connection 就像一条高速公路</li><li>Channel 就是这条高速公路上的车道</li></ul><p>如果每次发送消息都重新建立TCP连接，代价太大，所以我们可以使用Channel来发送消息。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>建立一次TCP连接</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Connection</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span> ├── Channel1</span></span>
<span class="line"><span> ├── Channel2</span></span>
<span class="line"><span> ├── Channel3</span></span>
<span class="line"><span> └── Channel4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>一直复用</span></span></code></pre></div><p>所以真正传输消息的是 Channel。</p><p>类比高速公路</p><ul><li>Connection 是这条高速</li><li>Channel 是车辆行走的车道</li><li>Message 是运输的货物</li><li>Producer/Consumer 是开车的四级或运输公司</li></ul><p>生产者：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Producer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Channel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RabbitMQ</span></span></code></pre></div><p>消费者：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>RabbitMQ</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Channel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Consumer</span></span></code></pre></div><p>都要经由 Channel，可以说几乎所有的操作都在 Channel 上完成。</p><h2 id="为什么要有多个-channel" tabindex="-1">为什么要有多个 Channel？ <a class="header-anchor" href="#为什么要有多个-channel" aria-label="Permalink to &quot;为什么要有多个 Channel？&quot;">​</a></h2><p>假设有一个订单系统，里面有三个线程，</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>线程A</span></span>
<span class="line"><span></span></span>
<span class="line"><span>线程B</span></span>
<span class="line"><span></span></span>
<span class="line"><span>线程C</span></span></code></pre></div><p>如果公用一个 Channel，可能就会发生下面这种情况：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>线程A：发送订单</span></span>
<span class="line"><span></span></span>
<span class="line"><span>线程B：发送短信</span></span>
<span class="line"><span></span></span>
<span class="line"><span>线程C：发送邮件</span></span></code></pre></div><p>大家一起争抢同一个 Channel 容易出现竞争问题，所以通常每个线程都有一个属于自己的 Channel。</p><h2 id="connection-与-channel-的关系" tabindex="-1">Connection 与 Channel 的关系 <a class="header-anchor" href="#connection-与-channel-的关系" aria-label="Permalink to &quot;Connection 与 Channel 的关系&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>            Spring Boot</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                 │</span></span>
<span class="line"><span></span></span>
<span class="line"><span>           Connection（TCP）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ┌────────┼────────┐</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ▼        ▼        ▼</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     Channel1 Channel2 Channel3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        │        │        │</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ▼        ▼        ▼</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    发消息    收消息    发消息</span></span></code></pre></div><h2 id="spring-boot" tabindex="-1">Spring Boot <a class="header-anchor" href="#spring-boot" aria-label="Permalink to &quot;Spring Boot&quot;">​</a></h2><p>我们平时使用 Spring Boot 开发时并不需要关注 <code>Connection</code>，因为Spring Boot 已经帮我们做好了。</p><p>启动时：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ConnectionFactory</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>建立 Connection</span></span></code></pre></div><p>发送消息：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>从连接池拿一个 Channel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>发送</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>归还</span></span></code></pre></div><p>所以开发者几乎感觉不到 Connection 的存在。</p><p>这也是为什么我们日常开发中几乎只会操作 <code>RabbitTemplate</code> 和 <code>@RabbitListener</code>，而很少直接操作底层 Connection。</p>`,46)]))}const C=a(l,[["render",i]]);export{b as __pageData,C as default};
