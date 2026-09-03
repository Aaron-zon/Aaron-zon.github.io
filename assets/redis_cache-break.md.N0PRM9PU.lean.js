import{ax as a,A as n,aQ as p,z as i}from"./chunks/framework.BWRXlwpK.js";const r=JSON.parse('{"title":"缓存击穿","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"redis/cache-break.md","filePath":"redis/cache-break.md","lastUpdated":1788400509000}'),e={name:"redis/cache-break.md"};function l(t,s,h,d,c,k){return i(),n("div",null,s[0]||(s[0]=[p(`<h1 id="缓存击穿" tabindex="-1">缓存击穿 <a class="header-anchor" href="#缓存击穿" aria-label="Permalink to &quot;缓存击穿&quot;">​</a></h1><p>某一个热点数据失效的一瞬间，大量请求同时访问数据库。</p><h2 id="什么是热点数据" tabindex="-1">什么是热点数据？ <a class="header-anchor" href="#什么是热点数据" aria-label="Permalink to &quot;什么是热点数据？&quot;">​</a></h2><p>例如：</p><p>商品 <code>1001</code> 是一个秒杀商品，每天要承受100万次访问。</p><p>Redis <code>goods:1001</code> 缓存 <code>30分钟</code></p><p>正常情况</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>Redis</span></span>
<span class="line"><span>   ↓</span></span>
<span class="line"><span>返回</span></span></code></pre></div><p>数据库几乎没压力。</p><p>但，当某一时刻 <code>goods:1001</code> 过期了 <code>TTL = 0</code> 这时 <code>10000个请求同时到了</code>。</p><p>流程：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请求1 → Redis没有</span></span>
<span class="line"><span>请求2 → Redis没有</span></span>
<span class="line"><span>请求3 → Redis没有</span></span>
<span class="line"><span>...</span></span>
<span class="line"><span>请求10000 → Redis没有</span></span></code></pre></div><p>于是这10000个请求都访问了数据库，数据库瞬间压力暴涨。</p><p>这就是</p><blockquote><p>缓存击穿</p></blockquote><h2 id="为什么叫击穿" tabindex="-1">为什么叫击穿？ <a class="header-anchor" href="#为什么叫击穿" aria-label="Permalink to &quot;为什么叫击穿？&quot;">​</a></h2><p>正常：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请求</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>Redis</span></span>
<span class="line"><span> ↓</span></span>
<span class="line"><span>数据库</span></span></code></pre></div><p>Redis 像一堵墙。而热点 Key 过期后：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>大量请求</span></span>
<span class="line"><span>     ↓</span></span>
<span class="line"><span>穿透这一点</span></span>
<span class="line"><span>     ↓</span></span>
<span class="line"><span>数据库</span></span></code></pre></div><p>就像是墙上被打了一个洞。</p><h2 id="举个栗子" tabindex="-1">举个栗子 <a class="header-anchor" href="#举个栗子" aria-label="Permalink to &quot;举个栗子&quot;">​</a></h2><p>腾讯云特价服务器每天 10 点有秒杀。</p><p>如果这个服务器的Redis正好在十点失效了，而这时大量的请求同时发送，结果就是数据库瞬间访问暴涨，甚至可能挂掉。</p><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h2><ul><li>互斥锁</li><li>分布式锁</li><li>逻辑过期</li><li>热点数据永不过期</li></ul><h3 id="方案1-互斥锁-最常见" tabindex="-1">方案1：互斥锁（最常见） <a class="header-anchor" href="#方案1-互斥锁-最常见" aria-label="Permalink to &quot;方案1：互斥锁（最常见）&quot;">​</a></h3><p>流程：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Redis没有</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>抢锁</span></span></code></pre></div><p>只有一个线程成功获取到锁，其他线程阻塞等待。</p><p>假如 <code>线程A</code> 抢到了锁，那么它接下来：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>查数据库</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>写Redis</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>释放锁</span></span></code></pre></div><p>其他线程等待，直到 <code>线程A</code> 释放锁后，他们会重查 Redis。</p><p>流程：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>10000个请求</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>Redis没有</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>竞争锁</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>A线程获得锁</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>查数据库</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>写Redis</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>释放锁</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>其它9999线程</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>重新查Redis</span></span>
<span class="line"><span>      ↓</span></span>
<span class="line"><span>直接返回</span></span></code></pre></div><p>在这个流程下，数据库只查了1次。</p><h4 id="java示例" tabindex="-1">JAVA示例 <a class="header-anchor" href="#java示例" aria-label="Permalink to &quot;JAVA示例&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">synchronized</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (key.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">intern</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    User user </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> redis.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (user </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    user </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mapper.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">selectById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(id);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    redis.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key, user);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="逻辑过期" tabindex="-1">逻辑过期 <a class="header-anchor" href="#逻辑过期" aria-label="Permalink to &quot;逻辑过期&quot;">​</a></h3><p>一般大型系统可能会用</p><p>缓存：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;expireTime&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2026-06-24 12:00:00&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>即使过期也先返回旧数据，用户得到旧数据，后台线程更新缓存。</p><p>优点：不会大量请求数据库</p><p>缺点：短时间数据不一致</p>`,45)]))}const g=a(e,[["render",l]]);export{r as __pageData,g as default};
