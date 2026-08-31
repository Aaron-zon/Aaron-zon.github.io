import{ax as n,A as s,aQ as p,z as e}from"./chunks/framework.BWRXlwpK.js";const u=JSON.parse('{"title":"Exchange","description":"","frontmatter":{},"headers":[],"relativePath":"rabbitMQ/exchange.md","filePath":"rabbitMQ/exchange.md","lastUpdated":1788144986000}'),i={name:"rabbitMQ/exchange.md"};function l(c,a,t,o,d,r){return e(),s("div",null,a[0]||(a[0]=[p(`<h1 id="exchange" tabindex="-1">Exchange <a class="header-anchor" href="#exchange" aria-label="Permalink to &quot;Exchange&quot;">​</a></h1><p>先回顾一下架构</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Producer</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>Exchange</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>Queue</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>Consumer</span></span></code></pre></div><p>之前的章节我们知道</p><ul><li>Producer 不能直接发送 Queue</li><li>Consumer 不监听 Exchange</li><li>Exchange 不保存消息，只负责分配</li></ul><p>Producer 把消息交给 Exchange后</p><blockquote><p>发给谁，发几个，发那里 全部交给了 Exchange</p></blockquote><p>所以</p><blockquote><p>Exchange 就是消息路由器（Router）</p></blockquote><h2 id="exchange-的组成" tabindex="-1">Exchange 的组成 <a class="header-anchor" href="#exchange-的组成" aria-label="Permalink to &quot;Exchange 的组成&quot;">​</a></h2><p>Exchange 主要有三个东西：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Exchange</span></span>
<span class="line"><span></span></span>
<span class="line"><span>名字(Name)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>类型(Type)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>绑定(Binding)</span></span></code></pre></div><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Exchange</span></span>
<span class="line"><span></span></span>
<span class="line"><span>name = order.exchange</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type = direct</span></span></code></pre></div><p>然后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>绑定：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Queue_A</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RoutingKey=order.create</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Queue_B</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RoutingKey=order.pay</span></span></code></pre></div><h2 id="binding-绑定" tabindex="-1">Binding（绑定） <a class="header-anchor" href="#binding-绑定" aria-label="Permalink to &quot;Binding（绑定）&quot;">​</a></h2><p>Binding 就是把 Exchange 和 Queue 关联起来。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Exchange ———— Binding ———— Queue</span></span></code></pre></div><p>绑定时需要指定 <code>Binding Key</code></p><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Queue_Order</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BindingKey</span></span>
<span class="line"><span></span></span>
<span class="line"><span>order.*</span></span></code></pre></div><p>以后 Exchange 收到消息时，会判断消息的 <code>RoutingKey</code> 是否匹配 <code>BindingKey</code>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>RoutingKey</span></span>
<span class="line"><span></span></span>
<span class="line"><span>order.create</span></span></code></pre></div><p>如上这个Routing Key</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>order.*</span></span>
<span class="line"><span></span></span>
<span class="line"><span>匹配</span></span>
<span class="line"><span></span></span>
<span class="line"><span>↓</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Queue_Order</span></span></code></pre></div><p>发现可以匹配，那么就将这个消息发送给 Queue_Order</p><p>Binding就是 <strong>路由规则</strong></p><h2 id="routing-key" tabindex="-1">Routing Key <a class="header-anchor" href="#routing-key" aria-label="Permalink to &quot;Routing Key&quot;">​</a></h2><p>Producer 发消息的时候会带一个 <code>Routing Key</code></p><p>例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>channel.basicPublish(</span></span>
<span class="line"><span>    &quot;order.exchange&quot;,</span></span>
<span class="line"><span>    &quot;order.create&quot;,</span></span>
<span class="line"><span>    null,</span></span>
<span class="line"><span>    body</span></span>
<span class="line"><span>);</span></span></code></pre></div><p>这里 <code>order.create</code> 就是 \`Routing Key</p><p>Exchange根据 Routing Key 和 Binding Key 决定这条消息究竟去哪个 Queue。</p><h2 id="四种-exchange" tabindex="-1">四种 Exchange <a class="header-anchor" href="#四种-exchange" aria-label="Permalink to &quot;四种 Exchange&quot;">​</a></h2><p>RabbitMQ 内置四种匹配机制。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Direct</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Fanout</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Topic</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Headers</span></span></code></pre></div><p>我们主要使用前三种，Headers 基本不用。</p><h3 id="direct-exchange-精确匹配" tabindex="-1">Direct Exchange（精确匹配） <a class="header-anchor" href="#direct-exchange-精确匹配" aria-label="Permalink to &quot;Direct Exchange（精确匹配）&quot;">​</a></h3><p>要求 <strong>Routing Key === Binding Key</strong></p><p>如果 Queue_A 的 <code>Binding = order.create</code></p><p>Producer 发送消息时 <code>RoutingKey = order.create</code>，那么它就可以进入 Queue_A。</p><p>如果 <code>RoutingKey = order.pay</code> 由于不完全匹配，所以不会进入 Queue_A。</p><h3 id="fanout-exchange-广播" tabindex="-1">Fanout Exchange（广播） <a class="header-anchor" href="#fanout-exchange-广播" aria-label="Permalink to &quot;Fanout Exchange（广播）&quot;">​</a></h3><p>不看 Routing Key，受到消息，全部发送。</p><p>受到消息后将消息发送到匹配规则为Fanout Exchange 的所有 Queue。</p><p>它适合：</p><ul><li>系统通知</li><li>配置刷新</li><li>广播消息</li></ul><h3 id="topic-exchange-通配符" tabindex="-1">Topic Exchange（通配符） <a class="header-anchor" href="#topic-exchange-通配符" aria-label="Permalink to &quot;Topic Exchange（通配符）&quot;">​</a></h3><p>这是功能性最强的匹配方式</p><p>它支持 <code>*</code> 和 <code>#</code></p><p>其中 <code>*</code> 标识匹配一个单词。</p><p>例如：</p><p><code>order.*</code> 可以匹配</p><ul><li>order.create</li><li>order.pay</li></ul><p>但是不可以匹配</p><ul><li>prder.pay.success</li></ul><p>因为多了一级。</p><p><code>#</code> 表示匹配多个单词。</p><p>例如：</p><p><code>order.#</code> 可以匹配</p><ul><li>order.create</li><li>order.pay</li><li>order.pay.success</li><li>order.xxx.yyy.zzz</li></ul><h3 id="headers-exchange" tabindex="-1">Headers Exchange <a class="header-anchor" href="#headers-exchange" aria-label="Permalink to &quot;Headers Exchange&quot;">​</a></h3><p>不用 Routing Key，而是根据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Header</span></span>
<span class="line"><span></span></span>
<span class="line"><span>color=red</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type=pdf</span></span></code></pre></div><p>匹配，性能较差，一般不用。</p><h2 id="完整流程" tabindex="-1">完整流程 <a class="header-anchor" href="#完整流程" aria-label="Permalink to &quot;完整流程&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Producer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Message</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RoutingKey</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ▼</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Exchange</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span></span></span>
<span class="line"><span>查 Binding</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span></span></span>
<span class="line"><span>找到 Queue</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span></span></span>
<span class="line"><span>投递</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      ▼</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Queue</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Consumer</span></span></code></pre></div><blockquote><p>Exchange 是 RabbitMQ 的消息路由中心。Producer 将消息发送给 Exchange，Exchange 根据自身类型（Direct、Fanout、Topic、Headers）以及 Binding Key 和 Routing Key 的匹配关系，将消息路由到一个或多个 Queue。Exchange 自身不存储消息，只负责路由，真正存储消息的是 Queue。</p></blockquote>`,69)]))}const g=n(i,[["render",l]]);export{u as __pageData,g as default};
