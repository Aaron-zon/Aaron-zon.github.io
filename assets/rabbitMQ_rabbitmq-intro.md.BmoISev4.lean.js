import{ax as a,A as n,aQ as p,z as e}from"./chunks/framework.BWRXlwpK.js";const h=JSON.parse('{"title":"RabbitMQ 是什么？","description":"","frontmatter":{},"headers":[],"relativePath":"rabbitMQ/rabbitmq-intro.md","filePath":"rabbitMQ/rabbitmq-intro.md","lastUpdated":1788148933000}'),l={name:"rabbitMQ/rabbitmq-intro.md"};function i(t,s,c,o,b,r){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="rabbitmq-是什么" tabindex="-1">RabbitMQ 是什么？ <a class="header-anchor" href="#rabbitmq-是什么" aria-label="Permalink to &quot;RabbitMQ 是什么？&quot;">​</a></h1><blockquote><p>RabbitMQ 是一个消息队列（Message Queue，MQ）用于让不同系统模块之间通过“消息”进行通信。</p></blockquote><p>它本质上是一个 <strong>专门负责存储和转发消息的服务</strong>。</p><h2 id="为什么需要-rabbitmq" tabindex="-1">为什么需要 RabbitMQ <a class="header-anchor" href="#为什么需要-rabbitmq" aria-label="Permalink to &quot;为什么需要 RabbitMQ&quot;">​</a></h2><p>假设现在有一个最简单的电商系统。</p><p>用户点击 <strong>下单</strong>。</p><p>以前：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ▼</span></span>
<span class="line"><span>订单服务</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ├── 扣库存</span></span>
<span class="line"><span>   ├── 保存订单</span></span>
<span class="line"><span>   ├── 发短信</span></span>
<span class="line"><span>   ├── 发优惠券</span></span>
<span class="line"><span>   ├── 发邮件</span></span>
<span class="line"><span>   ├── 积分增加</span></span>
<span class="line"><span>   ├── 通知物流</span></span>
<span class="line"><span>   └── 生成账单</span></span></code></pre></div><p>全部做完前，用户需要等待。</p><p>假设：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>扣库存      20ms</span></span>
<span class="line"><span>保存订单    30ms</span></span>
<span class="line"><span>短信       500ms</span></span>
<span class="line"><span>邮件      1000ms</span></span>
<span class="line"><span>优惠券     300ms</span></span></code></pre></div><p>用户可能要等待 2s 以上，体验非常不好。</p><p><strong>使用 RabbitMQ</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ▼</span></span>
<span class="line"><span>订单服务</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ├── 扣库存</span></span>
<span class="line"><span>   ├── 保存订单</span></span>
<span class="line"><span>   └── 发送一条消息</span></span>
<span class="line"><span>          │</span></span>
<span class="line"><span>          ▼</span></span>
<span class="line"><span>      RabbitMQ</span></span>
<span class="line"><span>      ├── 短信服务</span></span>
<span class="line"><span>      ├── 邮件服务</span></span>
<span class="line"><span>      ├── 优惠券服务</span></span>
<span class="line"><span>      ├── 积分服务</span></span>
<span class="line"><span>      └── 物流服务</span></span></code></pre></div><p>我们完全可以只做必要的事情，然后将其他内容交给 RabbitMQ 去慢慢处理。</p><p>这样一来用户就不用等待了。</p><h2 id="rabbitmq的三个作用" tabindex="-1">RabbitMQ的三个作用 <a class="header-anchor" href="#rabbitmq的三个作用" aria-label="Permalink to &quot;RabbitMQ的三个作用&quot;">​</a></h2><h3 id="_1-异步" tabindex="-1">1.异步 <a class="header-anchor" href="#_1-异步" aria-label="Permalink to &quot;1.异步&quot;">​</a></h3><p>注册功能：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>注册成功</span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span>发送欢迎邮件</span></span></code></pre></div><p>邮件发送需要2秒，这完全是没必要的等待时间。</p><p>完全可以通过 RabbitMQ 异步发送。</p><h3 id="_2-解耦" tabindex="-1">2.解耦 <a class="header-anchor" href="#_2-解耦" aria-label="Permalink to &quot;2.解耦&quot;">​</a></h3><p>不用MQ时：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>订单服务</span></span>
<span class="line"><span>   │</span></span>
<span class="line"><span>   ├── 调短信</span></span>
<span class="line"><span>   ├── 调邮件</span></span>
<span class="line"><span>   ├── 调积分</span></span>
<span class="line"><span>   ├── 调物流</span></span>
<span class="line"><span>   └── 调优惠券</span></span></code></pre></div><p>订单服务与其他系统耦合严重。</p><p>而将所有内容都交给 MQ 后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>订单服务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RabbitMQ</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>短信</span></span>
<span class="line"><span></span></span>
<span class="line"><span>邮件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>物流</span></span>
<span class="line"><span></span></span>
<span class="line"><span>优惠券</span></span></code></pre></div><p>订单服务与所有系统都解耦了。</p><h2 id="_3-削峰" tabindex="-1">3.削峰 <a class="header-anchor" href="#_3-削峰" aria-label="Permalink to &quot;3.削峰&quot;">​</a></h2><p>如双十一这种高峰期，一分钟可能触发100万次订单，数据库扛不住这种海量调用。</p><p>RabbitMQ可以缓存请求：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>100万订单</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RabbitMQ</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>数据库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>慢慢处理</span></span></code></pre></div><p>这就是 <strong>削峰填谷</strong>。</p>`,34)]))}const u=a(l,[["render",i]]);export{h as __pageData,u as default};
